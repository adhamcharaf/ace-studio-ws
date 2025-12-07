"use client";

import { useScrollAnimation } from "@/lib/hooks";
import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function OfferCards() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-radial-warm overflow-hidden">
      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-20" />

      {/* Decorative diagonal lines */}
      <div className="absolute inset-0 bg-diagonal-gold opacity-30" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="space-y-24">
          {SERVICES.map((service, index) => (
            <OfferCard
              key={service.id}
              service={service}
              isReversed={index % 2 !== 0}
              isPopular={index === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface OfferCardProps {
  service: (typeof SERVICES)[number];
  isReversed: boolean;
  isPopular?: boolean;
}

function OfferCard({ service, isReversed, isPopular }: OfferCardProps) {
  const ref = useScrollAnimation("slide-up");

  return (
    <div
      ref={ref}
      className={cn(
        "relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 rounded-2xl",
        "bg-white/60 backdrop-blur-sm",
        isPopular && "border-l-4 border-[var(--ace-gold)] shadow-[0_8px_40px_rgba(201,160,80,0.15)]",
        !isPopular && "border-l-4 border-transparent hover:border-[var(--ace-gold)]/50 transition-all duration-500",
        isReversed && "lg:flex-row-reverse"
      )}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-3 left-8 bg-[var(--ace-gold)] text-[var(--ace-black)] px-4 py-1 rounded-full text-sm font-semibold shadow-[0_4px_15px_rgba(201,160,80,0.4)]">
          POPULAIRE
        </div>
      )}

      {/* Content */}
      <div className={cn(isReversed && "lg:order-2")}>
        <h3 className="text-3xl md:text-4xl font-bold mb-4 font-[var(--font-playfair)] text-[var(--ace-black)]">
          {service.title}
        </h3>
        <p className="text-xl text-[var(--ace-gold)] mb-6">{service.subtitle}</p>
        <p className="text-[var(--ace-gray)] mb-8">{service.description}</p>

        <ul className="space-y-3">
          {service.features.map((feature, i) => (
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

      {/* Mockup Placeholder */}
      <div
        className={cn(
          "bg-[var(--ace-white)] rounded-2xl shadow-xl p-8 aspect-[4/3] flex items-center justify-center",
          "border border-[var(--ace-gold)]/10 hover:border-[var(--ace-gold)]/30 transition-colors duration-300",
          isReversed && "lg:order-1"
        )}
      >
        <div className="text-center text-[var(--ace-gray)]">
          <svg
            className="w-16 h-16 mx-auto mb-4 opacity-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm">Mockup {service.title}</p>
        </div>
      </div>
    </div>
  );
}
