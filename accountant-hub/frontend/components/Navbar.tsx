"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Button from "./Button";
import { useAuth } from "@/lib/auth-context";

const moreLinks = [
  { href: "/categories", label: "Categories" },
  { href: "/accountants", label: "Top Accountants" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-border-light bg-surface-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-container items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-navy text-white text-sm font-bold">
            A
          </div>
          <span className="text-lg font-bold text-brand-navy font-heading">
            Accountant<span className="text-brand-jade">HUB</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-text-primary hover:text-brand-jade transition-colors">
            Browse Jobs
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
            How It Works
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
            Pricing
          </Link>

          {/* More Dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              More
              <svg className={`h-4 w-4 transition-transform ${moreOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-surface-white shadow-sidebar border border-border-light py-2">
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMoreOpen(false)}
                    className="block px-4 py-2 text-sm text-text-secondary hover:text-brand-jade hover:bg-surface-light transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center gap-3">
          {loading ? (
            <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-100" />
          ) : user ? (
            <>
              <Link href="/my-bids">
                <Button variant="ghost" size="md">My Bids</Button>
              </Link>
              <span className="text-sm text-text-secondary">{user.name}</span>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="md">Log In</Button>
              </Link>
              <Link href="/register">
                <Button variant="accent" size="md">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-text-primary"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border-light bg-surface-white px-4 py-4 flex flex-col gap-3">
          <Link href="/" className="text-sm font-medium text-text-primary">Browse Jobs</Link>
          <Link href="/how-it-works" className="text-sm text-text-secondary">How It Works</Link>
          <Link href="/pricing" className="text-sm text-text-secondary">Pricing</Link>
          <Link href="/categories" className="text-sm text-text-secondary">Categories</Link>
          <Link href="/accountants" className="text-sm text-text-secondary">Top Accountants</Link>
          <Link href="/success-stories" className="text-sm text-text-secondary">Success Stories</Link>
          <Link href="/resources" className="text-sm text-text-secondary">Resources</Link>
          <Link href="/about" className="text-sm text-text-secondary">About</Link>
          <Link href="/careers" className="text-sm text-text-secondary">Careers</Link>
          <Link href="/contact" className="text-sm text-text-secondary">Contact</Link>
          <hr className="border-border-light" />
          {user ? (
            <>
              <Link href="/my-bids" className="text-sm text-text-primary">My Bids</Link>
              <span className="text-sm text-text-secondary">{user.name}</span>
            </>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="flex-1"><Button variant="outline" className="w-full">Log In</Button></Link>
              <Link href="/register" className="flex-1"><Button variant="accent" className="w-full">Sign Up</Button></Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
