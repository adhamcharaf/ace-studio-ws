"use client";

import React from "react";
import { useTranslations, useLocale } from 'next-intl';
import { useStaggerAnimation } from "@/lib/hooks";
import { Button, Card } from "@/components/ui";

// Placeholder icons for services
const ServiceIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactNode> = {
    vitrine: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    ambitieux: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    identite: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  };

  return icons[type] || icons.vitrine;
};

const SERVICE_KEYS = ['vitrine', 'ambitieux', 'identite'] as const;

export default function ServicesPreview() {
  const t = useTranslations('services');
  const tPreview = useTranslations('servicesPreview');
  const locale = useLocale();

  const containerRef = useStaggerAnimation<HTMLDivElement>(".service-card", "slide-up", {
    stagger: 0.15,
  });

  return (
    <section className="section-framed relative py-16 md:py-24 lg:py-32 bg-cream-rich overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-40" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-[var(--font-playfair)] text-[var(--theme-text)]">
          {tPreview('title')}
        </h2>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {SERVICE_KEYS.map((key) => (
            <Card
              key={key}
              className="service-card"
              icon={<ServiceIcon type={key} />}
              title={t(`${key}.title`)}
              description={t(`${key}.subtitle`)}
              href={`/${locale}/services`}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button href={`/${locale}/services`} variant="secondary">
            {tPreview('cta')}
          </Button>
        </div>
      </div>
    </section>
  );
}
