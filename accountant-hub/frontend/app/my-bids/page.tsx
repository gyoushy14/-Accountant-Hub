"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getMyBids } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { Bid, PaginationMeta } from "@/types";
import EmptyState from "@/components/EmptyState";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Pagination from "@/components/Pagination";

export default function MyBidsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [bids, setBids] = useState<Bid[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchBids = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMyBids(page);
      setBids(res.data);
      if (res.meta) setMeta(res.meta);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login?redirect=/my-bids");
      return;
    }
    fetchBids();
  }, [user, authLoading, router, fetchBids]);

  if (authLoading || loading) {
    return (
      <div className="mx-auto max-w-container px-4 lg:px-8 py-8">
        <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-36 animate-pulse rounded-xl bg-surface-white shadow-card" />
          ))}
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-container px-4 lg:px-8 py-8">
      <h1 className="text-h2 font-heading text-text-primary">My Bids</h1>
      <p className="mt-1 text-sm text-text-secondary">
        {meta && meta.total > 0
          ? `You have submitted ${meta.total} bid${meta.total !== 1 ? "s" : ""}.`
          : "Track all your submitted proposals here."}
      </p>

      {bids.length === 0 ? (
        <EmptyState
          icon="bids"
          title="No bids yet"
          description="Start browsing jobs and submit your first bid."
          actionLabel="Browse Jobs"
          onAction={() => router.push("/")}
        />
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {bids.map((bid) => {
            const statusVariant = bid.job?.status === "open" ? "open" : bid.job?.status === "closed" ? "closed" : "disputed";
            return (
              <div key={bid.id} className="rounded-xl bg-surface-white p-5 shadow-card hover:shadow-card-hover transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-semibold text-text-primary truncate">
                        {bid.job?.title || "Unknown Job"}
                      </h3>
                      {bid.job && <Badge variant={statusVariant} dot>{bid.job.status}</Badge>}
                    </div>
                    {bid.job && (
                      <p className="mt-1 text-sm text-text-secondary">{bid.job.client_name}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-brand-jade">
                      ${bid.proposed_price.toLocaleString()}
                    </p>
                    <p className="text-xs text-text-secondary">{bid.estimated_delivery_time}</p>
                  </div>
                </div>

                <p className="mt-3 text-sm text-text-secondary line-clamp-2">{bid.cover_letter}</p>

                <div className="mt-4 flex items-center justify-between border-t border-border-light pt-4">
                  <span className="text-xs text-text-secondary">
                    Submitted {new Date(bid.created_at).toLocaleDateString()}
                  </span>
                  {bid.job && (
                    <Button variant="outline" size="md" onClick={() => router.push(`/jobs/${bid.job!.id}`)}>
                      View Job
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
          {meta && <Pagination meta={meta} onPageChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />}
        </div>
      )}
    </div>
  );
}
