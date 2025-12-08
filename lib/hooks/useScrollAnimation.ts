"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { AnimationType } from "@/types";

// Register plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseScrollAnimationOptions {
  delay?: number;
  duration?: number;
  once?: boolean;
}

const animationConfigs: Record<AnimationType, gsap.TweenVars> = {
  fade: { opacity: 0 },
  "slide-up": { opacity: 0, y: 30 },
  "slide-down": { opacity: 0, y: -30 },
  "slide-left": { opacity: 0, x: -30 },
  "slide-right": { opacity: 0, x: 30 },
  scale: { opacity: 0, scale: 0.9 },
  none: {},
};

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  animation: AnimationType = "slide-up",
  options: UseScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);
  const { delay = 0, duration = 0.6, once = true } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element || animation === "none") return;

    const ctx = gsap.context(() => {
      gsap.from(element, {
        ...animationConfigs[animation],
        duration,
        delay,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, [animation, delay, duration, once]);

  return ref;
}

// Hook for staggered children animations
export function useStaggerAnimation<T extends HTMLElement = HTMLDivElement>(
  childSelector: string,
  animation: AnimationType = "slide-up",
  options: UseScrollAnimationOptions & { stagger?: number } = {}
) {
  const ref = useRef<T>(null);
  const { delay = 0, duration = 0.4, stagger = 0.1, once = true } = options;

  useEffect(() => {
    const container = ref.current;
    if (!container || animation === "none") return;

    const children = container.querySelectorAll(childSelector);
    if (children.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(children, {
        ...animationConfigs[animation],
        duration,
        delay,
        stagger,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, [childSelector, animation, delay, duration, stagger, once]);

  return ref;
}
