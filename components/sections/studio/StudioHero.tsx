"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlowCircle, DecorativeLine } from "@/components/decorative";

gsap.registerPlugin(ScrollTrigger);

export default function StudioHero() {
  const t = useTranslations('studio.hero');
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation on load
      const tl = gsap.timeline({ delay: 0.2 });

      // Line 1: "On en avait marre."
      if (line1Ref.current) {
        const chars1 = line1Ref.current.querySelectorAll(".char");
        tl.from(chars1, {
          opacity: 0,
          y: 50,
          rotateX: -90,
          stagger: 0.03,
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      }

      // Line 2: "Marre des sites..." - appears on scroll
      if (line2Ref.current) {
        const chars2 = line2Ref.current.querySelectorAll(".char");

        gsap.set(chars2, { opacity: 0, y: 30 });

        ScrollTrigger.create({
          trigger: line2Ref.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(chars2, {
              opacity: 1,
              y: 0,
              stagger: 0.02,
              duration: 0.4,
              ease: "power2.out",
            });
          },
        });
      }

      // Parallax effect on decorative elements
      gsap.to(".parallax-slow", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".parallax-fast", {
        yPercent: -40,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Split text into characters
  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
      >
        {char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-mesh"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-diagonal-gold opacity-30" />

      {/* Glow circles with parallax */}
      <div className="parallax-slow">
        <GlowCircle
          size="lg"
          position={{ top: "-10%", right: "-15%" }}
          delay={-2}
        />
      </div>
      <div className="parallax-fast">
        <GlowCircle
          size="md"
          position={{ bottom: "20%", left: "-10%" }}
          delay={-5}
        />
      </div>

      {/* Large decorative "A" watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden parallax-slow">
        <span
          className="font-[var(--font-playfair)] text-[50rem] md:text-[70rem] font-bold leading-none select-none opacity-[0.02]"
          style={{ color: "var(--ace-gold)" }}
        >
          A
        </span>
      </div>

      {/* Decorative lines */}
      <DecorativeLine position="left" top="25%" width={120} opacity={0.3} />
      <DecorativeLine position="right" top="60%" width={80} opacity={0.2} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 text-center">
        {/* Line 1 */}
        <div ref={line1Ref} className="mb-6">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-[var(--font-playfair)]"
            style={{
              color: "var(--theme-text)",
              textShadow: "0 0 80px rgba(201, 160, 80, 0.15)",
            }}
          >
            {splitText(t('line1'))}
          </h1>
        </div>

        {/* Line 2 */}
        <div ref={line2Ref} className="mt-8">
          <p
            className="text-2xl md:text-4xl lg:text-5xl font-light text-[var(--theme-text-muted)] max-w-4xl mx-auto"
            style={{
              lineHeight: 1.4,
            }}
          >
            {splitText(t('line2'))}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-[var(--theme-text-muted)]">
          <span className="text-xs uppercase tracking-[0.3em]">{t('scroll')}</span>
          <div className="w-px h-12 bg-gradient-to-b from-[var(--ace-gold)] to-transparent animate-pulse" />
        </div>
      </div>

      {/* Gradient fade at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--theme-background))"
        }}
      />
    </section>
  );
}
