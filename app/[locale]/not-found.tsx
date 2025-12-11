"use client";

import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { SpadeAnimation } from "@/components/easter-eggs";
import { Button } from "@/components/ui";

export default function NotFound() {
  const t = useTranslations('notFound');
  const tCommon = useTranslations('common');
  const [showBonus, setShowBonus] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBonus(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--ace-white)] px-4">
      {/* Animated Spade */}
      <SpadeAnimation size="lg" />

      {/* 404 Text */}
      <h1 className="text-7xl md:text-9xl font-bold mt-8 text-[var(--ace-black)] font-[var(--font-playfair)]">
        {t('title')}
      </h1>

      {/* Message */}
      <p className="text-xl md:text-2xl text-[var(--ace-gray)] mt-6 text-center max-w-md">
        {t('message')}
      </p>

      {/* Bonus Easter Egg - appears after 10 seconds */}
      {showBonus && (
        <p className="text-[var(--ace-gold)] mt-4 animate-fade-in text-lg">
          {t('bonus')}
        </p>
      )}

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <Button href="/" variant="primary">
          {tCommon('backToHome')}
        </Button>
        <Button href="/contact" variant="secondary">
          {tCommon('contactUs')}
        </Button>
      </div>
    </div>
  );
}
