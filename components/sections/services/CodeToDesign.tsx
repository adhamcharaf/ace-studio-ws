"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Nombre de lignes dans le snippet de code
const CODE_LINES = 19;

const CODE_SNIPPET = `<section class="ace-studio">
  <header>
    <h1>Votre vision</h1>
    <span class="accent">digitale</span>
  </header>

  <main>
    <article class="craft">
      <p>Design sur mesure</p>
      <p>Code optimisé</p>
      <p>Expérience unique</p>
    </article>
  </main>

  <footer>
    <!-- 0% template -->
    <!-- 100% création -->
  </footer>
</section>`;

export default function CodeToDesign() {
  const sectionRef = useRef<HTMLElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);

  // Générer les opacités côté client uniquement pour éviter l'erreur d'hydratation
  const [lineOpacities, setLineOpacities] = useState<number[]>(
    () => Array(CODE_LINES).fill(0.7) // Valeur par défaut stable pour le SSR
  );

  useEffect(() => {
    // Générer des opacités aléatoires uniquement côté client
    setLineOpacities(
      Array(CODE_LINES).fill(0).map(() => 0.4 + Math.random() * 0.6)
    );
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top-=1", // Attend le premier scroll avant de déclencher
          end: "+=1500", // Zone de pin assez longue pour couvrir l'animation de 4s
          toggleActions: "play none none none",
          pin: true,
          pinSpacing: true,
        },
      });

      // Phase 1: Code visible, starts glitching (0.6s)
      tl.to(codeRef.current, {
        filter: "blur(2px)",
        opacity: 0.6,
        scale: 0.98,
        duration: 0.6,
        ease: "power2.inOut",
      });

      // Phase 2: Glitch effect appears (0.5s simultané)
      tl.to(
        glitchRef.current,
        {
          opacity: 1,
          duration: 0.5,
        },
        "<"
      );

      // Phase 3: Code fades out, glitch intensifies (0.8s)
      tl.to(codeRef.current, {
        filter: "blur(8px)",
        opacity: 0,
        scale: 0.9,
        y: -30,
        duration: 0.8,
        ease: "power2.in",
      });

      // Glitch fades (0.5s)
      tl.to(
        glitchRef.current,
        {
          opacity: 0,
          scale: 1.1,
          duration: 0.5,
        },
        "-=0.3"
      );

      // Phase 4: Design fades in (1.2s)
      tl.to(
        designRef.current,
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[var(--ace-black)]"
    >
      {/* Container - GSAP pin handles the sticky behavior */}
      <div className="h-screen flex items-center justify-center overflow-hidden">
        {/* Background noise */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-noise" />
        </div>

        {/* Subtle scanlines effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          }}
        />

        {/* Decorative corner brackets */}
        <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[var(--ace-gold)]/30" />
        <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[var(--ace-gold)]/30" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[var(--ace-gold)]/30" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[var(--ace-gold)]/30" />

        {/* Layer 1: Code */}
        <div
          ref={codeRef}
          className="absolute inset-0 flex items-center justify-center p-8"
        >
          <pre className="text-[var(--ace-gold)]/70 text-xs sm:text-sm md:text-base lg:text-lg font-mono leading-relaxed max-w-3xl text-left">
            <code>
              {CODE_SNIPPET.split("\n").map((line, i) => (
                <span
                  key={i}
                  className="block"
                  style={{
                    opacity: lineOpacities[i] ?? 0.7,
                  }}
                >
                  <span className="text-[var(--ace-gold)]/30 mr-4 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {line}
                </span>
              ))}
            </code>
          </pre>
        </div>

        {/* Layer 2: Glitch/Transition effect */}
        <div
          ref={glitchRef}
          className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
        >
          <div className="relative">
            {/* Glitch layers */}
            <span
              className="absolute text-4xl md:text-6xl lg:text-7xl font-bold font-mono text-[#ff0000]/30"
              style={{ transform: "translate(-2px, -2px)" }}
            >
              {"</>"}
            </span>
            <span
              className="absolute text-4xl md:text-6xl lg:text-7xl font-bold font-mono text-[#00ff00]/30"
              style={{ transform: "translate(2px, 2px)" }}
            >
              {"</>"}
            </span>
            <span className="text-4xl md:text-6xl lg:text-7xl font-bold font-mono text-[var(--ace-gold)]">
              {"</>"}
            </span>
          </div>
        </div>

        {/* Layer 3: Final Design */}
        <div
          ref={designRef}
          className="absolute inset-0 flex flex-col items-center justify-center opacity-0 scale-95"
          style={{ filter: "blur(10px)" }}
        >
          {/* Main headline */}
          <div className="text-center px-4">
            <span className="block text-[var(--ace-gold)]/60 text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-mono">
              {"< Notre philosophie />"}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-[var(--font-playfair)] text-[var(--ace-white)] leading-tight mb-6">
              Du code
              <br />
              <span className="text-[var(--ace-gold)]">naît l&apos;art.</span>
            </h2>
            <p className="text-[var(--ace-gray)] text-lg md:text-xl max-w-xl mx-auto">
              Chaque ligne écrite avec intention.
              <br />
              Chaque pixel placé avec précision.
            </p>
          </div>

          {/* Decorative bottom element */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[var(--ace-gold)]/50" />
            <span className="text-[var(--ace-gold)]/40 text-xs font-mono">
              scroll
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[var(--ace-gold)]/50" />
          </div>
        </div>

        {/* Floating cursor blink */}
        <div className="absolute bottom-1/4 right-1/4 opacity-30">
          <span className="inline-block w-3 h-6 bg-[var(--ace-gold)] animate-pulse" />
        </div>
      </div>
    </section>
  );
}
