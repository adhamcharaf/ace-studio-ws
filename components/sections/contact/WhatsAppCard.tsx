"use client";

import { useState, useCallback } from "react";
import { useTranslations } from 'next-intl';
import { MagneticButton } from "@/components/ui";
import { WHATSAPP_LINK } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function WhatsAppCard() {
  const t = useTranslations('contact.whatsapp');
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Easter egg after 5 hesitant clicks
    if (newCount >= 5 && !showEasterEgg) {
      setShowEasterEgg(true);
      // Reset after showing
      setTimeout(() => {
        setShowEasterEgg(false);
        setClickCount(0);
      }, 4000);
    }
  }, [clickCount, showEasterEgg]);

  return (
    <div className="bento-card lg:col-span-1 lg:row-span-1">
      <div
        className={cn(
          "relative h-full bg-[var(--theme-surface)] rounded-2xl p-6 md:p-8",
          "border border-[var(--theme-text)]/5",
          "shadow-premium hover:shadow-premium-hover transition-all duration-300",
          "flex flex-col items-center justify-center text-center",
          "min-h-[280px]"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* WhatsApp Icon with glow */}
        <div className="relative mb-6">
          <div
            className={cn(
              "absolute inset-0 bg-[#25D366] rounded-full blur-xl transition-opacity duration-500",
              isHovered ? "opacity-40" : "opacity-20"
            )}
          />
          <div className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-bold mb-2 font-[var(--font-playfair)] text-[var(--theme-text)]">
          {t('title')}
        </h3>

        <p className="text-sm text-[var(--theme-text-muted)] mb-6">
          {t('subtitle')}
        </p>

        {/* Badge with hover change */}
        <div className="mb-6">
          <span
            className={cn(
              "inline-block px-4 py-1.5 rounded-full text-xs font-medium",
              "bg-[var(--ace-gold)]/10 text-[var(--ace-gold)]",
              "transition-all duration-300"
            )}
          >
            {isHovered ? t('badgeHover') : t('badgeDefault')}
          </span>
        </div>

        {/* Magnetic Button */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="w-full"
        >
          <MagneticButton
            variant="primary"
            size="md"
            className="w-full bg-[#25D366] hover:bg-[#128C7E]"
            magnetStrength={0.4}
            magnetDistance={80}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            {t('button')}
          </MagneticButton>
        </a>

        {/* Easter Egg Message */}
        {showEasterEgg && (
          <div
            className={cn(
              "absolute bottom-4 left-4 right-4 p-3 rounded-xl",
              "bg-[var(--ace-gold)] text-[var(--ace-black)]",
              "text-sm font-medium text-center",
              "animate-slide-up"
            )}
          >
            {t('easterEgg')}
          </div>
        )}
      </div>
    </div>
  );
}
