"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui";
import { GlowCircle } from "@/components/decorative";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoWatermarkRef = useRef<HTMLDivElement>(null);
  const glowCircle1Ref = useRef<HTMLDivElement>(null);
  const glowCircle2Ref = useRef<HTMLDivElement>(null);
  const glowCircle3Ref = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const accentTextRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const cornerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states (hidden)
      gsap.set(logoWatermarkRef.current, {
        scale: 0.8,
        opacity: 0,
      });
      gsap.set([glowCircle1Ref.current, glowCircle2Ref.current, glowCircle3Ref.current], {
        scale: 0.5,
        opacity: 0,
      });
      gsap.set([line1Ref.current, line2Ref.current], {
        opacity: 0,
        scaleY: 0,
        transformOrigin: "top",
      });
      gsap.set(accentTextRef.current, {
        opacity: 0,
        x: -50,
      });
      gsap.set(titleRef.current, {
        opacity: 0,
        scale: 1.15,
        y: 80,
      });
      gsap.set(taglineRef.current, {
        opacity: 0,
        y: 30,
      });
      gsap.set(ctaRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.9,
      });
      gsap.set(scrollIndicatorRef.current, {
        opacity: 0,
        y: -20,
      });
      gsap.set(cornerRef.current, {
        opacity: 0,
      });

      // Create cinematic timeline triggered on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top-=1",
          end: "+=1800",
          toggleActions: "play none none none",
          pin: true,
          pinSpacing: true,
        },
      });

      // 1. Logo watermark + GlowCircles emerge
      tl.to(logoWatermarkRef.current, {
        scale: 1,
        opacity: 0.08,
        duration: 1.2,
        ease: "power2.out",
      });
      tl.to([glowCircle1Ref.current, glowCircle2Ref.current, glowCircle3Ref.current], {
        scale: 1,
        opacity: 1,
        duration: 1.0,
        ease: "power2.out",
        stagger: 0.15,
      }, "-=1.0");

      // 2. Decorative lines grow
      tl.to(
        [line1Ref.current, line2Ref.current],
        {
          opacity: 1,
          scaleY: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.6"
      );

      // 3. Accent text slides in from left
      tl.to(
        accentTextRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );

      // 4. MASSIVE title - dramatic entrance
      tl.to(
        titleRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.3"
      );

      // 5. Tagline fades in
      tl.to(
        taglineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // 6. CTA button
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.2)",
        },
        "-=0.3"
      );

      // 7. Scroll indicator
      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // 8. Art Deco corner
      tl.to(
        cornerRef.current,
        {
          opacity: 0.2,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Add continuous glow pulse after animation
      tl.add(() => {
        gsap.to([glowCircle1Ref.current, glowCircle2Ref.current, glowCircle3Ref.current], {
          scale: 1.08,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.8,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    // Account for pin spacing (1800px) + viewport height
    window.scrollTo({
      top: window.innerHeight + 1800,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[var(--ace-black)] overflow-hidden"
    >
      {/* Logo watermark */}
      <div
        ref={logoWatermarkRef}
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] pointer-events-none z-[1]"
      >
        <Image
          src="/images/ACE-white-logo_notext.png"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* GlowCircles */}
      <div ref={glowCircle1Ref} style={{ position: "absolute", top: "10%", right: "-10%" }}>
        <GlowCircle size="lg" position={{}} />
      </div>
      <div ref={glowCircle2Ref} style={{ position: "absolute", bottom: "20%", left: "-8%" }}>
        <GlowCircle size="md" position={{}} />
      </div>
      <div ref={glowCircle3Ref} style={{ position: "absolute", top: "60%", right: "20%" }}>
        <GlowCircle size="sm" position={{}} />
      </div>

      {/* Diagonal decorative lines */}
      <div
        ref={line1Ref}
        className="absolute top-20 left-10 w-px h-40 bg-gradient-to-b from-[var(--ace-gold)] to-transparent opacity-30"
        style={{ transform: "rotate(-20deg)" }}
      />
      <div
        ref={line2Ref}
        className="absolute bottom-32 right-16 w-px h-32 bg-gradient-to-t from-[var(--ace-gold)] to-transparent opacity-25"
        style={{ transform: "rotate(25deg)" }}
      />

      {/* Content - h-screen + flex for vertical centering with pin */}
      <div className="h-screen flex items-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl">
            {/* Accent text */}
            <span
              ref={accentTextRef}
              className="block text-[var(--ace-gold)] text-sm md:text-base tracking-[0.3em] uppercase mb-4 md:mb-6"
            >
              Agence de création digitale
            </span>

            {/* MASSIVE title */}
            <h1
              ref={titleRef}
              className="text-massive font-bold font-[var(--font-playfair)] text-white leading-none mb-6 md:mb-8"
            >
              ACE STUDIO
            </h1>

            {/* Tagline with gold accent */}
            <p
              ref={taglineRef}
              className="text-xl md:text-2xl lg:text-3xl text-white/70 max-w-xl mb-10 md:mb-12"
            >
              Des expériences digitales qui{" "}
              <span className="text-[var(--ace-gold)] italic font-[var(--font-playfair)]">
                marquent
              </span>{" "}
              les esprits.
            </p>

            {/* CTA */}
            <div ref={ctaRef}>
              <Button href="/contact" size="lg">
                Discutons de votre projet
              </Button>
            </div>
          </div>
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
      <div
        ref={cornerRef}
        className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none"
      >
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
