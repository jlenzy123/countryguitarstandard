import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Country Guitar Standard',
  description: 'Country guitar and songwriting insights: song guides, industry reports, templates, and progression tools. Professional, readable typography.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="min-h-screen font-sans antialiased bg-void text-cream">
        <header className="bg-void border-b border-barn/60" style={{
          boxShadow: '0 0 30px rgba(198, 40, 40, 0.2), inset 0 1px 0 rgba(198, 40, 40, 0.1)'
        }}>
          <nav className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="font-display text-sm sm:text-lg font-semibold text-cream hover:text-barn transition-colors duration-300 flex-shrink-0">
              <span className="hidden sm:inline">Country Guitar Standard</span>
              <span className="sm:hidden">CGS</span>
            </a>
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
            <div className="md:hidden flex gap-4 text-sm text-cream-muted">
              <a href="/guides" className="hover:text-cream transition-colors">Guides</a>
              <a href="/chord-tool" className="hover:text-cream transition-colors">Tools</a>
              <a href="/blog" className="hover:text-cream transition-colors">Blog</a>
            </div>
          </nav>
          <div className="palette-stripe" />
        </header>
        <main>{children}</main>
        <div className="palette-stripe mt-16" />
        <footer className="bg-void border-t border-barn/60 py-8 text-center text-sm text-cream-muted font-sans" style={{
          boxShadow: '0 0 30px rgba(198, 40, 40, 0.2), inset 0 -1px 0 rgba(198, 40, 40, 0.1)'
        }}>
          Country Guitar Standard — Templates, tabs, and tools for singers and writers.
        </footer>
      </body>
    </html>
  )
}
