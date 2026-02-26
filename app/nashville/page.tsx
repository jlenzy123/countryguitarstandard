'use client'

import { useState } from 'react'
import { KEY_ORDER, numbersToChords } from '@/lib/nashville'

export default function NashvillePage() {
  const [key, setKey] = useState('G')

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="border-l-4 border-barn pl-4">
        <h1 className="font-display text-3xl font-medium text-cream">Nashville Number System</h1>
        <p className="mt-2 text-cream-muted">
          Convert between chord names and numbers in any key.
        </p>
      </div>

      {/* How it works - first */}
      <section className="mt-10 rounded-lg bg-void-card border border-saddle/50 p-6">
        <h2 className="font-display font-medium text-cream">How it works</h2>
        <p className="mt-2 text-sm text-cream-muted">
          In any key, the scale degrees are numbered 1–7. The 1 chord is the tonic (e.g. G in G major),
          4 is the subdominant (C), 5 is the dominant (D). Lowercase "m" means minor (e.g. 6m = Em in G).
          So a chart like <strong className="text-cream">1 4 5 1</strong> means the same progression in every key—
          in G it's G C D G, in C it's C F G C. Session players and songwriters use numbers so a song can be
          called in any key without rewriting the chart.
        </p>
      </section>

      {/* Quick Reference */}
      <section className="mt-8 rounded-lg bg-void-card border border-barn/40 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="font-display font-medium text-cream text-xl">Quick Reference</h2>
          <select
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="rounded-lg border-2 border-barn bg-void px-4 py-2 text-cream text-lg font-medium min-w-[100px]"
          >
            {KEY_ORDER.map((k) => (
              <option key={k} value={k}>Key of {k}</option>
            ))}
          </select>
        </div>

        {/* Scale degrees grid */}
        <div className="grid grid-cols-7 gap-2 text-center">
          {['1', '2m', '3m', '4', '5', '6m', '7dim'].map((num) => {
            const chord = numbersToChords(num, key).trim()
            return (
              <div key={num} className="bg-void rounded-lg p-3 border border-barn/20">
                <div className="text-lg font-medium text-cream">{chord}</div>
                <div className="text-xs text-cream-muted mt-1">{num}</div>
              </div>
            )
          })}
        </div>

        <p className="mt-4 text-xs text-cream-muted text-center">
          Major: 1, 4, 5 · Minor: 2m, 3m, 6m · Diminished: 7dim
        </p>
      </section>

      <p className="mt-10 text-sm text-cream-muted">
        <a href="/" className="text-gold hover:underline">Back to home</a>
      </p>
    </div>
  )
}
