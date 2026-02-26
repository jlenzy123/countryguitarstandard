'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to send message')
      setMessage('Thanks! I'll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-cream mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded bg-void text-cream placeholder-cream-muted border border-barn/50 focus:outline-none focus:border-barn text-sm"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-cream mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded bg-void text-cream placeholder-cream-muted border border-barn/50 focus:outline-none focus:border-barn text-sm"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-cream mb-1">Subject</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded bg-void text-cream placeholder-cream-muted border border-barn/50 focus:outline-none focus:border-barn text-sm"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-cream mb-1">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-3 py-2 rounded bg-void text-cream placeholder-cream-muted border border-barn/50 focus:outline-none focus:border-barn text-sm"
          placeholder="Your message..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded bg-barn text-cream font-medium hover:bg-barn-hover transition-colors disabled:opacity-50 w-full"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>

      {message && <p className="text-sm text-gold">{message}</p>}
      {error && <p className="text-sm text-barn">{error}</p>}
    </form>
  )
}
