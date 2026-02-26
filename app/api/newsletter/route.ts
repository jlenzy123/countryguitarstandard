import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Send confirmation email via Resend
    const result = await resend.emails.send({
      from: 'Country Guitar Standard <noreply@countryguitarstandard.com>',
      to: email,
      subject: 'Welcome to Country Guitar Standard',
      html: `
        <h2>Thanks for subscribing!</h2>
        <p>You'll now get updates about:</p>
        <ul>
          <li>New guides and song breakdowns</li>
          <li>Nashville number system tips</li>
          <li>Country progression technique videos</li>
          <li>Exclusive shop discounts</li>
        </ul>
        <p>Check your inbox soon for our latest content.</p>
      `,
    })

    if (result.error) {
      console.error('Resend error:', result.error)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Successfully subscribed! Check your email.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

