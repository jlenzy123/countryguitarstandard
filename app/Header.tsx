'use client'

import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-void border-b border-barn/60" style={{
      boxShadow: '0 0 30px rgba(198, 40, 40, 0.2), inset 0 1px 0 rgba(198, 40, 40, 0.1)'
    }}>
      <nav className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
        <a href="/" className="font-display text-sm sm:text-lg font-semibold text-cream hover:text-barn transition-colors duration-300 flex-shrink-0">
          <span className="hidden sm:inline">Country Guitar Standard</span>
          <span className="sm:hidden">CGS</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 lg:gap-8 text-sm text-cream-muted">
          <a href="/guides" className="hover:text-cream transition-colors duration-300 relative group">
            Guides
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-barn group-hover:w-full transition-all duration-300" />
          </a>
          <a href="/songwriting" className="hover:text-cream transition-colors duration-300 relative group">
            Songwriting
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-barn group-hover:w-full transition-all duration-300" />
          </a>
          <a href="/shop" className="hover:text-cream transition-colors duration-300 relative group">
            Shop
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-barn group-hover:w-full transition-all duration-300" />
          </a>
          <a href="/chord-tool" className="hover:text-cream transition-colors duration-300 relative group">
            Chord Tool
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-barn group-hover:w-full transition-all duration-300" />
          </a>
          <a href="/nashville" className="hover:text-cream transition-colors duration-300 relative group">
            Nashville Number
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-barn group-hover:w-full transition-all duration-300" />
          </a>
          <a href="/blog" className="hover:text-cream transition-colors duration-300 relative group">
            Blog
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-barn group-hover:w-full transition-all duration-300" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-barn/60 bg-void-card/50">
          <div className="mx-auto max-w-4xl px-4 py-4 flex flex-col gap-3">
            <a href="/guides" className="text-cream hover:text-gold transition-colors py-2" onClick={() => setMenuOpen(false)}>
              Guides
            </a>
            <a href="/songwriting" className="text-cream hover:text-gold transition-colors py-2" onClick={() => setMenuOpen(false)}>
              Songwriting
            </a>
            <a href="/shop" className="text-cream hover:text-gold transition-colors py-2" onClick={() => setMenuOpen(false)}>
              Shop
            </a>
            <a href="/chord-tool" className="text-cream hover:text-gold transition-colors py-2" onClick={() => setMenuOpen(false)}>
              Chord Tool
            </a>
            <a href="/nashville" className="text-cream hover:text-gold transition-colors py-2" onClick={() => setMenuOpen(false)}>
              Nashville Number
            </a>
            <a href="/blog" className="text-cream hover:text-gold transition-colors py-2" onClick={() => setMenuOpen(false)}>
              Blog
            </a>
          </div>
        </div>
      )}

      <div className="palette-stripe" />
    </header>
  )
}
