"use client";

import { useTranslations } from 'next-intl';
import { SectionWrapper, StrikeThroughText } from "@/components/ui";

export default function ValueProposition() {
  const t = useTranslations('valueProposition');

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
          {t.rich('title', {
            strikethrough: (chunks) => <StrikeThroughText text={chunks as string} />
          })}
        </h2>

        <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-[var(--ace-gray)]">
          <p>
            {t('line1')}
          </p>
          <p>
            {t('line2')}
          </p>
          <p className="text-[var(--ace-black)] font-medium">
            {t('line3')}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
