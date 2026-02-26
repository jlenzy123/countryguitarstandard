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
    <div className="min-h-screen bg-void pt-32 pb-20">
      {/* Back Link */}
      <div className="max-w-3xl mx-auto px-6 mb-8">
        <Link
          href="/guides"
          className="text-barn hover:text-barn/80 text-sm uppercase tracking-wider font-semibold transition-colors"
        >
          ← Back to Guides
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-3xl mx-auto px-6 mb-12">
        <div className="palette-stripe mb-8" />

        <div className="mb-4">
          <span className="text-xs uppercase tracking-wider text-barn font-semibold">
            {getGuideTypeLabel(guide.type as any)}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-medium mb-4">{guide.title}</h1>

        <div className="flex flex-wrap gap-6 text-sm text-offwhite/60">
          <div>
            <span className="text-offwhite/40">By</span> {guide.author}
          </div>
          <div>
            <span className="text-offwhite/40">Published</span> {new Date(guide.datePublished).toLocaleDateString()}
          </div>
          <div>
            <span className="text-offwhite/40">Read Time</span> {guide.readTime} minutes
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-3xl mx-auto px-6 mb-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="prose prose-invert max-w-none">
              <article className="text-offwhite/90 leading-relaxed">
                {guide.content.split('\n\n').map((paragraph, idx) => {
                  // Handle headings
                  if (paragraph.startsWith('# ')) {
                    return (
                      <h2 key={idx} className="text-3xl font-medium mt-8 mb-4 text-barn">
                        {paragraph.replace('# ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h3 key={idx} className="text-2xl font-medium mt-6 mb-3 text-barn">
                        {paragraph.replace('## ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h4 key={idx} className="text-xl font-medium mt-5 mb-2 text-barn/80">
                        {paragraph.replace('### ', '')}
                      </h4>
                    );
                  }
                  // Handle bold and italic
                  let processed = paragraph
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>');

                  // Handle bullet lists
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').map(line => line.replace('- ', ''));
                    return (
                      <ul key={idx} className="list-disc list-inside mb-4 space-y-2">
                        {items.map((item, i) => (
                          <li key={i} className="text-offwhite/80">
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  // Regular paragraph
                  return (
                    <p
                      key={idx}
                      className="mb-4 text-offwhite/80"
                      dangerouslySetInnerHTML={{ __html: processed }}
                    />
                  );
                })}
              </article>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-32 bg-void-card border border-barn/30 rounded-lg p-6">
              {/* Price & Purchase */}
              <div className="mb-6 pb-6 border-b border-barn/30">
                <div className="text-4xl font-bold text-barn mb-2">${guide.price}</div>
                <button className="w-full bg-barn text-void font-bold py-3 rounded hover:bg-barn/90 transition-colors">
                  Buy Now
                </button>
              </div>

              {/* What You'll Learn */}
              <div>
                <h4 className="font-medium text-sm uppercase tracking-wider text-offwhite/70 mb-3">
                  What You'll Learn
                </h4>
                <ul className="space-y-2 text-sm text-offwhite/70">
                  <li className="flex items-start">
                    <span className="text-barn mr-2">✓</span>
                    <span>Deep analysis of techniques and patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-barn mr-2">✓</span>
                    <span>Nashville numbers and chord voicings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-barn mr-2">✓</span>
                    <span>Applicable lessons for your own work</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-barn mr-2">✓</span>
                    <span>Professional PDF download</span>
                  </li>
                </ul>
              </div>

              {/* Description */}
              <div className="mt-6 pt-6 border-t border-barn/30">
                <p className="text-sm text-offwhite/60">{guide.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto px-6 mt-20 pt-12 border-t border-barn/30">
        <h2 className="text-2xl font-medium mb-6">Related Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Placeholder for related guides */}
          <div className="bg-void-card border border-barn/20 rounded-lg p-6">
            <span className="text-xs uppercase tracking-wider text-barn/60 font-semibold">Coming Soon</span>
            <p className="text-offwhite/70 mt-2">More guides being written...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
