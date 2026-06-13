"use client";

import { useEffect, useState } from "react";
import { getCareers } from "@/lib/api";
import type { CareerPosition } from "@/types";
import Button from "@/components/Button";
import Badge from "@/components/Badge";

export default function CareersPage() {
  const [careers, setCareers] = useState<CareerPosition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCareers()
      .then((res) => setCareers(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const typeVariant = (type: string): "open" | "closed" | "category" | "category-featured" | "disputed" => {
    if (type === "Full-time") return "open";
    if (type === "Remote") return "category-featured";
    if (type === "Internship") return "disputed";
    return "category";
  };

  return (
    <div>
      <section className="bg-brand-navy">
        <div className="mx-auto max-w-container px-4 lg:px-8 py-16 lg:py-24 text-center">
          <h1 className="text-h1 text-white font-heading">Join Our Team</h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Help us build the future of accounting. Explore open positions and become part of the AccountantHUB team.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-container px-4 lg:px-8 py-16 lg:py-20">
        {loading ? (
          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 animate-pulse rounded-xl bg-surface-white shadow-card" />
            ))}
          </div>
        ) : careers.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-text-primary">No open positions right now</h3>
            <p className="mt-2 text-text-secondary">Check back later for new opportunities.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {careers.map((role) => (
              <div
                key={role.id}
                className="rounded-xl bg-surface-white p-6 shadow-card hover:shadow-card-hover transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-text-primary">{role.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant={typeVariant(role.type)}>{role.type}</Badge>
                      <span className="text-sm text-text-secondary">{role.department}</span>
                      <span className="text-sm text-text-secondary">&bull;</span>
                      <span className="text-sm text-text-secondary">{role.location}</span>
                    </div>
                    {role.description && (
                      <p className="mt-3 text-sm text-text-secondary leading-relaxed">{role.description}</p>
                    )}
                  </div>
                  <Button variant="accent" size="md" className="shrink-0">
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
