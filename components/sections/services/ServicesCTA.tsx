"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WHATSAPP_LINK } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Button animation
      gsap.from(buttonRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.6,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[var(--ace-black)] overflow-hidden"
    >
      {/* Background decorations */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,160,80,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Art Deco corner decorations */}
      <div className="absolute top-0 left-0 w-20 h-20 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--ace-gold)]">
          <path
            d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path d="M0 0 L50 0 L50 10 L10 10 L10 50 L0 50 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-20 h-20 opacity-20 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--ace-gold)]">
          <path
            d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path d="M0 0 L50 0 L50 10 L10 10 L10 50 L0 50 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Bold Statement */}
          <div ref={headingRef} className="mb-12">
            {/* Art Deco divider above */}
            <div className="divider-art-deco mb-10">
              <div className="divider-art-deco-diamond" />
            </div>

            {/* Main headline */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold font-[var(--font-playfair)] text-[var(--ace-white)]">
                0% template
              </span>
              <span className="hidden md:block text-[var(--ace-gold)] text-2xl">
                &#9670;
              </span>
              <span className="block md:hidden text-[var(--ace-gold)] text-xl my-2">
                &#9670;
              </span>
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold font-[var(--font-playfair)] text-[var(--ace-gold)]">
                100% sur mesure
              </span>
            </div>

            {/* Subtext */}
            <p className="text-[var(--ace-gray)] text-lg md:text-xl max-w-2xl mx-auto">
              Chaque projet est unique. Chaque site aussi.
            </p>
          </div>

          {/* CTA Button */}
          <Link
            ref={buttonRef}
            href="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--ace-gold)] text-[var(--ace-black)] font-semibold text-lg rounded-full transition-all duration-300 hover:bg-[var(--ace-white)] hover:shadow-[0_0_40px_rgba(201,160,80,0.4)] btn-premium"
          >
            <span>Discutons de votre projet</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>

          {/* Small tagline under button */}
          <p className="mt-6 text-[var(--ace-gray)] text-sm">
            Réponse en moins de 24h
          </p>
        </div>
      </div>
    </section>
  );
}
