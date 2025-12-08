"use client";

import { useAuroraGradient } from "@/lib/hooks";

export default function AuroraBackground() {
  const { ref, style } = useAuroraGradient();

  return (
    <div
      ref={ref}
      className="absolute inset-0 transition-[background] duration-100"
      style={style}
    />
  );
}
