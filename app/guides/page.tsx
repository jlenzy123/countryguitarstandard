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
    <div className="min-h-screen bg-void pt-32 pb-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <div className="palette-stripe mb-8" />
        <h1 className="text-5xl font-medium mb-4">Guides & Reports</h1>
        <p className="text-lg text-offwhite/80 max-w-2xl">
          Deep-dive analyses of songs, artists, and the music industry. Learn the techniques, patterns, and strategies behind today's biggest hits.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedType(null)}
            className={`px-4 py-2 rounded border transition-all ${
              selectedType === null
                ? 'bg-barn border-barn text-void'
                : 'border-barn/50 text-offwhite hover:border-barn'
            }`}
          >
            All Guides
          </button>
          {guideTypes.map(type => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`px-4 py-2 rounded border transition-all ${
                selectedType === type.value
                  ? 'bg-barn border-barn text-void'
                  : 'border-barn/50 text-offwhite hover:border-barn'
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
            <p className="text-offwhite/60">No guides yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredGuides.map(guide => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group bg-void-card border border-barn/20 rounded-lg p-6 hover:border-barn/60 hover:shadow-[0_0_30px_rgba(212,162,78,0.2)] transition-all"
              >
                {/* Type Badge */}
                <div className="inline-block mb-4">
                  <span className="text-xs uppercase tracking-wider text-barn font-semibold">
                    {getGuideTypeLabel(guide.type as any)}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-medium mb-2 group-hover:text-barn transition-colors">
                  {guide.title}
                </h2>

                {/* Excerpt */}
                <p className="text-offwhite/70 text-sm mb-4 line-clamp-3">
                  {guide.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-offwhite/50 mb-4">
                  <span>{guide.readTime} min read</span>
                  <span>{new Date(guide.datePublished).toLocaleDateString()}</span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-barn/20">
                  <span className="font-bold text-barn">${guide.price}</span>
                  <span className="text-barn group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 mt-20 py-12 bg-void-card border border-barn/30 rounded-lg">
        <h3 className="text-2xl font-medium mb-2">What's Coming</h3>
        <p className="text-offwhite/70 mb-4">
          Industry reports on country music trends, more artist deep-dives, and specialized songwriting techniques guides.
        </p>
        <p className="text-sm text-offwhite/50">Check back regularly for new releases.</p>
      </div>
    </div>
  );
}
