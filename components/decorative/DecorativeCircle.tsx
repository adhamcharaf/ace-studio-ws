"use client";

interface DecorativeCircleProps {
  size?: number;
  opacity?: number;
  centered?: boolean;
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  className?: string;
}

export default function DecorativeCircle({
  size = 800,
  opacity = 0.12,
  centered = true,
  position,
  className = "",
}: DecorativeCircleProps) {
  const centerClasses = centered
    ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    : "";

  return (
    <div
      className={`absolute rounded-full border border-[var(--theme-accent)] pointer-events-none ${centerClasses} ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        ...(!centered && position ? position : {}),
      }}
    />
  );
}
