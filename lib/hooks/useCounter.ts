"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseCounterOptions {
  duration?: number;
  delay?: number;
}

export function useCounter(
  endValue: number,
  options: UseCounterOptions = {}
) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const { duration = 1.5, delay = 0 } = options;

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const obj = { value: 0 };
    gsap.to(obj, {
      value: endValue,
      duration,
      delay,
      ease: "power2.out",
      onUpdate: () => {
        setCount(Math.round(obj.value));
      },
    });
  }, [endValue, duration, delay]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      onEnter: animate,
    });

    return () => {
      trigger.kill();
    };
  }, [animate]);

  return { count, ref };
}
