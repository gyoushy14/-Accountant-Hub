"use client";

import Link from "next/link";
import Button from "@/components/Button";

const steps = [
  {
    number: 1,
    title: "Post a Job",
    description: "Tell us what you need. Describe your project, set your budget, and choose the right category. It takes just a few minutes.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    number: 2,
    title: "Get Proposals",
    description: "Qualified accountants review your job and submit detailed proposals. Each proposal includes their approach, timeline, and price.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    number: 3,
    title: "Review & Hire",
    description: "Compare proposals, review ratings and experience, and message candidates directly. Hire the accountant that fits best.",
    icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  },
  {
    number: 4,
    title: "Get Results",
    description: "Work with your accountant, track progress, and get the job done. Release payment only when you're 100% satisfied.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-navy">
        <div className="mx-auto max-w-container px-4 lg:px-8 py-16 lg:py-24 text-center">
          <h1 className="text-h1 text-white font-heading">How It Works</h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Finding the perfect accountant for your business is simple. Follow these four steps to get started.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-container px-4 lg:px-8 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border-light hidden md:block" />

            <div className="flex flex-col gap-12">
              {steps.map((step) => (
                <div key={step.number} className="relative flex items-start gap-6 md:gap-8">
                  {/* Number circle */}
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-jade text-white text-xl font-bold shadow-lg">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="pt-3">
                    <div className="flex items-center gap-3 mb-2">
                      <svg className="h-5 w-5 text-brand-jade hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                      </svg>
                      <h3 className="text-h3 font-heading text-text-primary">{step.title}</h3>
                    </div>
                    <p className="text-body text-text-secondary leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy">
        <div className="mx-auto max-w-container px-4 lg:px-8 py-16 text-center">
          <h2 className="text-h2 text-white font-heading">Ready to Get Started?</h2>
          <p className="mt-3 text-lg text-white/70 max-w-xl mx-auto">
            Browse thousands of accounting jobs or post your first project today.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/">
              <Button variant="accent" size="lg">Browse Jobs</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">Create Account</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
