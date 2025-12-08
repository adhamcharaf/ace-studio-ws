"use client";

import { useParticleSystem } from "@/lib/hooks";

export default function GoldParticles() {
  const { canvasRef, canvasStyle } = useParticleSystem({
    count: 35,
    color: "#C9A050",
    minSize: 1.5,
    maxSize: 4,
    cursorRadius: 120,
    cursorForce: 0.5,
    mode: "scatter",
  });

  return <canvas ref={canvasRef} style={canvasStyle} aria-hidden="true" />;
}
