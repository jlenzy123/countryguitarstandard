import type { Metadata } from 'next'
import { Rye, Bebas_Neue, Inter } from 'next/font/google'
import NavigationHeader from './Header'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const rye = Rye({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-rye',
  display: 'swap',
})

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
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
    <html lang="en" className={`${inter.variable} ${rye.variable} ${bebas.variable}`}>
      <body className="min-h-screen font-sans antialiased bg-void text-cream">
        <NavigationHeader />
        <main>{children}</main>
        <div className="palette-stripe mt-20" />
        <footer className="bg-void py-16 text-center border-t border-cream/10">
          <p className="font-western text-2xl text-cream tracking-wider">Country Guitar Standard</p>
          <p className="mt-3 text-xs text-cream-muted font-bebas uppercase tracking-[0.3em]">Templates &middot; Tabs &middot; Tools</p>
        </footer>
      </body>
    </html>
  )
}
