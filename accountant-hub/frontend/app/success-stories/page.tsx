"use client";

import { useEffect, useState } from "react";
import { getSuccessStories } from "@/lib/api";
import type { SuccessStoryItem } from "@/types";

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= rating ? "text-brand-gold" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<SuccessStoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSuccessStories()
      .then((res) => setStories(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="bg-brand-navy">
        <div className="mx-auto max-w-container px-4 lg:px-8 py-16 lg:py-24 text-center">
          <h1 className="text-h1 text-white font-heading">Success Stories</h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            See how businesses like yours found the perfect accountant through AccountantHUB.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-container px-4 lg:px-8 py-16 lg:py-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-56 animate-pulse rounded-xl bg-surface-white shadow-card" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {stories.map((story) => (
              <div
                key={story.id}
                className="rounded-xl bg-surface-white p-6 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-navy/10 text-brand-navy text-base font-bold">
                    {story.client_name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">{story.client_name}</p>
                    <p className="text-sm text-text-secondary">{story.company}</p>
                  </div>
                </div>

                <StarDisplay rating={story.rating} />

                <blockquote className="mt-4 flex-1 text-sm text-text-secondary leading-relaxed italic">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
