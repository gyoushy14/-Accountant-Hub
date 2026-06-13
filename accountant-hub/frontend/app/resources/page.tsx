"use client";

import { useEffect, useState } from "react";
import { getResources } from "@/lib/api";
import type { ResourceArticle } from "@/types";
import Badge from "@/components/Badge";
import Button from "@/components/Button";

const categoryColors: Record<string, string> = {
  "Tax Tips": "open",
  "Tools & Software": "category",
  "Financial Analysis": "category-featured",
  "Auditing": "disputed",
};

export default function ResourcesPage() {
  const [resources, setResources] = useState<ResourceArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResources()
      .then((res) => setResources(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="bg-brand-navy">
        <div className="mx-auto max-w-container px-4 lg:px-8 py-16 lg:py-24 text-center">
          <h1 className="text-h1 text-white font-heading">Resources</h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Expert articles, tips, and guides to help you manage your finances and grow your business.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-container px-4 lg:px-8 py-16 lg:py-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 animate-pulse rounded-xl bg-surface-white shadow-card" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {resources.map((article) => (
              <article
                key={article.id}
                className="rounded-xl bg-surface-white p-6 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={(categoryColors[article.category] as "open" | "category" | "category-featured" | "disputed") || "category"}>
                    {article.category}
                  </Badge>
                  <span className="text-xs text-text-secondary">{article.published_at}</span>
                </div>

                <h3 className="text-lg font-semibold text-text-primary">{article.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed flex-1">{article.excerpt}</p>

                <div className="mt-4 flex items-center justify-between border-t border-border-light pt-4">
                  <span className="text-xs text-text-secondary">By {article.author}</span>
                  <Button variant="ghost" size="md">
                    Read More &rarr;
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
