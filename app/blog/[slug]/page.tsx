import Link from 'next/link'
import { notFound } from 'next/navigation'

const POSTS: Record<string, { title: string; date: string; body: string }> = {
  'album-review-george-strait-strait-out-of-the-box': {
    title: 'Album review: George Strait — Strait Out of the Box',
    date: '2025-02-20',
    body: 'Why this box set still defines 90s country guitar and how to steal moves for your own playing. (Add your full album review here.)',
  },
  'five-country-progressions-every-beginner-should-know': {
    title: 'Five country progressions every beginner should know',
    date: '2025-02-15',
    body: 'The chord changes that show up again and again in classic country — and how to use them behind your singing. (Add your full post content here or replace this page with an MDX-based blog.)',
  },
  'style-review-neo-traditional-runs-and-riffs': {
    title: 'Style review: Neo-traditional runs and riffs',
    date: '2025-02-10',
    body: 'A quick tour of the guitar vocabulary that separates 80s/90s country from pop-country. (Add your full style review here.)',
  },
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS[params.slug]
  if (!post) notFound()

  return (
    <div className="mx-auto max-w-2xl px-4 pt-24 pb-16">
      <p className="pt-8 text-xs sm:text-sm text-cream-muted">
        <Link href="/blog" className="text-accent hover:underline">Blog</Link>
        <span className="mx-2">/</span>
        <span>{formatDate(post.date)}</span>
      </p>
      <h1 className="mt-2 font-bebas text-3xl sm:text-4xl font-bold text-cream uppercase tracking-wide border-b border-white/[0.06] pb-3">
        {post.title}
      </h1>
      <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-cream-muted leading-relaxed">
        <p>{post.body}</p>
      </div>
      <p className="mt-8 sm:mt-10 text-xs sm:text-sm text-cream-muted">
        <Link href="/blog" className="text-accent hover:underline">Back to blog</Link>
        <span className="mx-2">·</span>
        <Link href="/" className="text-accent hover:underline">Home</Link>
      </p>
    </div>
  )
}
