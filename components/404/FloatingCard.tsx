"use client";

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
  onClickRedirect?: string;
  easterEggText?: string;
}

export default function FloatingCard({
  onClickRedirect = "/",
  easterEggText = "Tu cherches quoi exactement ? 👀",
}: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate tilt based on mouse position relative to card center
    const maxTilt = 15;
    const tiltX = ((e.clientY - centerY) / (rect.height / 2)) * maxTilt;
    const tiltY = ((e.clientX - centerX) / (rect.width / 2)) * -maxTilt;

    setTilt({ x: tiltX, y: tiltY });
  }, [isFlipped]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const handleClick = useCallback(() => {
    if (isFlipped) return;

    setIsFlipped(true);
    setTilt({ x: 0, y: 0 });

    // Redirect after showing easter egg
    setTimeout(() => {
      window.location.href = onClickRedirect;
    }, 2500);
  }, [isFlipped, onClickRedirect]);

  return (
    <div
      ref={cardRef}
      className="relative cursor-pointer"
      style={{
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Card container with floating animation */}
      <div
        className={cn(
          "relative w-[100px] h-[140px] md:w-[130px] md:h-[182px]",
          "transition-transform duration-200 ease-out",
          !isFlipped && "animate-float"
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped
            ? "rotateY(180deg)"
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isFlipped ? "transform 0.6s ease-in-out" : "transform 0.1s ease-out",
        }}
      >
        {/* Front of card */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl",
            "bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]",
            "border border-[#c9a050]/40",
            "flex flex-col items-center justify-center",
            "shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          )}
          style={{
            backfaceVisibility: "hidden",
            boxShadow: `
              0 10px 40px rgba(0, 0, 0, 0.5),
              0 0 30px rgba(201, 160, 80, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
          }}
        >
          {/* Top corner */}
          <div className="absolute top-2 left-3 md:top-3 md:left-4 flex flex-col items-center">
            <span className="text-[#c9a050] text-sm md:text-base font-bold">404</span>
            <SpadeIcon className="w-3 h-3 md:w-4 md:h-4 text-[#c9a050]" />
          </div>

          {/* Center spade with 404 */}
          <div className="relative">
            <SpadeIcon className="w-12 h-12 md:w-16 md:h-16 text-[#c9a050] drop-shadow-[0_0_10px_rgba(201,160,80,0.5)]" />
            <span
              className="absolute inset-0 flex items-center justify-center text-[#0a0a0a] text-lg md:text-2xl font-bold font-[var(--font-playfair)]"
              style={{ textShadow: "0 0 10px rgba(201, 160, 80, 0.3)" }}
            >
              404
            </span>
          </div>

          {/* Bottom corner (inverted) */}
          <div className="absolute bottom-2 right-3 md:bottom-3 md:right-4 flex flex-col items-center rotate-180">
            <span className="text-[#c9a050] text-sm md:text-base font-bold">404</span>
            <SpadeIcon className="w-3 h-3 md:w-4 md:h-4 text-[#c9a050]" />
          </div>

          {/* Subtle inner border */}
          <div className="absolute inset-2 md:inset-3 rounded-lg border border-[#c9a050]/10 pointer-events-none" />

          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none animate-pulse-glow"
            style={{
              background: "radial-gradient(ellipse at center, rgba(201, 160, 80, 0.1) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Back of card (easter egg) */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl",
            "bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]",
            "border border-[#c9a050]/40",
            "flex items-center justify-center p-4",
            "shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Pattern background */}
          <div className="absolute inset-3 rounded-lg border border-[#c9a050]/20 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <pattern id="backPattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                    <path d="M12.5 0 L25 12.5 L12.5 25 L0 12.5 Z" fill="none" stroke="#c9a050" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#backPattern)" />
              </svg>
            </div>
          </div>

          {/* Easter egg text */}
          <p className="relative text-[#c9a050] text-xs md:text-sm text-center font-medium leading-relaxed z-10">
            {easterEggText}
          </p>
        </div>
      </div>

      {/* Floating shadow */}
      <div
        className={cn(
          "absolute -bottom-4 left-1/2 -translate-x-1/2",
          "w-[80%] h-4 rounded-full",
          "bg-black/30 blur-md",
          !isFlipped && "animate-float-shadow"
        )}
      />

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes float-shadow {
          0%, 100% {
            transform: translateX(-50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateX(-50%) scale(0.85);
            opacity: 0.2;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-shadow {
          animation: float-shadow 4s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Spade Icon
function SpadeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <path d="M50 10 C50 10, 15 40, 15 55 C15 70, 30 75, 50 60 C70 75, 85 70, 85 55 C85 40, 50 10, 50 10 Z" />
      <path d="M45 60 L45 85 L40 85 C40 85, 50 75, 60 85 L55 85 L55 60 Z" />
    </svg>
  );
}
