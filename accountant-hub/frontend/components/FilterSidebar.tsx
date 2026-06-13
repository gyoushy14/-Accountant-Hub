"use client";

import { useState, useEffect } from "react";
import { getCategories } from "@/lib/api";
import type { Category } from "@/types";
import RangeSlider from "./RangeSlider";
import Button from "./Button";

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (id: string) => void;
  budgetRange: [number, number];
  onBudgetChange: (range: [number, number]) => void;
  sort: string;
  onSortChange: (sort: string) => void;
  onClear: () => void;
}

export default function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  budgetRange,
  onBudgetChange,
  sort,
  onSortChange,
  onClear,
}: FilterSidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data)).catch(() => {});
  }, []);

  const hasFilters = selectedCategory || budgetRange[0] > 0 || budgetRange[1] < 10000 || sort !== "newest";

  return (
    <aside className="w-[280px] shrink-0 flex flex-col gap-6">
      {/* Categories */}
      <div className="rounded-xl bg-surface-white p-5 shadow-card">
        <h4 className="mb-3 text-sm font-semibold text-text-primary">Category</h4>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategory === String(cat.id)}
                onChange={() => onCategoryChange(selectedCategory === String(cat.id) ? "" : String(cat.id))}
                className="h-4 w-4 rounded border-border-light text-brand-jade focus:ring-brand-jade/20"
              />
              <span className="text-sm text-text-primary">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Budget Range */}
      <div className="rounded-xl bg-surface-white p-5 shadow-card">
        <h4 className="mb-3 text-sm font-semibold text-text-primary">Budget Range</h4>
        <RangeSlider
          min={0}
          max={10000}
          step={500}
          value={budgetRange}
          onChange={onBudgetChange}
        />
      </div>

      {/* Sort */}
      <div className="rounded-xl bg-surface-white p-5 shadow-card">
        <h4 className="mb-3 text-sm font-semibold text-text-primary">Sort By</h4>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full rounded-lg border border-border-light bg-surface-white px-3 py-2 text-sm text-text-primary outline-none focus:border-brand-jade"
        >
          <option value="newest">Newest First</option>
          <option value="highest_budget">Highest Budget</option>
        </select>
      </div>

      {hasFilters && (
        <Button variant="ghost" onClick={onClear} className="w-full text-sm">
          Clear All Filters
        </Button>
      )}

      {/* Upgrade Pro */}
      <div className="rounded-xl bg-brand-navy p-5 text-white">
        <svg className="h-8 w-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
        <h4 className="mt-3 text-base font-semibold">Upgrade to Pro</h4>
        <p className="mt-1 text-sm text-white/70">Get unlimited access to premium jobs and features.</p>
        <Button variant="accent" className="mt-4 w-full">
          Get Pro &rarr;
        </Button>
      </div>
    </aside>
  );
}
