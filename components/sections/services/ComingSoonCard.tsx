"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from 'next-intl';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ComingSoonCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: readonly string[] | string[];
  badge: string;
  teaser: string;
  className?: string;
  delay?: number;
}

export default function ComingSoonCard({
  title,
  subtitle,
  features,
  badge,
  teaser,
  className,
  delay = 0,
}: ComingSoonCardProps) {
  const t = useTranslations('common');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 40,
        rotateY: 8,
        duration: 0.8,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [delay]);

  // Show only first 2 features, rest as "..."
  const visibleFeatures = features.slice(0, 2);
  const hasMore = features.length > 2;

  return (
    <div
      ref={cardRef}
      className={cn(
        "teaser-card-light relative rounded-2xl p-6 md:p-8 h-full",
        "transform-gpu perspective-1000",
        className
      )}
    >
      {/* Animated shimmer border overlay */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 shimmer opacity-30" />
      </div>

      {/* Badge */}
      <div className="absolute -top-3 right-6">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[var(--ace-gold)] text-[var(--ace-black)] text-xs font-semibold uppercase tracking-wider rounded-full badge-glow">
          <span className="w-1.5 h-1.5 bg-[var(--ace-black)] rounded-full animate-pulse" />
          {badge}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold font-[var(--font-playfair)] text-[var(--ace-black)] mb-2">
          {title}
        </h3>

        {/* Subtitle */}
        <p className="text-[var(--ace-gold)] text-lg mb-4">{subtitle}</p>

        {/* Teaser text */}
        <p className="text-[var(--ace-gray)] text-sm italic mb-6">{teaser}</p>

        {/* Features preview */}
        <div className="mt-auto">
          <ul className="space-y-2">
            {visibleFeatures.map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-[var(--ace-black)]/70"
              >
                <svg
                  className="w-4 h-4 text-[var(--ace-gold)]/60 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
            {hasMore && (
              <li className="flex items-center gap-3 text-[var(--ace-black)]/40">
                <span className="w-4 h-4 flex items-center justify-center text-[var(--ace-gold)]/40">
                  ...
                </span>
                <span className="text-sm italic">
                  {t('andMore')}
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-6 pt-4 border-t border-[var(--ace-gold)]/10">
          <div className="flex items-center gap-2 text-[var(--ace-gray)] text-xs">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{t('comingSoon')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
