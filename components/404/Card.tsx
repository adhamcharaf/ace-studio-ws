"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  is404?: boolean;
  isFlipped?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ is404 = false, isFlipped = false, className, style, onClick, onMouseEnter, onMouseLeave }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative cursor-pointer select-none",
          "w-[60px] h-[84px] md:w-[80px] md:h-[112px]",
          "transform-gpu",
          className
        )}
        style={{
          transformStyle: "preserve-3d",
          ...style,
        }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Card Front */}
        <div
          className={cn(
            "absolute inset-0 rounded-lg",
            "bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]",
            "border border-[#c9a050]/30",
            "flex flex-col items-center justify-center",
            "backface-hidden",
            is404 && "shadow-[0_0_30px_rgba(201,160,80,0.4)]"
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Top left corner */}
          <div className="absolute top-1 left-1.5 md:top-2 md:left-2 flex flex-col items-center">
            <span className={cn(
              "text-[10px] md:text-xs font-bold",
              is404 ? "text-[#c9a050]" : "text-white/90"
            )}>
              {is404 ? "404" : "A"}
            </span>
            <SpadeIcon className="w-2 h-2 md:w-2.5 md:h-2.5" gold={is404} />
          </div>

          {/* Center spade */}
          <SpadeIcon
            className={cn(
              "w-8 h-8 md:w-12 md:h-12",
              is404 && "drop-shadow-[0_0_10px_rgba(201,160,80,0.6)]"
            )}
            gold={is404}
            large
          />

          {/* 404 text overlay for special card */}
          {is404 && (
            <span className="absolute text-[#c9a050] text-lg md:text-2xl font-bold font-[var(--font-playfair)] mt-1">
              404
            </span>
          )}

          {/* Bottom right corner (inverted) */}
          <div className="absolute bottom-1 right-1.5 md:bottom-2 md:right-2 flex flex-col items-center rotate-180">
            <span className={cn(
              "text-[10px] md:text-xs font-bold",
              is404 ? "text-[#c9a050]" : "text-white/90"
            )}>
              {is404 ? "404" : "A"}
            </span>
            <SpadeIcon className="w-2 h-2 md:w-2.5 md:h-2.5" gold={is404} />
          </div>

          {/* Subtle inner border */}
          <div className="absolute inset-1 md:inset-1.5 rounded border border-[#c9a050]/10 pointer-events-none" />
        </div>

        {/* Card Back */}
        <div
          className={cn(
            "absolute inset-0 rounded-lg",
            "bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]",
            "border border-[#c9a050]/30",
            "backface-hidden overflow-hidden"
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: isFlipped ? "rotateY(0deg)" : "rotateY(180deg)",
          }}
        >
          {/* Geometric pattern */}
          <div className="absolute inset-2 md:inset-3 rounded border border-[#c9a050]/20">
            <div className="absolute inset-0 opacity-30">
              {/* Diamond pattern */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <pattern id="cardPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path
                      d="M10 0 L20 10 L10 20 L0 10 Z"
                      fill="none"
                      stroke="#c9a050"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#cardPattern)" />
              </svg>
            </div>
            {/* Center logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <SpadeIcon className="w-6 h-6 md:w-8 md:h-8 opacity-40" gold />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

// Spade Icon Component
function SpadeIcon({ className, gold = false, large = false }: { className?: string; gold?: boolean; large?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(className)}
      fill={gold ? "#c9a050" : "currentColor"}
    >
      {/* Main spade shape */}
      <path
        d="M50 10
           C50 10, 15 40, 15 55
           C15 70, 30 75, 50 60
           C70 75, 85 70, 85 55
           C85 40, 50 10, 50 10 Z"
        className={gold ? "text-[#c9a050]" : "text-white/90"}
      />
      {/* Stem */}
      <path
        d="M45 60 L45 85 L40 85 C40 85, 50 75, 60 85 L55 85 L55 60 Z"
        className={gold ? "text-[#c9a050]" : "text-white/90"}
      />
      {large && gold && (
        <>
          {/* Subtle highlight for large gold spade */}
          <path
            d="M50 15 C50 15, 25 40, 25 52 C25 60, 32 62, 42 55"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export default Card;
