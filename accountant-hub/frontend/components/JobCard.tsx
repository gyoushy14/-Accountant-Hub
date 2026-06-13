"use client";

import Badge from "./Badge";
import Button from "./Button";
import type { JobListItem } from "@/types";

interface JobCardProps {
  job: JobListItem;
  onApply?: (job: JobListItem) => void;
}

function BudgetDisplay({ min, max }: { min: number; max: number }) {
  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `$${n}`;
  return <span>{fmt(min)} – {fmt(max)}</span>;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  const statusVariant = job.status === "open" ? "open" : "closed";

  return (
    <div className="group rounded-xl bg-surface-white p-5 shadow-card transition-all duration-200 hover:shadow-card-hover">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-navy/5 text-brand-navy">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-text-primary truncate">{job.title}</h3>
            <Badge variant={statusVariant} dot>{job.status}</Badge>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            {job.client_name} &bull; {job.posted_at}
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm text-text-secondary line-clamp-2">{job.short_description}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <Badge variant="category">{job.category.name}</Badge>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border-light pt-4">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <span className="text-text-secondary">
            Budget:{" "}
            <span className="font-semibold text-brand-jade">
              <BudgetDisplay min={job.budget_min} max={job.budget_max} />
            </span>
          </span>
          <span className="text-text-secondary">
            Deadline:{" "}
            <span className="font-medium text-text-primary">{job.deadline}</span>
          </span>
          <span className="text-text-secondary">
            Bids:{" "}
            <span className="font-medium text-text-primary">{job.bids_count}</span>
          </span>
        </div>
        <Button
          variant={job.status === "open" ? "accent" : "outline"}
          size="md"
          onClick={() => onApply?.(job)}
        >
          {job.status === "open" ? "Apply Now" : "View Details"}
        </Button>
      </div>
    </div>
  );
}
