"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UselessButton } from "@/components/easter-eggs";
import { GlowCircle, DecorativeLine } from "@/components/decorative";

gsap.registerPlugin(ScrollTrigger);

export default function StudioPersonality() {
  const t = useTranslations('studio.personality');
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const elements = contentRef.current?.querySelectorAll(".fade-item");

      if (elements) {
        gsap.set(elements, { opacity: 0, y: 30 });

        ScrollTrigger.create({
          trigger: contentRef.current,
          start: "top 75%",
          onEnter: () => {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.out",
            });
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden bg-[var(--theme-background-alt)]"
    >
      {/* Decorative elements */}
      <GlowCircle
        size="lg"
        position={{ bottom: "-20%", right: "-10%" }}
        delay={-3}
      />
      <DecorativeLine position="left" top="30%" width={80} opacity={0.25} />

      {/* Large decorative circle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          border: "1px solid rgba(201, 160, 80, 0.06)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div ref={contentRef} className="text-center max-w-3xl mx-auto">
          {/* Main title */}
          <h2 className="fade-item text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-[var(--font-playfair)] text-[var(--theme-text)]">
            {t('title')}
          </h2>

          {/* Personality descriptions */}
          <div className="fade-item space-y-4 mb-16">
            <p className="text-xl md:text-2xl text-[var(--theme-text-muted)]">
              {t.rich('description1', {
                passionate: (chunks) => <span className="text-[var(--ace-gold)]">{chunks}</span>,
                creative: (chunks) => <span className="text-[var(--ace-gold)]">{chunks}</span>,
                neverBoring: (chunks) => <span className="text-[var(--ace-gold)]">{chunks}</span>,
              })}
            </p>
            <p className="text-lg md:text-xl text-[var(--theme-text-muted)] opacity-80">
              {t('description2')}
            </p>
          </div>

          {/* Divider */}
          <div className="fade-item flex items-center justify-center gap-4 mb-12">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[var(--ace-gold)] opacity-40" />
            <div className="w-2 h-2 rounded-full bg-[var(--ace-gold)] opacity-40" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[var(--ace-gold)] opacity-40" />
          </div>

          {/* Easter Egg: Useless Button */}
          <div className="fade-item">
            <UselessButton />
          </div>
        </div>
      </div>
    </section>
  );
}
