"use client";

import React from "react";
import { useStaggerAnimation } from "@/lib/hooks";
import { VALUES } from "@/lib/constants";
import { GlowCircle, DecorativeLine, DecorativeCircle } from "@/components/decorative";

// Value icons
const ValueIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactNode> = {
    creativity: (
      <svg
        className="w-16 h-16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    fidelity: (
      <svg
        className="w-16 h-16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    modernity: (
      <svg
        className="w-16 h-16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  };

  return icons[type] || icons.creativity;
};

export default function Values() {
  const containerRef = useStaggerAnimation<HTMLDivElement>(".value-card", "slide-up", {
    stagger: 0.2,
  });

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-radial-warm overflow-hidden">
      {/* Decorative elements */}
      <GlowCircle
        size="lg"
        position={{ top: "-10%", left: "-12%" }}
        delay={-3}
      />
      <GlowCircle
        size="md"
        position={{ bottom: "-5%", right: "-8%" }}
        delay={-8}
      />
      <DecorativeLine position="left" top="20%" width={90} opacity={0.25} />
      <DecorativeLine position="right" bottom="25%" width={110} opacity={0.3} />
      <DecorativeCircle size={700} opacity={0.06} />

      {/* Subtle noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-20" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <h2 className="text-2xl md:text-3xl text-[var(--theme-accent)] uppercase tracking-wider mb-16 text-center">
          Nos valeurs
        </h2>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {VALUES.map((value) => (
            <div key={value.id} className="value-card text-center group">
              {/* Icon with gold circle background */}
              <div className="relative mb-6 flex justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-[var(--theme-accent)] opacity-[0.08] group-hover:opacity-[0.15] group-hover:scale-110 transition-all duration-500" />
                </div>
                <div className="text-[var(--theme-accent)] relative z-10 group-hover:drop-shadow-[0_0_12px_rgba(201,160,80,0.4)] transition-all duration-300">
                  <ValueIcon type={value.icon} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-[var(--theme-text)] font-[var(--font-playfair)]">
                {value.title}
              </h3>
              <p className="text-[var(--theme-text-muted)]">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
