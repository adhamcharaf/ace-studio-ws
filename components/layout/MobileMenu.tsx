"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from 'next-intl';
import gsap from "gsap";
import { cn } from "@/lib/utils";
import DontClickButton from "../easter-eggs/DontClickButton";
import Logo from "./Logo";

// Navigation structure (hrefs are relative, will be prefixed with locale)
const NAVIGATION_KEYS = [
  { key: "home", href: "" },
  { key: "studio", href: "/le-studio" },
  { key: "services", href: "/services" },
  { key: "contact", href: "/contact" },
] as const;

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const t = useTranslations('navigation');
  const tSite = useTranslations('siteConfig');
  const tMeta = useTranslations('metadata');
  const tAccess = useTranslations('accessibility');
  const locale = useLocale();

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

  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = "hidden";

      // Animate menu in
      if (menuRef.current && linksRef.current) {
        gsap.fromTo(
          menuRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }
        );

        gsap.fromTo(
          linksRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.1,
            ease: "power2.out",
          }
        );
      }
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Close on route change (but not on initial mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onClose();
  }, [pathname, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-[100] bg-[var(--ace-black)]"
      onClick={onClose}
    >
      <div
        className="h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <Logo className="w-10 h-10" variant="white" />
            <span className="text-xl font-bold text-[var(--ace-white)] font-[var(--font-playfair)]">
              {tMeta('siteName')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[var(--ace-white)] hover:text-[var(--ace-gold)] transition-colors"
            aria-label={tAccess('closeMenu')}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          ref={linksRef}
          className="flex-1 flex flex-col items-center justify-center space-y-8"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-3xl font-semibold transition-colors duration-200",
                "font-[var(--font-playfair)]",
                isActivePath(item.href)
                  ? "text-[var(--ace-gold)]"
                  : "text-[var(--ace-white)] hover:text-[var(--ace-gold)]"
              )}
            >
              {item.name}
            </Link>
          ))}

          {/* DON'T CLICK in mobile */}
          <div className="pt-4">
            <DontClickButton variant="mobile" />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center">
          <p className="text-[var(--ace-gray)] text-sm">
            {tSite('tagline')}
          </p>
        </div>
      </div>
    </div>
  );
}
