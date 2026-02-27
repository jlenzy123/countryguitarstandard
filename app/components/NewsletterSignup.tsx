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
      <p className="font-bebas text-xs sm:text-sm uppercase tracking-[0.25em] text-accent mb-3">Stay Updated</p>
      <h3 className="font-bebas text-2xl sm:text-3xl text-cream-light mb-3 sm:mb-2 uppercase tracking-wide">Get new guides in your inbox</h3>
      <p className="text-sm text-cream-muted mb-6 max-w-md">Song breakdowns, tools, and resources — no spam.</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 bg-void-card text-cream placeholder-cream-dark border-2 border-cream/10 focus:outline-none focus:border-accent text-sm rounded-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-accent text-void font-bebas font-bold text-base uppercase tracking-wider hover:bg-accent-hover transition-all disabled:opacity-50 shadow-md hover:shadow-lg rounded-sm"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && <p className="text-xs text-accent mt-3">{message}</p>}
      {error && <p className="text-xs text-red-400 mt-3">{error}</p>}
    </div>
  )
}
