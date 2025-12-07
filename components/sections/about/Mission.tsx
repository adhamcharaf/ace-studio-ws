"use client";

import { SectionWrapper } from "@/components/ui";
import { GlowCircle, DecorativeLine } from "@/components/decorative";

export default function Mission() {
  return (
    <SectionWrapper className="relative bg-[var(--theme-background-alt)] overflow-hidden">
      {/* Decorative elements */}
      <GlowCircle
        size="md"
        position={{ top: "0%", left: "-10%" }}
        delay={-5}
      />
      <DecorativeLine position="right" top="30%" width={100} opacity={0.3} />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-2xl md:text-3xl text-[var(--theme-accent)] uppercase tracking-wider mb-8">
          Notre mission
        </h2>

        <p className="text-xl md:text-2xl text-[var(--theme-text-muted)] max-w-3xl mx-auto leading-relaxed">
          Accompagner entrepreneurs et entreprises vers une présence en ligne
          qui leur ressemble vraiment, avec créativité, exigence et modernité.
        </p>
      </div>
    </SectionWrapper>
  );
}
