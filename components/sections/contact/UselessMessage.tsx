"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useTranslations } from 'next-intl';

function UselessMessageContent() {
  const t = useTranslations('contact');
  const searchParams = useSearchParams();
  const fromUseless = searchParams.get("from") === "useless";

  if (!fromUseless) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
      <div className="bg-[var(--ace-gold)] text-[var(--ace-black)] px-6 py-3 rounded-full shadow-lg text-sm md:text-base font-medium">
        {t('uselessMessage')}
      </div>
    </div>
  );
}

export default function UselessMessage() {
  return (
    <Suspense fallback={null}>
      <UselessMessageContent />
    </Suspense>
  );
}
