"use client";

import { useTranslations } from 'next-intl';
import { useStaggerAnimation } from "@/lib/hooks";
import { GlowCircle, DecorativeLine } from "@/components/decorative";

export default function Comparison() {
  const t = useTranslations('services.comparison');
  const tComparison = useTranslations('comparison');

  const containerRef = useStaggerAnimation<HTMLDivElement>(".comparison-row", "fade", {
    stagger: 0.15,
  });

  const templateItems = tComparison.raw('template') as string[];
  const aceStudioItems = tComparison.raw('aceStudio') as string[];

  return (
    <section className="relative py-16 md:py-24 bg-[var(--theme-background-alt)] overflow-hidden">
      {/* Decorative elements */}
      <GlowCircle
        size="md"
        position={{ top: "10%", left: "-8%" }}
        delay={-4}
      />
      <GlowCircle
        size="sm"
        position={{ bottom: "20%", right: "-5%" }}
        delay={-7}
      />
      <DecorativeLine position="left" top="25%" width={60} opacity={0.2} />
      <DecorativeLine position="right" bottom="35%" width={90} opacity={0.25} />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-[var(--font-playfair)] text-[var(--theme-text)]">
          {t('title')}
        </h2>

        <div
          ref={containerRef}
          className="max-w-4xl mx-auto bg-[var(--theme-surface)] rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-2 bg-[var(--theme-text)] text-[var(--theme-background)]">
            <div className="p-4 md:p-6 text-center font-semibold border-r border-[var(--theme-text-muted)]/20">
              {t('templateHeader')}
            </div>
            <div className="p-4 md:p-6 text-center font-semibold text-[var(--theme-accent)]">
              {t('aceHeader')}
            </div>
          </div>

          {/* Rows */}
          {templateItems.map((templateItem, index) => (
            <div
              key={index}
              className="comparison-row grid grid-cols-2 border-b border-[var(--theme-text-muted)]/10 last:border-b-0"
            >
              {/* Template column */}
              <div className="p-4 md:p-6 flex items-center gap-3 border-r border-[var(--theme-text-muted)]/10 text-[var(--theme-text-muted)]">
                <svg
                  className="w-5 h-5 text-red-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="line-through">{templateItem}</span>
              </div>

              {/* ACE STUDIO column */}
              <div className="p-4 md:p-6 flex items-center gap-3 text-[var(--theme-text)]">
                <svg
                  className="w-5 h-5 text-[var(--theme-accent)] flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">{aceStudioItems[index]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
