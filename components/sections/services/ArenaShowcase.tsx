"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function ArenaShowcase() {
  const t = useTranslations('services.showcase');
  const tCommon = useTranslations('common');

  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter mobile pour désactiver scrub (performance)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get the site vitrine service with Arena project
  const siteVitrine = SERVICES.find((s) => s.id === "site-vitrine");
  const project = siteVitrine?.hasProject ? siteVitrine.project : null;

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      // Video container animation
      gsap.from(videoContainerRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: videoContainerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Border glow animation on scroll (désactivé sur mobile pour performance)
      if (!isMobile) {
        gsap.to(videoContainerRef.current, {
          boxShadow: "0 0 60px rgba(201,160,80,0.25)",
          scrollTrigger: {
            trigger: videoContainerRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1, // Smoother scrub avec debounce
          },
        });
      }

      // Content animation
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Parallax effect on video (désactivé sur mobile pour performance)
      if (!isMobile) {
        gsap.to(videoRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Smoother scrub avec debounce
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [project, isMobile]);

  if (!project) return null;

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden bg-[var(--ace-black)]"
    >
      {/* Art Deco corner decorations */}
      <div className="absolute top-0 left-0 w-24 h-24 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--ace-gold)]">
          <path
            d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path d="M0 0 L50 0 L50 10 L10 10 L10 50 L0 50 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 opacity-20 scale-x-[-1]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--ace-gold)]">
          <path
            d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path d="M0 0 L50 0 L50 10 L10 10 L10 50 L0 50 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Subtle gold glow background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,160,80,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section label */}
        <div className="text-center mb-8">
          <span className="inline-block text-[var(--ace-gold)] text-sm tracking-[0.3em] uppercase font-medium">
            {t('label')}
          </span>
        </div>

        {/* Video showcase */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="group block relative max-w-6xl mx-auto"
        >
          <div
            ref={videoContainerRef}
            className={cn(
              "relative rounded-2xl overflow-hidden",
              "transition-all duration-700 ease-out",
              "border-2",
              isHovered
                ? "border-[var(--ace-gold)]"
                : "border-white/10"
            )}
          >
            {/* Corner accents */}
            <div className="video-corner-accent top-left rounded-tl-2xl" />
            <div className="video-corner-accent top-right rounded-tr-2xl" />
            <div className="video-corner-accent bottom-left rounded-bl-2xl" />
            <div className="video-corner-accent bottom-right rounded-br-2xl" />

            {/* Video */}
            <div className="relative aspect-video bg-[#111] overflow-hidden video-cinematic">
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

              {/* Vignette overlay on hover */}
              <div
                className={cn(
                  "absolute inset-0 pointer-events-none transition-opacity duration-500",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 30%, rgba(201,160,80,0.1) 100%)",
                }}
              />

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 text-xs tracking-wider uppercase bg-[var(--ace-gold)] text-[var(--ace-black)] rounded-full font-semibold shadow-lg">
                  {project.category}
                </span>
              </div>

              {/* Play indicator on hover */}
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
              >
                <div className="w-20 h-20 rounded-full bg-[var(--ace-gold)]/90 flex items-center justify-center shadow-2xl">
                  <svg
                    className="w-8 h-8 text-[var(--ace-black)] ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Project info bar */}
            <div
              ref={contentRef}
              className="bg-[#111] p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left - Project details */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl md:text-3xl font-bold font-[var(--font-playfair)] text-white">
                      {project.title}
                    </h3>
                    <span className="text-[var(--ace-gold)]/60 text-sm">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm md:text-base max-w-xl">
                    {project.description}
                  </p>
                </div>

                {/* Right - CTA */}
                <div
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 rounded-full shrink-0",
                    "bg-[var(--ace-gold)] text-[var(--ace-black)]",
                    "font-medium transition-all duration-300",
                    "group-hover:bg-white group-hover:shadow-lg"
                  )}
                >
                  <span>{tCommon('visitSite')}</span>
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
          </div>
        </a>

        {/* Bottom caption */}
        <p className="text-center mt-8 text-white/40 text-sm tracking-wide">
          {t('hint')}
        </p>
      </div>
    </section>
  );
}
