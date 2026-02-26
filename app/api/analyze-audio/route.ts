import { NextRequest, NextResponse } from 'next/server'

// Pure JS FFT (Cooley-Tukey)
function fft(x: number[]): { real: number[]; imag: number[] } {
  const N = x.length
  if (N <= 1) return { real: x, imag: new Array(N).fill(0) }

  const even = fft(x.filter((_, i) => i % 2 === 0))
  const odd = fft(x.filter((_, i) => i % 2 === 1))

  const result = { real: new Array(N).fill(0), imag: new Array(N).fill(0) }
  for (let k = 0; k < N / 2; k++) {
    const angle = (-2 * Math.PI * k) / N
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const oddReal = odd.real[k]
    const oddImag = odd.imag[k]
    const tReal = cos * oddReal - sin * oddImag
    const tImag = sin * oddReal + cos * oddImag
    result.real[k] = even.real[k] + tReal
    result.imag[k] = even.imag[k] + tImag
    result.real[k + N / 2] = even.real[k] - tReal
    result.imag[k + N / 2] = even.imag[k] - tImag
  }
  return result
}

function estimateTempo(samples: Float32Array): number {
  const frameSize = 2048
  const hop = 1024
  const energies: number[] = []

  for (let i = 0; i + frameSize < samples.length; i += hop) {
    let sum = 0
    for (let j = 0; j < frameSize; j++) sum += samples[i + j] ** 2
    energies.push(Math.sqrt(sum / frameSize))
  }

  const threshold = energies.reduce((a, b) => a + b, 0) / energies.length
  const peaks: number[] = []
  for (let i = 1; i < energies.length - 1; i++) {
    if (energies[i] > threshold && energies[i] > energies[i - 1] && energies[i] > energies[i + 1]) {
      peaks.push(i)
    }
  }

  if (peaks.length < 2) return 120
  const intervals = []
  for (let i = 1; i < peaks.length; i++) intervals.push(peaks[i] - peaks[i - 1])
  const medianInterval = intervals.sort((a, b) => a - b)[Math.floor(intervals.length / 2)]
  const sampleRate = 22050 // assuming 22050Hz
  const bpm = Math.round((sampleRate / (medianInterval * hop)) * 60)
  return Math.min(Math.max(bpm, 60), 200)
}

function estimateKey(samples: Float32Array, sampleRate: number): string {
  const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const KrumhanslMajor = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88]
  const KrumhanslMinor = [6.33, 2.68, 3.52, 5.38, 2.6, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17]

  const windowSize = 4096
  const hop = 2048
  const chroma = new Array(12).fill(0)

  // Process audio in windows
  for (let i = 0; i + windowSize < samples.length; i += hop) {
    const frame = new Array(windowSize)
    // Apply Hanning window
    for (let j = 0; j < windowSize; j++) {
      frame[j] = samples[i + j] * (0.5 - 0.5 * Math.cos((2 * Math.PI * j) / (windowSize - 1)))
    }

    // Simple FFT magnitude spectrum
    const result = fft(frame)
    for (let j = 0; j < windowSize / 2; j++) {
      const mag = Math.sqrt(result.real[j] ** 2 + result.imag[j] ** 2)
      const freq = (j * sampleRate) / windowSize
      if (freq > 50 && freq < 5000) {
        const midi = 69 + 12 * Math.log2(freq / 440)
        const pc = (Math.round(midi) % 12 + 12) % 12
        chroma[pc] += mag
      }
    }
  }

  // Normalize
  const chromaNorm = Math.sqrt(chroma.reduce((s, v) => s + v * v, 0)) + 1e-12
  for (let i = 0; i < 12; i++) chroma[i] /= chromaNorm

  // Correlate with Krumhansl profiles
  let bestRoot = 0,
    bestMode = 'major',
    bestScore = -Infinity
  for (let root = 0; root < 12; root++) {
    const majRotated = KrumhanslMajor.slice(root).concat(KrumhanslMajor.slice(0, root))
    const minRotated = KrumhanslMinor.slice(root).concat(KrumhanslMinor.slice(0, root))
    let majScore = 0,
      minScore = 0
    for (let i = 0; i < 12; i++) {
      majScore += majRotated[i] * chroma[i]
      minScore += minRotated[i] * chroma[i]
    }
    if (majScore > bestScore) {
      bestScore = majScore
      bestRoot = root
      bestMode = 'major'
    }
    if (minScore > bestScore) {
      bestScore = minScore
      bestRoot = root
      bestMode = 'minor'
    }
  }

  return `${NOTE_NAMES[bestRoot]} ${bestMode}`
}

