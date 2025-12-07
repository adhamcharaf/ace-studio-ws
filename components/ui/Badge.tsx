"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  topText: string;
  bottomText: string;
  className?: string;
}

export default function Badge({ topText, bottomText, className }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col items-center justify-center",
        "px-8 py-6 rounded-2xl",
        "border-2 border-[var(--ace-gold)]",
        "bg-[var(--ace-white)]",
        "shadow-lg",
        "transform hover:scale-105 transition-transform duration-300",
        className
      )}
    >
      <span className="text-2xl md:text-3xl font-bold text-[var(--ace-gold)]">
        {topText}
      </span>
      <span className="text-lg md:text-xl text-[var(--ace-black)] mt-1">
        {bottomText}
      </span>
    </div>
  );
}
