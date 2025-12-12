"use client";

import Link from "next/link";
import { StarField, FloatingCard } from "@/components/404";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Starfield Background */}
      <StarField />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* Floating Card */}
        <div className="mb-10">
          <FloatingCard
            onClickRedirect="/fr"
            easterEggText="Tu cherches quoi exactement ? 👀"
          />
        </div>

        {/* Text content */}
        <div className="text-center max-w-md">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 font-[var(--font-playfair)]">
            Tout s&apos;est effondré.
          </h1>
          <p className="text-base md:text-lg text-white/60 mb-8">
            Sauf nous — on est toujours là.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fr"
              className={cn(
                "inline-flex items-center justify-center",
                "px-6 py-3 md:px-8 md:py-4 rounded-full",
                "bg-[#c9a050] text-[#0a0a0a]",
                "font-medium text-sm md:text-base",
                "transition-all duration-300",
                "hover:bg-[#d4af61] hover:scale-105",
                "hover:shadow-[0_0_30px_rgba(201,160,80,0.5)]"
              )}
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/fr/contact"
              className={cn(
                "inline-flex items-center justify-center",
                "px-6 py-3 md:px-8 md:py-4 rounded-full",
                "border-2 border-white/30 text-white/80",
                "font-medium text-sm md:text-base",
                "transition-all duration-300",
                "hover:border-[#c9a050] hover:text-[#c9a050]"
              )}
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
