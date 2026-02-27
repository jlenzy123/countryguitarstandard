import NewsletterSignup from './components/NewsletterSignup'

export default function Home() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">Songwriting &middot; Guitar &middot; Nashville</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream leading-[1.1]">
          Write better<br />country songs.
        </h1>
        <p className="mt-6 text-base sm:text-lg text-cream-muted leading-relaxed max-w-xl">
          Free and premium guides, Nashville number charts, and progression tools for writers and players.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="/guides" className="inline-flex items-center px-6 py-3 bg-accent text-void font-medium text-sm uppercase tracking-wider rounded hover:bg-accent-hover transition-colors">
            Browse Guides
          </a>
          <a href="/chord-tool" className="inline-flex items-center px-6 py-3 border border-accent/40 text-accent font-medium text-sm uppercase tracking-wider rounded hover:border-accent hover:bg-accent/5 transition-all">
            Chord Tool
          </a>
        </div>
      </section>

      {/* Section divider */}
      <div className="palette-stripe" />

      {/* Feature cards */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
        <h2 className="font-display text-2xl sm:text-3xl text-cream mb-10">What You&rsquo;ll Find</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <a href="/guides" className="group bg-void-card p-6 sm:p-8 rounded-xl">
            <p className="text-xs uppercase tracking-[0.15em] text-accent mb-3">Guides & Reports</p>
            <h3 className="font-display text-xl text-cream group-hover:text-accent transition-colors">Song breakdowns & analysis</h3>
            <p className="mt-3 text-sm text-cream-muted leading-relaxed">Deep-dive guides on chord progressions, Nashville numbers, and the techniques behind today's biggest hits.</p>
          </a>
          <a href="/chord-tool" className="group bg-void-card p-6 sm:p-8 rounded-xl">
            <p className="text-xs uppercase tracking-[0.15em] text-accent mb-3">Tools</p>
            <h3 className="font-display text-xl text-cream group-hover:text-accent transition-colors">Chord progressions & Nashville numbers</h3>
            <p className="mt-3 text-sm text-cream-muted leading-relaxed">Browse progressions in any key, get suggestions, and convert between chord names and numbers instantly.</p>
          </a>
          <a href="/songwriting" className="group bg-void-card p-6 sm:p-8 rounded-xl">
            <p className="text-xs uppercase tracking-[0.15em] text-accent mb-3">Templates</p>
            <h3 className="font-display text-xl text-cream group-hover:text-accent transition-colors">Songwriting template</h3>
            <p className="mt-3 text-sm text-cream-muted leading-relaxed">Structure your ideas with verse, chorus, and bridge sections. Free download.</p>
          </a>
          <a href="/shop" className="group bg-void-card p-6 sm:p-8 rounded-xl">
            <p className="text-xs uppercase tracking-[0.15em] text-accent mb-3">Shop</p>
            <h3 className="font-display text-xl text-cream group-hover:text-accent transition-colors">Premium downloads</h3>
            <p className="mt-3 text-sm text-cream-muted leading-relaxed">Paid song guides, album PDFs, artist analyses, and industry reports.</p>
          </a>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-void-elevated">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
          <NewsletterSignup />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
        <h2 className="font-display text-2xl sm:text-3xl text-cream mb-8">FAQ</h2>
        <div className="space-y-4">
          {[
            {
              q: 'What is the Nashville Number System?',
              a: 'It represents chords as scale degrees (1, 4, 5, 6m, etc.) so you can play in any key without rewriting the chart.',
              link: '/nashville',
              linkText: 'Try the converter',
            },
            {
              q: 'How do I write country chord progressions?',
              a: 'Browse hundreds of sample progressions in our Chord Progression Tool — I–IV–V patterns, secondary chords, and common country moves.',
              link: '/chord-tool',
              linkText: 'Open chord tool',
            },
            {
              q: 'Are the guides free?',
              a: 'Some guides are free. Premium song guides, artist analyses, and industry reports are $7–$49 each.',
              link: '/shop',
              linkText: 'View shop',
            },
          ].map((item, i) => (
            <details key={i} className="group bg-void-card rounded-xl p-5 sm:p-6" open={i === 0}>
              <summary className="flex justify-between items-center cursor-pointer text-cream font-medium text-sm sm:text-base">
                <span>{item.q}</span>
                <span className="text-cream-muted text-xl group-open:rotate-180 transition-transform ml-4">&#8964;</span>
              </summary>
              <p className="mt-3 text-sm text-cream-muted leading-relaxed">
                {item.a}{' '}
                <a href={item.link} className="text-accent hover:underline">{item.linkText} &rarr;</a>
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
