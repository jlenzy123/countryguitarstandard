'use client';

import { getGuideBySlug, getGuideTypeLabel } from '@/lib/guides';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface GuidePageProps {
  params: {
    slug: string;
  };
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-void pt-24 pb-20">
      {/* Back Link */}
      <div className="max-w-3xl mx-auto px-6 mb-8 pt-8">
        <Link
          href="/guides"
          className="text-accent hover:text-accent-hover text-sm uppercase tracking-[0.15em] transition-colors"
        >
          ← Back to Guides
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-3xl mx-auto px-6 mb-12">
        <div className="mb-4">
          <span className="text-xs uppercase tracking-[0.15em] text-accent">
            {getGuideTypeLabel(guide.type as any)}
          </span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-medium text-cream mb-4">{guide.title}</h1>

        <div className="flex flex-wrap gap-6 text-sm text-cream-muted">
          <div>
            <span className="text-cream-muted">By</span> {guide.author}
          </div>
          <div>
            <span className="text-cream-muted">Published</span> {new Date(guide.datePublished).toLocaleDateString()}
          </div>
          <div>
            <span className="text-cream-muted">Read Time</span> {guide.readTime} minutes
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-3xl mx-auto px-6 mb-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="prose max-w-none">
              <article className="text-cream/90 leading-relaxed">
                {guide.content.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('# ')) {
                    return (
                      <h2 key={idx} className="font-display text-3xl font-medium mt-8 mb-4 text-accent">
                        {paragraph.replace('# ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h3 key={idx} className="font-display text-2xl font-medium mt-6 mb-3 text-accent">
                        {paragraph.replace('## ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h4 key={idx} className="font-display text-xl font-medium mt-5 mb-2 text-accent/80">
                        {paragraph.replace('### ', '')}
                      </h4>
                    );
                  }
                  let processed = paragraph
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>');

                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').map(line => line.replace('- ', ''));
                    return (
                      <ul key={idx} className="list-disc list-inside mb-4 space-y-2">
                        {items.map((item, i) => (
                          <li key={i} className="text-cream-muted">
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p
                      key={idx}
                      className="mb-4 text-cream-muted"
                      dangerouslySetInnerHTML={{ __html: processed }}
                    />
                  );
                })}
              </article>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-32 bg-void-card border border-white/[0.06] rounded-xl p-6">
              {/* Price & Purchase */}
              <div className="mb-6 pb-6 border-b border-white/[0.06]">
                <div className="text-4xl font-bold text-accent mb-2">${guide.price}</div>
                <button className="w-full bg-accent text-void font-bold py-3 rounded-lg hover:bg-accent-hover transition-colors">
                  Buy Now
                </button>
              </div>

              {/* What You'll Learn */}
              <div>
                <h4 className="font-medium text-xs uppercase tracking-[0.15em] text-cream-muted mb-3">
                  What You'll Learn
                </h4>
                <ul className="space-y-2 text-sm text-cream-muted">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Deep analysis of techniques and patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Nashville numbers and chord voicings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Applicable lessons for your own work</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Professional PDF download</span>
                  </li>
                </ul>
              </div>

              {/* Description */}
              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <p className="text-sm text-cream-muted">{guide.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto px-6 mt-20 pt-12 border-t border-white/[0.06]">
        <h2 className="font-display text-2xl font-medium text-cream mb-6">Related Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-void-card border border-white/[0.06] rounded-xl p-6">
            <span className="text-xs uppercase tracking-[0.15em] text-accent/60">Coming Soon</span>
            <p className="text-cream-muted mt-2">More guides being written...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
