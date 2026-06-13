"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories, getJobs } from "@/lib/api";
import type { Category } from "@/types";
import Badge from "@/components/Badge";

const categoryIcons: Record<string, string> = {
  bookkeeping: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  "tax-preparation": "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  auditing: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  "financial-analysis": "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
  "payroll-management": "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<(Category & { jobs_count: number })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCategories(), getJobs({ per_page: "100" })])
      .then(([catRes, jobRes]) => {
        const jobs = jobRes.data;
        const counts: Record<number, number> = {};
        jobs.forEach((j) => {
          counts[j.category.id] = (counts[j.category.id] || 0) + 1;
        });
        setCategories(
          catRes.data.map((c) => ({
            ...c,
            jobs_count: counts[c.id] || 0,
          }))
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="bg-brand-navy">
        <div className="mx-auto max-w-container px-4 lg:px-8 py-16 lg:py-24 text-center">
          <h1 className="text-h1 text-white font-heading">Job Categories</h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Browse accounting jobs by category and find the perfect opportunity for your expertise.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-container px-4 lg:px-8 py-16 lg:py-20">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-40 animate-pulse rounded-xl bg-surface-white shadow-card" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/?category_id=${cat.id}`}
                className="group rounded-xl bg-surface-white p-6 shadow-card hover:shadow-card-hover transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-navy/5 text-brand-navy group-hover:bg-brand-jade/10 group-hover:text-brand-jade transition-colors">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={categoryIcons[cat.slug] || categoryIcons.bookkeeping} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary group-hover:text-brand-jade transition-colors">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      {cat.jobs_count} job{cat.jobs_count !== 1 ? "s" : ""} available
                    </p>
                    <div className="mt-3">
                      <Badge variant="category">{cat.slug.replace("-", " ")}</Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
