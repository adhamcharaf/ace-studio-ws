"use client";

import { SectionWrapper } from "@/components/ui";
import { GlowCircle, DecorativeLine, DecorativeCircle } from "@/components/decorative";

export default function PortfolioHeader() {
  return (
    <SectionWrapper className="relative bg-[var(--theme-background)] pt-32 pb-16 overflow-hidden">
      {/* Decorative elements */}
      <GlowCircle
        size="lg"
        position={{ top: "-15%", left: "-10%" }}
        delay={-3}
      />
      <GlowCircle
        size="md"
        position={{ bottom: "0%", right: "-8%" }}
        delay={-6}
      />
      <DecorativeLine position="left" top="35%" width={100} opacity={0.3} />
      <DecorativeLine position="right" bottom="25%" width={70} opacity={0.2} />
      <DecorativeCircle size={650} opacity={0.07} />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[var(--font-playfair)] text-[var(--theme-text)]">
          Réalisations
        </h1>
        <p className="text-xl md:text-2xl text-[var(--theme-text-muted)] max-w-2xl mx-auto">
          Ce qu&apos;on a créé pour d&apos;autres.
        </p>
      </div>
    </SectionWrapper>
  );
}
