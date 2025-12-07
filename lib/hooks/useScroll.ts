"use client";

import { useState, useEffect, useCallback } from "react";
import { throttle } from "@/lib/utils";
import type { UseScrollReturn } from "@/types";

export function useScroll(threshold: number = 50): UseScrollReturn {
  const [scrollState, setScrollState] = useState<UseScrollReturn>({
    scrollY: 0,
    isScrolled: false,
    scrollDirection: null,
  });

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setScrollState((prev) => {
      const isScrolled = currentScrollY > threshold;
      let scrollDirection: "up" | "down" | null = null;

      if (currentScrollY > prev.scrollY) {
        scrollDirection = "down";
      } else if (currentScrollY < prev.scrollY) {
        scrollDirection = "up";
      }

      return {
        scrollY: currentScrollY,
        isScrolled,
        scrollDirection,
      };
    });
  }, [threshold]);

  useEffect(() => {
    const throttledHandle = throttle(handleScroll, 100);

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", throttledHandle, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandle);
  }, [handleScroll]);

  return scrollState;
}
