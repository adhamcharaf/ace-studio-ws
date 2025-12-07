"use client";

import { useStaggerAnimation } from "@/lib/hooks";
import { PROCESS_STEPS } from "@/lib/constants";

export default function ProcessTimeline() {
  const containerRef = useStaggerAnimation<HTMLDivElement>(".process-step", "slide-up", {
    stagger: 0.15,
  });

  return (
    <section className="relative py-16 md:py-24 bg-[var(--ace-cream)] overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-gold opacity-30" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-[var(--ace-gold)] text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            Comment on travaille
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[var(--font-playfair)] text-[var(--ace-black)]">
            Notre process
          </h2>
        </div>

        {/* Mobile: Horizontal scroll container */}
        <div className="md:hidden overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
          <div
            ref={containerRef}
            className="flex gap-6"
            style={{ minWidth: "max-content" }}
          >
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.step}
                className="process-step flex-shrink-0 w-[260px] text-center relative group"
              >
                {/* Connecting line to next step */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="absolute top-8 left-[calc(50%+32px)] w-[calc(100%-32px)] h-0.5 bg-gradient-to-r from-[var(--ace-gold)] to-[var(--ace-gold)]/30" />
                )}

                {/* Step number with enhanced glow */}
                <div className="relative mx-auto mb-6 w-16 h-16">
                  <div className="absolute inset-0 rounded-full bg-[var(--ace-gold)] opacity-25 blur-lg group-hover:opacity-50 transition-opacity duration-500" />
                  <div className="relative w-16 h-16 rounded-full bg-[var(--ace-gold)] text-[var(--ace-black)] flex items-center justify-center text-2xl font-bold z-10 shadow-[0_4px_20px_rgba(201,160,80,0.4)] group-hover:shadow-[0_4px_35px_rgba(201,160,80,0.6)] transition-all duration-500 group-hover:scale-105">
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 text-[var(--ace-black)] font-[var(--font-playfair)]">
                  {step.title}
                </h3>
                <p className="text-[var(--ace-gray)] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile scroll hint */}
        <div className="md:hidden flex items-center justify-center gap-2 text-[var(--ace-gray)] text-xs mt-2">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>
          <span>Glissez pour voir plus</span>
        </div>

        {/* Desktop: Grid layout */}
        <div
          className="hidden md:grid md:grid-cols-4 gap-8 relative"
        >
          {/* Connecting line with shimmer effect */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-0.5 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[var(--ace-gold)] to-transparent opacity-50" />
            <div className="absolute inset-0 shimmer-line" />
          </div>

          {PROCESS_STEPS.map((step) => (
            <div key={step.step} className="process-step text-center relative group">
              {/* Step number with enhanced glow */}
              <div className="relative mx-auto mb-6 w-16 h-16">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full bg-[var(--ace-gold)] opacity-25 blur-lg group-hover:opacity-50 transition-opacity duration-500" />
                {/* Particle ring effect on hover */}
                <div className="absolute inset-[-8px] rounded-full border border-[var(--ace-gold)]/0 group-hover:border-[var(--ace-gold)]/30 transition-all duration-500 group-hover:inset-[-12px]" />
                {/* Main circle */}
                <div className="relative w-16 h-16 rounded-full bg-[var(--ace-gold)] text-[var(--ace-black)] flex items-center justify-center text-2xl font-bold z-10 shadow-[0_4px_20px_rgba(201,160,80,0.4)] group-hover:shadow-[0_6px_35px_rgba(201,160,80,0.6)] transition-all duration-500 group-hover:scale-105">
                  {step.step}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-2 text-[var(--ace-black)] font-[var(--font-playfair)] group-hover:text-[var(--ace-gold)] transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-[var(--ace-gray)] text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
