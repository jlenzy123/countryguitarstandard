// Guide metadata — add new guides here, they'll appear everywhere automatically
export type GuideType = 'song-guide' | 'artist-analysis' | 'industry-report' | 'songwriting-deep-dive';

export interface Guide {
  slug: string;
  title: string;
  author: string;
  type: GuideType;
  price: number;
  description: string;
  excerpt: string;
  datePublished: string;
  image?: string; // Canva image URL or local path
  readTime: number; // minutes
  content: string; // Full content (markdown or HTML)
}

// Template guides — replace with real content as you write them
export const GUIDES: Guide[] = [
  {
    slug: 'zach-bryan-formula',
    title: 'The Zach Bryan Formula: Why Rootless Teens Connect with His Music',
    author: 'You',
    type: 'artist-analysis',
    price: 29,
    description: 'Deep-dive analysis of Zach Bryan\'s songwriting techniques, progression patterns, production evolution, and why his songs resonate with millions.',
    excerpt: 'Discover the exact progression patterns, vocal phrasing techniques, and emotional storytelling that makes Zach Bryan one of country\'s biggest artists.',
    datePublished: '2026-02-25',
    readTime: 25,
    content: `
# The Zach Bryan Formula: Why Rootless Teens Connect with His Music

## Career Arc
- First release: 2019
- Breakthrough: "DeAnn" (2019) — viral moment
- Self-titled album (2023) — chart domination
- Streaming growth: 10M → 50M+ monthly listeners

## Musical Evolution: Early Style → Signature Sound

### Era 1: Raw Beginnings (2019-2020)
- Minimal production
- Focus on storytelling
- Key songs: "DeAnn," "Quiet, Heavy Dreams"

### Era 2: Refinement (2021-2022)
- Added atmospheric production
- Incorporated folk/Americana elements
- Key songs: "Something in the Orange," "Cody Jinks"

### Era 3: Mainstream (2023+)
- Polished production
- Broader appeal
- Still maintains authenticity
- Key songs: "Girlsummer," "Zach Bryan"

## The Formula: Why His Songs Stick

### Progression Pattern: The I-V-IV Shift
Zach favors rootless voicings (suspended chords, open tunings).

**Example: "DeAnn"**
- Key: D major (Nashville: I)
- Main progression: D - Dsus4 - D - A
- Why it works: Sus4 creates tension without resolving immediately
- Emotional effect: Uncertainty, searching

### Vocal Phrasing
- Spaces out lyrics (lets silence breathe)
- Understated delivery
- Authenticity over technical skill

### Story Arc
Every song follows: Setup → Complication → Reflection
- "DeAnn": Girl leaves → existential crisis → acceptance
- "Something in the Orange": Memory → present longing → resignation

## Bridge Techniques
Zach often **removes instrumentation** in the bridge:
- Creates intimacy
- Refocuses on lyrics
- When resolution happens, it hits harder

## Applicable Takeaways for Your Songwriting
1. Use sus4 chords to create tension without modulation
2. Leave space in vocal delivery — silence is powerful
3. Build stories with clear beginning/middle/end
4. Contrast: sparse verse → full chorus creates dynamic interest
5. Don't feel pressured to show off — authenticity sells

## Business Insights
- Independent early → major label (via manager negotiation)
- TikTok organic growth (no paid ads initially)
- Tour strategy: Built fanbase before major venues
- Collaboration: Selective (Oliver Anthony, Sturgill Simpson)

## Conclusion
Zach Bryan's success isn't about technical virtuosity — it's about **emotional clarity** + **production restraint** + **authentic storytelling**. These are replicable in your own music.
    `.trim(),
  },
  {
    slug: 'deann-song-guide',
    title: 'DeAnn Song Guide: Nashville Numbers, Voicings & Emotional Arc',
    author: 'You',
    type: 'song-guide',
    price: 12,
    description: 'Complete breakdown of Zach Bryan\'s "DeAnn" — chord voicings, Nashville numbers, stylistic choices, and why this song went viral.',
    excerpt: 'Learn the exact voicings, progression patterns, and production techniques that make "DeAnn" one of the most emotionally impactful modern country songs.',
    datePublished: '2026-02-25',
    readTime: 12,
    content: `
# DeAnn: Complete Song Guide

## Quick Reference
- Key: D major (Nashville: I in D)
- Tempo: 90 BPM
- Time Signature: 4/4
- Tuning: Standard (some open voicings used)

## Main Progression (Nashville Numbers)
I - IV - I - V (in D: D - G - D - A)

### Voicing Deep Dive
Instead of full barre chords, Zach uses **open/suspended voicings**:

**D (Intro/Verse)**
- Strings: Standard D major (x x 0 2 3 2)
- Rootless variation: Play without the 6th string for airiness

**Dsus4 (Creating Tension)**
- Fret the 4th fret on the 3rd string instead of the major 3rd
- Effect: Creates unresolved tension — "waiting" feeling
- Why here: Song is about longing, not clarity

**G (IV Chord)**
- Full barre optional
- Can use open G with high e string open for brightness

**A (V Chord)**
- Full barre creates drive and motion
- Leads back to D resolution

## Structure Breakdown

### Intro (0:00-0:15)
- Fingerpicked D / Dsus4 / D / A progression
- Sparse, intimate
- Establishes the melancholic mood

### Verse 1 (0:15-0:45)
- Lyrics tell the story (girl leaving)
- Progression stays: D - G - D - A (repeats)
- Vocal delivery: Understated, conversational
- Strumming: Fingerstyle, sparse hits

**Lesson**: Repetitive progression works when vocals carry the song

### Chorus (0:45-1:15)
- **Key moment**: Same progression, but fuller production
- Drums kick in (subtle)
- Vocal doubles on hook
- Effect: Same harmony, different energy = emotional lift

### Verse 2 (1:15-1:45)
- Progression repeats
- Lyrics escalate emotional stakes
- Production stays sparse (contrast = power)

### Bridge (1:45-2:00)
- Everything drops except vocals + minimal guitar
- Often uses D / G voicings only (no A chord)
- Creates raw intimacy
- Vocal gets most emotional here

### Final Chorus (2:00-2:30)
- Full production returns
- Same progression, but you feel the payoff
- Fade on D / Dsus4 guitar loop

## Stylistic Choices

### Why Suspended Chords?
- Dsus4 sounds unresolved, restless
- Fits lyrics about emotional uncertainty
- Prevents the song from sounding "resolved" until the very end

### Vocal Phrasing
- Zach leaves 2-3 beat gaps between phrases
- Let the silence breathe
- Makes listeners lean in

### Production Minimalism
- Intro: Just guitar
- Verse: Guitar + vocals (nothing else)
- Chorus: Add drums, light pad
- Bridge: Strip everything
- Outro: Return to intro simplicity

**Why it works**: Contrast. When something is added, it feels significant.

## Writing Lessons: Why "DeAnn" Works

1. **One Progression, Multiple Emotions**
   - Same chords throughout, but context shifts meaning
   
2. **Storytelling Over Complexity**
   - 4-chord song with world-class production
   - Proves: Simple harmonies ≠ simple song
   
3. **Space Creates Emotion**
   - Silence is a production tool
   - Vocal gaps = listener anticipation
   
4. **Contrast Drives Engagement**
   - Sparse → full → sparse again
   - Keeps listener engaged without complexity

## How to Apply This to Your Songs

1. Don't feel pressured to use complex progressions
2. Use sus chords to create tension without modulation
3. Build your chorus on the same progression — let production shift the energy
4. Leave space in vocals (don't fill every beat)
5. Use dynamics (sparse/full) to tell the emotional story

## Practice Exercise
Pick a 4-chord progression in your key (I-IV-I-V works great).
Record 3 versions:
- Version 1: Just acoustic fingerstyle
- Version 2: Add drums and light pad
- Version 3: Add reverb + slight vocal doubling on chorus

Notice how same chords feel different with production changes.
    `.trim(),
  },
];

// Utility functions
export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find(guide => guide.slug === slug);
}

export function getGuidesByType(type: GuideType): Guide[] {
  return GUIDES.filter(guide => guide.type === type);
}

export function getAllGuides(): Guide[] {
  return GUIDES.sort((a, b) => 
    new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );
}

export function getGuideTypeLabel(type: GuideType): string {
  const labels: Record<GuideType, string> = {
    'song-guide': 'Song Guide',
    'artist-analysis': 'Artist Analysis',
    'industry-report': 'Industry Report',
    'songwriting-deep-dive': 'Songwriting Deep-Dive',
  };
  return labels[type];
}
