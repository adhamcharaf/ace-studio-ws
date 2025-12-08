"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxDecorationsProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export default function ParallaxDecorations({ containerRef }: ParallaxDecorationsProps) {
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const elements = [
        { el: topLeftRef.current, speed: 0.15 },
        { el: topRightRef.current, speed: 0.15 },
        { el: bottomLeftRef.current, speed: -0.15 },
        { el: bottomRightRef.current, speed: -0.15 },
        { el: watermarkRef.current, speed: -0.08 },
      ];

      elements.forEach(({ el, speed }) => {
        if (!el) return;

        gsap.to(el, {
          y: () => speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    });

    return () => ctx.revert();
  }, [containerRef]);

  return (
    <>
      {/* Art Deco corner accents with parallax */}
      <div
        ref={topLeftRef}
        className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[var(--ace-gold)]/20"
        style={{ willChange: "transform" }}
      />
      <div
        ref={topRightRef}
        className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[var(--ace-gold)]/20"
        style={{ willChange: "transform" }}
      />
      <div
        ref={bottomLeftRef}
        className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[var(--ace-gold)]/20"
        style={{ willChange: "transform" }}
      />
      <div
        ref={bottomRightRef}
        className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[var(--ace-gold)]/20"
        style={{ willChange: "transform" }}
      />

      {/* Giant quotation mark watermark with parallax */}
      <div
        ref={watermarkRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true"
        style={{ willChange: "transform" }}
      >
        <span
          className="block font-[var(--font-playfair)] text-[var(--ace-gold)]/[0.04] leading-none"
          style={{ fontSize: "clamp(20rem, 50vw, 45rem)" }}
        >
          "
        </span>
      </div>
    </>
  );
}
