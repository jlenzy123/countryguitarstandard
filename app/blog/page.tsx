import Link from 'next/link'
import NewsletterSignup from '../components/NewsletterSignup'

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

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-24 pb-16">
      <div className="pt-8">
        <p className="font-bebas text-sm uppercase tracking-[0.25em] text-accent mb-4">Writing</p>
        <h1 className="font-bebas text-4xl sm:text-5xl font-bold text-cream uppercase tracking-wide mb-4">Blog</h1>
        <p className="text-base sm:text-lg text-cream-muted leading-relaxed">
          Album and style reviews, plus tips on country guitar and songwriting.
        </p>
      </div>

      <ul className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
        {POSTS.map((post) => (
          <li key={post.slug}>
            <article className="rounded-xl bg-void-card border border-white/[0.06] p-4 sm:p-6 hover:border-accent/30 transition-all">
              <time className="text-xs sm:text-sm text-accent" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
              <h2 className="mt-1 sm:mt-2 font-bebas text-lg sm:text-xl font-bold text-cream uppercase tracking-wide">
                <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-cream-muted">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-2 inline-block text-xs sm:text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                Read more
              </Link>
            </article>
          </li>
        ))}
      </ul>

      <p className="mt-10 sm:mt-12 text-xs sm:text-sm text-cream-muted">
        <a href="/" className="text-accent hover:underline">Back to home</a>
      </p>

      <div className="mt-10 sm:mt-14">
        <NewsletterSignup />
      </div>
    </div>
  )
}
