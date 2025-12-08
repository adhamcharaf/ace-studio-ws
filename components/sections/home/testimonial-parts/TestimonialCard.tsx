"use client";

import { useTiltEffect } from "@/lib/hooks";
import { ReactNode } from "react";

interface TestimonialCardProps {
  children: ReactNode;
}

export default function TestimonialCard({ children }: TestimonialCardProps) {
  const { ref, glareRef, style, glareStyle } = useTiltEffect<HTMLDivElement>({
    maxTiltX: 8,
    maxTiltY: 8,
    perspective: 1200,
    scale: 1.01,
    ease: 0.06,
    glareEnabled: true,
    glareMaxOpacity: 0.1,
  });

  return (
    <div
      ref={ref}
      className="relative max-w-4xl mx-auto text-center rounded-2xl p-8 md:p-12 lg:p-16"
      style={style}
    >
      {/* Glare overlay */}
      {glareStyle && (
        <div ref={glareRef} style={glareStyle} className="rounded-2xl overflow-hidden" />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
