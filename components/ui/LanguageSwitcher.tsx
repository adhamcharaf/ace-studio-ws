"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  variant?: 'default' | 'light';
  className?: string;
}

export default function LanguageSwitcher({ variant = 'default', className }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    // Retirer la locale actuelle du pathname et ajouter la nouvelle
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    // Sauvegarder la préférence dans un cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; samesite=lax`;

    router.push(newPath);
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {locales.map((loc, index) => (
        <span key={loc} className="flex items-center">
          <button
            onClick={() => switchLocale(loc)}
            className={cn(
              "text-sm font-medium transition-all duration-300 px-2 py-1 rounded",
              locale === loc
                ? "text-[var(--ace-gold)] bg-[var(--ace-gold)]/10"
                : variant === 'light'
                  ? "text-white/70 hover:text-[var(--ace-gold)] hover:bg-white/5"
                  : "text-[var(--theme-text-muted)] hover:text-[var(--ace-gold)] hover:bg-[var(--ace-gold)]/5"
            )}
            aria-label={`Switch to ${localeNames[loc]}`}
            aria-current={locale === loc ? 'true' : undefined}
          >
            {loc.toUpperCase()}
          </button>
          {index < locales.length - 1 && (
            <span className={cn(
              "text-xs mx-0.5",
              variant === 'light' ? "text-white/30" : "text-[var(--theme-text-muted)]/30"
            )}>
              |
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
