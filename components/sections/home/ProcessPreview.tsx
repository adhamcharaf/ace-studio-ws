"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_STEPS } from "@/lib/constants";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate the connecting line
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Staggered step cards animation
      const steps = stepsRef.current?.querySelectorAll(".process-step");
      if (steps) {
        gsap.from(steps, {
          opacity: 0,
          y: 40,
          scale: 0.9,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-[var(--theme-background)]"
    >
      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-30" />

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-[var(--ace-gold)]/20 rotate-45" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border border-[var(--ace-gold)]/20 rotate-45" />

      {/* Floating gold circles */}
      <div
        className="absolute top-1/4 right-0 w-64 h-64 rounded-full pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(201,160,80,0.1) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-0 w-48 h-48 rounded-full pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(201,160,80,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16 md:mb-24">
          <span className="inline-block text-[var(--ace-gold)] text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            Notre méthode
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[var(--font-playfair)] text-[var(--theme-text)] mb-4">
            Comment on travaille
          </h2>
          <p className="text-[var(--theme-text-muted)] max-w-2xl mx-auto text-lg">
            Un processus clair et transparent, de l&apos;idée à la mise en ligne.
          </p>
        </div>

        {/* Process timeline */}
        <div ref={stepsRef} className="relative max-w-6xl mx-auto">
          {/* Connecting line - desktop only */}
          <div
            ref={lineRef}
            className="hidden md:block absolute top-[60px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[var(--ace-gold)]/50 via-[var(--ace-gold)] to-[var(--ace-gold)]/50"
          />

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.step}
                className="process-step relative flex flex-col items-center text-center group"
              >
                {/* Step number with decorative ring */}
                <div className="relative mb-6">
                  {/* Outer decorative ring */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full border-2 border-dashed border-[var(--ace-gold)]/30",
                      "scale-125 transition-all duration-500 group-hover:scale-150 group-hover:border-[var(--ace-gold)]/50",
                      "group-hover:rotate-180"
                    )}
                    style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                  />

                  {/* Main number circle */}
                  <div
                    className={cn(
                      "relative w-[72px] h-[72px] md:w-[80px] md:h-[80px]",
                      "rounded-full flex items-center justify-center",
                      "bg-[var(--theme-background)] border-2 border-[var(--ace-gold)]",
                      "transition-all duration-500",
                      "group-hover:bg-[var(--ace-gold)] group-hover:scale-110",
                      "shadow-[0_0_20px_rgba(201,160,80,0.15)]",
                      "group-hover:shadow-[0_0_30px_rgba(201,160,80,0.3)]"
                    )}
                  >
                    <span
                      className={cn(
                        "text-2xl md:text-3xl font-bold font-[var(--font-playfair)]",
                        "text-[var(--ace-gold)] transition-colors duration-500",
                        "group-hover:text-[var(--ace-black)]"
                      )}
                    >
                      {step.step}
                    </span>
                  </div>

                  {/* Small diamond accent */}
                  <div
                    className={cn(
                      "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2",
                      "bg-[var(--ace-gold)] rotate-45",
                      "transition-all duration-300",
                      "group-hover:scale-150"
                    )}
                  />
                </div>

                {/* Vertical connector for mobile */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="md:hidden absolute top-[100px] left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[var(--ace-gold)] to-transparent" />
                )}

                {/* Step content */}
                <div className="mt-2">
                  <h3
                    className={cn(
                      "text-xl md:text-2xl font-bold mb-2",
                      "font-[var(--font-playfair)] text-[var(--theme-text)]",
                      "transition-colors duration-300",
                      "group-hover:text-[var(--ace-gold)]"
                    )}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[var(--theme-text-muted)] text-sm md:text-base max-w-[200px] mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 md:mt-20">
          <Button href="/services" variant="secondary">
            En savoir plus sur nos services
          </Button>
        </div>
      </div>
    </section>
  );
}
