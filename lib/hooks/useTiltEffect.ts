"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { lerp } from "@/lib/utils";

interface TiltConfig {
  maxTiltX?: number;
  maxTiltY?: number;
  perspective?: number;
  scale?: number;
  ease?: number;
  glareEnabled?: boolean;
  glareMaxOpacity?: number;
  disabled?: boolean;
}

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
  glareX: number;
  glareY: number;
  isActive: boolean;
}

export function useTiltEffect<T extends HTMLElement = HTMLDivElement>(config: TiltConfig = {}) {
  const {
    maxTiltX = 15,
    maxTiltY = 15,
    perspective = 1000,
    scale = 1.02,
    ease = 0.08,
    glareEnabled = true,
    glareMaxOpacity = 0.15,
    disabled = false,
  } = config;

  const elementRef = useRef<T>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

  const targetRef = useRef({ rotateX: 0, rotateY: 0, scale: 1, glareX: 50, glareY: 50 });
  const currentRef = useRef({ rotateX: 0, rotateY: 0, scale: 1, glareX: 50, glareY: 50 });

  const [state, setState] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    glareX: 50,
    glareY: 50,
    isActive: false,
  });

  const animate = useCallback(() => {
    currentRef.current.rotateX = lerp(currentRef.current.rotateX, targetRef.current.rotateX, ease);
    currentRef.current.rotateY = lerp(currentRef.current.rotateY, targetRef.current.rotateY, ease);
    currentRef.current.scale = lerp(currentRef.current.scale, targetRef.current.scale, ease);
    currentRef.current.glareX = lerp(currentRef.current.glareX, targetRef.current.glareX, ease);
    currentRef.current.glareY = lerp(currentRef.current.glareY, targetRef.current.glareY, ease);

    if (elementRef.current) {
      elementRef.current.style.transform = `
        perspective(${perspective}px)
        rotateX(${currentRef.current.rotateX}deg)
        rotateY(${currentRef.current.rotateY}deg)
        scale(${currentRef.current.scale})
      `;
    }

    if (glareRef.current && glareEnabled) {
      const glareOpacity = Math.sqrt(
        Math.pow(currentRef.current.rotateX / maxTiltX, 2) +
        Math.pow(currentRef.current.rotateY / maxTiltY, 2)
      ) * glareMaxOpacity;

      glareRef.current.style.background = `
        radial-gradient(
          circle at ${currentRef.current.glareX}% ${currentRef.current.glareY}%,
          rgba(255, 255, 255, ${glareOpacity}) 0%,
          transparent 60%
        )
      `;
    }

    const dX = Math.abs(targetRef.current.rotateX - currentRef.current.rotateX);
    const dY = Math.abs(targetRef.current.rotateY - currentRef.current.rotateY);
    const dS = Math.abs(targetRef.current.scale - currentRef.current.scale);

    if (dX > 0.01 || dY > 0.01 || dS > 0.001) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      isAnimatingRef.current = false;
      animationRef.current = null;
      setState({
        rotateX: currentRef.current.rotateX,
        rotateY: currentRef.current.rotateY,
        scale: currentRef.current.scale,
        glareX: currentRef.current.glareX,
        glareY: currentRef.current.glareY,
        isActive: targetRef.current.rotateX !== 0 || targetRef.current.rotateY !== 0,
      });
    }
  }, [ease, perspective, glareEnabled, glareMaxOpacity, maxTiltX, maxTiltY]);

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
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const relativeX = e.clientX - centerX;
        const relativeY = e.clientY - centerY;

        targetRef.current.rotateY = (relativeX / (rect.width / 2)) * maxTiltY;
        targetRef.current.rotateX = -(relativeY / (rect.height / 2)) * maxTiltX;
        targetRef.current.scale = scale;

        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;
        targetRef.current.glareX = glareX;
        targetRef.current.glareY = glareY;

        startAnimation();
      } else if (
        targetRef.current.rotateX !== 0 ||
        targetRef.current.rotateY !== 0 ||
        targetRef.current.scale !== 1
      ) {
        targetRef.current.rotateX = 0;
        targetRef.current.rotateY = 0;
        targetRef.current.scale = 1;
        targetRef.current.glareX = 50;
        targetRef.current.glareY = 50;
        startAnimation();
      }
    },
    [disabled, maxTiltX, maxTiltY, scale, startAnimation]
  );

  const handleMouseLeave = useCallback(() => {
    targetRef.current.rotateX = 0;
    targetRef.current.rotateY = 0;
    targetRef.current.scale = 1;
    targetRef.current.glareX = 50;
    targetRef.current.glareY = 50;
    startAnimation();
  }, [startAnimation]);

  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

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

  useEffect(() => {
    return () => {
      if (elementRef.current) {
        elementRef.current.style.transform = "";
      }
    };
  }, []);

  return {
    ref: elementRef,
    glareRef,
    style: {
      willChange: disabled ? "auto" : "transform",
      transformStyle: "preserve-3d" as const,
    },
    glareStyle: glareEnabled ? {
      position: "absolute" as const,
      inset: 0,
      pointerEvents: "none" as const,
      borderRadius: "inherit",
      zIndex: 10,
    } : undefined,
    state,
    isActive: state.isActive,
  };
}
