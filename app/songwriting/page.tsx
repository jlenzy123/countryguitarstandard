export default function SongwritingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-24 pb-16">
      <div className="pt-8">
        <p className="font-bebas text-sm uppercase tracking-[0.25em] text-accent mb-4">Resource</p>
        <h1 className="font-bebas text-4xl sm:text-5xl font-bold text-cream uppercase tracking-wide mb-4">Songwriting Template</h1>
        <p className="text-base sm:text-lg text-cream-muted leading-relaxed">
          Use this structure to capture ideas and turn them into finished songs. Add your own
          PDF or Notion link below when you have it ready.
        </p>
      </div>

      <div className="mt-10 rounded-xl bg-void-card border border-white/[0.06] p-8">
        <h2 className="font-bebas text-2xl font-bold text-cream uppercase tracking-wide">What's in the template</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-cream-muted">
          <li>Title & working key</li>
          <li>Verse / chorus / bridge sections with line placeholders</li>
          <li>Chord progression boxes per section</li>
          <li>Notes and “save for later” ideas</li>
        </ul>
        <div className="mt-8 rounded-xl bg-void-elevated border border-white/[0.06] p-6 text-center">
          <p className="text-sm text-cream-muted">
            Drop your template PDF in <code className="rounded bg-void-card px-1.5 py-0.5 text-accent">/public</code> and
            link it here, or link to a Notion page.
          </p>
          <a
            href="#"
            className="mt-4 inline-block rounded-lg bg-accent px-5 py-2.5 text-void font-medium hover:bg-accent-hover transition-colors"
          >
            Download template (coming soon)
          </a>
        </div>
      </div>

      <p className="mt-8 text-sm text-cream-muted">
        <a href="/" className="text-accent hover:underline">Back to home</a>
      </p>
    </div>
  )
}
