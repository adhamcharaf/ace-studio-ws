"use client";

import { SectionWrapper, Counter } from "@/components/ui";
import { STATS } from "@/lib/constants";

export default function Stats() {
  return (
    <SectionWrapper className="bg-gradient-dark relative overflow-hidden">
      {/* Gold Grid Pattern */}
      <div className="absolute inset-0 bg-grid-gold opacity-50" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {STATS.map((stat, index) => (
            <div key={index} className="relative flex items-center justify-center">
              {/* Vertical separator between items on desktop */}
              {index > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 separator-vertical-gold" />
              )}
              <Counter
                end={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                className="text-[var(--ace-white)]"
              />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
