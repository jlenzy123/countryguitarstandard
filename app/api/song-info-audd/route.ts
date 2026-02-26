import { NextRequest, NextResponse } from 'next/server'

// Lightweight proxy to AudD (https://audd.io) to recognize a YouTube URL
// Requires AUDD_API_TOKEN in .env.local

export async function GET(request: NextRequest) {
  const url = request.nextUrl
  const trackUrl = url.searchParams.get('url') || ''
  if (!trackUrl) {
    return NextResponse.json({ error: 'Provide a YouTube URL (e.g. ?url=https://...)' }, { status: 400 })
  }

  const apiToken = process.env.AUDD_API_TOKEN
  if (!apiToken) {
    return NextResponse.json({ error: 'Missing AUDD_API_TOKEN in environment' }, { status: 500 })
  }

  try {
    const body = new URLSearchParams()
    body.set('api_token', apiToken)
    body.set('url', trackUrl)
    body.set('return', 'timecode,spotify')

    const res = await fetch('https://api.audd.io/recognize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })

    const data = await res.json()

    if (!res.ok) {
      const text = JSON.stringify(data)
      console.error('AudD error:', res.status, text)
      return NextResponse.json({ error: `AudD API error: ${res.status} ${text}` }, { status: 502 })
    }

    if (!data || !data.result) {
      // AudD couldn't recognize the sample; return helpful message
      return NextResponse.json({ error: 'No result from AudD for this URL' }, { status: 404 })
    }

    const r = data.result
    // AudD may include tempo/key in some responses under 'tempo' or 'timecodes' or via matched services
    // We'll try to extract tempo/key if present; otherwise return available metadata

    const name = r.title || r.title_short || undefined
    const artist = r.artist || undefined

    // AudD doesn't always return key/tempo. If available, return them.
    const tempo = r.bpm ? Math.round(Number(r.bpm)) : undefined
    const key = r.key || undefined

    return NextResponse.json({
      name,
      artist,
      tempo,
      key,
      raw: r,
      source: 'audd',
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('AudD proxy error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
