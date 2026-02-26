export default function SongwritingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="border-l-4 border-gold pl-4">
        <h1 className="font-display text-3xl font-bold text-cream">Songwriting Template</h1>
        <p className="mt-2 text-cream-muted">
          Use this structure to capture ideas and turn them into finished songs. Add your own
          PDF or Notion link below when you have it ready.
        </p>
      </div>

      <div className="mt-10 rounded-lg bg-void-card border border-saddle/50 p-8">
        <h2 className="font-display font-semibold text-cream">What’s in the template</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-cream-muted">
          <li>Title & working key</li>
          <li>Verse / chorus / bridge sections with line placeholders</li>
          <li>Chord progression boxes per section</li>
          <li>Notes and “save for later” ideas</li>
        </ul>
        <div className="mt-8 rounded-lg bg-void border border-denim/40 p-6 text-center">
          <p className="text-sm text-cream-muted">
            Drop your template PDF in <code className="rounded bg-void-card px-1.5 py-0.5 text-gold">/public</code> and
            link it here, or link to a Notion page.
          </p>
          <a
            href="#"
            className="mt-4 inline-block rounded bg-barn px-5 py-2.5 text-cream font-medium hover:bg-barn-hover transition-colors"
          >
            Download template (coming soon)
          </a>
        </div>
      </div>

      <p className="mt-8 text-sm text-cream-muted">
        <a href="/" className="text-gold hover:underline">Back to home</a>
      </p>
    </div>
  )
}
