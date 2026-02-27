'use client'

import { useState } from 'react'

export default function NavigationHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '/guides', label: 'Guides' },
    { href: '/songwriting', label: 'Songwriting' },
    { href: '/chord-tool', label: 'Chord Tool' },
    { href: '/nashville', label: 'Nashville' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '/shop', label: 'Shop' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-void/95 backdrop-blur-md border-b-2 border-accent/20">
      <nav className="mx-auto max-w-5xl px-5 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <img src="/favicon.png" alt="CGS" className="h-8 w-8 rounded" />
          <span className="font-western text-lg sm:text-xl text-cream-light tracking-wide group-hover:text-accent transition-colors">
            Country Guitar Standard
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex gap-6 font-bebas text-[14px] uppercase tracking-[0.15em] text-cream-muted">
          {links.map((l, i) => (
            <div key={l.href} className="flex items-center gap-6">
              <a href={l.href} className="hover:text-accent transition-colors duration-200 whitespace-nowrap">
                {l.label}
              </a>
              {i === links.length - 2 && <div className="w-px h-4 bg-cream/20"></div>}
            </div>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Menu"
        >
          <span className={`w-5 h-[1.5px] bg-cream transition-all ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`w-5 h-[1.5px] bg-cream transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-[1.5px] bg-cream transition-all ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-void border-t-2 border-accent/20">
          <div className="px-5 py-6 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-cream hover:text-accent py-3 text-sm font-bebas uppercase tracking-[0.12em] border-b border-cream/[0.08] last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
