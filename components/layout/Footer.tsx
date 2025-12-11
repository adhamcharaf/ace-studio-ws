"use client";

import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { useTime } from "@/lib/hooks";
import Logo from "./Logo";
import { Button } from "../ui";

// Navigation structure (hrefs are relative, will be prefixed with locale)
const NAVIGATION_KEYS = [
  { key: "home", href: "" },
  { key: "studio", href: "/le-studio" },
  { key: "services", href: "/services" },
  { key: "contact", href: "/contact" },
] as const;

export default function Footer() {
  const { formatted } = useTime();
  const t = useTranslations('footer');
  const tNav = useTranslations('navigation');
  const tSite = useTranslations('siteConfig');
  const tMeta = useTranslations('metadata');
  const tTime = useTranslations('timeGreetings');
  const locale = useLocale();

  // Build localized navigation items
  const navigation = NAVIGATION_KEYS.map((item) => ({
    name: tNav(item.key),
    href: `/${locale}${item.href}`,
  }));

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return tTime('morning');
    if (hour >= 12 && hour < 14) return tTime('lunch');
    if (hour >= 14 && hour < 18) return tTime('afternoon');
    if (hour >= 18 && hour < 22) return tTime('evening');
    return tTime('night');
  };

  return (
    <footer className="relative">
      {/* Art Deco Divider */}
      <div className="bg-[var(--ace-black)]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="divider-art-deco">
            <div className="divider-art-deco-lines left">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="divider-art-deco-diamond"></div>
            <div className="divider-art-deco-lines right">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content - Centered Layout */}
      <div className="footer-gradient text-[var(--ace-white)]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">

          {/* Centered Logo */}
          <div className="flex justify-center mb-10">
            <Logo className="h-28 w-auto" variant="gold" />
          </div>

          {/* Tagline */}
          <p className="text-center text-[var(--ace-gray)] text-lg mb-10 max-w-md mx-auto">
            {tSite('tagline')}
          </p>

          {/* Navigation - Horizontal */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12">
            {navigation.map((item, index) => (
              <div key={item.href} className="flex items-center">
                <Link
                  href={item.href}
                  className="text-[var(--ace-gray)] hover:text-[var(--ace-gold)] transition-colors duration-300 text-sm uppercase tracking-wider"
                >
                  {item.name}
                </Link>
                {index < navigation.length - 1 && (
                  <span className="ml-8 w-1 h-1 rounded-full bg-[var(--ace-gold)]/40 hidden md:block" />
                )}
              </div>
            ))}
          </nav>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--ace-gold)]/30" />
            <div className="w-2 h-2 rotate-45 border border-[var(--ace-gold)]/40" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--ace-gold)]/30" />
          </div>

          {/* CTA Section - Elegant */}
          <div className="text-center mb-10">
            <p className="text-2xl md:text-3xl font-[var(--font-playfair)] text-[var(--ace-white)] mb-3">
              {t('cta.title')}
            </p>
            <p className="text-[var(--ace-gray)] mb-6">
              {t('cta.subtitle')}
            </p>
            <Button href={`/${locale}/contact`} variant="primary" size="md">
              {t('cta.button')}
            </Button>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center text-[var(--ace-gray)] text-sm">
            <svg className="w-4 h-4 mr-2 text-[var(--ace-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {tSite('location')}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Made With */}
              <p className="text-[var(--ace-gray)] text-sm order-2 md:order-1">
                {t.rich('madeWith', {
                  coffee: (chunks) => <span className="text-[var(--ace-gold)]">{chunks}</span>,
                  templates: (chunks) => <span className="font-semibold text-[var(--ace-white)]">{chunks}</span>
                })}
              </p>

              {/* Dynamic Time - Center */}
              <p className="text-[var(--ace-gray)] text-sm order-1 md:order-2">
                {t('timePrefix')}{" "}
                <span className="text-[var(--ace-gold)] font-medium">{formatted}</span>
                <span className="mx-2">•</span>
                <span className="text-[var(--ace-white)]/80">{getGreeting()}</span>
              </p>

              {/* Copyright */}
              <p className="text-[var(--ace-gray)] text-sm order-3">
                &copy; {new Date().getFullYear()} {tMeta('siteName')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
