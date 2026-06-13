"use client";

import Button from "./Button";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, onSubmit, placeholder = "Search jobs..." }: SearchInputProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-surface-white p-2 shadow-card">
      <div className="flex flex-1 items-center gap-2 pl-2">
        <svg className="h-5 w-5 shrink-0 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
          placeholder={placeholder}
          className="flex-1 border-none bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary/60"
        />
      </div>
      <Button variant="accent" onClick={onSubmit}>
        Find Jobs
      </Button>
    </div>
  );
}
