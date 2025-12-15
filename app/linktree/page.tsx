"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LINKS = [
  {
    label: "Site Web",
    href: "https://ace-studio-dev.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ace.studio.dev/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:contact@ace-studio-dev.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6l-10 7L2 6" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/2250747666667",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
      </svg>
    ),
  },
];

// Floating particles component
function GoldenParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#C9A050] opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-particle ${8 + Math.random() * 12}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

// Animated gradient orb
function GradientOrb() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main orb */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #C9A050 0%, #B8923F 40%, transparent 70%)",
          left: "50%",
          top: "30%",
          transform: "translate(-50%, -50%)",
          animation: "pulse-orb 8s ease-in-out infinite",
        }}
      />
      {/* Secondary orb */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #D4B36A 0%, transparent 60%)",
          left: "30%",
          top: "60%",
          transform: "translate(-50%, -50%)",
          animation: "float-orb 12s ease-in-out infinite",
        }}
      />
    </div>
  );
}

// Link button component
function LinkButton({
  href,
  label,
  icon,
  delay,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`
        group relative flex items-center justify-center gap-3 w-full
        px-6 py-4 rounded-2xl
        bg-gradient-to-r from-white/[0.03] to-white/[0.06]
        border border-white/[0.08]
        backdrop-blur-sm
        transition-all duration-500 ease-out
        hover:border-[#C9A050]/40 hover:bg-white/[0.08]
        hover:shadow-[0_0_40px_rgba(201,160,80,0.15)]
        hover:scale-[1.02]
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{
        transitionDelay: mounted ? "0ms" : `${delay}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shine effect on hover */}
      <div
        className={`
          absolute inset-0 rounded-2xl overflow-hidden
          transition-opacity duration-500
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
      >
        <div
          className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(201,160,80,0.1), transparent)",
          }}
        />
      </div>

      {/* Icon */}
      <span
        className={`
          text-[#C9A050] transition-all duration-300
          ${isHovered ? "scale-110" : "scale-100"}
        `}
      >
        {icon}
      </span>

      {/* Label */}
      <span
        className="font-medium text-white/90 tracking-wide"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {label}
      </span>

      {/* Arrow */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={`
          w-4 h-4 ml-auto text-white/40
          transition-all duration-300
          ${isHovered ? "translate-x-1 text-[#C9A050]" : ""}
        `}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  );
}

export default function LinktreePage() {
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    // Trigger logo animation after mount
    const timer = setTimeout(() => setLogoLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes pulse-orb {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.4;
          }
        }

        @keyframes float-orb {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-30px);
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
            opacity: 0.2;
          }
          75% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.3;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(201, 160, 80, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(201, 160, 80, 0.5));
          }
        }
      `}</style>

      <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Background effects */}
        <div className="fixed inset-0 bg-[#0A0A0A]" />
        <div
          className="fixed inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, transparent 0%, #0A0A0A 100%),
              repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(201,160,80,0.02) 1px, rgba(201,160,80,0.02) 2px)`,
            backgroundSize: "100% 100%, 100% 4px",
          }}
        />
        <GradientOrb />
        <GoldenParticles />

        {/* Content */}
        <div className="relative z-10 w-full max-w-md flex flex-col items-center">
          {/* Logo */}
          <div
            className={`
              relative mb-12 transition-all duration-1000 ease-out
              ${logoLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"}
            `}
            style={{
              animation: logoLoaded ? "glow-pulse 4s ease-in-out infinite" : "none",
            }}
          >
            {/* Logo glow backdrop */}
            <div
              className="absolute inset-0 blur-2xl opacity-50"
              style={{
                background: "radial-gradient(circle, rgba(201,160,80,0.4) 0%, transparent 70%)",
                transform: "scale(1.5)",
              }}
            />
            <Image
              src="/images/ACE-white-logo.png"
              alt="ACE STUDIO"
              width={160}
              height={160}
              className="relative"
              priority
            />
          </div>

          {/* Tagline */}
          <p
            className={`
              text-center text-white/50 text-sm tracking-[0.3em] uppercase mb-10
              transition-all duration-700 delay-300
              ${logoLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
          >
            Sites web sur mesure
          </p>

          {/* Decorative line */}
          <div
            className={`
              w-16 h-px bg-gradient-to-r from-transparent via-[#C9A050]/50 to-transparent
              mb-10 transition-all duration-700 delay-500
              ${logoLoaded ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
            `}
          />

          {/* Links */}
          <div className="w-full flex flex-col gap-4">
            {LINKS.map((link, index) => (
              <LinkButton
                key={link.label}
                href={link.href}
                label={link.label}
                icon={link.icon}
                delay={700 + index * 150}
              />
            ))}
          </div>

          {/* Footer */}
          <div
            className={`
              mt-16 text-center transition-all duration-700
              ${logoLoaded ? "opacity-100" : "opacity-0"}
            `}
            style={{ transitionDelay: "1400ms" }}
          >
            <p
              className="text-white/30 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
            >
              Abidjan, Côte d&apos;Ivoire
            </p>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #0A0A0A, transparent)",
          }}
        />
      </main>
    </>
  );
}
