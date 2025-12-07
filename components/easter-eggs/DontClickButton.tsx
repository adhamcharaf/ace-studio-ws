"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface DontClickButtonProps {
  variant?: "desktop" | "mobile";
}

export default function DontClickButton({
  variant = "desktop",
}: DontClickButtonProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("page-break"));
  };

  // Random glitch trigger
  const triggerGlitch = useCallback(() => {
    setIsGlitching(true);
    // Glitch duration: 150-400ms
    const duration = Math.random() * 250 + 150;
    setTimeout(() => setIsGlitching(false), duration);
  }, []);

  useEffect(() => {
    // Initial glitch after mount
    const initialDelay = setTimeout(() => triggerGlitch(), 1500);

    // Random interval glitches (every 3-8 seconds)
    const scheduleNextGlitch = () => {
      const delay = Math.random() * 5000 + 3000;
      return setTimeout(() => {
        triggerGlitch();
        intervalRef = scheduleNextGlitch();
      }, delay);
    };

    let intervalRef = scheduleNextGlitch();

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(intervalRef);
    };
  }, [triggerGlitch]);

  const text = "DON'T CLICK";

  if (variant === "mobile") {
    return (
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative text-lg font-medium transition-all duration-200",
          "text-[var(--ace-gray)] hover:text-[var(--ace-gold)]",
          "opacity-60 hover:opacity-100",
          isGlitching && "animate-glitch-text"
        )}
      >
        <span className="glitch-mobile-text">{text}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "glitch-button relative group",
        "text-xs font-bold tracking-[0.2em] uppercase",
        "px-4 py-2",
        "transition-all duration-300",
        "cursor-not-allowed",
        // Base state - red for temptation
        !isGlitching && !isHovered && "text-red-500",
        // Hover state - brighter red
        isHovered && !isGlitching && "text-red-400",
        // Glitching state
        isGlitching && "text-white"
      )}
      style={{
        fontFamily: "var(--font-space-grotesk), monospace",
      }}
    >
      {/* Glitch layers */}
      <span
        className={cn(
          "glitch-layer glitch-layer-1",
          "absolute inset-0 flex items-center justify-center",
          "text-[#ff0040] opacity-0",
          "pointer-events-none select-none",
          (isGlitching || isHovered) && "opacity-80"
        )}
        style={{
          clipPath: isGlitching
            ? "polygon(0 0, 100% 0, 100% 45%, 0 45%)"
            : "none",
          transform: isGlitching
            ? "translate(-2px, 0)"
            : isHovered
              ? "translate(-1px, 0)"
              : "none",
          transition: isGlitching ? "none" : "all 0.3s ease",
        }}
        aria-hidden="true"
      >
        {text}
      </span>

      <span
        className={cn(
          "glitch-layer glitch-layer-2",
          "absolute inset-0 flex items-center justify-center",
          "text-[#00f0ff] opacity-0",
          "pointer-events-none select-none",
          (isGlitching || isHovered) && "opacity-80"
        )}
        style={{
          clipPath: isGlitching
            ? "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)"
            : "none",
          transform: isGlitching
            ? "translate(2px, 0)"
            : isHovered
              ? "translate(1px, 0)"
              : "none",
          transition: isGlitching ? "none" : "all 0.3s ease",
        }}
        aria-hidden="true"
      >
        {text}
      </span>

      {/* Main text */}
      <span
        className={cn(
          "relative z-10 inline-block",
          "transition-all duration-100",
          isGlitching && "animate-glitch-skew"
        )}
        style={{
          textShadow: isGlitching
            ? "2px 0 #ff0040, -2px 0 #00f0ff"
            : isHovered
              ? "1px 0 rgba(255,0,64,0.5), -1px 0 rgba(0,240,255,0.5)"
              : "0 0 8px rgba(239,68,68,0.3)",
        }}
      >
        {text}
      </span>

      {/* Scan line effect on glitch */}
      {isGlitching && (
        <span
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="absolute w-full h-[2px] bg-white/30 animate-scan-line"
            style={{ top: "50%" }}
          />
        </span>
      )}

      {/* Border with glitch */}
      <span
        className={cn(
          "absolute inset-0 rounded-full",
          "border transition-all duration-300",
          "pointer-events-none",
          !isGlitching && !isHovered && "border-red-500/40",
          isHovered && !isGlitching && "border-red-400/60",
          isGlitching && "border-white/50"
        )}
        style={{
          transform: isGlitching ? `skewX(${Math.random() * 4 - 2}deg)` : "none",
          boxShadow: isGlitching
            ? "0 0 10px rgba(255,0,64,0.3), 0 0 20px rgba(0,240,255,0.2)"
            : isHovered
              ? "0 0 20px rgba(239,68,68,0.4)"
              : "0 0 10px rgba(239,68,68,0.15)",
        }}
      />

      {/* Noise texture overlay on glitch */}
      {isGlitching && (
        <span
          className="absolute inset-0 rounded-full opacity-20 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
      )}

      <style jsx>{`
        @keyframes glitch-skew {
          0% {
            transform: skewX(0deg) translateX(0);
          }
          10% {
            transform: skewX(2deg) translateX(-1px);
          }
          20% {
            transform: skewX(-1deg) translateX(2px);
          }
          30% {
            transform: skewX(3deg) translateX(-2px);
          }
          40% {
            transform: skewX(-2deg) translateX(1px);
          }
          50% {
            transform: skewX(1deg) translateX(0);
          }
          60% {
            transform: skewX(-3deg) translateX(2px);
          }
          70% {
            transform: skewX(2deg) translateX(-1px);
          }
          80% {
            transform: skewX(-1deg) translateX(1px);
          }
          90% {
            transform: skewX(1deg) translateX(-1px);
          }
          100% {
            transform: skewX(0deg) translateX(0);
          }
        }

        @keyframes scan-line {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(20px);
            opacity: 0;
          }
        }

        .animate-glitch-skew {
          animation: glitch-skew 0.3s ease-in-out;
        }

        .animate-scan-line {
          animation: scan-line 0.2s linear;
        }

        .glitch-layer-1 {
          mix-blend-mode: screen;
        }

        .glitch-layer-2 {
          mix-blend-mode: screen;
        }
      `}</style>
    </button>
  );
}
