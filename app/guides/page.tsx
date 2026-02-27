'use client';

import { getAllGuides, getGuideTypeLabel } from '@/lib/guides';
import Link from 'next/link';
import { useState } from 'react';

export default function GuidesPage() {
  const guides = getAllGuides();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredGuides = selectedType
    ? guides.filter(guide => guide.type === selectedType)
    : guides;

  const guideTypes = [
    { value: 'song-guide', label: 'Song Guides' },
    { value: 'artist-analysis', label: 'Artist Analysis' },
    { value: 'industry-report', label: 'Industry Reports' },
    { value: 'songwriting-deep-dive', label: 'Songwriting Deep-Dives' },
  ];

  return (
    <div className="min-h-screen bg-void pt-24 pb-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 mb-16 pt-12">
        <p className="font-bebas text-sm uppercase tracking-[0.25em] text-accent mb-4">Resources</p>
        <h1 className="font-bebas text-4xl sm:text-5xl font-bold text-cream mb-4 uppercase tracking-wide">Guides & Reports</h1>
        <p className="text-base sm:text-lg text-cream-muted max-w-2xl leading-relaxed">
          Deep-dive analyses of songs, artists, and the music industry. Learn the techniques, patterns, and strategies behind today's biggest hits.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedType(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedType === null
                ? 'bg-accent text-void'
                : 'border border-white/[0.08] text-cream hover:border-accent/40'
            }`}
          >
            All Guides
          </button>
          {guideTypes.map(type => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedType === type.value
                  ? 'bg-accent text-void'
                  : 'border border-white/[0.08] text-cream hover:border-accent/40'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Guides Grid */}
      <div className="max-w-4xl mx-auto px-6">
        {filteredGuides.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-cream-muted">No guides yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {filteredGuides.map(guide => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group bg-void-card border border-white/[0.06] rounded-xl p-4 sm:p-6 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(201,168,76,0.1)] transition-all"
              >
                {/* Type Badge */}
                <div className="inline-block mb-4">
                  <span className="text-xs uppercase tracking-[0.15em] text-accent">
                    {getGuideTypeLabel(guide.type as any)}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-medium mb-2 group-hover:text-accent transition-colors">
                  {guide.title}
                </h2>

                {/* Excerpt */}
                <p className="text-cream-muted text-sm mb-4 line-clamp-3">
                  {guide.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-cream-muted mb-4">
                  <span>{guide.readTime} min read</span>
                  <span>{new Date(guide.datePublished).toLocaleDateString()}</span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <span className="font-bold text-accent">${guide.price}</span>
                  <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 mt-20 py-12 bg-void-elevated rounded-xl border border-white/[0.06]">
        <h3 className="font-bebas text-2xl font-bold text-cream uppercase tracking-wide mb-2">What's Coming</h3>
        <p className="text-cream-muted mb-4">
          Industry reports on country music trends, more artist deep-dives, and specialized songwriting techniques guides.
        </p>
        <p className="text-sm text-cream-muted">Check back regularly for new releases.</p>
      </div>
    </div>
  );
}
