"use client";

import { useEffect, useState, useCallback } from "react";
import { getJobs } from "@/lib/api";
import type { JobListItem, PaginationMeta } from "@/types";
import SearchInput from "@/components/SearchInput";
import FilterSidebar from "@/components/FilterSidebar";
import JobCard from "@/components/JobCard";
import Pagination from "@/components/Pagination";
import EmptyState from "@/components/EmptyState";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 10000]);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [mobileFilters, setMobileFilters] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params: Record<string, string> = { page: String(page) };
      if (search) params.search = search;
      if (selectedCategory) params.category_id = selectedCategory;
      if (budgetRange[0] > 0) params.budget_min = String(budgetRange[0]);
      if (budgetRange[1] < 10000) params.budget_max = String(budgetRange[1]);
      if (sort !== "newest") params.sort = sort;

      const res = await getJobs(params);
      setJobs(res.data);
      if (res.meta) setMeta(res.meta);
    } catch {
      setError("Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [search, selectedCategory, budgetRange, sort, page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleApply = (job: JobListItem) => {
    router.push(`/jobs/${job.id}`);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setBudgetRange([0, 10000]);
    setSort("newest");
    setPage(1);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-navy">
        <div className="mx-auto max-w-container px-4 lg:px-8 py-12 lg:py-20">
          <h1 className="text-h1 text-white font-heading max-w-2xl">
            Find Your Next <span className="text-brand-jade">Accounting</span> Opportunity
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-xl">
            Browse top jobs from leading companies. Submit proposals and grow your freelance accounting career.
          </p>
          <div className="mt-8 max-w-2xl">
            <SearchInput
              value={search}
              onChange={setSearch}
              onSubmit={() => { setPage(1); fetchJobs(); }}
              placeholder="Search by job title, skills, or keywords..."
            />
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="mx-auto max-w-container px-4 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-h3 font-heading text-text-primary">
            Available Jobs{meta ? ` (${meta.total})` : ""}
          </h2>
          <button
            onClick={() => setMobileFilters(!mobileFilters)}
            className="lg:hidden flex items-center gap-2 rounded-lg border border-border-light px-3 py-2 text-sm font-medium text-text-primary"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={(id) => { setSelectedCategory(id); setPage(1); }}
              budgetRange={budgetRange}
              onBudgetChange={(r) => { setBudgetRange(r); setPage(1); }}
              sort={sort}
              onSortChange={(s) => { setSort(s); setPage(1); }}
              onClear={clearFilters}
            />
          </div>

          {/* Mobile Filter Sheet */}
          {mobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/30" onClick={() => setMobileFilters(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-surface-light p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button onClick={() => setMobileFilters(false)} className="p-1">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <FilterSidebar
                  selectedCategory={selectedCategory}
                  onCategoryChange={(id) => { setSelectedCategory(id); setPage(1); }}
                  budgetRange={budgetRange}
                  onBudgetChange={(r) => { setBudgetRange(r); setPage(1); }}
                  sort={sort}
                  onSortChange={(s) => { setSort(s); setPage(1); }}
                  onClear={clearFilters}
                />
              </div>
            </div>
          )}

          {/* Job Results */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-44 animate-pulse rounded-xl bg-surface-white shadow-card" />
                ))}
              </div>
            ) : error ? (
              <EmptyState
                icon="error"
                title="Something went wrong"
                description={error}
                actionLabel="Try Again"
                onAction={fetchJobs}
              />
            ) : jobs.length === 0 ? (
              <EmptyState
                icon="search"
                title="No jobs found"
                description="Try adjusting your filters or search terms."
                actionLabel="Clear Filters"
                onAction={clearFilters}
              />
            ) : (
              <>
                <div className="flex flex-col gap-4">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} onApply={handleApply} />
                  ))}
                </div>
                {meta && <Pagination meta={meta} onPageChange={setPage} />}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
