"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { GlowCircle } from "@/components/decorative";

export default function ServicesHeader() {
  const sectionRef = useRef<HTMLElement>(null);
  const smallTextRef = useRef<HTMLSpanElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Small text slides in from left
      tl.from(smallTextRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.6,
        ease: "power3.out",
      });

      // Main title scales and fades in dramatically
      tl.from(
        mainTitleRef.current,
        {
          opacity: 0,
          scale: 1.15,
          y: 80,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.3"
      );

      // Tagline fades in
      tl.from(
        taglineRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // Scroll indicator fades in
      tl.from(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center bg-[var(--theme-background)] overflow-hidden"
    >
      {/* Decorative gold orbs with parallax feel */}
      <GlowCircle
        size="lg"
        position={{ top: "10%", right: "-10%" }}
        delay={-2}
      />
      <GlowCircle
        size="md"
        position={{ bottom: "20%", left: "-8%" }}
        delay={-5}
      />
      <GlowCircle
        size="sm"
        position={{ top: "60%", right: "20%" }}
        delay={-10}
      />

      {/* Diagonal decorative lines */}
      <div
        className="absolute top-20 left-10 w-px h-40 bg-gradient-to-b from-[var(--ace-gold)] to-transparent opacity-30"
        style={{ transform: "rotate(-20deg)" }}
      />
      <div
        className="absolute bottom-32 right-16 w-px h-32 bg-gradient-to-t from-[var(--ace-gold)] to-transparent opacity-25"
        style={{ transform: "rotate(25deg)" }}
      />

      {/* Main content - Asymmetric layout */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Small accent text */}
          <span
            ref={smallTextRef}
            className="block text-[var(--ace-gold)] text-sm md:text-base tracking-[0.3em] uppercase mb-4 md:mb-6"
          >
            Ce qu&apos;on fait de mieux
          </span>

          {/* Massive title */}
          <h1
            ref={mainTitleRef}
            className="text-massive font-bold font-[var(--font-playfair)] text-[var(--theme-text)] leading-none mb-6 md:mb-8"
          >
            Services
          </h1>

          {/* Tagline with gold accent */}
          <p
            ref={taglineRef}
            className="text-xl md:text-2xl lg:text-3xl text-[var(--theme-text-muted)] max-w-xl"
          >
            Des sites qui{" "}
            <span className="text-[var(--ace-gold)] italic font-[var(--font-playfair)]">
              travaillent
            </span>{" "}
            pour vous.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
        onClick={handleScrollDown}
      >
        <span className="text-[var(--ace-gray)] text-xs tracking-widest uppercase group-hover:text-[var(--ace-gold)] transition-colors">
          Découvrir
        </span>
        <div className="scroll-indicator">
          <svg
            className="w-6 h-6 text-[var(--ace-gold)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Art Deco corner accent - bottom right */}
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--ace-gold)]">
          <path
            d="M100 100 L0 100 L0 80 L80 80 L80 0 L100 0 Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path
            d="M100 100 L50 100 L50 90 L90 90 L90 50 L100 50 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
