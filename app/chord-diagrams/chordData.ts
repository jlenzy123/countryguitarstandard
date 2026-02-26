// Chord fingering data: frets array = [E, A, D, G, B, e] strings
// -1 = muted, 0 = open, 1+ = fret number
// fingers array = finger numbers (0 = open/muted, 1-4 = index to pinky)

export interface ChordVoicing {
  name: string
  style: 'open' | 'easy' | 'barre' | 'power'
  frets: number[]
  fingers: number[]
  barreString?: number // which fret has a barre
  baseFret?: number // for displaying higher positions
}

export interface ChordData {
  name: string
  voicings: ChordVoicing[]
}

export const CHORD_DATABASE: Record<string, ChordData> = {
  // Major chords
  C: {
    name: 'C',
    voicings: [
      { name: 'C', style: 'open', frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
      { name: 'C (easy)', style: 'easy', frets: [-1, 3, 2, 0, 1, -1], fingers: [0, 3, 2, 0, 1, 0] },
      { name: 'C (barre)', style: 'barre', frets: [-1, 3, 5, 5, 5, 3], fingers: [0, 1, 2, 3, 4, 1], barreString: 3, baseFret: 3 },
    ],
  },
  D: {
    name: 'D',
    voicings: [
      { name: 'D', style: 'open', frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },
      { name: 'D (2 finger)', style: 'easy', frets: [-1, -1, 0, 2, 3, -1], fingers: [0, 0, 0, 1, 2, 0] },
      { name: 'D (barre)', style: 'barre', frets: [-1, 5, 7, 7, 7, 5], fingers: [0, 1, 2, 3, 4, 1], barreString: 5, baseFret: 5 },
      { name: 'D (power)', style: 'power', frets: [-1, -1, 0, 2, 3, -1], fingers: [0, 0, 0, 1, 2, 0] },
    ],
  },
  Dsus2: {
    name: 'Dsus2',
    voicings: [
      { name: 'Dsus2', style: 'open', frets: [-1, -1, 0, 2, 3, 0], fingers: [0, 0, 0, 1, 2, 0] },
    ],
  },
  Dsus4: {
    name: 'Dsus4',
    voicings: [
      { name: 'Dsus4', style: 'open', frets: [-1, -1, 0, 2, 3, 3], fingers: [0, 0, 0, 1, 2, 3] },
    ],
  },
  E: {
    name: 'E',
    voicings: [
      { name: 'E', style: 'open', frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
      { name: 'E (easy)', style: 'easy', frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
      { name: 'E (power)', style: 'power', frets: [0, 2, 2, -1, -1, -1], fingers: [0, 1, 2, 0, 0, 0] },
    ],
  },
  F: {
    name: 'F',
    voicings: [
      { name: 'F (barre)', style: 'barre', frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], barreString: 1 },
      { name: 'F (easy)', style: 'easy', frets: [-1, -1, 3, 2, 1, 1], fingers: [0, 0, 3, 2, 1, 1] },
      { name: 'F (power)', style: 'power', frets: [1, 3, 3, -1, -1, -1], fingers: [1, 3, 4, 0, 0, 0] },
    ],
  },
  G: {
    name: 'G',
    voicings: [
      { name: 'G', style: 'open', frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3] },
      { name: 'G (easy)', style: 'easy', frets: [3, 2, 0, 0, 3, 3], fingers: [2, 1, 0, 0, 3, 4] },
      { name: 'G (barre)', style: 'barre', frets: [3, 5, 5, 4, 3, 3], fingers: [1, 3, 4, 2, 1, 1], barreString: 3, baseFret: 3 },
    ],
  },
  A: {
    name: 'A',
    voicings: [
      { name: 'A', style: 'open', frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] },
      { name: 'A (easy)', style: 'easy', frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 1, 1, 0] },
      { name: 'A (barre)', style: 'barre', frets: [5, 7, 7, 6, 5, 5], fingers: [1, 3, 4, 2, 1, 1], barreString: 5, baseFret: 5 },
    ],
  },
  B: {
    name: 'B',
    voicings: [
      { name: 'B (barre)', style: 'barre', frets: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 2, 3, 4, 1], barreString: 2 },
      { name: 'B (easy)', style: 'easy', frets: [-1, 2, 4, 4, 4, -1], fingers: [0, 1, 2, 3, 4, 0] },
      { name: 'B (power)', style: 'power', frets: [-1, 2, 4, 4, -1, -1], fingers: [0, 1, 3, 4, 0, 0] },
    ],
  },
  'F#': {
    name: 'F#',
    voicings: [
      { name: 'F# (barre)', style: 'barre', frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1], barreString: 2 },
      { name: 'F# (easy)', style: 'easy', frets: [-1, -1, 4, 3, 2, 2], fingers: [0, 0, 3, 2, 1, 1] },
      { name: 'F# (power)', style: 'power', frets: [2, 4, 4, -1, -1, -1], fingers: [1, 3, 4, 0, 0, 0] },
    ],
  },
  'C#': {
    name: 'C#',
    voicings: [
      { name: 'C# (barre)', style: 'barre', frets: [-1, 4, 6, 6, 6, 4], fingers: [0, 1, 2, 3, 4, 1], barreString: 4, baseFret: 4 },
      { name: 'C# (easy)', style: 'easy', frets: [-1, 4, 6, 6, 6, -1], fingers: [0, 1, 2, 3, 4, 0], baseFret: 4 },
    ],
  },
  'G#': {
    name: 'G#',
    voicings: [
      { name: 'G# (barre)', style: 'barre', frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1], barreString: 4, baseFret: 4 },
    ],
  },
  'A#': {
    name: 'A#',
    voicings: [
      { name: 'A# (barre)', style: 'barre', frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 2, 3, 4, 1], barreString: 1 },
    ],
  },
  'D#': {
    name: 'D#',
    voicings: [
      { name: 'D# (barre)', style: 'barre', frets: [-1, 6, 8, 8, 8, 6], fingers: [0, 1, 2, 3, 4, 1], barreString: 6, baseFret: 6 },
    ],
  },

  // Minor chords
  Am: {
    name: 'Am',
    voicings: [
      { name: 'Am', style: 'open', frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
      { name: 'Am (easy)', style: 'easy', frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
      { name: 'Am (barre)', style: 'barre', frets: [5, 7, 7, 5, 5, 5], fingers: [1, 3, 4, 1, 1, 1], barreString: 5, baseFret: 5 },
    ],
  },
  Bm: {
    name: 'Bm',
    voicings: [
      { name: 'Bm (barre)', style: 'barre', frets: [-1, 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1], barreString: 2 },
      { name: 'Bm (easy)', style: 'easy', frets: [-1, 2, 4, 4, 3, -1], fingers: [0, 1, 3, 4, 2, 0] },
      { name: 'Bm (power)', style: 'power', frets: [-1, 2, 4, 4, -1, -1], fingers: [0, 1, 3, 4, 0, 0] },
    ],
  },
  Cm: {
    name: 'Cm',
    voicings: [
      { name: 'Cm (barre)', style: 'barre', frets: [-1, 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1], barreString: 3 },
      { name: 'Cm (easy)', style: 'easy', frets: [-1, 3, 5, 5, 4, -1], fingers: [0, 1, 3, 4, 2, 0] },
    ],
  },
  Dm: {
    name: 'Dm',
    voicings: [
      { name: 'Dm', style: 'open', frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] },
      { name: 'Dm (easy)', style: 'easy', frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] },
      { name: 'Dm (barre)', style: 'barre', frets: [-1, 5, 7, 7, 6, 5], fingers: [0, 1, 3, 4, 2, 1], barreString: 5, baseFret: 5 },
    ],
  },
  Em: {
    name: 'Em',
    voicings: [
      { name: 'Em', style: 'open', frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
      { name: 'Em (easy)', style: 'easy', frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
      { name: 'Em (power)', style: 'power', frets: [0, 2, 2, -1, -1, -1], fingers: [0, 1, 2, 0, 0, 0] },
    ],
  },
  Fm: {
    name: 'Fm',
    voicings: [
      { name: 'Fm (barre)', style: 'barre', frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1], barreString: 1 },
      { name: 'Fm (easy)', style: 'easy', frets: [-1, -1, 3, 1, 1, 1], fingers: [0, 0, 3, 1, 1, 1] },
    ],
  },
  'F#m': {
    name: 'F#m',
    voicings: [
      { name: 'F#m (barre)', style: 'barre', frets: [2, 4, 4, 2, 2, 2], fingers: [1, 3, 4, 1, 1, 1], barreString: 2 },
      { name: 'F#m (easy)', style: 'easy', frets: [-1, -1, 4, 2, 2, 2], fingers: [0, 0, 4, 1, 1, 1] },
    ],
  },
  Gm: {
    name: 'Gm',
    voicings: [
      { name: 'Gm (barre)', style: 'barre', frets: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], barreString: 3 },
      { name: 'Gm (easy)', style: 'easy', frets: [-1, -1, 5, 3, 3, 3], fingers: [0, 0, 4, 1, 1, 1] },
    ],
  },
  'G#m': {
    name: 'G#m',
    voicings: [
      { name: 'G#m (barre)', style: 'barre', frets: [4, 6, 6, 4, 4, 4], fingers: [1, 3, 4, 1, 1, 1], barreString: 4, baseFret: 4 },
    ],
  },
  'C#m': {
    name: 'C#m',
    voicings: [
      { name: 'C#m (barre)', style: 'barre', frets: [-1, 4, 6, 6, 5, 4], fingers: [0, 1, 3, 4, 2, 1], barreString: 4, baseFret: 4 },
      { name: 'C#m (easy)', style: 'easy', frets: [-1, 4, 6, 6, 5, -1], fingers: [0, 1, 3, 4, 2, 0] },
    ],
  },
  'Bbm': {
    name: 'Bbm',
    voicings: [
      { name: 'Bbm (barre)', style: 'barre', frets: [-1, 1, 3, 3, 2, 1], fingers: [0, 1, 3, 4, 2, 1], barreString: 1 },
    ],
  },
  'Ebm': {
    name: 'Ebm',
    voicings: [
      { name: 'Ebm (barre)', style: 'barre', frets: [-1, 6, 8, 8, 7, 6], fingers: [0, 1, 3, 4, 2, 1], barreString: 6, baseFret: 6 },
    ],
  },

  // 7th chords (common in country)
  A7: {
    name: 'A7',
    voicings: [
      { name: 'A7', style: 'open', frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 1, 0, 2, 0] },
      { name: 'A7 (easy)', style: 'easy', frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 1, 0, 2, 0] },
    ],
  },
  B7: {
    name: 'B7',
    voicings: [
      { name: 'B7', style: 'open', frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4] },
      { name: 'B7 (barre)', style: 'barre', frets: [-1, 2, 4, 2, 4, 2], fingers: [0, 1, 3, 1, 4, 1], barreString: 2 },
    ],
  },
  C7: {
    name: 'C7',
    voicings: [
      { name: 'C7', style: 'open', frets: [-1, 3, 2, 3, 1, 0], fingers: [0, 3, 2, 4, 1, 0] },
    ],
  },
  D7: {
    name: 'D7',
    voicings: [
      { name: 'D7', style: 'open', frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 2, 1, 3] },
    ],
  },
  E7: {
    name: 'E7',
    voicings: [
      { name: 'E7', style: 'open', frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0] },
    ],
  },
  G7: {
    name: 'G7',
    voicings: [
      { name: 'G7', style: 'open', frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1] },
      { name: 'G7 (easy)', style: 'easy', frets: [1, 0, 0, 0, 0, 1], fingers: [1, 0, 0, 0, 0, 2] },
    ],
  },
  'F#7': {
    name: 'F#7',
    voicings: [
      { name: 'F#7 (barre)', style: 'barre', frets: [2, 4, 2, 3, 2, 2], fingers: [1, 3, 1, 2, 1, 1], barreString: 2 },
      { name: 'F#7 (easy)', style: 'easy', frets: [-1, -1, 4, 3, 2, 0], fingers: [0, 0, 4, 3, 2, 0] },
    ],
  },

  // Sus chords (common in country)
  Asus2: {
    name: 'Asus2',
    voicings: [
      { name: 'Asus2', style: 'open', frets: [-1, 0, 2, 2, 0, 0], fingers: [0, 0, 1, 2, 0, 0] },
    ],
  },
  Asus4: {
    name: 'Asus4',
    voicings: [
      { name: 'Asus4', style: 'open', frets: [-1, 0, 2, 2, 3, 0], fingers: [0, 0, 1, 2, 3, 0] },
    ],
  },
  Esus4: {
    name: 'Esus4',
    voicings: [
      { name: 'Esus4', style: 'open', frets: [0, 2, 2, 2, 0, 0], fingers: [0, 2, 3, 4, 0, 0] },
    ],
  },
  Gsus4: {
    name: 'Gsus4',
    voicings: [
      { name: 'Gsus4', style: 'open', frets: [3, 3, 0, 0, 1, 3], fingers: [2, 3, 0, 0, 1, 4] },
    ],
  },
  Csus4: {
    name: 'Csus4',
    voicings: [
      { name: 'Csus4', style: 'open', frets: [-1, 3, 3, 0, 1, 1], fingers: [0, 3, 4, 0, 1, 1] },
    ],
  },

  // Additional chords for flat keys
  Bb: {
    name: 'Bb',
    voicings: [
      { name: 'Bb (barre)', style: 'barre', frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 2, 3, 4, 1], barreString: 1 },
      { name: 'Bb (easy)', style: 'easy', frets: [-1, 1, 3, 3, 3, -1], fingers: [0, 1, 2, 3, 4, 0] },
    ],
  },
  Eb: {
    name: 'Eb',
    voicings: [
      { name: 'Eb (barre)', style: 'barre', frets: [-1, 6, 8, 8, 8, 6], fingers: [0, 1, 2, 3, 4, 1], barreString: 6, baseFret: 6 },
    ],
  },
  Ab: {
    name: 'Ab',
    voicings: [
      { name: 'Ab (barre)', style: 'barre', frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1], barreString: 4, baseFret: 4 },
    ],
  },
  Db: {
    name: 'Db',
    voicings: [
      { name: 'Db (barre)', style: 'barre', frets: [-1, 4, 6, 6, 6, 4], fingers: [0, 1, 2, 3, 4, 1], barreString: 4, baseFret: 4 },
    ],
  },
  Gb: {
    name: 'Gb',
    voicings: [
      { name: 'Gb (barre)', style: 'barre', frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1], barreString: 2 },
    ],
  },
  Cb: {
    name: 'Cb',
    voicings: [
      { name: 'Cb (barre)', style: 'barre', frets: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 2, 3, 4, 1], barreString: 2 },
    ],
  },
  Abm: {
    name: 'Abm',
    voicings: [
      { name: 'Abm (barre)', style: 'barre', frets: [4, 6, 6, 4, 4, 4], fingers: [1, 3, 4, 1, 1, 1], barreString: 4, baseFret: 4 },
    ],
  },
}

// Get chord data with fallback
export function getChordData(chordName: string): ChordData | null {
  return CHORD_DATABASE[chordName] || null
}

// Get all available chord styles for display
export const STYLE_OPTIONS = [
  { value: 'open', label: 'Open', description: 'Standard open position' },
  { value: 'easy', label: 'Easy', description: 'Simplified fingering' },
  { value: 'barre', label: 'Barre', description: 'Moveable barre shape' },
  { value: 'power', label: 'Power', description: 'Rock/country power chord' },
] as const
