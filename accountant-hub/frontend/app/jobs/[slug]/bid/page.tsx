"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getJob, submitBid } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { JobDetail } from "@/types";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Badge from "@/components/Badge";
import EmptyState from "@/components/EmptyState";

export default function SubmitBidPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [proposedPrice, setProposedPrice] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [experienceSummary, setExperienceSummary] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push(`/login?redirect=/jobs/${slug}/bid`);
      return;
    }
    if (!slug) return;

    getJob(slug)
      .then((res) => {
        setJob(res.data);
        if (res.data.has_applied) {
          router.push(`/jobs/${slug}`);
        }
      })
      .catch(() => setError("Job not found."))
      .finally(() => setLoading(false));
  }, [slug, user, authLoading, router]);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!proposedPrice || Number(proposedPrice) <= 0) errors.proposed_price = "Please enter a valid amount.";
    if (!estimatedDelivery.trim()) errors.estimated_delivery_time = "Estimated delivery time is required.";
    if (!coverLetter.trim() || coverLetter.trim().length < 20) errors.cover_letter = "Cover letter must be at least 20 characters.";
    if (!experienceSummary.trim() || experienceSummary.trim().length < 20) errors.experience_summary = "Experience summary must be at least 20 characters.";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      await submitBid(slug, {
        proposed_price: Number(proposedPrice),
        estimated_delivery_time: estimatedDelivery.trim(),
        cover_letter: coverLetter.trim(),
        experience_summary: experienceSummary.trim(),
      });
      router.push(`/jobs/${slug}?bid=success`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError("Failed to submit bid. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="mx-auto max-w-container px-4 lg:px-8 py-12">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
          <div className="h-96 animate-pulse rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="mx-auto max-w-container px-4 lg:px-8 py-16">
        <EmptyState icon="error" title="Job not found" description={error} actionLabel="Browse Jobs" onAction={() => router.push("/")} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-container px-4 lg:px-8 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Job Summary */}
        <div className="mb-8">
          <p className="text-sm text-text-secondary">
            <button onClick={() => router.back()} className="hover:text-brand-jade transition-colors">&larr; Back to Job</button>
          </p>
          <h1 className="mt-4 text-h2 font-heading text-text-primary">Submit Your Bid</h1>
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <span className="font-medium text-text-primary">{job.title}</span>
            <Badge variant={statusVariant(job.status)} dot>{job.status}</Badge>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            {job.client_name} &bull; Budget: ${job.budget_min} – ${job.budget_max}
          </p>
        </div>

        {/* Bid Form */}
        <form onSubmit={handleSubmit} className="rounded-xl bg-surface-white p-6 shadow-card space-y-5">
          <Input
            label="Your Proposed Price ($)"
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g. 1500"
            value={proposedPrice}
            onChange={(e) => setProposedPrice(e.target.value)}
            error={validationErrors.proposed_price}
          />

          <Input
            label="Estimated Delivery Time"
            placeholder="e.g. 2 weeks, Monthly"
            value={estimatedDelivery}
            onChange={(e) => setEstimatedDelivery(e.target.value)}
            error={validationErrors.estimated_delivery_time}
          />

          <Textarea
            label="Cover Letter / Proposal"
            placeholder="Explain why you're the best fit for this job..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            error={validationErrors.cover_letter}
          />

          <Textarea
            label="Experience Summary"
            placeholder="Describe your relevant experience and qualifications..."
            value={experienceSummary}
            onChange={(e) => setExperienceSummary(e.target.value)}
            error={validationErrors.experience_summary}
          />

          {submitError && (
            <div className="rounded-lg bg-brand-red/5 border border-brand-red/20 p-3 text-sm text-brand-red">
              {submitError}
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button variant="accent" type="submit" loading={submitting}>
              {submitting ? "Submitting..." : "Submit Bid"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function statusVariant(s: string): "open" | "closed" | "disputed" {
  if (s === "open") return "open";
  if (s === "closed") return "closed";
  return "disputed";
}
