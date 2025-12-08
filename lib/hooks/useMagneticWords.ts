"use client";

import { useRef, useEffect, useCallback, useState, CSSProperties } from "react";
import { lerp } from "@/lib/utils";

interface MagneticWordsConfig {
  strength?: number;
  maxDistance?: number;
  ease?: number;
  disabled?: boolean;
}

interface WordState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

export function useMagneticWords(text: string, config: MagneticWordsConfig = {}) {
  const {
    strength = 0.12,
    maxDistance = 180,
    ease = 0.06,
    disabled = false,
  } = config;

  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<Map<number, HTMLSpanElement>>(new Map());
  const wordStatesRef = useRef<Map<number, WordState>>(new Map());
  const animationRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

  const words = text.split(/\s+/);

  const [, forceUpdate] = useState(0);

  const animate = useCallback(() => {
    let needsUpdate = false;

    wordStatesRef.current.forEach((state, index) => {
      const element = wordsRef.current.get(index);
      if (!element) return;

      state.x = lerp(state.x, state.targetX, ease);
      state.y = lerp(state.y, state.targetY, ease);

      element.style.transform = `translate(${state.x}px, ${state.y}px)`;

      const dx = Math.abs(state.targetX - state.x);
      const dy = Math.abs(state.targetY - state.y);

      if (dx > 0.01 || dy > 0.01) {
        needsUpdate = true;
      }
    });

    if (needsUpdate) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      isAnimatingRef.current = false;
      animationRef.current = null;
    }
  }, [ease]);

  const startAnimation = useCallback(() => {
    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (disabled) return;

      wordsRef.current.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let state = wordStatesRef.current.get(index);
        if (!state) {
          state = { x: 0, y: 0, targetX: 0, targetY: 0 };
          wordStatesRef.current.set(index, state);
        }

        if (distance < maxDistance) {
          const pull = Math.pow(1 - distance / maxDistance, 2);
          state.targetX = dx * strength * pull;
          state.targetY = dy * strength * pull;
        } else {
          state.targetX = 0;
          state.targetY = 0;
        }
      });

      startAnimation();
    },
    [disabled, maxDistance, strength, startAnimation]
  );

  const handleMouseLeave = useCallback(() => {
    wordStatesRef.current.forEach((state) => {
      state.targetX = 0;
      state.targetY = 0;
    });
    startAnimation();
  }, [startAnimation]);

  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [disabled, handleMouseMove, handleMouseLeave]);

  const getWordProps = (index: number) => ({
    ref: (el: HTMLSpanElement | null) => {
      if (el) {
        wordsRef.current.set(index, el);
        if (!wordStatesRef.current.has(index)) {
          wordStatesRef.current.set(index, { x: 0, y: 0, targetX: 0, targetY: 0 });
        }
      } else {
        wordsRef.current.delete(index);
        wordStatesRef.current.delete(index);
      }
    },
    style: {
      display: "inline-block",
      willChange: disabled ? "auto" : "transform",
    } as CSSProperties,
  });

  return {
    containerRef,
    words,
    getWordProps,
    containerStyle: {
      display: "inline",
    } as CSSProperties,
  };
}
