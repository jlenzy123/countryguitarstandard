import { NextRequest, NextResponse } from 'next/server'

const KEY_NAMES: Record<number, string> = {
  0: 'C',
  1: 'Db',
  2: 'D',
  3: 'Eb',
  4: 'E',
  5: 'F',
  6: 'Gb',
  7: 'G',
  8: 'Ab',
  9: 'A',
  10: 'Bb',
  11: 'B',
}

function extractTrackId(urlOrId: string): string | null {
  const s = urlOrId.trim()
  const match = s.match(/spotify\.com\/track\/([a-zA-Z0-9]+)/)
  if (match) return match[1]
  if (/^[a-zA-Z0-9]{22}$/.test(s)) return s
  return null
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    throw new Error('Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env.local')
  }
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Spotify token failed: ${res.status} ${text}`)
  }
  const data = await res.json()
  return data.access_token
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl
  const trackParam = url.searchParams.get('track') || url.searchParams.get('url') || ''
  const trackId = extractTrackId(trackParam)
  if (!trackId) {
    return NextResponse.json(
      { error: 'Provide a Spotify track URL or track ID (e.g. ?track=https://open.spotify.com/track/...)' },
      { status: 400 }
    )
  }

  try {
    const token = await getAccessToken()

    const [featuresRes, trackRes] = await Promise.all([
      fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])

    if (!featuresRes.ok) {
      if (featuresRes.status === 404) {
        return NextResponse.json({ error: 'Track not found or no audio features available.' }, { status: 404 })
      }
      const text = await featuresRes.text()
      console.error('Spotify audio-features error:', featuresRes.status, text)
      return NextResponse.json({ error: `Spotify API: ${featuresRes.status} ${text}` }, { status: 502 })
    }

    const features = await featuresRes.json()
    const keyName = KEY_NAMES[features.key ?? 0] ?? 'C'
    const mode = features.mode === 0 ? 'minor' : 'major'
    const key = `${keyName} ${mode}`
    const tempo = Math.round(Number(features.tempo) || 0)

    let name: string | undefined
    let artist: string | undefined
    if (trackRes.ok) {
      const track = await trackRes.json()
      name = track.name
      artist = track.artists?.map((a: { name: string }) => a.name).join(', ')
    }

    return NextResponse.json({
      key,
      keyRoot: keyName,
      mode,
      tempo,
      name,
      artist,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
