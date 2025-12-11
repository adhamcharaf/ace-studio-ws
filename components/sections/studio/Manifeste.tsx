"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ManifesteLine {
  text: string;
  accent: string;
}

export default function Manifeste() {
  const t = useTranslations('studio');
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const manifesteLines = t.raw('manifeste') as ManifesteLine[];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each card animates in on scroll with 3D effect
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.set(card, {
          opacity: 0,
          rotateX: 15,
          y: 100,
          scale: 0.9,
          transformPerspective: 1000,
          transformOrigin: "center bottom",
        });

        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          end: "top 40%",
          once: true,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              rotateX: 0,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.1,
              ease: "power3.out",
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Highlight accent words
  const renderText = (text: string, accent: string) => {
    const parts = text.split(accent);
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          <span className="text-[var(--ace-gold)] relative">
            {accent}
            <span
              className="absolute -bottom-1 left-0 w-full h-px bg-[var(--ace-gold)] opacity-50"
              style={{ transform: "scaleX(0.8)" }}
            />
          </span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden bg-[var(--theme-background)]"
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--ace-gold) 1px, transparent 1px),
                           linear-gradient(90deg, var(--ace-gold) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Vertical gold line accent */}
      <div className="absolute left-8 md:left-16 lg:left-24 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--ace-gold)] to-transparent opacity-20" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Cards container */}
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
          {manifesteLines.map((line, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="manifeste-card group relative"
            >
              {/* Card background with glass effect */}
              <div
                className="relative p-8 md:p-12 rounded-2xl transition-all duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(201, 160, 80, 0.03) 0%, rgba(201, 160, 80, 0.01) 100%)",
                  border: "1px solid rgba(201, 160, 80, 0.1)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.05)",
                }}
              >
                {/* Number indicator */}
                <div className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <span
                    className="text-6xl md:text-8xl font-bold font-[var(--font-playfair)] opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ color: "var(--ace-gold)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Text */}
                <p className="text-2xl md:text-3xl lg:text-4xl font-light text-[var(--theme-text)] leading-relaxed pl-8 md:pl-12">
                  {renderText(line.text, line.accent)}
                </p>

                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 60px rgba(201, 160, 80, 0.05), 0 0 40px rgba(201, 160, 80, 0.03)",
                  }}
                />

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <svg viewBox="0 0 64 64" className="w-full h-full">
                    <path
                      d="M64 0 L64 16 L48 16 L48 32 L32 32 L32 48 L16 48 L16 64 L0 64"
                      fill="none"
                      stroke="var(--ace-gold)"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
