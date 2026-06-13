"use client";

import Link from "next/link";
import Button from "./Button";
import Badge from "./Badge";
import type { JobDetail } from "@/types";

interface ProjectSummaryCardProps {
  job: JobDetail;
}

export default function ProjectSummaryCard({ job }: ProjectSummaryCardProps) {
  const statusVariant = job.status === "open" ? "open" : "closed";

  return (
    <div className="sticky top-24 rounded-xl bg-brand-navy p-6 text-white shadow-sidebar">
      <h3 className="text-lg font-semibold font-heading">Project Summary</h3>

      <div className="mt-5 flex flex-col gap-4">
        <div>
          <p className="text-xs font-medium text-white/50 uppercase tracking-wider">Budget</p>
          <p className="mt-1 text-xl font-bold text-brand-jade">
            ${job.budget_min.toLocaleString()} – ${job.budget_max.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-white/50 uppercase tracking-wider">Duration</p>
            <p className="mt-1 text-sm font-medium">{job.delivery_time}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-white/50 uppercase tracking-wider">Deadline</p>
            <p className="mt-1 text-sm font-medium">{job.deadline}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-white/50 uppercase tracking-wider">Delivery</p>
          <p className="mt-1 text-sm font-medium">{job.delivery_time}</p>
        </div>

        <div>
          <p className="text-xs font-medium text-white/50 uppercase tracking-wider">Bids</p>
          <p className="mt-1 text-sm font-medium">
            {job.bids_count} proposal{job.bids_count !== 1 ? "s" : ""}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-white/50 uppercase tracking-wider">Status</p>
          <div className="mt-1">
            <Badge variant={statusVariant} dot>{job.status}</Badge>
          </div>
        </div>

        {job.attachments && job.attachments.length > 0 && (
          <div>
            <p className="text-xs font-medium text-white/50 uppercase tracking-wider">Project Assets</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {job.attachments.map((file, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <svg className="h-4 w-4 shrink-0 text-brand-jade" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="truncate">{file}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {job.status === "open" && (
        <Link href={`/jobs/${job.id}/bid`}>
          <Button variant="accent" className="mt-6 w-full">
            Submit a Bid &rarr;
          </Button>
        </Link>
      )}
    </div>
  );
}
