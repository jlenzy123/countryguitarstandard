import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const OWNER_EMAIL = 'jacklenz@proton.me' // Change to your email

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Send email to owner
    const ownerResult = await resend.emails.send({
      from: 'Country Guitar Standard <noreply@countryguitarstandard.com>',
      to: OWNER_EMAIL,
      subject: `New Contact: ${subject}`,
      html: `
        <h2>New message from ${name}</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    if (ownerResult.error) {
      console.error('Resend error:', ownerResult.error)
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }

    // Send confirmation email to user
    const userResult = await resend.emails.send({
      from: 'Country Guitar Standard <noreply@countryguitarstandard.com>',
      to: email,
      subject: 'We received your message',
      html: `
        <h2>Thanks for reaching out, ${name}!</h2>
        <p>We received your message and will get back to you soon.</p>
        <hr />
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    if (userResult.error) {
      console.error('Resend error:', userResult.error)
      // Don't fail if confirmation email fails, message was sent to owner
    }

    return NextResponse.json(
      { message: 'Message sent! You should receive a confirmation email.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
