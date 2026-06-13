"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-text-primary">{label}</label>
        )}
        <textarea
          ref={ref}
          className={`rounded-lg border border-border-light bg-surface-white px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/60 outline-none transition-all focus:border-brand-jade focus:ring-1 focus:ring-brand-jade/20 min-h-[120px] resize-y ${error ? "border-brand-red" : ""} ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-brand-red">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
