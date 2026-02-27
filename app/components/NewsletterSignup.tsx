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
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Stay Updated</p>
      <h3 className="font-display text-2xl text-cream mb-2">Get new guides in your inbox</h3>
      <p className="text-sm text-cream-muted mb-6 max-w-md">Song breakdowns, tools, and resources — no spam.</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-lg bg-void-card text-cream placeholder-cream-muted border border-white/[0.08] focus:outline-none focus:border-accent text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-accent text-void font-medium text-sm uppercase tracking-wider hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && <p className="text-xs text-accent mt-3">{message}</p>}
      {error && <p className="text-xs text-red-400 mt-3">{error}</p>}
    </div>
  )
}
