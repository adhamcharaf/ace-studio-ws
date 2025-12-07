"use client";

import { SectionWrapper } from "@/components/ui";
import { GlowCircle, DecorativeLine } from "@/components/decorative";

export default function Vision() {
  return (
    <SectionWrapper className="bg-gradient-mesh relative overflow-hidden pt-32">
      {/* Decorative glow elements */}
      <GlowCircle
        size="lg"
        position={{ top: "-15%", right: "-10%" }}
        delay={-2}
      />
      <GlowCircle
        size="md"
        position={{ bottom: "10%", left: "-8%" }}
        delay={-7}
      />

      {/* Watermark "A" letter */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-[var(--font-playfair)] text-[40rem] md:text-[50rem] font-bold leading-none select-none"
          style={{ color: 'rgba(201, 160, 80, 0.03)' }}
        >
          A
        </span>
      </div>

      {/* Gold vertical accent line */}
      <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-[var(--theme-accent)] to-transparent opacity-50" />

      {/* Additional decorative lines */}
      <DecorativeLine position="right" top="25%" width={100} opacity={0.3} />
      <DecorativeLine position="right" bottom="30%" width={70} opacity={0.2} />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-2xl md:text-3xl text-[var(--theme-accent)] uppercase tracking-wider mb-8">
          Notre vision
        </h2>

        <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[var(--theme-text)] max-w-4xl mx-auto leading-relaxed font-[var(--font-playfair)]">
          Donner à chaque projet une identité digitale unique, pensée et conçue
          comme une œuvre — pas comme un produit.
        </p>
      </div>
    </SectionWrapper>
  );
}
