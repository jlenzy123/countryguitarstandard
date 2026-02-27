import { GUIDES, Guide, getGuideTypeLabel } from '@/lib/guides';
import Link from 'next/link';

function paidGuides(): Guide[] {
  return GUIDES.filter(g => g.price > 0);
}

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-24 pb-16">
      <div className="pt-8">
        <p className="font-bebas text-sm uppercase tracking-[0.25em] text-accent mb-4">Store</p>
        <h1 className="font-bebas text-4xl sm:text-5xl font-bold text-cream uppercase tracking-wide mb-4">Shop</h1>
        <p className="text-base sm:text-lg text-cream-muted leading-relaxed">
          Everything currently available: song guides, artist deep dives, industry reports, and more.
        </p>
      </div>

      <div className="mt-10 space-y-6">
        {paidGuides().map((guide) => (
          <article
            key={guide.slug}
            className="flex flex-col gap-4 rounded-xl bg-void-card border border-white/[0.06] p-6 sm:flex-row sm:items-center hover:border-accent/30 transition-all"
          >
            <div className="min-w-0 flex-1">
              <h2 className="font-bebas font-bold text-cream">{guide.title}</h2>
              <p className="text-sm text-accent">{getGuideTypeLabel(guide.type as any)}</p>
              <p className="mt-2 text-sm text-cream-muted">{guide.excerpt}</p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <span className="font-semibold text-cream">${guide.price}</span>
              <Link
                href={`/guides/${guide.slug}`}
                className="rounded-lg bg-accent px-4 py-2 text-void font-medium hover:bg-accent-hover transition-colors"
              >
                View & Buy
              </Link>
            </div>
          </article>
        ))}
      </div>

      {paidGuides().length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-white/[0.1] bg-void-card p-10 text-center text-cream-muted">
          <p>No products are for sale yet. Add guides with a price above zero to <code className="rounded bg-void px-1.5 py-0.5 text-accent">lib/guides.ts</code>.</p>
        </div>
      )}

      <p className="mt-8 text-sm text-cream-muted">
        <a href="/" className="text-accent hover:underline">Back to home</a>
      </p>
    </div>
  )
}
