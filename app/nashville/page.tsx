'use client'

import { useState } from 'react'
import { KEY_ORDER, numbersToChords } from '@/lib/nashville'

// Relative minor for each major key (6th scale degree)
const RELATIVE_MINOR: Record<string, string> = {
  C: 'Am', Db: 'Bbm', D: 'Bm', Eb: 'Cm', E: 'C#m', F: 'Dm',
  Gb: 'Ebm', G: 'Em', Ab: 'Fm', A: 'F#m', Bb: 'Gm', B: 'G#m'
}

export default function NashvillePage() {
  const [key, setKey] = useState('G')
  const relativeMinor = RELATIVE_MINOR[key] || 'Em'

  return (
    <div className="mx-auto max-w-4xl px-6 pt-24 pb-16">
      <div className="pt-8">
        <p className="font-bebas text-sm uppercase tracking-[0.25em] text-accent mb-4">Tool</p>
        <h1 className="font-bebas text-4xl sm:text-5xl font-bold text-cream uppercase tracking-wide mb-4">Nashville Number System</h1>
        <p className="text-base sm:text-lg text-cream-muted leading-relaxed">
          Convert between chord names and numbers in any key.
        </p>
      </div>

      {/* How it works */}
      <section className="mt-10 rounded-xl bg-void-card border border-white/[0.06] p-6">
        <h2 className="font-bebas text-xl font-bold text-cream uppercase tracking-wide">How it works</h2>
        <p className="mt-2 text-sm text-cream-muted">
          In any key, the scale degrees are numbered 1–7. The 1 chord is the tonic (e.g. G in G major),
          4 is the subdominant (C), 5 is the dominant (D). Lowercase "m" means minor (e.g. 6m = Em in G).
          So a chart like <strong className="text-cream">1 4 5 1</strong> means the same progression in every key—
          in G it's G C D G, in C it's C F G C. Session players and songwriters use numbers so a song can be
          called in any key without rewriting the chart.
        </p>
      </section>

      {/* Quick Reference */}
      <section className="mt-8 rounded-xl bg-void-card border border-white/[0.06] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="font-bebas text-xl font-bold text-cream uppercase tracking-wide">Quick Reference</h2>
          <select
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-void-elevated px-4 py-2 text-cream text-lg font-medium min-w-[100px]"
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
              <div key={num} className="bg-void-elevated rounded-lg p-3 border border-white/[0.06]">
                <div className="text-lg font-medium text-cream">{chord}</div>
                <div className="text-xs text-cream-muted mt-1">{num}</div>
              </div>
            )
          })}
        </div>

        <p className="mt-4 text-xs text-cream-muted text-center">
          Major: 1, 4, 5 · Minor: 2m, 3m, 6m · Diminished: 7dim
        </p>

        {/* Relative minor/major indicator */}
        <div className="mt-5 pt-4 border-t border-white/[0.06]">
          <p className="text-sm text-center text-cream-muted">
            <span className="text-cream font-medium">{key} major</span> ↔ <span className="text-cream font-medium">{relativeMinor}</span> (relative minor)
          </p>
          <p className="text-xs text-center text-cream-muted mt-1">
            Playing in {relativeMinor}? Use this {key} major chart — {relativeMinor} is the 6m chord.
          </p>
        </div>
      </section>

      {/* Relative Major/Minor Reference */}
      <section className="mt-8 rounded-xl bg-void-card border border-white/[0.06] p-6">
        <h2 className="font-bebas text-xl font-bold text-cream uppercase tracking-wide mb-4">Relative Major & Minor Keys</h2>
        <p className="text-sm text-cream-muted mb-4">
          Every major key has a relative minor that shares the same chords. If you're in a minor key, find it below and use the major key chart above.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
          {KEY_ORDER.map((k) => (
            <div key={k} className="bg-void-elevated rounded-lg px-3 py-2 border border-white/[0.06] text-center">
              <span className="text-cream">{k}</span>
              <span className="text-cream-muted mx-1">↔</span>
              <span className="text-cream">{RELATIVE_MINOR[k]}</span>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10 text-sm text-cream-muted">
        <a href="/" className="text-accent hover:underline">Back to home</a>
      </p>
    </div>
  )
}
