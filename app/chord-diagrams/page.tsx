'use client'

import { useState, useMemo } from 'react'
import { PROGRESSIONS, KEY_ORDER } from '../chord-tool/progressions'
import { CHORD_DATABASE, getChordData, STYLE_OPTIONS, ChordVoicing } from './chordData'
import ChordDiagram from './ChordDiagram'
import Link from 'next/link'

type StyleFilter = 'open' | 'easy' | 'barre' | 'power' | 'all'

export default function ChordDiagramsPage() {
  const [selectedKey, setSelectedKey] = useState('G')
  const [selectedProgressionIndex, setSelectedProgressionIndex] = useState(0)
  const [styleFilter, setStyleFilter] = useState<StyleFilter>('all')
  const [showFingers, setShowFingers] = useState(true)
  const [diagramSize, setDiagramSize] = useState<'sm' | 'md' | 'lg'>('md')

  const progressions = PROGRESSIONS[selectedKey] ?? PROGRESSIONS.G
  const selectedProgression = progressions[selectedProgressionIndex] || progressions[0]

  // Get unique chords in the progression
  const uniqueChords = useMemo(() => {
    const seen = new Set<string>()
    return selectedProgression.filter((chord) => {
      if (seen.has(chord)) return false
      seen.add(chord)
      return true
    })
  }, [selectedProgression])

  // Get voicings for each chord based on style filter
  const getVoicingsForChord = (chordName: string): ChordVoicing[] => {
    const chordData = getChordData(chordName)
    if (!chordData) return []

    if (styleFilter === 'all') {
      return chordData.voicings
    }

    const filtered = chordData.voicings.filter((v) => v.style === styleFilter)
    // If no voicings match the filter, return the first available
    return filtered.length > 0 ? filtered : [chordData.voicings[0]]
  }

  // Check if chord exists in database
  const missingChords = uniqueChords.filter((chord) => !getChordData(chord))

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Header */}
      <div className="border-l-4 border-barn pl-4">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream">
          Interactive Chord Diagrams
        </h1>
        <p className="mt-2 text-cream-muted text-sm sm:text-base">
          Select a progression, see the chord shapes, and switch between easy, open, barre, or power chord voicings.
        </p>
      </div>

      {/* Back link */}
      <Link
        href="/chord-tool"
        className="mt-4 inline-flex items-center gap-1 text-gold hover:text-gold/80 transition text-sm"
      >
        ← Back to Chord Tool
      </Link>

      {/* Controls */}
      <section className="mt-8 rounded-lg bg-void-card border border-saddle/50 p-4 sm:p-6">
        <h2 className="font-display font-semibold text-cream mb-4">Select Progression</h2>

        {/* Key selector */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className="block text-sm text-cream-muted mb-1">Key</label>
            <select
              value={selectedKey}
              onChange={(e) => {
                setSelectedKey(e.target.value)
                setSelectedProgressionIndex(0)
              }}
              className="rounded border border-saddle/50 bg-void px-3 py-2 text-cream"
            >
              {KEY_ORDER.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-cream-muted mb-1">Progression</label>
            <select
              value={selectedProgressionIndex}
              onChange={(e) => setSelectedProgressionIndex(Number(e.target.value))}
              className="w-full rounded border border-saddle/50 bg-void px-3 py-2 text-cream"
            >
              {progressions.map((prog, i) => (
                <option key={i} value={i}>
                  {prog.join(' → ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Style filter */}
        <div className="mb-4">
          <label className="block text-sm text-cream-muted mb-2">Chord Style</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStyleFilter('all')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition ${
                styleFilter === 'all'
                  ? 'bg-barn text-cream'
                  : 'bg-denim/40 text-cream hover:bg-denim/60'
              }`}
            >
              All Voicings
            </button>
            {STYLE_OPTIONS.map((style) => (
              <button
                key={style.value}
                onClick={() => setStyleFilter(style.value)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition ${
                  styleFilter === style.value
                    ? 'bg-barn text-cream'
                    : 'bg-denim/40 text-cream hover:bg-denim/60'
                }`}
                title={style.description}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        {/* Display options */}
        <div className="flex flex-wrap gap-4 items-center">
          <label className="flex items-center gap-2 text-sm text-cream cursor-pointer">
            <input
              type="checkbox"
              checked={showFingers}
              onChange={(e) => setShowFingers(e.target.checked)}
              className="rounded border-saddle/50"
            />
            Show finger numbers
          </label>

          <div className="flex items-center gap-2">
            <span className="text-sm text-cream-muted">Size:</span>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setDiagramSize(s)}
                className={`px-2 py-1 rounded text-xs font-medium uppercase transition ${
                  diagramSize === s
                    ? 'bg-gold text-void'
                    : 'bg-denim/40 text-cream hover:bg-denim/60'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Current progression display */}
      <section className="mt-8">
        <h2 className="font-display font-semibold text-cream mb-2">
          Playing: <span className="text-gold">{selectedProgression.join(' → ')}</span>
        </h2>
        <p className="text-sm text-cream-muted mb-6">
          {uniqueChords.length} unique chord{uniqueChords.length !== 1 ? 's' : ''} in this progression
        </p>

        {/* Missing chords warning */}
        {missingChords.length > 0 && (
          <div className="mb-6 rounded bg-barn/20 border border-barn/50 p-3 text-sm text-cream">
            <strong>Note:</strong> Diagrams not yet available for:{' '}
            <span className="font-mono text-gold">{missingChords.join(', ')}</span>
          </div>
        )}

        {/* Chord diagrams grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {uniqueChords.map((chordName) => {
            const voicings = getVoicingsForChord(chordName)

            if (voicings.length === 0) {
              return (
                <div
                  key={chordName}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-void-card border border-saddle/30 min-h-[150px]"
                >
                  <span className="font-display font-bold text-cream text-lg">{chordName}</span>
                  <span className="text-xs text-cream-muted mt-2">Coming soon</span>
                </div>
              )
            }

            return (
              <div key={chordName} className="flex flex-col gap-3">
                {voicings.map((voicing, i) => (
                  <ChordDiagram
                    key={`${chordName}-${i}`}
                    voicing={voicing}
                    size={diagramSize}
                    showFingers={showFingers}
                  />
                ))}
              </div>
            )
          })}
        </div>
      </section>

      {/* Legend */}
      <section className="mt-12 rounded-lg bg-void-card border border-saddle/50 p-4 sm:p-6">
        <h3 className="font-display font-semibold text-cream mb-3">How to Read</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-cream-muted">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-barn flex items-center justify-center text-white text-xs font-bold">
              2
            </div>
            <span>Finger number (1=index, 4=pinky)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 text-center text-lg">×</span>
            <span>Muted string (don't play)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border-2 border-cream/60 flex items-center justify-center">
              <span className="text-[8px]">○</span>
            </div>
            <span>Open string (play without fretting)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-3 rounded-full bg-barn/80"></div>
            <span>Barre (lay finger across strings)</span>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="mt-8 rounded-lg bg-denim/20 border border-denim/40 p-4 sm:p-6">
        <h3 className="font-display font-semibold text-cream mb-3">Tips</h3>
        <ul className="space-y-2 text-sm text-cream-muted">
          <li>• <strong className="text-cream">Easy voicings</strong> — Fewer fingers, great for beginners or quick changes</li>
          <li>• <strong className="text-cream">Open voicings</strong> — Full sound using open strings (keys of C, G, D, A, E)</li>
          <li>• <strong className="text-cream">Barre voicings</strong> — Moveable shapes, work in any key</li>
          <li>• <strong className="text-cream">Power chords</strong> — Root + fifth only, punchy rock/country sound</li>
        </ul>
      </section>
    </div>
  )
}
