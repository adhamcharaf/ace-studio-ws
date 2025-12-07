"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui";
import Logo from "@/components/layout/Logo";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      if (logoRef.current) {
        tl.from(logoRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          ease: "back.out(1.7)",
        });
      }

      if (titleRef.current) {
        tl.from(
          titleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }

      if (taglineRef.current) {
        tl.from(
          taglineRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }

      if (ctaRef.current) {
        tl.from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-mesh"
    >
      {/* Diagonal Lines Pattern */}
      <div className="absolute inset-0 bg-diagonal-gold" />

      {/* Large decorative circle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[var(--ace-gold)] opacity-[0.12] pointer-events-none"
      />

      {/* Floating Glow Circles - Larger and more visible */}
      <div
        className="glow-circle-gold floating-shape"
        style={{ top: '5%', left: '5%', width: '500px', height: '500px' }}
      />
      <div
        className="glow-circle-gold floating-shape"
        style={{ bottom: '10%', right: '0%', width: '600px', height: '600px', animationDelay: '-10s' }}
      />

      {/* Decorative lines */}
      <div className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent via-[var(--ace-gold)] to-transparent opacity-50" />
      <div className="absolute bottom-1/3 right-0 w-40 h-px bg-gradient-to-l from-transparent via-[var(--ace-gold)] to-transparent opacity-40" />
      <div className="absolute top-2/3 left-0 w-24 h-px bg-gradient-to-r from-transparent via-[var(--ace-gold)] to-transparent opacity-30" />

      {/* Radial Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(248,246,243,0.2) 50%, rgba(248,246,243,0.6) 100%)',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 text-center">
        {/* Logo */}
        <div ref={logoRef} className="mb-8">
          <Logo className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto" variant="black" />
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-[var(--font-playfair)] text-gradient-gold-simple"
        >
          {SITE_CONFIG.name}
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-xl md:text-2xl lg:text-3xl text-[var(--ace-gray)] mb-12 max-w-2xl mx-auto"
        >
          {SITE_CONFIG.tagline}
        </p>

        {/* CTA */}
        <div ref={ctaRef}>
          <Button href="/contact" size="lg">
            Discutons de votre projet
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-[var(--ace-gold)] drop-shadow-[0_0_8px_rgba(201,160,80,0.4)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
