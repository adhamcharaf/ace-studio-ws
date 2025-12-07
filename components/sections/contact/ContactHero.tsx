"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { lerp } from "@/lib/utils";
import { GlowCircle, DecorativeLine } from "@/components/decorative";
import TextScramble from "@/components/ui/TextScramble";

export default function ContactHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  const [titleComplete, setTitleComplete] = useState(false);

  // Store mouse position in ref to avoid re-renders
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0 });

  // Mouse tracking effect - separate from animation loop
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation loop - runs independently
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let animationId: number;

    const animate = () => {
      // Different parallax strengths for each orb
      const targetX1 = mouseRef.current.x * 40;
      const targetY1 = mouseRef.current.y * 30;
      const targetX2 = mouseRef.current.x * -30;
      const targetY2 = mouseRef.current.y * -25;
      const targetX3 = mouseRef.current.x * 20;
      const targetY3 = mouseRef.current.y * 35;

      currentPos.current.x1 = lerp(currentPos.current.x1, targetX1, 0.08);
      currentPos.current.y1 = lerp(currentPos.current.y1, targetY1, 0.08);
      currentPos.current.x2 = lerp(currentPos.current.x2, targetX2, 0.06);
      currentPos.current.y2 = lerp(currentPos.current.y2, targetY2, 0.06);
      currentPos.current.x3 = lerp(currentPos.current.x3, targetX3, 0.1);
      currentPos.current.y3 = lerp(currentPos.current.y3, targetY3, 0.1);

      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(${currentPos.current.x1}px, ${currentPos.current.y1}px)`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(${currentPos.current.x2}px, ${currentPos.current.y2}px)`;
      }
      if (orb3Ref.current) {
        orb3Ref.current.style.transform = `translate(${currentPos.current.x3}px, ${currentPos.current.y3}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Entry animations for subtitle and scroll indicator
  useEffect(() => {
    if (!titleComplete) return;

    const ctx = gsap.context(() => {
      // Animate subtitle
      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      // Animate scroll indicator with delay
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.3,
          ease: "power2.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [titleComplete]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-[var(--theme-background)]"
    >
      {/* Parallax Glow Orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-[10%] right-[5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] pointer-events-none will-change-transform"
      >
        <GlowCircle size="lg" position={{ top: "0", right: "0" }} delay={0} />
      </div>

      <div
        ref={orb2Ref}
        className="absolute bottom-[5%] left-[-5%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] pointer-events-none will-change-transform"
      >
        <GlowCircle size="md" position={{ bottom: "0", left: "0" }} delay={-5} />
      </div>

      <div
        ref={orb3Ref}
        className="absolute top-[40%] left-[10%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] pointer-events-none will-change-transform"
      >
        <GlowCircle size="sm" position={{ top: "0", left: "0" }} delay={-10} />
      </div>

      {/* Decorative Lines */}
      <DecorativeLine position="left" top="25%" width={120} opacity={0.4} />
      <DecorativeLine position="right" top="60%" width={100} opacity={0.35} />
      <DecorativeLine position="left" bottom="30%" width={80} opacity={0.25} />

      {/* Large decorative circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-[var(--ace-gold)] opacity-[0.08] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 text-center">
        {/* Main Title with Scramble Effect */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 font-[var(--font-playfair)] text-[var(--theme-text)]">
          <TextScramble
            text="Parlons."
            delay={300}
            duration={1200}
            onComplete={() => setTitleComplete(true)}
          />
        </h1>

        {/* Subtitle - starts hidden, animated in */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-[var(--theme-text-muted)] max-w-2xl mx-auto opacity-0 translate-y-5"
        >
          Votre projet mérite mieux qu&apos;un template.
        </p>
      </div>

      {/* Scroll Indicator - starts hidden, animated in */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-0 -translate-y-5"
      >
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
