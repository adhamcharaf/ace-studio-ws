"use client";

import { useRef, useEffect, useCallback, useState, CSSProperties } from "react";
import { lerp } from "@/lib/utils";

interface AuroraConfig {
  colors?: string[];
  baseSpeed?: number;
  cursorInfluence?: number;
  ease?: number;
  disabled?: boolean;
}

interface AuroraState {
  gradients: Array<{ x: number; y: number }>;
  isActive: boolean;
}

export function useAuroraGradient<T extends HTMLElement = HTMLDivElement>(config: AuroraConfig = {}) {
  const {
    colors = [
      "rgba(201, 160, 80, 0.08)",
      "rgba(201, 160, 80, 0.06)",
      "rgba(212, 179, 106, 0.04)",
    ],
    baseSpeed = 0.0005,
    cursorInfluence = 0.15,
    ease = 0.03,
    disabled = false,
  } = config;

  const elementRef = useRef<T>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });

  const gradientsRef = useRef(
    colors.map((_, i) => ({
      x: 30 + i * 20,
      y: 20 + i * 30,
      baseX: 30 + i * 20,
      baseY: 20 + i * 30,
      speedX: (i + 1) * 0.3,
      speedY: (i + 1) * 0.4,
      radius: 40 + i * 10,
    }))
  );

  const [backgroundStyle, setBackgroundStyle] = useState<CSSProperties>({});

  const updateBackground = useCallback(() => {
    const gradientStrings = gradientsRef.current.map((g, i) => {
      return `radial-gradient(ellipse ${g.radius}% ${g.radius * 1.2}% at ${g.x}% ${g.y}%, ${colors[i]} 0%, transparent 70%)`;
    });

    gradientStrings.push(
      "linear-gradient(180deg, #FAF8F5 0%, #F5F2ED 50%, #FAF8F5 100%)"
    );

    setBackgroundStyle({
      background: gradientStrings.join(", "),
    });
  }, [colors]);

  const animate = useCallback(() => {
    timeRef.current += 16;

    mouseRef.current.x = lerp(mouseRef.current.x, targetMouseRef.current.x, ease);
    mouseRef.current.y = lerp(mouseRef.current.y, targetMouseRef.current.y, ease);

    gradientsRef.current.forEach((g, i) => {
      const timeOffset = i * 1000;
      const time = timeRef.current + timeOffset;

      const baseMovementX = Math.sin(time * baseSpeed * g.speedX) * 15;
      const baseMovementY = Math.cos(time * baseSpeed * g.speedY) * 10;

      const cursorOffsetX = (mouseRef.current.x - 0.5) * 100 * cursorInfluence * (i + 1) * 0.5;
      const cursorOffsetY = (mouseRef.current.y - 0.5) * 100 * cursorInfluence * (i + 1) * 0.5;

      g.x = g.baseX + baseMovementX + cursorOffsetX;
      g.y = g.baseY + baseMovementY + cursorOffsetY;

      g.x = Math.max(10, Math.min(90, g.x));
      g.y = Math.max(10, Math.min(90, g.y));
    });

    updateBackground();
    animationRef.current = requestAnimationFrame(animate);
  }, [baseSpeed, cursorInfluence, ease, updateBackground]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (disabled || !elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        targetMouseRef.current.x = (e.clientX - rect.left) / rect.width;
        targetMouseRef.current.y = (e.clientY - rect.top) / rect.height;
      }
    },
    [disabled]
  );

  const handleMouseLeave = useCallback(() => {
    targetMouseRef.current.x = 0.5;
    targetMouseRef.current.y = 0.5;
  }, []);

  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      updateBackground();
      return;
    }

    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [disabled, animate, handleMouseMove, handleMouseLeave, updateBackground]);

  return {
    ref: elementRef,
    style: backgroundStyle,
  };
}
