import { GUIDES, Guide, getGuideTypeLabel } from '@/lib/guides';
import Link from 'next/link';

// Products for sale will be derived from GUIDES (price > 0). You can still add
// album PDFs manually if desired by modifying the GUIDES list or adding a
// separate section below.

const ACCENT_BORDERS = ['border-l-denim', 'border-l-saddle', 'border-l-barn', 'border-l-gold', 'border-l-teal'] as const

function paidGuides(): Guide[] {
  return GUIDES.filter(g => g.price > 0);
}

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="border-l-4 border-saddle pl-4">
        <h1 className="font-display text-3xl font-semibold text-cream">Shop</h1>
        <p className="mt-2 text-cream-muted">
          Everything currently available: song guides, artist deep dives, industry reports, and more.
        </p>
      </div>

      <div className="mt-10 space-y-6">
        {paidGuides().map((guide, i) => (
          <article
            key={guide.slug}
            className={`flex flex-col gap-4 rounded-lg bg-void-card border-l-4 ${ACCENT_BORDERS[i % 5]} p-6 sm:flex-row sm:items-center`}
          >
            <div className="min-w-0 flex-1">
              <h2 className="font-display font-semibold text-cream">{guide.title}</h2>
              <p className="text-sm text-gold">{getGuideTypeLabel(guide.type as any)}</p>
              <p className="mt-2 text-sm text-cream-muted">{guide.excerpt}</p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <span className="font-semibold text-cream">${guide.price}</span>
              <Link
                href={`/guides/${guide.slug}`}
                className="rounded bg-barn px-4 py-2 text-cream font-medium hover:bg-barn-hover transition-colors"
              >
                View & Buy
              </Link>
            </div>
          </article>
        ))}
      </div>

      {paidGuides().length === 0 && (
        <div className="mt-10 rounded-lg border border-dashed border-denim/50 bg-void-card p-10 text-center text-cream-muted">
          <p>No products are for sale yet. Add guides with a price above zero to <code className="rounded bg-void px-1.5 py-0.5 text-gold">lib/guides.ts</code>.</p>
        </div>
      )}

      <p className="mt-8 text-sm text-cream-muted">
        <a href="/" className="text-gold hover:underline">Back to home</a>
      </p>
    </div>
  )
}
