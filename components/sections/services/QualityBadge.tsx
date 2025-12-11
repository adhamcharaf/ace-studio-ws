"use client";

import { useTranslations } from 'next-intl';
import { SectionWrapper, Badge } from "@/components/ui";

export default function QualityBadge() {
  const t = useTranslations('services.quality');

  return (
    <SectionWrapper className="bg-[var(--ace-white)]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
        <Badge topText={t('top')} bottomText={t('bottom')} />
      </div>
    </SectionWrapper>
  );
}
