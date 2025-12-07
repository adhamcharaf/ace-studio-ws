"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { lerp } from "@/lib/utils";

interface MagneticConfig {
  strength?: number;      // How strongly the element follows cursor (0-1)
  maxDistance?: number;   // Max distance in pixels for magnetic effect
  ease?: number;          // Interpolation factor for smoothness (0-1)
  scale?: number;         // Scale on hover (1 = no scale)
  disabled?: boolean;     // Disable effect (for mobile)
}

interface MagneticState {
  x: number;
  y: number;
  isActive: boolean;
  scale: number;
}

export function useMagneticEffect<T extends HTMLElement = HTMLButtonElement>(config: MagneticConfig = {}) {
  const {
    strength = 0.35,
    maxDistance = 100,
    ease = 0.15,
    scale = 1.05,
    disabled = false,
  } = config;

  const elementRef = useRef<T>(null);
  const animationRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const targetRef = useRef({ x: 0, y: 0, scale: 1 });
  const currentRef = useRef({ x: 0, y: 0, scale: 1 });
  const [state, setState] = useState<MagneticState>({
    x: 0,
    y: 0,
    isActive: false,
    scale: 1,
  });

  const animate = useCallback(() => {
    currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, ease);
    currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, ease);
    currentRef.current.scale = lerp(currentRef.current.scale, targetRef.current.scale, ease);

    // Apply transform directly for performance
    if (elementRef.current) {
      elementRef.current.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px) scale(${currentRef.current.scale})`;
    }

    // Continue animation if not at target
    const dx = Math.abs(targetRef.current.x - currentRef.current.x);
    const dy = Math.abs(targetRef.current.y - currentRef.current.y);
    const ds = Math.abs(targetRef.current.scale - currentRef.current.scale);

    if (dx > 0.01 || dy > 0.01 || ds > 0.001) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Animation complete - reset flag
      isAnimatingRef.current = false;
      animationRef.current = null;

      // Update React state only when animation ends
      setState({
        x: currentRef.current.x,
        y: currentRef.current.y,
        scale: currentRef.current.scale,
        isActive: targetRef.current.x !== 0 || targetRef.current.y !== 0,
      });
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
      if (disabled || !elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < maxDistance) {
        // Calculate pull based on distance (stronger when closer)
        const pull = 1 - distance / maxDistance;
        targetRef.current.x = deltaX * strength * pull;
        targetRef.current.y = deltaY * strength * pull;
        targetRef.current.scale = 1 + (scale - 1) * pull;
        startAnimation();
      } else if (targetRef.current.x !== 0 || targetRef.current.y !== 0) {
        // Reset when outside range
        targetRef.current.x = 0;
        targetRef.current.y = 0;
        targetRef.current.scale = 1;
        startAnimation();
      }
    },
    [disabled, maxDistance, strength, scale, startAnimation]
  );

  const handleMouseLeave = useCallback(() => {
    targetRef.current.x = 0;
    targetRef.current.y = 0;
    targetRef.current.scale = 1;
    startAnimation();
  }, [startAnimation]);

  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

    // Check for touch device
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [disabled, handleMouseMove, handleMouseLeave]);

  // Reset transform on unmount
  useEffect(() => {
    return () => {
      if (elementRef.current) {
        elementRef.current.style.transform = "";
      }
    };
  }, []);

  return {
    ref: elementRef,
    style: {
      willChange: disabled ? "auto" : "transform",
    },
    state,
    isActive: state.isActive,
  };
}
