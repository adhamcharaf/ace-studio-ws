"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  velocityX: number;
  velocityY: number;
  phase: number;
}

interface ParticleConfig {
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  baseSpeed?: number;
  cursorRadius?: number;
  cursorForce?: number;
  mode?: "scatter" | "attract";
  disabled?: boolean;
}

export function useParticleSystem(config: ParticleConfig = {}) {
  const {
    count = 35,
    color = "#C9A050",
    minSize = 2,
    maxSize = 5,
    baseSpeed = 0.3,
    cursorRadius = 120,
    cursorForce = 0.4,
    mode = "scatter",
    disabled = false,
  } = config;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const timeRef = useRef(0);
  const [isVisible, setIsVisible] = useState(true); // IntersectionObserver state

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const actualCount = typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
      ? Math.floor(count * 0.5)
      : count;

    for (let i = 0; i < actualCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: minSize + Math.random() * (maxSize - minSize),
        opacity: 0.3 + Math.random() * 0.5,
        velocityX: 0,
        velocityY: 0,
        phase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, [count, minSize, maxSize]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const { width, height } = dimensionsRef.current;
    ctx.clearRect(0, 0, width, height);

    timeRef.current += 0.016;

    particlesRef.current.forEach((particle) => {
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < cursorRadius && distance > 0) {
        const force = (1 - distance / cursorRadius) * cursorForce;
        const angle = Math.atan2(dy, dx);

        if (mode === "scatter") {
          particle.velocityX -= Math.cos(angle) * force * 2;
          particle.velocityY -= Math.sin(angle) * force * 2;
        } else {
          particle.velocityX += Math.cos(angle) * force;
          particle.velocityY += Math.sin(angle) * force;
        }
      }

      const returnForce = 0.02;
      particle.velocityX += (particle.baseX - particle.x) * returnForce;
      particle.velocityY += (particle.baseY - particle.y) * returnForce;

      particle.velocityX *= 0.92;
      particle.velocityY *= 0.92;

      const floatX = Math.sin(timeRef.current + particle.phase) * baseSpeed * 0.5;
      const floatY = Math.cos(timeRef.current * 0.7 + particle.phase) * baseSpeed;

      particle.x += particle.velocityX + floatX;
      particle.y += particle.velocityY + floatY;

      particle.x = Math.max(0, Math.min(width, particle.x));
      particle.y = Math.max(0, Math.min(height, particle.y));

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    animationRef.current = requestAnimationFrame(animate);
  }, [baseSpeed, color, cursorForce, cursorRadius, mode]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const { width, height } = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    dimensionsRef.current = { width, height };

    if (particlesRef.current.length === 0) {
      initParticles(width, height);
    }
  }, [initParticles]);

  // IntersectionObserver pour pauser quand hors viewport (économie CPU/batterie)
  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Déclenche quand 10% visible
    );

    observer.observe(canvas);

    return () => observer.disconnect();
  }, [disabled]);

  // Animation loop - seulement si visible
  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    handleResize();

    // Ne lance l'animation que si visible
    if (isVisible) {
      animationRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [disabled, animate, handleMouseMove, handleMouseLeave, handleResize, isVisible]);

  return {
    canvasRef,
    canvasStyle: {
      position: "absolute" as const,
      inset: 0,
      pointerEvents: "none" as const,
      zIndex: 1,
    },
  };
}
