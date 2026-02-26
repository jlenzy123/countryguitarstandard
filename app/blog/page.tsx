import Link from 'next/link'

const POSTS = [
  {
    slug: 'album-review-george-strait-strait-out-of-the-box',
    title: 'Album review: George Strait — Strait Out of the Box',
    date: '2025-02-20',
    excerpt: 'Why this box set still defines 90s country guitar and how to steal moves for your own playing.',
  },
  {
    slug: 'five-country-progressions-every-beginner-should-know',
    title: 'Five country progressions every beginner should know',
    date: '2025-02-15',
    excerpt: 'The chord changes that show up again and again in classic country — and how to use them behind your singing.',
  },
  {
    slug: 'style-review-neo-traditional-runs-and-riffs',
    title: 'Style review: Neo-traditional runs and riffs',
    date: '2025-02-10',
    excerpt: 'A quick tour of the guitar vocabulary that separates 80s/90s country from pop-country.',
  },
]

const ACCENT_BORDERS = ['border-l-denim', 'border-l-saddle', 'border-l-barn', 'border-l-gold', 'border-l-teal'] as const

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="border-l-4 border-denim pl-4">
        <h1 className="font-display text-3xl font-bold text-cream">Blog</h1>
        <p className="mt-2 text-cream-muted">
          Album and style reviews, plus tips on country guitar and songwriting.
        </p>
      </div>

      <ul className="mt-10 space-y-8">
        {POSTS.map((post, i) => (
          <li key={post.slug}>
            <article className={`rounded-lg bg-void-card border-l-4 ${ACCENT_BORDERS[i % 5]} p-6`}>
              <time className="text-sm text-gold" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
              <h2 className="mt-1 font-display text-xl font-semibold text-cream">
                <Link href={`/blog/${post.slug}`} className="hover:text-gold transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-cream-muted">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-2 inline-block text-sm font-medium text-barn hover:text-barn-hover transition-colors"
              >
                Read more
              </Link>
            </article>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-sm text-cream-muted">
        <a href="/" className="text-gold hover:underline">Back to home</a>
      </p>
    </div>
  )
}
