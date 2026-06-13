"use client";

import { useCallback, useState } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatLabel?: (value: number) => string;
}

export default function RangeSlider({
  min,
  max,
  step = 100,
  value,
  onChange,
  formatLabel = (v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`,
}: RangeSliderProps) {
  const [local, setLocal] = useState(value);

  const handleChange = useCallback(
    (index: 0 | 1, newVal: number) => {
      const next: [number, number] = [...local] as [number, number];
      next[index] = newVal;
      if (next[0] > next[1]) {
        if (index === 0) next[1] = next[0];
        else next[0] = next[1];
      }
      setLocal(next);
      onChange(next);
    },
    [local, onChange]
  );

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-text-secondary">{formatLabel(local[0])}</span>
        <span className="text-text-secondary">{formatLabel(local[1])}</span>
      </div>
      <div className="relative h-2">
        <div className="absolute inset-0 rounded-full bg-gray-200" />
        <div
          className="absolute top-0 bottom-0 rounded-full bg-brand-jade"
          style={{ left: `${pct(local[0])}%`, right: `${100 - pct(local[1])}%` }}
        />
        {([0, 1] as const).map((index) => (
          <input
            key={index}
            type="range"
            min={min}
            max={max}
            step={step}
            value={local[index]}
            onChange={(e) => handleChange(index, Number(e.target.value))}
            className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-jade [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}
