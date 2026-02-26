import { NextRequest, NextResponse } from 'next/server'

// Simple proxy to AudD music recognition API
// Requires AUDD_API_TOKEN in .env.local
// AudD recognizes music from YouTube videos without needing to download/process audio locally

export async function GET(request: NextRequest) {
  const url = request.nextUrl
  const youtubeUrl = url.searchParams.get('url') || ''
  if (!youtubeUrl) {
    return NextResponse.json({ error: 'Provide a YouTube URL (e.g. ?url=...)' }, { status: 400 })
  }

  const apiToken = process.env.AUDD_API_TOKEN
  if (!apiToken) {
    return NextResponse.json({ error: 'Missing AUDD_API_TOKEN in environment' }, { status: 500 })
  }

  try {
    const body = new URLSearchParams()
    body.set('api_token', apiToken)
    body.set('url', youtubeUrl)
    body.set('return', 'timecode,spotify')

    console.log('Sending to AudD:', youtubeUrl)
    const res = await fetch('https://api.audd.io/recognize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('AudD error:', res.status, data)
      return NextResponse.json({ error: `AudD API error: ${res.status}` }, { status: 502 })
    }

    if (!data || !data.result) {
      console.warn('AudD no result')
      return NextResponse.json({ error: 'No music recognized in this video' }, { status: 404 })
    }

    const r = data.result
    const name = r.title || undefined
    const artist = r.artist || undefined
    // AudD may not return tempo/key; we return what's available
    const tempo = r.bpm ? Math.round(Number(r.bpm)) : undefined
    const key = r.key || undefined

    return NextResponse.json({
      name,
      artist,
      tempo: tempo || 120, // fallback default
      key: key || 'G major', // fallback default
      keyRoot: key?.split(' ')[0] || 'G',
      mode: key?.split(' ')[1] || 'major',
      source: 'audd',
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('AudD proxy error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
