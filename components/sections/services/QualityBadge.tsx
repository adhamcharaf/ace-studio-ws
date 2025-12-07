"use client";

import { SectionWrapper, Badge } from "@/components/ui";

export default function QualityBadge() {
  return (
    <SectionWrapper className="bg-[var(--ace-white)]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
        <Badge topText="0% template" bottomText="100% sur mesure" />
      </div>
    </SectionWrapper>
  );
}
