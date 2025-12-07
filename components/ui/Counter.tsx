"use client";

import { useCounter } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/utils";
import type { CounterProps } from "@/types";

export default function Counter({
  end,
  suffix = "",
  prefix = "",
  duration = 1.5,
  label,
  className,
}: CounterProps) {
  const { count, ref } = useCounter(end, { duration });

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--ace-gold)] mb-2 drop-shadow-[0_0_20px_rgba(201,160,80,0.35)] transition-all duration-300">
        {prefix}
        {formatNumber(count)}
        {suffix}
      </div>
      <div className="text-[var(--ace-gray)] text-sm md:text-base uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
