import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import NavigationHeader from './Header'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Country Guitar Standard',
  description: 'Country guitar and songwriting insights: song guides, industry reports, templates, and progression tools.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Country Guitar Standard',
    description: 'Country guitar and songwriting insights: song guides, industry reports, templates, and progression tools.',
    images: ['/favicon.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans antialiased bg-void text-cream">
        <NavigationHeader />
        <main>{children}</main>
        <div className="palette-stripe mt-20" />
        <footer className="bg-void py-12 text-center">
          <p className="font-display text-lg text-cream tracking-wide">Country Guitar Standard</p>
          <p className="mt-2 text-xs text-cream-muted uppercase tracking-widest">Templates &middot; Tabs &middot; Tools</p>
        </footer>
      </body>
    </html>
  )
}
