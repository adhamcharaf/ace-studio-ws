"use client";

import { useTranslations } from 'next-intl';
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function QuickInfoCard() {
  const t = useTranslations('contact.quickInfo');
  const tTime = useTranslations('timeGreetings');

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return tTime('morning');
    if (hour >= 12 && hour < 14) return tTime('lunch');
    if (hour >= 14 && hour < 18) return tTime('afternoon');
    if (hour >= 18 && hour < 22) return tTime('evening');
    return tTime('night');
  };

  const greeting = getGreeting();

  return (
    <div className="bento-card lg:col-span-1 lg:row-span-1">
      <div
        className={cn(
          "relative h-full bg-[var(--theme-surface)] rounded-2xl p-6 md:p-8",
          "border border-[var(--theme-text)]/5",
          "shadow-premium hover:shadow-premium-hover transition-all duration-300",
          "flex flex-col justify-between",
          "min-h-[280px]"
        )}
      >
        {/* Decorative corner */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[var(--ace-gold)]/30 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[var(--ace-gold)]/30 rounded-bl-lg" />

        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-6 font-[var(--font-playfair)] text-[var(--theme-text)]">
            {t('title')}
          </h3>

          <div className="space-y-4">
            {/* Location */}
            <div className="flex items-start gap-3 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--ace-gold)]/10 flex items-center justify-center group-hover:bg-[var(--ace-gold)]/20 transition-colors">
                <svg
                  className="w-5 h-5 text-[var(--ace-gold)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[var(--theme-text-muted)] uppercase tracking-wider mb-0.5">
                  {t('location')}
                </p>
                <p className="text-[var(--theme-text)] font-medium">
                  {SITE_CONFIG.location}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--ace-gold)]/10 flex items-center justify-center group-hover:bg-[var(--ace-gold)]/20 transition-colors">
                <svg
                  className="w-5 h-5 text-[var(--ace-gold)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[var(--theme-text-muted)] uppercase tracking-wider mb-0.5">
                  {t('email')}
                </p>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-[var(--theme-text)] font-medium hover:text-[var(--ace-gold)] transition-colors link-underline"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic greeting based on time */}
        <div className="mt-6 pt-4 border-t border-[var(--theme-text)]/5">
          <p className="text-sm text-[var(--theme-text-muted)] italic">
            {greeting}
          </p>
        </div>
      </div>
    </div>
  );
}
