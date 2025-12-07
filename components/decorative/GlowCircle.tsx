"use client";

interface GlowCircleProps {
  size?: "sm" | "md" | "lg" | number;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  delay?: number;
  className?: string;
}

const sizes = {
  sm: 300,
  md: 500,
  lg: 700,
};

export default function GlowCircle({
  size = "md",
  position,
  delay = 0,
  className = "",
}: GlowCircleProps) {
  const computedSize = typeof size === "number" ? size : sizes[size];

  return (
    <div
      className={`glow-circle-gold floating-shape pointer-events-none ${className}`}
      style={{
        ...position,
        width: computedSize,
        height: computedSize,
        animationDelay: `${delay}s`,
      }}
    />
  );
}
