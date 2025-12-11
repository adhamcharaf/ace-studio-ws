"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from 'next-intl';
import { useScroll } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import DontClickButton from "../easter-eggs/DontClickButton";
import Logo from "./Logo";
import { LanguageSwitcher } from "@/components/ui";

// Navigation structure (hrefs are relative, will be prefixed with locale)
const NAVIGATION_KEYS = [
  { key: "home", href: "" },
  { key: "studio", href: "/le-studio" },
  { key: "services", href: "/services" },
  { key: "contact", href: "/contact" },
] as const;

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);
  const { isScrolled } = useScroll(50);
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const tAccess = useTranslations('accessibility');
  const locale = useLocale();

  // Intersection Observer to detect dark sections
  useEffect(() => {
    const observeDarkSections = () => {
      const darkSections = document.querySelectorAll("[data-dark-section]");

      if (darkSections.length === 0) {
        setIsOverDarkSection(false);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          // Check if any dark section is at the top of the viewport (header zone)
          let isOverDark = false;

          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const rect = entry.boundingClientRect;
              // Section is considered "under header" if its top is above 100px from viewport top
              if (rect.top <= 100 && rect.bottom > 0) {
                isOverDark = true;
              }
            }
          });

          setIsOverDarkSection(isOverDark);
        },
        {
          // Observe only the top portion of the viewport where the header lives
          rootMargin: "0px 0px -85% 0px",
          threshold: [0, 0.1],
        }
      );

      darkSections.forEach((section) => observer.observe(section));

      return () => observer.disconnect();
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(observeDarkSections, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]); // Re-run when route changes

  // Determine if we should use light (white) text
  const useLightText = isOverDarkSection && !isScrolled;

  // Memoized close handler to prevent useEffect re-triggers in MobileMenu
  const handleCloseMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Build localized navigation items
  const navigation = NAVIGATION_KEYS.map((item) => ({
    name: t(item.key),
    href: `/${locale}${item.href}`,
  }));

  // Check if current path matches nav item
  const isActivePath = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-[var(--theme-background)]/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.05)] py-3"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center group"
              aria-label={tAccess('backToHome')}
            >
              <Logo
                variant={useLightText ? "white" : "black"}
                className={cn(
                  "h-32 md:h-40 w-auto transition-all duration-300 -my-10 md:-my-12",
                  "group-hover:scale-105"
                )}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 link-underline",
                    isActivePath(item.href)
                      ? "text-[var(--theme-accent)] drop-shadow-[0_0_6px_rgba(201,160,80,0.3)]"
                      : useLightText
                        ? "text-white hover:text-[var(--theme-accent)]"
                        : "text-[var(--theme-text)] hover:text-[var(--theme-accent)]"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              {/* Language Switcher */}
              <LanguageSwitcher variant={useLightText ? 'light' : 'default'} />

              {/* DON'T CLICK Easter Egg */}
              <DontClickButton />
            </div>

            {/* Mobile: Language Switcher + Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher variant={useLightText ? 'light' : 'default'} />

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(true);
                }}
                className={cn(
                  "p-3 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center",
                  "transition-colors touch-manipulation",
                  useLightText
                    ? "text-white hover:text-[var(--theme-accent)]"
                    : "text-[var(--theme-text)] hover:text-[var(--theme-accent)]"
                )}
                aria-label={tAccess('openMenu')}
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
      />
    </>
  );
}
