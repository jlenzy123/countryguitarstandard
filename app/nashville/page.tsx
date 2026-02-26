'use client'

import { useState } from 'react'
import { KEY_ORDER, chordsToNumbers, numbersToChords } from '@/lib/nashville'

export default function NashvillePage() {
  const [key, setKey] = useState('G')
  const [chordInput, setChordInput] = useState('G C D Em')
  const [numberInput, setNumberInput] = useState('1 4 5 6m')
  const [chordResult, setChordResult] = useState('')
  const [numberResult, setNumberResult] = useState('')

  function handleChordsToNumbers(e: React.FormEvent) {
    e.preventDefault()
    setNumberResult(chordsToNumbers(chordInput, key))
  }

  function handleNumbersToChords(e: React.FormEvent) {
    e.preventDefault()
    setChordResult(numbersToChords(numberInput, key))
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="border-l-4 border-barn pl-4">
        <h1 className="font-display text-3xl font-medium text-cream">Nashville Number System</h1>
        <p className="mt-2 text-cream-muted">
          Convert between chord names and numbers in any key. Learn how charts work.
        </p>
      </div>

      <section className="mt-10 rounded-lg bg-void-card border border-barn/40 p-6">
        <h2 className="font-display font-medium text-cream">How it works</h2>
        <p className="mt-2 text-sm text-cream-muted">
          In any key, the scale degrees are numbered 1–7. The 1 chord is the tonic (e.g. G in G major),
          4 is the subdominant (C), 5 is the dominant (D). Lowercase “m” means minor (e.g. 6m = Em in G).
          So a chart like <strong className="text-cream">1 4 5 1</strong> means the same progression in every key—
          in G it’s G C D G, in C it’s C F G C. Session players and songwriters use numbers so a song can be
          called in any key without rewriting the chart.
        </p>
      </section>

      <section className="mt-10 rounded-lg bg-void-card border border-saddle/50 p-6">
        <h2 className="font-display font-medium text-cream">Chords → Numbers</h2>
        <p className="mt-1 text-sm text-cream-muted">
          Enter chord names (e.g. G C D Em). Key sets the scale.
        </p>
        <form onSubmit={handleChordsToNumbers} className="mt-4 space-y-3">
          <div>
            <label className="block text-sm text-cream-muted">Key</label>
            <select
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="mt-1 w-full rounded border border-saddle/50 bg-void px-4 py-2.5 text-cream"
            >
              {KEY_ORDER.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-cream-muted">Chords</label>
            <input
              type="text"
              value={chordInput}
              onChange={(e) => setChordInput(e.target.value)}
              placeholder="G C D Em"
              className="mt-1 w-full rounded border border-saddle/50 bg-void px-4 py-2.5 text-cream placeholder-cream-muted"
            />
          </div>
          <button type="submit" className="rounded bg-barn px-4 py-2 text-cream font-medium hover:bg-barn-hover">
            Convert to numbers
          </button>
        </form>
        {numberResult && (
          <p className="mt-3 font-mono text-cream">
            Numbers: <strong className="text-gold">{numberResult}</strong>
          </p>
        )}
      </section>

      <section className="mt-10 rounded-lg bg-void-card border border-saddle/50 p-6">
        <h2 className="font-display font-medium text-cream">Numbers → Chords</h2>
        <p className="mt-1 text-sm text-cream-muted">
          Enter Nashville numbers (e.g. 1 4 5 6m 4 5 1). Key sets the scale.
        </p>
        <form onSubmit={handleNumbersToChords} className="mt-4 space-y-3">
          <div>
            <label className="block text-sm text-cream-muted">Key</label>
            <select
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="mt-1 w-full rounded border border-saddle/50 bg-void px-4 py-2.5 text-cream"
            >
              {KEY_ORDER.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-cream-muted">Numbers</label>
            <input
              type="text"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              placeholder="1 4 5 6m 4 5 1"
              className="mt-1 w-full rounded border border-saddle/50 bg-void px-4 py-2.5 text-cream placeholder-cream-muted"
            />
          </div>
          <button type="submit" className="rounded bg-barn px-4 py-2 text-cream font-medium hover:bg-barn-hover">
            Convert to chords
          </button>
        </form>
        {chordResult && (
          <p className="mt-3 font-mono text-cream">
            Chords: <strong className="text-gold">{chordResult}</strong>
          </p>
        )}
      </section>

      <section className="mt-10 rounded-lg bg-void-card border border-denim/40 p-6">
        <h2 className="font-display font-medium text-cream">Reference: scale degrees in {key}</h2>
        <p className="mt-2 text-sm text-cream-muted">
          1 = I, 2m = ii, 3m = iii, 4 = IV, 5 = V, 6m = vi, 7dim = vii°
        </p>
        <ul className="mt-2 flex flex-wrap gap-3 font-mono text-cream">
          {['1', '2m', '3m', '4', '5', '6m', '7dim'].map((num, i) => {
            const chord = numbersToChords(num, key).trim()
            return (
              <li key={num}>
                <span className="text-cream-muted">{num}</span> → {chord}
              </li>
            )
          })}
        </ul>
      </section>

      <p className="mt-10 text-sm text-cream-muted">
        <a href="/" className="text-gold hover:underline">Back to home</a>
      </p>
    </div>
  )
}
