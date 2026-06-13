"use client";

import type { PaginationMeta } from "@/types";

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export default function Pagination({ meta, onPageChange }: PaginationProps) {
  const { current_page, last_page, total } = meta;

  if (last_page <= 1) return null;

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= last_page; i++) {
    if (i === 1 || i === last_page || (i >= current_page - 1 && i <= current_page + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex items-center justify-between pt-6">
      <p className="text-sm text-text-secondary">
        Showing <span className="font-medium text-text-primary">{Math.min((current_page - 1) * meta.per_page + 1, total)}</span>
        {" to "}
        <span className="font-medium text-text-primary">{Math.min(current_page * meta.per_page, total)}</span>
        {" of "}
        <span className="font-medium text-text-primary">{total}</span> jobs
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page <= 1}
          className="rounded-lg border border-border-light px-3 py-1.5 text-sm text-text-primary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &larr; Prev
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="px-2 text-sm text-text-secondary">...</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                p === current_page
                  ? "bg-brand-navy text-white"
                  : "text-text-primary hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page >= last_page}
          className="rounded-lg border border-border-light px-3 py-1.5 text-sm text-text-primary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
