"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Brief",
    description: "On écoute. Vraiment.",
    detail: "Pas de questionnaire générique. Une vraie conversation pour comprendre votre vision.",
  },
  {
    number: "02",
    title: "Direction",
    description: "On explore. Ensemble.",
    detail: "Exemples, références, échanges. On définit le style avant de coder.",
  },
  {
    number: "03",
    title: "Code",
    description: "On construit. Sans raccourcis.",
    detail: "Du code propre, optimisé, fait pour durer et évoluer.",
  },
  {
    number: "04",
    title: "Launch",
    description: "On livre. Et on reste là.",
    detail: "Mise en ligne, tests, ajustements. Et un support réactif après.",
  },
];

export default function Methode() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical line drawing
      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top" });

        gsap.to(lineRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        });
      }

      // Animate each step
      stepsRef.current.forEach((step, index) => {
        if (!step) return;

        const content = step.querySelector(".step-content");
        const dot = step.querySelector(".step-dot");
        const number = step.querySelector(".step-number");

        gsap.set([content, number], { opacity: 0, x: index % 2 === 0 ? -50 : 50 });
        gsap.set(dot, { scale: 0, opacity: 0 });

        ScrollTrigger.create({
          trigger: step,
          start: "top 75%",
          once: true,
          onEnter: () => {
            // Animate dot first
            gsap.to(dot, {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "back.out(2)",
            });

            // Then content
            gsap.to([content, number], {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: 0.2,
              ease: "power2.out",
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden bg-[var(--theme-background)]"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-diagonal-gold opacity-20" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section title */}
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[var(--font-playfair)] text-[var(--theme-text)] mb-4">
            Notre méthode
          </h2>
          <p className="text-xl text-[var(--theme-text-muted)]">
            Simple, transparente, efficace.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block">
            {/* Background line (faded) */}
            <div className="absolute inset-0 bg-[var(--ace-gold)] opacity-10" />
            {/* Animated gold line */}
            <div
              ref={lineRef}
              className="absolute inset-0 bg-gradient-to-b from-[var(--ace-gold)] via-[var(--ace-gold)] to-transparent"
              style={{ boxShadow: "0 0 20px rgba(201, 160, 80, 0.3)" }}
            />
          </div>

          {/* Mobile line (left side) */}
          <div className="absolute left-8 top-0 bottom-0 w-px md:hidden">
            <div className="absolute inset-0 bg-[var(--ace-gold)] opacity-20" />
          </div>

          {/* Steps */}
          <div className="space-y-20 md:space-y-32">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[index] = el; }}
                className={`relative flex items-start gap-8 md:gap-16 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Number - Desktop: alternating sides */}
                <div
                  className={`step-number hidden md:flex flex-1 ${
                    index % 2 === 0 ? "justify-end" : "justify-start"
                  }`}
                >
                  <span
                    className="text-8xl lg:text-9xl font-bold font-[var(--font-playfair)] opacity-[0.07]"
                    style={{ color: "var(--ace-gold)" }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-2">
                  <div className="step-dot relative">
                    {/* Outer glow */}
                    <div
                      className="absolute -inset-3 rounded-full opacity-30"
                      style={{ background: "var(--ace-gold)", filter: "blur(8px)" }}
                    />
                    {/* Main dot */}
                    <div
                      className="relative w-4 h-4 rounded-full border-2 border-[var(--ace-gold)]"
                      style={{ background: "var(--theme-background)" }}
                    >
                      <div className="absolute inset-1 rounded-full bg-[var(--ace-gold)]" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`step-content flex-1 pl-16 md:pl-0 ${
                    index % 2 === 0 ? "md:text-left" : "md:text-right"
                  }`}
                >
                  {/* Mobile number */}
                  <span
                    className="text-sm font-bold text-[var(--ace-gold)] tracking-widest md:hidden mb-2 block"
                  >
                    {step.number}
                  </span>

                  <h3 className="text-2xl md:text-3xl font-bold text-[var(--theme-text)] mb-2 font-[var(--font-playfair)]">
                    {step.title}
                  </h3>

                  <p className="text-xl md:text-2xl text-[var(--ace-gold)] mb-3">
                    {step.description}
                  </p>

                  <p className="text-[var(--theme-text-muted)] max-w-md">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
