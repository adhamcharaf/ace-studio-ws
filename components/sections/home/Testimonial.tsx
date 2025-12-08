"use client";

import { useRef } from "react";
import { useScrollAnimation } from "@/lib/hooks";
import {
  AuroraBackground,
  GoldParticles,
  MagneticQuote,
  ParallaxDecorations,
  TestimonialCard,
} from "./testimonial-parts";

const TESTIMONIAL = {
  quote:
    "ACE STUDIO a transformé notre vision en réalité. Le site d'Arena reflète parfaitement l'excellence et le prestige de notre complexe sportif. Un travail sur mesure, une équipe à l'écoute, un résultat qui dépasse nos attentes.",
  author: "Direction",
  company: "Arena Club-Sport & Events",
  location: "Grand-Bassam",
};

export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useScrollAnimation<HTMLDivElement>("fade", { duration: 0.8 });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Aurora animated background */}
      <AuroraBackground />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none z-[2]" />

      {/* Gold particles */}
      <GoldParticles />

      {/* Parallax decorations (corners + watermark) */}
      <ParallaxDecorations containerRef={sectionRef} />

      {/* Content */}
      <div ref={contentRef} className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <TestimonialCard>
          {/* Small label */}
          <span className="inline-block text-[var(--ace-gold)] text-sm tracking-[0.2em] uppercase mb-8 font-medium">
            Témoignage
          </span>

          {/* Quote with magnetic words */}
          <blockquote className="relative">
            <span className="text-[var(--ace-gold)]/40 font-[var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl leading-none mr-2 align-top">"</span>
            <MagneticQuote quote={TESTIMONIAL.quote} />
            <span className="text-[var(--ace-gold)]/40 font-[var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl leading-none ml-1 align-bottom">"</span>
          </blockquote>

          {/* Author info */}
          <div className="mt-12 flex flex-col items-center gap-4">
            {/* Decorative line */}
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--ace-gold)] to-transparent" />

            {/* Author details */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-[var(--ace-black)] font-semibold tracking-wide">
                {TESTIMONIAL.author}
              </span>
              <span className="text-[var(--ace-gray)] text-sm">
                {TESTIMONIAL.company}
                <span className="mx-2 text-[var(--ace-gold)]">·</span>
                {TESTIMONIAL.location}
              </span>
            </div>
          </div>
        </TestimonialCard>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--ace-gold)]/20 to-transparent z-10" />
    </section>
  );
}
