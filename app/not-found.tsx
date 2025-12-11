"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { StarField, Astronaut } from "@/components/404";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const [showBonus, setShowBonus] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Stagger the entrance animation
    const loadTimer = setTimeout(() => setIsLoaded(true), 100);
    const bonusTimer = setTimeout(() => setShowBonus(true), 10000);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(bonusTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Starfield Background */}
      <StarField />

      {/* Giant 404 in background */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center pointer-events-none select-none",
          "transition-opacity duration-1000",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{ zIndex: 1 }}
      >
        <span
          className="text-[30vw] md:text-[25vw] font-bold text-white/[0.03] font-[var(--font-playfair)]"
          style={{
            textShadow: "0 0 100px rgba(201, 160, 80, 0.05)",
          }}
        >
          404
        </span>
      </div>

      {/* Distant planet */}
      <div
        className={cn(
          "absolute bottom-10 right-10 md:bottom-20 md:right-20",
          "w-16 h-16 md:w-24 md:h-24 rounded-full",
          "bg-gradient-to-br from-[#c9a050] via-[#8b6914] to-[#2a1f0a]",
          "shadow-[0_0_60px_rgba(201,160,80,0.3),inset_-10px_-10px_30px_rgba(0,0,0,0.5)]",
          "transition-all duration-1000 delay-500",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
        style={{ zIndex: 2 }}
      >
        {/* Planet surface details */}
        <div className="absolute top-3 left-4 w-3 h-2 rounded-full bg-[#a08030]/30" />
        <div className="absolute top-6 right-5 w-4 h-3 rounded-full bg-[#7a5a20]/20" />
        <div className="absolute bottom-4 left-6 w-5 h-2 rounded-full bg-[#6a4a10]/25" />
      </div>

      {/* Main content */}
      <div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20"
      >
        {/* Astronaut */}
        <div
          className={cn(
            "mb-8 transition-all duration-1000 delay-300",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          )}
        >
          <Astronaut />
        </div>

        {/* Text content */}
        <div
          className={cn(
            "text-center max-w-xl transition-all duration-1000 delay-500",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-[var(--font-playfair)]"
            style={{
              textShadow: "0 0 40px rgba(201, 160, 80, 0.3)",
            }}
          >
            Perdu dans le vide...
          </h1>

          <p className="text-lg md:text-xl text-white/60 mb-2">
            Houston, on a un problème. Cette page n&apos;existe pas.
          </p>

          {/* Bonus message */}
          <p
            className={cn(
              "text-[var(--ace-gold)] text-base md:text-lg italic",
              "transition-all duration-1000",
              showBonus ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}
          >
            {showBonus && "Au moins la vue est belle."}
          </p>
        </div>

        {/* CTAs */}
        <div
          className={cn(
            "flex flex-col sm:flex-row gap-4 mt-10",
            "transition-all duration-1000 delay-700",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {/* Primary CTA - Back to Earth */}
          <Link
            href="/fr"
            className={cn(
              "group relative inline-flex items-center justify-center",
              "px-8 py-4 rounded-full",
              "bg-[var(--ace-gold)] text-[var(--ace-black)]",
              "font-medium text-base",
              "transition-all duration-300",
              "hover:bg-[var(--ace-gold-light)]",
              "hover:shadow-[0_0_30px_rgba(201,160,80,0.5)]",
              "hover:scale-105",
              "overflow-hidden"
            )}
          >
            {/* Rocket boost effect on hover */}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0 group-hover:h-6 bg-gradient-to-t from-orange-500/80 to-transparent rounded-full blur-sm transition-all duration-300" />
            <span className="relative flex items-center gap-2">
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              Retour sur Terre
            </span>
          </Link>

          {/* Secondary CTA - SOS */}
          <Link
            href="/fr/contact"
            className={cn(
              "inline-flex items-center justify-center",
              "px-8 py-4 rounded-full",
              "border-2 border-white/30 text-white/80",
              "font-medium text-base",
              "transition-all duration-300",
              "hover:border-[var(--ace-gold)] hover:text-[var(--ace-gold)]",
              "hover:shadow-[0_0_20px_rgba(201,160,80,0.2)]",
              "backdrop-blur-sm"
            )}
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Envoyer un SOS
            </span>
          </Link>
        </div>

        {/* Floating particles decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animation: `floatParticle ${8 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Global styles for this page */}
      <style jsx global>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-30px) translateX(10px);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
