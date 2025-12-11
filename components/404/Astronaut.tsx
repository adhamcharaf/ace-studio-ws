"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AstronautProps {
  className?: string;
}

export default function Astronaut({ className }: AstronautProps) {
  const [isWaving, setIsWaving] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleClick = () => {
    if (!isWaving) {
      setIsWaving(true);
      setHasInteracted(true);
      setTimeout(() => setIsWaving(false), 2000);
    }
  };

  // Subtle hint after 5 seconds if user hasn't clicked
  const [showHint, setShowHint] = useState(false);
  useEffect(() => {
    if (!hasInteracted) {
      const timer = setTimeout(() => setShowHint(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  return (
    <div
      className={cn(
        "relative cursor-pointer select-none transition-transform hover:scale-105",
        className
      )}
      onClick={handleClick}
      title="Click me!"
    >
      {/* Hint pulse */}
      {showHint && !hasInteracted && (
        <div className="absolute inset-0 animate-ping opacity-20 rounded-full bg-[var(--ace-gold)]" />
      )}

      <svg
        viewBox="0 0 200 280"
        className={cn(
          "w-32 h-44 md:w-48 md:h-64 lg:w-56 lg:h-72",
          "drop-shadow-[0_0_30px_rgba(201,160,80,0.3)]",
          "transition-all duration-300"
        )}
        style={{
          animation: "float 8s ease-in-out infinite",
        }}
      >
        {/* Helmet glow */}
        <defs>
          <radialGradient id="helmetGlow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="rgba(201, 160, 80, 0.4)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="visorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="50%" stopColor="#16213e" />
            <stop offset="100%" stopColor="#0f0f23" />
          </linearGradient>
          <linearGradient id="suitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e8e8e8" />
            <stop offset="100%" stopColor="#b0b0b0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Backpack / Life support */}
        <rect
          x="55"
          y="85"
          width="90"
          height="100"
          rx="10"
          fill="#9a9a9a"
          stroke="#7a7a7a"
          strokeWidth="2"
        />
        <rect x="65" y="95" width="70" height="20" rx="3" fill="#6a6a6a" />
        <rect x="65" y="125" width="70" height="20" rx="3" fill="#6a6a6a" />
        <rect x="65" y="155" width="70" height="20" rx="3" fill="#6a6a6a" />

        {/* Body / Suit */}
        <ellipse
          cx="100"
          cy="160"
          rx="55"
          ry="70"
          fill="url(#suitGradient)"
          stroke="#a0a0a0"
          strokeWidth="2"
        />

        {/* Chest panel */}
        <rect
          x="70"
          y="120"
          width="60"
          height="50"
          rx="5"
          fill="#d0d0d0"
          stroke="#b0b0b0"
          strokeWidth="1"
        />
        <circle cx="85" cy="135" r="5" fill="#c9a050" filter="url(#glow)" />
        <circle cx="100" cy="135" r="5" fill="#4ade80" filter="url(#glow)" />
        <circle cx="115" cy="135" r="5" fill="#60a5fa" filter="url(#glow)" />
        <rect x="80" y="148" width="40" height="15" rx="2" fill="#8a8a8a" />

        {/* Left arm */}
        <g
          style={{
            transformOrigin: "45px 130px",
            animation: isWaving ? "wave 0.5s ease-in-out 4" : "armFloat 6s ease-in-out infinite",
          }}
        >
          <ellipse cx="35" cy="150" rx="18" ry="35" fill="url(#suitGradient)" stroke="#a0a0a0" strokeWidth="2" />
          {/* Glove */}
          <ellipse cx="30" cy="185" rx="14" ry="18" fill="#9a9a9a" stroke="#8a8a8a" strokeWidth="1" />
        </g>

        {/* Right arm */}
        <g style={{ animation: "armFloat 6s ease-in-out infinite reverse" }}>
          <ellipse cx="165" cy="150" rx="18" ry="35" fill="url(#suitGradient)" stroke="#a0a0a0" strokeWidth="2" />
          {/* Glove */}
          <ellipse cx="170" cy="185" rx="14" ry="18" fill="#9a9a9a" stroke="#8a8a8a" strokeWidth="1" />
        </g>

        {/* Left leg */}
        <ellipse
          cx="70"
          cy="235"
          rx="20"
          ry="35"
          fill="url(#suitGradient)"
          stroke="#a0a0a0"
          strokeWidth="2"
          style={{ animation: "legFloat 7s ease-in-out infinite" }}
        />
        {/* Boot */}
        <ellipse cx="70" cy="265" rx="18" ry="12" fill="#5a5a5a" />

        {/* Right leg */}
        <ellipse
          cx="130"
          cy="235"
          rx="20"
          ry="35"
          fill="url(#suitGradient)"
          stroke="#a0a0a0"
          strokeWidth="2"
          style={{ animation: "legFloat 7s ease-in-out infinite reverse" }}
        />
        {/* Boot */}
        <ellipse cx="130" cy="265" rx="18" ry="12" fill="#5a5a5a" />

        {/* Helmet */}
        <circle
          cx="100"
          cy="55"
          r="50"
          fill="url(#suitGradient)"
          stroke="#a0a0a0"
          strokeWidth="3"
        />

        {/* Helmet glow effect */}
        <circle
          cx="100"
          cy="55"
          r="48"
          fill="url(#helmetGlow)"
        />

        {/* Visor */}
        <ellipse
          cx="100"
          cy="55"
          rx="38"
          ry="35"
          fill="url(#visorGradient)"
          stroke="#c9a050"
          strokeWidth="2"
          filter="url(#glow)"
        />

        {/* Visor reflection */}
        <ellipse
          cx="85"
          cy="45"
          rx="15"
          ry="10"
          fill="rgba(255, 255, 255, 0.1)"
        />

        {/* Stars reflection in visor */}
        <circle cx="115" cy="60" r="1.5" fill="rgba(255, 255, 255, 0.6)" />
        <circle cx="108" cy="50" r="1" fill="rgba(255, 255, 255, 0.4)" />
        <circle cx="120" cy="45" r="0.8" fill="rgba(255, 255, 255, 0.3)" />

        {/* Antenna */}
        <line x1="140" y1="25" x2="155" y2="5" stroke="#b0b0b0" strokeWidth="2" />
        <circle cx="157" cy="3" r="4" fill="#c9a050" filter="url(#glow)">
          <animate
            attributeName="opacity"
            values="1;0.5;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Tether / Rope floating */}
        <path
          d="M 30 180 Q 0 200, 10 230 Q 25 260, 5 280"
          stroke="#8a8a8a"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          style={{ animation: "tetherFloat 5s ease-in-out infinite" }}
        />
        <circle cx="5" cy="280" r="6" fill="#6a6a6a" />
      </svg>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(-3deg);
          }
          50% {
            transform: translateY(-20px) rotate(3deg);
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-30deg);
          }
          75% {
            transform: rotate(30deg);
          }
        }

        @keyframes armFloat {
          0%, 100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }

        @keyframes legFloat {
          0%, 100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(5px) rotate(2deg);
          }
        }

        @keyframes tetherFloat {
          0%, 100% {
            d: path("M 30 180 Q 0 200, 10 230 Q 25 260, 5 280");
          }
          50% {
            d: path("M 30 180 Q -10 210, 15 240 Q 30 270, 0 285");
          }
        }
      `}</style>
    </div>
  );
}
