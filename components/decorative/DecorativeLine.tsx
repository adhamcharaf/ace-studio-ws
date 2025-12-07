"use client";

interface DecorativeLineProps {
  position: "left" | "right";
  top?: string;
  bottom?: string;
  width?: number;
  opacity?: number;
  className?: string;
}

export default function DecorativeLine({
  position,
  top,
  bottom,
  width = 128,
  opacity = 0.4,
  className = "",
}: DecorativeLineProps) {
  const gradientDirection = position === "left" ? "to-r" : "to-l";

  return (
    <div
      className={`absolute h-px bg-gradient-${gradientDirection} from-transparent via-[var(--theme-accent)] to-transparent pointer-events-none ${className}`}
      style={{
        top,
        bottom,
        [position]: 0,
        width,
        opacity,
      }}
    />
  );
}
