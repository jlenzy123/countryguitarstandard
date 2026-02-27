'use client'

import { useState } from 'react'

export default function NavigationHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-[#1c1c1e] border-b-2 border-[#b8860b]">
      <nav className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 font-display text-sm sm:text-lg font-medium text-white hover:text-[#d4a24e] transition-colors duration-200 flex-shrink-0">
          <img 
            src="/favicon.png" 
            alt="CGS Logo" 
            className="h-8 w-8 sm:h-9 sm:w-9 rounded"
          />
          <span className="hidden sm:inline">Country Guitar Standard</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 lg:gap-8 text-sm text-white/70">
          <a href="/guides" className="hover:text-[#d4a24e] transition-colors duration-200">
            Guides
          </a>
          <a href="/songwriting" className="hover:text-[#d4a24e] transition-colors duration-200">
            Songwriting
          </a>
          <a href="/shop" className="hover:text-[#d4a24e] transition-colors duration-200">
            Shop
          </a>
          <a href="/chord-tool" className="hover:text-[#d4a24e] transition-colors duration-200">
            Chord Tool
          </a>
          <a href="/nashville" className="hover:text-[#d4a24e] transition-colors duration-200">
            Nashville
          </a>
          <a href="/blog" className="hover:text-[#d4a24e] transition-colors duration-200">
            Blog
          </a>
          <a href="/contact" className="hover:text-[#d4a24e] transition-colors duration-200">
            Contact
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#1c1c1e]">
          <div className="mx-auto max-w-4xl px-4 py-4 flex flex-col gap-1">
            <a href="/guides" className="text-white/80 hover:text-[#d4a24e] transition-colors py-3 border-b border-white/5" onClick={() => setMenuOpen(false)}>
              Guides
            </a>
            <a href="/songwriting" className="text-white/80 hover:text-[#d4a24e] transition-colors py-3 border-b border-white/5" onClick={() => setMenuOpen(false)}>
              Songwriting
            </a>
            <a href="/shop" className="text-white/80 hover:text-[#d4a24e] transition-colors py-3 border-b border-white/5" onClick={() => setMenuOpen(false)}>
              Shop
            </a>
            <a href="/chord-tool" className="text-white/80 hover:text-[#d4a24e] transition-colors py-3 border-b border-white/5" onClick={() => setMenuOpen(false)}>
              Chord Tool
            </a>
            <a href="/nashville" className="text-white/80 hover:text-[#d4a24e] transition-colors py-3 border-b border-white/5" onClick={() => setMenuOpen(false)}>
              Nashville
            </a>
            <a href="/blog" className="text-white/80 hover:text-[#d4a24e] transition-colors py-3 border-b border-white/5" onClick={() => setMenuOpen(false)}>
              Blog
            </a>
            <a href="/contact" className="text-white/80 hover:text-[#d4a24e] transition-colors py-3" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
