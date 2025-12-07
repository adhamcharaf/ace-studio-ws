"use client";

import { useState, useEffect, useCallback } from "react";
import { throttle } from "@/lib/utils";

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1 based on viewport
  normalizedY: number; // -1 to 1 based on viewport
  isInViewport: boolean;
}

interface UseMousePositionOptions {
  throttleMs?: number;
  enableNormalized?: boolean;
}

export function useMousePosition(options: UseMousePositionOptions = {}): MousePosition {
  const { throttleMs = 16, enableNormalized = true } = options;

  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    isInViewport: false,
  });

  const updatePosition = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    let normalizedX = 0;
    let normalizedY = 0;

    if (enableNormalized && typeof window !== "undefined") {
      normalizedX = (x / window.innerWidth) * 2 - 1;
      normalizedY = (y / window.innerHeight) * 2 - 1;
    }

    setPosition({
      x,
      y,
      normalizedX,
      normalizedY,
      isInViewport: true,
    });
  }, [enableNormalized]);

  const handleMouseLeave = useCallback(() => {
    setPosition((prev) => ({ ...prev, isInViewport: false }));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const throttledUpdate = throttle(updatePosition, throttleMs);

    window.addEventListener("mousemove", throttledUpdate);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", throttledUpdate);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [updatePosition, handleMouseLeave, throttleMs]);

  return position;
}

// Hook for element-relative mouse position
export function useElementMousePosition(
  elementRef: React.RefObject<HTMLElement | null>
): MousePosition & { relativeX: number; relativeY: number } {
  const globalPosition = useMousePosition();
  const [relativePosition, setRelativePosition] = useState({ relativeX: 0, relativeY: 0 });

  useEffect(() => {
    if (!elementRef.current || !globalPosition.isInViewport) return;

    const rect = elementRef.current.getBoundingClientRect();
    const relativeX = globalPosition.x - (rect.left + rect.width / 2);
    const relativeY = globalPosition.y - (rect.top + rect.height / 2);

    setRelativePosition({ relativeX, relativeY });
  }, [globalPosition, elementRef]);

  return { ...globalPosition, ...relativePosition };
}
