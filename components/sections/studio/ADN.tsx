"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ADN_VALUES = [
  {
    id: "creativite",
    title: "Créativité",
    description: "Chaque pixel a une raison d'être.",
    icon: "creativity",
  },
  {
    id: "exigence",
    title: "Exigence",
    description: "Le bon n'est jamais assez bon.",
    icon: "exigence",
  },
  {
    id: "modernite",
    title: "Modernité",
    description: "Les standards d'aujourd'hui, pas d'hier.",
    icon: "modernity",
  },
];

// Creative icon that "draws" itself
function CreativityIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none">
      <circle
        cx="40"
        cy="30"
        r="15"
        stroke="var(--ace-gold)"
        strokeWidth="2"
        strokeDasharray="95"
        strokeDashoffset={isHovered ? 0 : 95}
        style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
      />
      <path
        d="M30 45 L40 70 L50 45"
        stroke="var(--ace-gold)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="60"
        strokeDashoffset={isHovered ? 0 : 60}
        style={{ transition: "stroke-dashoffset 0.8s ease-out 0.2s" }}
      />
      <circle
        cx="40"
        cy="20"
        r="4"
        fill={isHovered ? "var(--ace-gold)" : "transparent"}
        style={{ transition: "fill 0.3s ease-out 0.6s" }}
      />
      {/* Sparks */}
      <g opacity={isHovered ? 1 : 0} style={{ transition: "opacity 0.3s ease-out 0.5s" }}>
        <line x1="55" y1="15" x2="62" y2="8" stroke="var(--ace-gold)" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="25" x2="68" y2="22" stroke="var(--ace-gold)" strokeWidth="2" strokeLinecap="round" />
        <line x1="58" y1="35" x2="65" y2="38" stroke="var(--ace-gold)" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// Progress bar that fills to 100%
function ExigenceIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none">
      {/* Background bar */}
      <rect
        x="10"
        y="35"
        width="60"
        height="10"
        rx="5"
        stroke="var(--ace-gold)"
        strokeWidth="2"
        fill="none"
      />
      {/* Fill */}
      <rect
        x="12"
        y="37"
        width={isHovered ? 56 : 0}
        height="6"
        rx="3"
        fill="var(--ace-gold)"
        style={{ transition: "width 0.8s ease-out" }}
      />
      {/* 100% text */}
      <text
        x="40"
        y="60"
        textAnchor="middle"
        fill="var(--ace-gold)"
        fontSize="12"
        fontWeight="bold"
        opacity={isHovered ? 1 : 0}
        style={{ transition: "opacity 0.3s ease-out 0.6s" }}
      >
        100%
      </text>
      {/* Checkmark */}
      <path
        d="M35 18 L38 22 L48 12"
        stroke="var(--ace-gold)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="20"
        strokeDashoffset={isHovered ? 0 : 20}
        style={{ transition: "stroke-dashoffset 0.4s ease-out 0.7s" }}
      />
    </svg>
  );
}

// Glitch effect icon
function ModernityIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none">
      {/* Lightning bolt */}
      <path
        d="M45 10 L30 40 L40 40 L35 70 L50 35 L40 35 L45 10"
        stroke="var(--ace-gold)"
        strokeWidth="2"
        fill={isHovered ? "rgba(201, 160, 80, 0.2)" : "none"}
        style={{ transition: "fill 0.3s ease-out" }}
      />
      {/* Glitch lines (visible on hover) */}
      <g opacity={isHovered ? 1 : 0} style={{ transition: "opacity 0.1s" }}>
        <line
          x1="0" y1="25" x2="80" y2="25"
          stroke="rgba(201, 160, 80, 0.3)"
          strokeWidth="2"
          className={isHovered ? "animate-glitch-line" : ""}
        />
        <line
          x1="0" y1="50" x2="80" y2="50"
          stroke="rgba(201, 160, 80, 0.3)"
          strokeWidth="2"
          className={isHovered ? "animate-glitch-line-2" : ""}
        />
      </g>
      {/* Particles */}
      {isHovered && (
        <g className="animate-fade-in">
          <circle cx="60" cy="20" r="2" fill="var(--ace-gold)" />
          <circle cx="20" cy="60" r="2" fill="var(--ace-gold)" />
          <circle cx="65" cy="55" r="1.5" fill="var(--ace-gold)" />
          <circle cx="15" cy="30" r="1.5" fill="var(--ace-gold)" />
        </g>
      )}
    </svg>
  );
}

function ADNCard({ value, index }: { value: typeof ADN_VALUES[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.95,
      });

      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(cardRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: "power2.out",
          });
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const renderIcon = () => {
    switch (value.icon) {
      case "creativity":
        return <CreativityIcon isHovered={isHovered} />;
      case "exigence":
        return <ExigenceIcon isHovered={isHovered} />;
      case "modernity":
        return <ModernityIcon isHovered={isHovered} />;
      default:
        return <CreativityIcon isHovered={isHovered} />;
    }
  };

  return (
    <div
      ref={cardRef}
      className="adn-card group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card */}
      <div
        className="relative p-8 md:p-10 rounded-2xl transition-all duration-500"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(201, 160, 80, 0.08) 0%, rgba(201, 160, 80, 0.02) 100%)"
            : "transparent",
          border: `1px solid rgba(201, 160, 80, ${isHovered ? 0.3 : 0.1})`,
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(201, 160, 80, 0.15)"
            : "none",
        }}
      >
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div
            className="relative transition-transform duration-500"
            style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
          >
            {renderIcon()}
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-2xl md:text-3xl font-bold mb-4 text-center font-[var(--font-playfair)] transition-colors duration-300"
          style={{
            color: isHovered ? "var(--ace-gold)" : "var(--theme-text)",
          }}
        >
          {value.title}
        </h3>

        {/* Description */}
        <p className="text-[var(--theme-text-muted)] text-center text-lg">
          {value.description}
        </p>

        {/* Corner decorations */}
        <div
          className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 transition-all duration-300"
          style={{
            borderColor: isHovered ? "var(--ace-gold)" : "transparent",
            opacity: isHovered ? 0.5 : 0,
          }}
        />
        <div
          className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 transition-all duration-300"
          style={{
            borderColor: isHovered ? "var(--ace-gold)" : "transparent",
            opacity: isHovered ? 0.5 : 0,
          }}
        />
      </div>
    </div>
  );
}

export default function ADN() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!introRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(introRef.current, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: introRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(introRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden bg-[var(--theme-background-alt)]"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-noise opacity-30" />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201, 160, 80, 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Intro text */}
        <div ref={introRef} className="text-center mb-20">
          <p className="text-2xl md:text-3xl text-[var(--theme-text-muted)] mb-4">
            Notre recette ?{" "}
            <span className="text-[var(--ace-gold)]">Pas de recette.</span>
          </p>
          <p className="text-xl md:text-2xl text-[var(--theme-text-muted)]">
            Juste trois ingrédients qu&apos;on refuse de négocier :
          </p>
        </div>

        {/* Cards grid - asymétrique */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {ADN_VALUES.map((value, index) => (
            <div
              key={value.id}
              className={index === 1 ? "md:mt-12" : ""}
            >
              <ADNCard value={value} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Glitch animation styles */}
      <style jsx global>{`
        @keyframes glitch-line {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-3px); }
          40% { transform: translateX(3px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
        }
        @keyframes glitch-line-2 {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(2px); }
          50% { transform: translateX(-2px); }
          75% { transform: translateX(1px); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-glitch-line {
          animation: glitch-line 0.3s ease-in-out infinite;
        }
        .animate-glitch-line-2 {
          animation: glitch-line-2 0.25s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
