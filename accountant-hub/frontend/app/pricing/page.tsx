"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPricing } from "@/lib/api";
import type { PricingTier } from "@/types";
import Button from "@/components/Button";

export default function PricingPage() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPricing()
      .then((res) => setTiers(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-navy">
        <div className="mx-auto max-w-container px-4 lg:px-8 py-16 lg:py-24 text-center">
          <h1 className="text-h1 text-white font-heading">Simple, Transparent Pricing</h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Upgrade anytime as your business grows.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="mx-auto max-w-container px-4 lg:px-8 py-16 lg:py-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 animate-pulse rounded-xl bg-surface-white shadow-card" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-xl p-6 flex flex-col ${
                  tier.highlighted
                    ? "bg-brand-navy text-white shadow-sidebar ring-2 ring-brand-jade scale-105"
                    : "bg-surface-white text-text-primary shadow-card"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gold px-4 py-1 text-xs font-bold text-white">
                    Most Popular
                  </span>
                )}

                <h3 className="text-xl font-bold font-heading">{tier.name}</h3>
                <p className={`mt-1 text-sm ${tier.highlighted ? "text-white/70" : "text-text-secondary"}`}>
                  {tier.description}
                </p>

                <div className="mt-6">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  <span className={`text-sm ml-1 ${tier.highlighted ? "text-white/70" : "text-text-secondary"}`}>
                    /{tier.interval}
                  </span>
                </div>

                <ul className="mt-6 flex-1 flex flex-col gap-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <svg className={`mt-0.5 h-4 w-4 shrink-0 ${tier.highlighted ? "text-brand-jade" : "text-brand-jade"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={tier.price === 0 ? "/register" : "/register"} className="mt-6 block">
                  <Button
                    variant={tier.highlighted ? "accent" : "outline"}
                    className={`w-full ${!tier.highlighted ? "border-brand-navy text-brand-navy" : ""}`}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
