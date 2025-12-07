"use client";

import { SectionWrapper } from "@/components/ui";
import { UselessButton } from "@/components/easter-eggs";
import { GlowCircle, DecorativeLine, DecorativeCircle } from "@/components/decorative";

export default function Personality() {
  return (
    <SectionWrapper className="relative bg-[var(--theme-background-alt)] overflow-hidden">
      {/* Decorative elements */}
      <GlowCircle
        size="lg"
        position={{ bottom: "-20%", right: "-10%" }}
        delay={-3}
      />
      <DecorativeLine position="left" top="20%" width={80} opacity={0.25} />
      <DecorativeCircle size={600} opacity={0.06} />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 font-[var(--font-playfair)] text-[var(--theme-text)]">
          ACE STUDIO, c&apos;est...
        </h2>

        <div className="max-w-2xl mx-auto space-y-6 text-lg md:text-xl text-[var(--theme-text-muted)]">
          <p>
            Quelqu&apos;un de libre, créatif, sérieux mais jamais ennuyeux.
          </p>
          <p>
            Une énergie positive, un œil pour le beau, une exigence pour le
            travail bien fait.
          </p>
        </div>

        {/* Easter Egg: Useless Button */}
        <div className="mt-16">
          <UselessButton />
        </div>
      </div>
    </SectionWrapper>
  );
}
