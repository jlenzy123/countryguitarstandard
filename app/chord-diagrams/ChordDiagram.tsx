'use client'

import { ChordVoicing } from './chordData'

interface ChordDiagramProps {
  voicing: ChordVoicing
  size?: 'sm' | 'md' | 'lg'
  showFingers?: boolean
}

const SIZES = {
  sm: { width: 80, height: 100, fontSize: 8, dotSize: 6 },
  md: { width: 120, height: 150, fontSize: 10, dotSize: 8 },
  lg: { width: 160, height: 200, fontSize: 12, dotSize: 10 },
}

export default function ChordDiagram({ 
  voicing, 
  size = 'md',
  showFingers = true 
}: ChordDiagramProps) {
  const { width, height, fontSize, dotSize } = SIZES[size]
  
  const paddingTop = 25
  const paddingLeft = 15
  const paddingRight = 15
  const fretboardWidth = width - paddingLeft - paddingRight
  const fretboardHeight = height - paddingTop - 20
  
  const numFrets = 5
  const numStrings = 6
  
  const stringSpacing = fretboardWidth / (numStrings - 1)
  const fretSpacing = fretboardHeight / numFrets
  
  const baseFret = voicing.baseFret || 1
  const showBaseFret = baseFret > 1

  // String names for reference
  const stringNames = ['E', 'A', 'D', 'G', 'B', 'e']

  return (
    <div className="flex flex-col items-center">
      <span className="mb-1 font-display font-medium text-cream text-sm">{voicing.name}</span>
      <svg 
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`}
        className="bg-void-card rounded border border-saddle/30"
      >
        {/* Nut (thick line at top) - only show for open position */}
        {!showBaseFret && (
          <rect
            x={paddingLeft - 2}
            y={paddingTop - 3}
            width={fretboardWidth + 4}
            height={4}
            fill="#d4a574"
          />
        )}

        {/* Base fret indicator */}
        {showBaseFret && (
          <text
            x={paddingLeft - 10}
            y={paddingTop + fretSpacing / 2 + 4}
            fontSize={fontSize}
            fill="#f5f0e6"
            textAnchor="middle"
          >
            {baseFret}
          </text>
        )}

        {/* Fret lines */}
        {Array.from({ length: numFrets + 1 }).map((_, i) => (
          <line
            key={`fret-${i}`}
            x1={paddingLeft}
            y1={paddingTop + i * fretSpacing}
            x2={width - paddingRight}
            y2={paddingTop + i * fretSpacing}
            stroke={i === 0 ? '#8b7355' : '#5c4a3a'}
            strokeWidth={i === 0 ? 2 : 1}
          />
        ))}

        {/* String lines */}
        {Array.from({ length: numStrings }).map((_, i) => (
          <line
            key={`string-${i}`}
            x1={paddingLeft + i * stringSpacing}
            y1={paddingTop}
            x2={paddingLeft + i * stringSpacing}
            y2={paddingTop + fretboardHeight}
            stroke="#a89070"
            strokeWidth={1 + (5 - i) * 0.15}
          />
        ))}

        {/* Barre indicator */}
        {voicing.barreString && (
          <rect
            x={paddingLeft - dotSize / 2}
            y={paddingTop + (voicing.barreString - baseFret + 0.5) * fretSpacing - dotSize / 2}
            width={fretboardWidth + dotSize}
            height={dotSize}
            rx={dotSize / 2}
            fill="#dc2626"
            opacity={0.8}
          />
        )}

        {/* Finger dots and muted/open indicators */}
        {voicing.frets.map((fret, stringIndex) => {
          const x = paddingLeft + stringIndex * stringSpacing

          if (fret === -1) {
            // Muted string - X above
            return (
              <text
                key={`mute-${stringIndex}`}
                x={x}
                y={paddingTop - 8}
                fontSize={fontSize}
                fill="#9ca3af"
                textAnchor="middle"
              >
                ×
              </text>
            )
          }

          if (fret === 0) {
            // Open string - O above
            return (
              <circle
                key={`open-${stringIndex}`}
                cx={x}
                cy={paddingTop - 10}
                r={dotSize / 2 - 1}
                fill="none"
                stroke="#f5f0e6"
                strokeWidth={1.5}
              />
            )
          }

          // Fretted note - dot on fret
          const adjustedFret = fret - baseFret + 1
          const y = paddingTop + (adjustedFret - 0.5) * fretSpacing
          const finger = voicing.fingers[stringIndex]

          return (
            <g key={`dot-${stringIndex}`}>
              <circle
                cx={x}
                cy={y}
                r={dotSize}
                fill="#dc2626"
              />
              {showFingers && finger > 0 && (
                <text
                  x={x}
                  y={y + fontSize / 3}
                  fontSize={fontSize}
                  fill="#ffffff"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {finger}
                </text>
              )}
            </g>
          )
        })}

        {/* String labels at bottom */}
        {stringNames.map((name, i) => (
          <text
            key={`label-${i}`}
            x={paddingLeft + i * stringSpacing}
            y={height - 5}
            fontSize={fontSize - 2}
            fill="#9ca3af"
            textAnchor="middle"
          >
            {name}
          </text>
        ))}
      </svg>
      <span className="mt-1 text-xs text-cream-muted capitalize">{voicing.style}</span>
    </div>
  )
}
