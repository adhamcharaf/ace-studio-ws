"use client";

import { useTranslations } from 'next-intl';
import { SectionWrapper } from "@/components/ui";
import { GlowCircle, DecorativeLine, DecorativeCircle } from "@/components/decorative";

export default function ContactHeader() {
  const t = useTranslations('contact.header');
  return (
    <SectionWrapper className="relative bg-[var(--theme-background)] pt-32 pb-8 overflow-hidden">
      {/* Rich decorative elements for Contact */}
      <GlowCircle
        size="lg"
        position={{ top: "-10%", right: "-15%" }}
        delay={-1}
      />
      <GlowCircle
        size="lg"
        position={{ bottom: "-20%", left: "-10%" }}
        delay={-6}
      />
      <GlowCircle
        size="sm"
        position={{ top: "40%", left: "5%" }}
        delay={-9}
      />
      <DecorativeLine position="left" top="30%" width={150} opacity={0.4} />
      <DecorativeLine position="right" top="50%" width={120} opacity={0.35} />
      <DecorativeLine position="left" bottom="20%" width={80} opacity={0.25} />
      <DecorativeCircle size={800} opacity={0.1} />
      <DecorativeCircle size={500} opacity={0.05} />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[var(--font-playfair)] text-[var(--theme-text)]">
          {t('title')}
        </h1>
        <p className="text-xl md:text-2xl text-[var(--theme-text-muted)] max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>
    </SectionWrapper>
  );
}
