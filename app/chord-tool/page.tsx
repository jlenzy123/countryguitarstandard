'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { PROGRESSIONS, KEY_ORDER } from './progressions'
import { suggestNextChords } from '@/lib/nashville'

export default function ChordToolPage() {
  const [key, setKey] = useState('G')
  const [showProgression, setShowProgression] = useState(true)

  const progressionsRef = useRef<HTMLDivElement>(null)

  const progressions = PROGRESSIONS[key] ?? PROGRESSIONS.G


  

  const [continueKey, setContinueKey] = useState('G')
  const [continueChords, setContinueChords] = useState('G C')
  const [suggestions, setSuggestions] = useState<string[]>([])


  function handleContinueProgression(e: React.FormEvent) {
    e.preventDefault()
    const chords = continueChords
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean)
    const next = suggestNextChords(chords, continueKey)
    setSuggestions(next)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="border-l-4 border-barn pl-4">
        <h1 className="font-display text-3xl font-medium text-cream">Chord Progression Tool</h1>
        <p className="mt-2 text-cream-muted leading-relaxed">
          Browse progressions in every key or enter chords you’re playing and get suggestions for what comes next.
        </p>
      </div>

      {/* Link to chord diagrams */}
      <Link
        href="/chord-diagrams"
        className="mt-8 flex items-center justify-between w-full rounded-lg bg-barn px-6 py-4 text-white hover:bg-barn-hover transition border-2 border-gold/50 shadow-lg"
      >
        <div>
          <span className="font-display text-xl font-medium">See Chord Diagrams →</span>
          <p className="text-sm text-white/80 mt-1">Interactive fingering charts with easy, barre, and power chord options</p>
        </div>
      </Link>

      {/* Continue this progression */}
      <section className="mt-10 rounded-lg bg-void-card border border-saddle/50 p-6">
        <h2 className="font-display font-medium text-cream">Continue this progression</h2>
        <p className="mt-1 text-sm text-cream-muted">
          Enter a key and one or more chords (e.g. C G or G C D Em). We’ll suggest chords that often follow.
        </p>
        <form onSubmit={handleContinueProgression} className="mt-4 space-y-3">
          <div className="flex flex-wrap gap-3">
            <div>
              <label className="block text-sm text-cream-muted">Key</label>
              <select
                value={continueKey}
                onChange={(e) => setContinueKey(e.target.value)}
                className="mt-1 rounded border border-saddle/50 bg-void-elevated px-3 py-2 text-cream"
              >
                {KEY_ORDER.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[160px]">
              <label className="block text-sm text-cream-muted">Chords</label>
              <input
                type="text"
                value={continueChords}
                onChange={(e) => setContinueChords(e.target.value)}
                placeholder="G C D Em"
                className="mt-1 w-full rounded border border-saddle/50 bg-void-elevated px-4 py-2 text-cream placeholder-cream-muted"
              />
            </div>
          </div>
          <button type="submit" className="rounded bg-barn px-4 py-2 text-white font-medium hover:bg-barn-hover">
            Suggest next chords
          </button>
        </form>
        {suggestions.length > 0 && (
          <p className="mt-3 text-cream">
            Try next: <span className="font-mono text-gold">{suggestions.join(' → ')}</span>
          </p>
        )}
      </section>

      {/* Progressions by key */}
      <section ref={progressionsRef} className="mt-12 rounded-lg bg-void-card border border-saddle/50 p-6">
        <h2 className="font-display font-medium text-cream">Progressions by key</h2>
        <p className="mt-1 text-sm text-cream-muted">
          All 12 keys. Short and long progressions (4–8 chords), including full-chord country moves.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {KEY_ORDER.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKey(k)}
              className={`rounded px-3 py-2 text-sm font-medium transition ${
                key === k
                  ? 'bg-barn text-white'
                  : 'bg-denim/10 text-cream hover:bg-denim/20'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowProgression(!showProgression)}
            className="text-sm text-gold hover:underline"
          >
            {showProgression ? 'Hide' : 'Show'} progressions
          </button>
          {showProgression && (
            <ul className="mt-3 space-y-3">
              {progressions.map((prog, i) => (
                <li
                  key={i}
                  className="flex flex-wrap items-center gap-2 rounded-lg bg-void-elevated border-l-4 border-teal px-4 py-3 font-mono text-lg text-cream"
                >
                  {prog.map((chord, j) => (
                    <span key={j}>
                      <span>{chord}</span>
                      {j < prog.length - 1 && <span className="text-cream-muted"> — </span>}
                    </span>
                  ))}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <p className="mt-10 text-sm text-cream-muted">
        <a href="/" className="text-gold hover:underline">Back to home</a>
      </p>
    </div>
  )
}
