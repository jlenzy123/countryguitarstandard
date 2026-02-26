import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import Header from './Header'
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
        <Header />
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
