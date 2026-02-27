'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) throw new Error('Failed to subscribe')
      setMessage('Thanks! Check your email to confirm.')
      setEmail('')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg bg-barn/10 border border-barn/30 p-6">
      <h3 className="font-display text-lg font-medium text-cream mb-2">Get updates</h3>
      <p className="text-sm text-cream-muted mb-4 leading-relaxed">
        New guides, song breakdowns, and tools sent to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-3 py-2 rounded bg-void text-cream placeholder-cream-muted border border-barn/50 focus:outline-none focus:border-barn text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-barn text-void font-medium hover:bg-barn-hover transition-colors disabled:opacity-50 text-sm"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && <p className="text-xs text-gold mt-2">{message}</p>}
      {error && <p className="text-xs text-barn mt-2">{error}</p>}
    </div>
  )
}
