"use client";

import { SectionWrapper } from "@/components/ui";
import { Button } from "@/components/ui";

export default function CTA() {
  return (
    <SectionWrapper className="bg-gradient-dark relative overflow-hidden py-24 md:py-32">
      {/* Diagonal gold lines pattern */}
      <div className="absolute inset-0 bg-diagonal-gold opacity-70" />

      {/* Floating geometric shapes */}
      <div
        className="absolute w-64 h-64 border border-[var(--ace-gold)] opacity-10 rotate-45 floating-shape"
        style={{ top: '10%', left: '-5%' }}
      />
      <div
        className="absolute w-48 h-48 border border-[var(--ace-gold)] opacity-10 rotate-12 floating-shape"
        style={{ bottom: '5%', right: '-3%', animationDelay: '-7s' }}
      />
      <div
        className="absolute w-32 h-32 bg-[var(--ace-gold)] opacity-[0.03] rotate-45"
        style={{ top: '50%', right: '10%' }}
      />

      {/* Radial spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201, 160, 80, 0.05) 0%, transparent 50%)',
        }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-[var(--font-playfair)] text-[var(--ace-white)] drop-shadow-[0_0_30px_rgba(201,160,80,0.15)]">
          Votre projet mérite mieux qu&apos;un template.
        </h2>

        <Button href="/contact" size="lg">
          Parlons-en
        </Button>
      </div>
    </SectionWrapper>
  );
}
