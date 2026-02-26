import NewsletterSignup from './components/NewsletterSignup'

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-16">
      <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-cream tracking-tight">
        Country guitar<br className="sm:hidden" /> songwriting<br className="hidden sm:block" /> resources<br />for writers and players.
      </h1>
      <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-cream-muted">
        Free and premium guides, charts, and industry reports that teach you how to write better country
        songs, navigate Nashville numbers, and play authentic progressions on acoustic or electric guitar.
      </p>

      {/* Newsletter Signup */}
      <div className="mt-8 sm:mt-10">
        <NewsletterSignup />
      </div>

      <div className="mt-10 sm:mt-14 prose prose-invert max-w-none">
        <h2 className="text-lg sm:text-xl">What you'll find here</h2>
        <ul className="list-disc ml-4 sm:ml-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
          <li>Step-by-step <a href="/guides" className="text-gold hover:underline">song guides</a> explaining chord progressions, Nashville numbers, and stylistic choices</li>
          <li>In-depth <a href="/guides" className="text-gold hover:underline">artist analysis and industry reports</a> covering the modern country landscape</li>
          <li>A free <a href="/songwriting" className="text-gold hover:underline">songwriting template</a> to capture ideas and structure lyrics</li>
          <li>Tools like the <a href="/chord-tool" className="text-gold hover:underline">chord progression generator</a> and <a href="/nashville" className="text-gold hover:underline">Nashville number converter</a></li>
        </ul>
      </div>

      <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <a
          href="/guides"
          className="group block rounded-lg bg-void-card p-4 sm:p-6 transition hover:bg-void-card/90 border-l-4 border-denim"
        >
          <h2 className="font-display text-sm sm:text-base font-semibold text-cream group-hover:text-gold transition-colors">Guides & Reports</h2>
          <p className="mt-2 text-xs sm:text-sm text-cream-muted">
            Song breakdowns, artist deep dives, and industry analysis. Some free, some premium.
          </p>
        </a>
        <a
          href="/songwriting"
          className="group block rounded-lg bg-void-card p-4 sm:p-6 transition hover:bg-void-card/90 border-l-4 border-saddle"
        >
          <h2 className="font-display text-sm sm:text-base font-semibold text-cream group-hover:text-gold transition-colors">Songwriting Template</h2>
          <p className="mt-2 text-xs sm:text-sm text-cream-muted">
            Structure your ideas: verses, chorus, bridge. Free download.
          </p>
        </a>
        <a
          href="/shop"
          className="group block rounded-lg bg-void-card p-4 sm:p-6 transition hover:bg-void-card/90 border-l-4 border-gold"
        >
          <h2 className="font-display text-sm sm:text-base font-semibold text-cream group-hover:text-gold transition-colors">Shop Products</h2>
          <p className="mt-2 text-xs sm:text-sm text-cream-muted">
            Paid song guides, album PDFs, and reports available now.
          </p>
        </a>
        <a
          href="/chord-tool"
          className="group block rounded-lg bg-void-card p-4 sm:p-6 transition hover:bg-void-card/90 border-l-4 border-barn"
        >
          <h2 className="font-display text-sm sm:text-base font-semibold text-cream group-hover:text-gold transition-colors">Chord Tool</h2>
          <p className="mt-2 text-xs sm:text-sm text-cream-muted">
            Browse progressions in any key or get suggestions based on chords you're playing.
          </p>
        </a>
      </div>

      <div className="mt-12 sm:mt-16 rounded-lg bg-denim/20 border border-denim/50 p-4 sm:p-8 text-center">
        <p className="text-sm sm:text-base text-cream">
          Start with a <strong className="text-gold">song guide</strong>, try the
          <strong className="text-gold"> chord tool</strong> for progressions, or
          explore the shop for premium downloads.
        </p>
        <a
          href="/guides"
          className="mt-4 inline-block rounded bg-barn px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base text-cream font-medium hover:bg-barn-hover transition-colors"
        >
          Browse Guides
        </a>
      </div>

      {/* FAQ for SEO */}
      <section className="mt-16 sm:mt-24">
        <h2 className="text-xl sm:text-2xl font-semibold text-cream mb-4 sm:mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3 sm:space-y-4">
          <details className="group rounded-lg bg-void-card p-3 sm:p-4" open>
            <summary className="flex justify-between items-start sm:items-center cursor-pointer text-cream font-medium text-sm sm:text-base gap-2">
              <span>What is the Nashville Number System?</span>
              <span className="text-cream-muted group-open:rotate-180 transition-transform flex-shrink-0">▾</span>
            </summary>
            <div className="mt-2 text-xs sm:text-sm text-cream-muted">
              The Nashville numbers method represents chords as scale degrees (1, 4, 5, 6m, etc.) so you can play in any key without rewriting the chart. Our <a href="/nashville" className="text-gold hover:underline">interactive converter</a> makes it easy.
            </div>
          </details>

          <details className="group rounded-lg bg-void-card p-3 sm:p-4">
            <summary className="flex justify-between items-start sm:items-center cursor-pointer text-cream font-medium text-sm sm:text-base gap-2">
              <span>How do I write country chord progressions?</span>
              <span className="text-cream-muted group-open:rotate-180 transition-transform flex-shrink-0">▾</span>
            </summary>
            <div className="mt-2 text-xs sm:text-sm text-cream-muted">
              Browse hundreds of sample progressions in our <a href="/chord-tool" className="text-gold hover:underline">Chord Progression Tool</a>, which includes I–IV–V patterns, secondary chords, and common country moves.
            </div>
          </details>

          <details className="group rounded-lg bg-void-card p-3 sm:p-4">
            <summary className="flex justify-between items-start sm:items-center cursor-pointer text-cream font-medium text-sm sm:text-base gap-2">
              <span>Are the guides free?</span>
              <span className="text-cream-muted group-open:rotate-180 transition-transform flex-shrink-0">▾</span>
            </summary>
            <div className="mt-2 text-xs sm:text-sm text-cream-muted">
              Some guides are free; premium song guides, artist analyses, and industry reports are sold for $7–$49 each. All items for sale appear on the <a href="/shop" className="text-gold hover:underline">Shop</a> page.
            </div>
          </details>
        </div>
      </section>

    </div>
  )
}