async function decodeAudio(buffer: Buffer): Promise<{ samples: Float32Array; sampleRate: number }> {
  // Simple WAV decoder: read header and PCM data
  const dataView = new DataView(buffer.buffer, buffer.byteOffset, buffer.length)

  // Check RIFF header
  const riffHeader = dataView.getUint32(0, true)
  if (riffHeader !== 0x46464952) {
    // 'RIFF' in little-endian
    throw new Error('Not a valid WAV file')
  }

  // Find 'fmt ' chunk
  let fmtOffset = 12
  let audioDataOffset = 0
  let sampleRate = 22050
  let numChannels = 1
  let bitsPerSample = 16

  while (fmtOffset < buffer.length) {
    const chunkId = buffer.readUInt32LE(fmtOffset)
    const chunkSize = dataView.getUint32(fmtOffset + 4, true)

    if (chunkId === 0x20746d66) {
      // 'fmt '
      numChannels = dataView.getUint16(fmtOffset + 8, true)
      sampleRate = dataView.getUint32(fmtOffset + 12, true)
      bitsPerSample = dataView.getUint16(fmtOffset + 22, true)
    } else if (chunkId === 0x61746164) {
      // 'data'
      audioDataOffset = fmtOffset + 8
      break
    }
    fmtOffset += 8 + chunkSize
  }

  if (audioDataOffset === 0) throw new Error('No audio data found in WAV')

  // Decode PCM
  const pcmStart = audioDataOffset
  const pcmEnd = audioDataOffset + dataView.getUint32(audioDataOffset - 4, true)
  const pcmBuffer = buffer.slice(pcmStart, pcmEnd)

  let samples: Float32Array
  if (bitsPerSample === 16) {
    const int16Array = new Int16Array(pcmBuffer.buffer, pcmBuffer.byteOffset, pcmBuffer.length / 2)
    samples = new Float32Array(int16Array.length)
    for (let i = 0; i < int16Array.length; i++) {
      samples[i] = int16Array[i] / 32768
    }
  } else if (bitsPerSample === 32) {
    samples = new Float32Array(pcmBuffer.buffer, pcmBuffer.byteOffset, pcmBuffer.length / 4)
  } else {
    throw new Error(`Unsupported bit depth: ${bitsPerSample}`)
  }

  // Convert to mono if stereo
  if (numChannels === 2) {
    const mono = new Float32Array(samples.length / 2)
    for (let i = 0; i < mono.length; i++) {
      mono[i] = (samples[i * 2] + samples[i * 2 + 1]) / 2
    }
    samples = mono
  }

  return { samples, sampleRate }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('audio') as File
    if (!file) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 })
    }

    console.log('Decoding audio file:', file.name)
    const buffer = Buffer.from(await file.arrayBuffer())
    const { samples, sampleRate } = await decodeAudio(buffer)

    console.log('Analyzing...')
    const tempo = estimateTempo(samples)
    const key = estimateKey(samples, sampleRate)
    const keyRoot = key.split(' ')[0]
    const mode = key.split(' ')[1]

    return NextResponse.json({
      key,
      keyRoot,
      mode,
      tempo,
      name: file.name,
      source: 'local',
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Audio analysis error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
