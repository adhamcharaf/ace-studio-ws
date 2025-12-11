"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import ComingSoonCard from "./ComingSoonCard";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesTriptych() {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');

  const sectionRef = useRef<HTMLElement>(null);
  const featuredCardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Get services
  const siteVitrine = SERVICES.find((s) => s.id === "site-vitrine");
  const projetAmbitieux = SERVICES.find((s) => s.id === "projet-ambitieux");
  const identiteDigitale = SERVICES.find((s) => s.id === "identite-digitale");

  const project = siteVitrine?.hasProject ? siteVitrine.project : null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Featured card animation
      gsap.from(featuredCardRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuredCardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-gradient-radial-warm overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-noise opacity-20" />
      <div className="absolute inset-0 bg-diagonal-gold opacity-30" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[var(--font-playfair)] text-[var(--ace-black)] mb-4">
            {t('offers.title')}
          </h2>
          <p className="text-[var(--ace-gray)] max-w-2xl mx-auto">
            {t('offers.subtitle')}
          </p>
        </div>

        {/* Stacked Layout */}
        <div className="space-y-8 md:space-y-12">
          {/* Featured Card - Site Vitrine with Arena - Full Width */}
          <div
            ref={featuredCardRef}
            className="max-w-5xl mx-auto"
          >
            <div
              className="service-card-featured rounded-2xl overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Video thumbnail */}
              {project && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative"
                >
                  <div className="relative aspect-video overflow-hidden">
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

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Corner accents */}
                    <div className="video-corner-accent top-left" />
                    <div className="video-corner-accent top-right" />
                    <div className="video-corner-accent bottom-left" />
                    <div className="video-corner-accent bottom-right" />

                    {/* Project badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 text-xs tracking-wider uppercase bg-[var(--ace-gold)] text-[var(--ace-black)] rounded-full font-semibold">
                        {tCommon('example')} : {project.title}
                      </span>
                    </div>

                    {/* View project button on hover */}
                    <div
                      className={cn(
                        "absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full",
                        "bg-white/90 text-[var(--ace-black)] text-sm font-medium",
                        "transition-all duration-300",
                        isHovered
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      )}
                    >
                      <span>{tCommon('viewProject')}</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              )}

              {/* Service content */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold font-[var(--font-playfair)] text-[var(--ace-black)] mb-2">
                      {t('vitrine.title')}
                    </h3>
                    <p className="text-[var(--ace-gold)] text-lg">
                      {t('vitrine.subtitle')}
                    </p>
                  </div>
                  {/* Recommended badge */}
                  <span className="shrink-0 self-start px-3 py-1 bg-[var(--ace-gold)]/10 text-[var(--ace-gold)] text-xs font-semibold uppercase tracking-wider rounded-full border border-[var(--ace-gold)]/30">
                    {tCommon('popular')}
                  </span>
                </div>

                <p className="text-[var(--ace-gray)] mb-6">
                  {t('vitrine.description')}
                </p>

                {/* Features */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(t.raw('vitrine.features') as string[]).map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-[var(--ace-gold)] flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[var(--ace-black)]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Coming Soon Cards - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Projet Ambitieux */}
            {projetAmbitieux && !projetAmbitieux.hasProject && projetAmbitieux.comingSoon && (
              <ComingSoonCard
                title={t('ambitieux.title')}
                subtitle={t('ambitieux.subtitle')}
                description={t('ambitieux.description')}
                features={t.raw('ambitieux.features') as string[]}
                badge={t('ambitieux.badge')}
                teaser={t('ambitieux.comingSoon')}
                delay={0.2}
              />
            )}

            {/* Identité Digitale */}
            {identiteDigitale && !identiteDigitale.hasProject && identiteDigitale.comingSoon && (
              <ComingSoonCard
                title={t('identite.title')}
                subtitle={t('identite.subtitle')}
                description={t('identite.description')}
                features={t.raw('identite.features') as string[]}
                badge={t('identite.badge')}
                teaser={t('identite.comingSoon')}
                delay={0.4}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
