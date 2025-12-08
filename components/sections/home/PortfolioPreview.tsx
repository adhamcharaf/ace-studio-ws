"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FEATURED_PROJECTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const project = FEATURED_PROJECTS[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Card animation
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Play/pause video on hover for extra interaction
  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.playbackRate = 1;
      } else {
        videoRef.current.playbackRate = 1;
      }
    }
  }, [isHovered]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-[var(--ace-black)]"
    >
      {/* Decorative Art Deco pattern - top corners */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--ace-gold)]">
          <path
            d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path d="M0 0 L50 0 L50 10 L10 10 L10 50 L0 50 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20 scale-x-[-1]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--ace-gold)]">
          <path
            d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path d="M0 0 L50 0 L50 10 L10 10 L10 50 L0 50 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Subtle gold glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,160,80,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Diagonal line decoration */}
      <div
        className="absolute top-20 right-10 w-px h-32 bg-gradient-to-b from-[var(--ace-gold)] to-transparent opacity-30"
        style={{ transform: "rotate(30deg)" }}
      />
      <div
        className="absolute bottom-20 left-10 w-px h-32 bg-gradient-to-t from-[var(--ace-gold)] to-transparent opacity-30"
        style={{ transform: "rotate(-30deg)" }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block text-[var(--ace-gold)] text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            Réalisation
          </span>
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-[var(--font-playfair)] text-[var(--ace-white)]"
          >
            Ce qu&apos;on a créé
          </h2>
        </div>

        {/* Featured project card */}
        <a
          ref={cardRef}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className={cn(
            "group relative block max-w-5xl mx-auto",
            "rounded-2xl overflow-hidden",
            "transition-all duration-700 ease-out",
            "hover:shadow-[0_0_60px_rgba(201,160,80,0.2)]"
          )}
        >
          {/* Border frame with gold accent */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl border-2 transition-all duration-500 z-20 pointer-events-none",
              isHovered
                ? "border-[var(--ace-gold)] shadow-[inset_0_0_30px_rgba(201,160,80,0.1)]"
                : "border-white/10"
            )}
          />

          {/* Corner accents */}
          <div
            className={cn(
              "absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 rounded-tl-2xl transition-all duration-500 z-20 pointer-events-none",
              isHovered ? "border-[var(--ace-gold)]" : "border-transparent"
            )}
          />
          <div
            className={cn(
              "absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 rounded-br-2xl transition-all duration-500 z-20 pointer-events-none",
              isHovered ? "border-[var(--ace-gold)]" : "border-transparent"
            )}
          />

          {/* Video container */}
          <div className="relative aspect-video bg-[#111] overflow-hidden rounded-t-2xl">
            <video
              ref={videoRef}
              src={project.video}
              poster={project.poster}
              autoPlay
              muted
              loop
              playsInline
              className={cn(
                "w-full h-full object-cover transition-transform duration-700",
                isHovered ? "scale-105" : "scale-100"
              )}
            />
          </div>

          {/* Project info - below video */}
          <div className="bg-[#111] p-6 md:p-8 rounded-b-2xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Left side - Project details */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl md:text-3xl font-bold font-[var(--font-playfair)] text-white">
                    {project.title}
                  </h3>
                  <span className="px-3 py-1 text-xs tracking-wider uppercase bg-[var(--ace-gold)]/20 text-[var(--ace-gold)] rounded-full border border-[var(--ace-gold)]/30">
                    {project.category}
                  </span>
                </div>
                <p className="text-white/60 text-sm md:text-base">
                  {project.description}
                </p>
              </div>

              {/* Right side - CTA */}
              <div
                className={cn(
                  "flex items-center gap-3 px-6 py-3 rounded-full shrink-0",
                  "bg-[var(--ace-gold)] text-[var(--ace-black)]",
                  "font-medium transition-all duration-300",
                  "group-hover:bg-white group-hover:shadow-lg"
                )}
              >
                <span>Visiter le site</span>
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
              </div>
            </div>
          </div>
        </a>

        {/* Bottom tagline */}
        <p className="text-center mt-12 text-white/40 text-sm tracking-wide">
          Cliquez pour explorer le projet en direct
        </p>
      </div>
    </section>
  );
}
