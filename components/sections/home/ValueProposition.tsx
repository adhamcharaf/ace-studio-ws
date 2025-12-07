"use client";

import { SectionWrapper, StrikeThroughText } from "@/components/ui";

export default function ValueProposition() {
  return (
    <SectionWrapper className="bg-gradient-radial-warm relative overflow-hidden gold-border-top gold-border-bottom">
      {/* Watermark Quote */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-[var(--font-playfair)] text-[25rem] md:text-[35rem] leading-none select-none"
          style={{ color: 'rgba(201, 160, 80, 0.03)' }}
        >
          &ldquo;
        </span>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-[var(--font-playfair)] text-[var(--ace-black)]">
          Des sites <StrikeThroughText text="templates" /> sur mesure.
        </h2>

        <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-[var(--ace-gray)]">
          <p>
            Chaque pixel est pensé. Chaque ligne de code est écrite pour vous.
          </p>
          <p>
            Pas de frameworks génériques. Pas de copier-coller.
          </p>
          <p className="text-[var(--ace-black)] font-medium">
            Une création unique, à votre image.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
