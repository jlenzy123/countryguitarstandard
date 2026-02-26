// Nashville Number System: chord name ↔ scale degree per key.
// Degree 1-7 = I through vii°; we use "1" for I, "2m" for ii, etc.

export const KEY_ORDER = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'] as const

const DIATONIC_MAJOR: Record<string, string[]> = {
  C: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
  Db: ['Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm', 'Cdim'],
  D: ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
  Eb: ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'Ddim'],
  E: ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'],
  F: ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim'],
  Gb: ['Gb', 'Abm', 'Bbm', 'Cb', 'Db', 'Ebm', 'Fdim'],
  G: ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
  Ab: ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm', 'Gdim'],
  A: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'],
  Bb: ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Adim'],
  B: ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#dim'],
}

// Normalize chord input: "Am" "am" "Amin" → "Am"; "Bdim" "B°" → "Bdim"
const CHORD_ALIASES: Record<string, string> = {}
KEY_ORDER.forEach((k) => {
  const chords = DIATONIC_MAJOR[k]
  chords.forEach((c, i) => {
    const base = c.replace(/dim$/, '').replace(/m$/, '')
    const lower = c.toLowerCase()
    CHORD_ALIASES[lower] = c
    CHORD_ALIASES[c] = c
    if (c.endsWith('m') && !c.endsWith('dim')) {
      CHORD_ALIASES[base + 'min'] = c
      CHORD_ALIASES[base.toLowerCase() + 'm'] = c
    }
    if (c.endsWith('dim')) {
      CHORD_ALIASES[base + '°'] = c
      CHORD_ALIASES[base + 'o'] = c
    }
  })
})

function normalizeChord(input: string): string {
  const t = input.trim()
  const lower = t.toLowerCase()
  return CHORD_ALIASES[lower] ?? CHORD_ALIASES[t] ?? t
}

/** Chords in key (e.g. "G") → ["G","Am","Bm","C","D","Em","F#dim"] */
export function getChordsInKey(key: string): string[] {
  const k = KEY_ORDER.includes(key as typeof KEY_ORDER[number]) ? key : 'C'
  return [...(DIATONIC_MAJOR[k] ?? DIATONIC_MAJOR.C)]
}

/** Chord name → degree in key (1-7). Returns "1" "2m" "3m" "4" "5" "6m" "7dim" style. */
export function chordToNumber(chordName: string, key: string): string {
  const chords = getChordsInKey(key)
  const normalized = normalizeChord(chordName)
  const index = chords.findIndex((c) => c === normalized || c.toLowerCase() === normalized.toLowerCase())
  if (index < 0) return chordName
  const degree = index + 1
  if (chords[index].endsWith('dim')) return `${degree}dim`
  if (chords[index].endsWith('m')) return `${degree}m`
  return String(degree)
}

/** Parse "1" "2m" "4" "5" "6m" "7dim" etc. → chord name in key */
export function numberToChord(numStr: string, key: string): string {
  const k = KEY_ORDER.includes(key as typeof KEY_ORDER[number]) ? key : 'C'
  const chords = DIATONIC_MAJOR[k] ?? DIATONIC_MAJOR.C
  const match = numStr.trim().match(/^(\d)(m|dim|°|o)?$/i)
  if (!match) return numStr
  const degree = parseInt(match[1], 10)
  const suffix = (match[2] ?? '').toLowerCase().replace(/[°o]/, 'dim')
  if (degree < 1 || degree > 7) return numStr
  const chord = chords[degree - 1]
  if (suffix === 'm' && chord.endsWith('m') && !chord.endsWith('dim')) return chord
  if ((suffix === 'dim' || suffix === '°' || suffix === 'o') && chord.endsWith('dim')) return chord
  if (!suffix && !chord.endsWith('m') && !chord.endsWith('dim')) return chord
  return chord
}

/** Convert a string of chord names to Nashville numbers in key */
export function chordsToNumbers(chordString: string, key: string): string {
  return chordString
    .split(/[\s,]+/)
    .filter(Boolean)
    .map((c) => chordToNumber(c, key))
    .join(' ')
}

/** Convert a string of Nashville numbers to chord names in key */
export function numbersToChords(numberString: string, key: string): string {
  return numberString
    .split(/[\s,]+/)
    .filter(Boolean)
    .map((n) => numberToChord(n, key))
    .join(' ')
}

/** Suggest next chords that commonly follow the last chord in key (for "continue progression") */
export function suggestNextChords(chordNames: string[], key: string): string[] {
  const chords = getChordsInKey(key)
  if (chordNames.length === 0) return chords.slice(0, 6)

  const last = normalizeChord(chordNames[chordNames.length - 1])
  const lastIndex = chords.findIndex((c) => c === last || c.toLowerCase() === last.toLowerCase())
  if (lastIndex < 0) return chords.slice(0, 6)

  // Common follow-ups in country: V→I, IV→I, ii→V, vi→IV, I→IV, I→V, IV→V, iii→vi, etc.
  const followUps: number[][] = [
    [4, 5, 0, 2, 5],   // 1 (I) → IV, V, I, ii, V
    [4, 0],            // 2 (ii) → IV, I (ii-V-I)
    [3, 5, 2],        // 3 (iii) → IV, V, ii
    [0, 5, 1, 2],     // 4 (IV) → I, V, ii
    [0, 4, 1],        // 5 (V) → I, IV, ii
    [3, 1, 4],        // 6 (vi) → IV, ii, IV
    [0],              // 7 (vii°)
  ]
  const nextDegrees = followUps[lastIndex] ?? [0, 4, 5]
  const uniqueDegrees = Array.from(new Set(nextDegrees))
  const suggested = uniqueDegrees.map((d) => chords[d]).filter(Boolean)
  return suggested.slice(0, 6)
}
