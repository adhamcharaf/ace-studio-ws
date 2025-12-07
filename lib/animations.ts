"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins (client-side only)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Default easing
export const EASE = {
  default: "power2.out",
  smooth: "power3.out",
  bounce: "back.out(1.7)",
  elastic: "elastic.out(1, 0.3)",
} as const;

// Animation presets
export const FADE_IN = {
  from: { opacity: 0 },
  to: { opacity: 1, duration: 0.6, ease: EASE.default },
};

export const FADE_IN_UP = {
  from: { opacity: 0, y: 20 },
  to: { opacity: 1, y: 0, duration: 0.6, ease: EASE.default },
};

export const FADE_IN_DOWN = {
  from: { opacity: 0, y: -20 },
  to: { opacity: 1, y: 0, duration: 0.6, ease: EASE.default },
};

export const FADE_IN_LEFT = {
  from: { opacity: 0, x: -30 },
  to: { opacity: 1, x: 0, duration: 0.6, ease: EASE.default },
};

export const FADE_IN_RIGHT = {
  from: { opacity: 0, x: 30 },
  to: { opacity: 1, x: 0, duration: 0.6, ease: EASE.default },
};

export const SCALE_IN = {
  from: { opacity: 0, scale: 0.9 },
  to: { opacity: 1, scale: 1, duration: 0.6, ease: EASE.smooth },
};

// Stagger configuration
export const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const;

// Scroll trigger defaults
export const SCROLL_TRIGGER_DEFAULTS: ScrollTrigger.Vars = {
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none reverse",
};

// Create scroll-triggered animation
export function createScrollAnimation(
  element: gsap.TweenTarget,
  animationVars: gsap.TweenVars,
  triggerOptions?: ScrollTrigger.Vars
): gsap.core.Tween {
  return gsap.from(element, {
    ...animationVars,
    scrollTrigger: {
      trigger: element as gsap.DOMTarget,
      ...SCROLL_TRIGGER_DEFAULTS,
      ...triggerOptions,
    },
  });
}

// Create staggered scroll animation for children
export function createStaggerAnimation(
  container: gsap.DOMTarget,
  children: string,
  animationVars: gsap.TweenVars,
  stagger: number = STAGGER.normal
): gsap.core.Tween {
  return gsap.from(`${container} ${children}`, {
    ...animationVars,
    stagger,
    scrollTrigger: {
      trigger: container,
      ...SCROLL_TRIGGER_DEFAULTS,
    },
  });
}

// Counter animation
export function animateCounter(
  element: gsap.TweenTarget,
  endValue: number,
  duration: number = 1.5,
  onUpdate?: (value: number) => void
): gsap.core.Tween {
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: EASE.default,
    onUpdate: () => {
      if (onUpdate) {
        onUpdate(Math.round(obj.value));
      }
    },
  });
}

// Strikethrough animation
export function animateStrikethrough(
  element: gsap.TweenTarget,
  duration: number = 0.5
): gsap.core.Tween {
  return gsap.to(element, {
    width: "100%",
    duration,
    ease: EASE.default,
  });
}

// Float animation (for 404 page spade)
export function createFloatAnimation(
  element: gsap.TweenTarget,
  yAmount: number = 10,
  duration: number = 3
): gsap.core.Tween {
  return gsap.to(element, {
    y: yAmount,
    duration,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}

// Hero sequence animation
export function createHeroSequence(elements: {
  logo?: gsap.TweenTarget;
  title?: gsap.TweenTarget;
  tagline?: gsap.TweenTarget;
  cta?: gsap.TweenTarget;
}): gsap.core.Timeline {
  const tl = gsap.timeline();

  if (elements.logo) {
    tl.from(elements.logo, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: EASE.smooth,
    });
  }

  if (elements.title) {
    tl.from(
      elements.title,
      {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: EASE.default,
      },
      "-=0.2"
    );
  }

  if (elements.tagline) {
    tl.from(
      elements.tagline,
      {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: EASE.default,
      },
      "-=0.2"
    );
  }

  if (elements.cta) {
    tl.from(
      elements.cta,
      {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: EASE.default,
      },
      "-=0.2"
    );
  }

  return tl;
}

// Timeline animation (for process section)
export function createTimelineAnimation(
  container: gsap.DOMTarget,
  points: string,
  lines: string
): gsap.core.Timeline {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 70%",
      end: "bottom 30%",
      toggleActions: "play none none reverse",
    },
  });

  // Animate points appearing
  tl.from(`${container} ${points}`, {
    scale: 0,
    opacity: 0,
    duration: 0.4,
    stagger: 0.2,
    ease: EASE.bounce,
  });

  // Animate lines connecting
  tl.from(
    `${container} ${lines}`,
    {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.3,
      stagger: 0.2,
      ease: EASE.default,
    },
    "-=0.6"
  );

  return tl;
}

// Cleanup function for scroll triggers
export function cleanupScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

// Refresh scroll triggers (call after dynamic content loads)
export function refreshScrollTriggers(): void {
  ScrollTrigger.refresh();
}
