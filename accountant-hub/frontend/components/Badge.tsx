import type { ReactNode } from "react";

type BadgeVariant = "open" | "closed" | "disputed" | "category" | "category-featured";

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  open: "bg-status-open/10 text-status-open",
  closed: "bg-status-closed/10 text-status-closed",
  disputed: "bg-status-disputed/10 text-status-disputed",
  category: "bg-gray-100 text-text-secondary",
  "category-featured": "bg-brand-navy text-white",
};

export default function Badge({ variant, children, dot = false, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
