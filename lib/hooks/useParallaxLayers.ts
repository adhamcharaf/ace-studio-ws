"use client";

import { useRef, useEffect, useState, CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxLayerConfig {
  speed: number;
  direction?: "vertical" | "horizontal" | "both";
  maxMovement?: number;
}

interface UseParallaxLayersReturn {
  containerRef: React.RefObject<HTMLElement | null>;
  getLayerStyle: (config: ParallaxLayerConfig) => CSSProperties;
  getLayerProps: (id: string, config: ParallaxLayerConfig) => {
    "data-parallax-id": string;
    style: CSSProperties;
  };
}

export function useParallaxLayers<T extends HTMLElement = HTMLDivElement>(): UseParallaxLayersReturn {
  const containerRef = useRef<T>(null);
  const layersRef = useRef<Map<string, { element: HTMLElement; config: ParallaxLayerConfig }>>(new Map());
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);

          layersRef.current.forEach(({ element, config }) => {
            const { speed, direction = "vertical", maxMovement = 50 } = config;
            const movement = (self.progress - 0.5) * 2 * speed * maxMovement;

            let transform = "";
            if (direction === "vertical" || direction === "both") {
              transform += `translateY(${movement}px)`;
            }
            if (direction === "horizontal" || direction === "both") {
              transform += ` translateX(${movement * 0.5}px)`;
            }

            element.style.transform = transform;
          });
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      const parallaxElements = container.querySelectorAll("[data-parallax-id]");
      parallaxElements.forEach((el) => {
        const id = el.getAttribute("data-parallax-id");
        if (id && layersRef.current.has(id)) {
          const entry = layersRef.current.get(id)!;
          entry.element = el as HTMLElement;
        }
      });
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const getLayerStyle = (config: ParallaxLayerConfig): CSSProperties => {
    return {
      willChange: "transform",
    };
  };

  const getLayerProps = (id: string, config: ParallaxLayerConfig) => {
    return {
      "data-parallax-id": id,
      style: getLayerStyle(config),
      ref: (el: HTMLElement | null) => {
        if (el) {
          layersRef.current.set(id, { element: el, config });
        } else {
          layersRef.current.delete(id);
        }
      },
    };
  };

  return {
    containerRef: containerRef as React.RefObject<HTMLElement | null>,
    getLayerStyle,
    getLayerProps,
  };
}
