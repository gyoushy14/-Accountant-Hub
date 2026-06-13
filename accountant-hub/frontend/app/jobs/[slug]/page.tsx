"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getJob } from "@/lib/api";
import type { JobDetail } from "@/types";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import ProjectSummaryCard from "@/components/ProjectSummaryCard";
import EmptyState from "@/components/EmptyState";

export default function JobDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getJob(slug)
      .then((res) => setJob(res.data))
      .catch(() => setError("Job not found."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-container px-4 lg:px-8 py-8">
        <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
            <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
          </div>
          <div className="h-96 animate-pulse rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="mx-auto max-w-container px-4 lg:px-8 py-16">
        <EmptyState
          icon="error"
          title="Job not found"
          description={error || "The job you're looking for doesn't exist or has been removed."}
          actionLabel="Browse Jobs"
          onAction={() => router.push("/")}
        />
      </div>
    );
  }

  const statusVariant = job.status === "open" ? "open" : "closed";

  return (
    <div className="mx-auto max-w-container px-4 lg:px-8 py-6 lg:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-secondary mb-6">
        <Link href="/" className="hover:text-brand-jade transition-colors">Home</Link>
        <span>/</span>
        <Link href="/" className="hover:text-brand-jade transition-colors">Jobs</Link>
        <span>/</span>
        <span className="text-text-primary truncate">{job.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-start gap-3 flex-wrap">
              <h1 className="text-h2 font-heading text-text-primary">{job.title}</h1>
              <Badge variant={statusVariant} dot>{job.status}</Badge>
            </div>
            <p className="mt-2 text-sm text-text-secondary">
              {job.client_name} &bull; {job.posted_at} &bull; {job.bids_count} applicant{job.bids_count !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Role Overview */}
          <section>
            <h2 className="text-h3 font-heading text-text-primary">Role Overview</h2>
            <p className="mt-2 text-body text-text-secondary leading-relaxed">{job.description}</p>
          </section>

          {/* Key Responsibilities (derived from description as bullet points) */}
          <section>
            <h2 className="text-h3 font-heading text-text-primary">Key Responsibilities</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {job.required_skills.slice(0, 3).map((skill, i) => (
                <li key={i} className="flex items-start gap-2 text-body text-text-secondary">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
                  {skill} related tasks and reporting as needed by the client.
                </li>
              ))}
              <li className="flex items-start gap-2 text-body text-text-secondary">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
                Collaborate with the finance team to meet deadlines.
              </li>
            </ul>
          </section>

          {/* Candidate Requirements */}
          <section>
            <h2 className="text-h3 font-heading text-text-primary">Candidate Requirements</h2>
            <ul className="mt-3 flex flex-col gap-2">
              <li className="flex items-start gap-2 text-body text-text-secondary">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
                Proven experience in {job.category.name}
              </li>
              <li className="flex items-start gap-2 text-body text-text-secondary">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
                Strong attention to detail and analytical skills
              </li>
              <li className="flex items-start gap-2 text-body text-text-secondary">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
                Excellent communication and time management
              </li>
            </ul>
          </section>

          {/* Required Skills */}
          <section>
            <h2 className="text-h3 font-heading text-text-primary">Required Skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.required_skills.map((skill, i) => (
                <Badge key={i} variant="category">{skill}</Badge>
              ))}
            </div>
          </section>

          {/* About the Client */}
          <section className="rounded-xl bg-surface-white p-6 shadow-card">
            <h2 className="text-h3 font-heading text-text-primary">About the Client</h2>
            <div className="mt-4 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-navy/5 text-brand-navy text-lg font-bold">
                {job.client_name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-text-primary">{job.client_name}</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Verified client &bull; Posted {job.posted_at}
                </p>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {job.client_name} is looking for a skilled professional to join their team and deliver high-quality results.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div>
          {/* Desktop Sticky Sidebar */}
          <div className="hidden lg:block">
            <ProjectSummaryCard job={job} />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      {job.status === "open" && (
        <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-border-light bg-surface-white p-3 lg:hidden">
          <Link href={`/jobs/${job.id}/bid`}>
            <Button variant="accent" className="w-full">
              Apply Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
