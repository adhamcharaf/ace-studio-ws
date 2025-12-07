"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface SpadeAnimationProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function SpadeAnimation({
  className,
  size = "lg",
}: SpadeAnimationProps) {
  const spadeRef = useRef<SVGSVGElement>(null);

  const sizes = {
    sm: "w-24 h-24",
    md: "w-40 h-40",
    lg: "w-64 h-64",
  };

  useEffect(() => {
    const spade = spadeRef.current;
    if (!spade) return;

    // Create floating animation
    gsap.to(spade, {
      y: 15,
      rotation: 5,
      duration: 2.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      gsap.killTweensOf(spade);
    };
  }, []);

  return (
    <svg
      ref={spadeRef}
      viewBox="0 0 100 120"
      className={cn(sizes[size], "text-[var(--ace-black)]", className)}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Spade shape */}
      <path
        d="M50 5 C50 5 20 40 20 60 C20 75 32 85 50 85 C68 85 80 75 80 60 C80 40 50 5 50 5Z"
        fill="currentColor"
      />
      {/* Stem */}
      <rect x="45" y="75" width="10" height="30" fill="currentColor" />
      {/* Base curves */}
      <circle cx="35" cy="105" r="12" fill="currentColor" />
      <circle cx="65" cy="105" r="12" fill="currentColor" />
    </svg>
  );
}
