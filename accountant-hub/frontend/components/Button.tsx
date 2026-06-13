"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "accent" | "outline" | "ghost";
type Size = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-brand-navy text-white hover:bg-brand-navy/90 disabled:bg-brand-navy/50",
  accent: "bg-brand-jade text-white hover:bg-brand-jade/90 disabled:bg-brand-jade/50",
  outline: "border-2 border-brand-navy text-brand-navy hover:bg-brand-navy/5 disabled:opacity-50",
  ghost: "text-brand-navy hover:bg-gray-100 disabled:opacity-50",
};

const sizeStyles: Record<Size, string> = {
  md: "px-4 py-2.5 text-sm font-medium",
  lg: "px-6 py-3 text-base font-semibold",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, children, className = "", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center rounded-lg transition-all duration-200 font-body ${variantStyles[variant]} ${sizeStyles[size]} ${loading ? "cursor-wait" : ""} ${className}`}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
