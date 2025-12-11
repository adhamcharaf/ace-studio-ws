"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from 'next-intl';
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: "circle" | "diamond";
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

interface FormSuccessProps {
  isVisible: boolean;
  onReset: () => void;
}

const COLORS = ["#C9A050", "#D4B36A", "#E5C97A", "#FFD700"];
const PARTICLE_COUNT = 80;

export default function FormSuccess({ isVisible, onReset }: FormSuccessProps) {
  const t = useTranslations('contact.form.success');
  const tCommon = useTranslations('common');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const [showContent, setShowContent] = useState(false);
  const [checkmarkProgress, setCheckmarkProgress] = useState(0);

  // Get time-based success message
  const getSuccessMessage = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return t('morning');
    if (hour >= 12 && hour < 18) return t('afternoon');
    if (hour >= 18 && hour < 23) return t('evening');
    return t('night');
  };

  const successMessage = getSuccessMessage();

  // Initialize particles
  const initParticles = () => {
    const particles: Particle[] = [];
    const canvas = canvasRef.current;
    if (!canvas) return particles;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + Math.random() * 0.5;
      const velocity = 8 + Math.random() * 12;

      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 5, // Initial upward bias
        size: 4 + Math.random() * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: Math.random() > 0.5 ? "circle" : "diamond",
        opacity: 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      });
    }

    return particles;
  };

  // Animate particles
  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let stillActive = false;

    particlesRef.current.forEach((p) => {
      // Apply physics
      p.vy += 0.3; // Gravity
      p.vx *= 0.99; // Air resistance
      p.vy *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.008;

      if (p.opacity > 0) {
        stillActive = true;
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Diamond shape (Art Deco style)
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(p.size / 3, 0);
          ctx.lineTo(0, p.size / 2);
          ctx.lineTo(-p.size / 3, 0);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }
    });

    if (stillActive) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // Handle visibility change
  useEffect(() => {
    if (isVisible) {
      // Setup canvas
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      // Start particles
      particlesRef.current = initParticles();
      animate();

      // Animate checkmark
      let progress = 0;
      const checkmarkInterval = setInterval(() => {
        progress += 0.05;
        setCheckmarkProgress(Math.min(progress, 1));
        if (progress >= 1) {
          clearInterval(checkmarkInterval);
          setShowContent(true);
        }
      }, 20);

      return () => {
        clearInterval(checkmarkInterval);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } else {
      setShowContent(false);
      setCheckmarkProgress(0);
    }
  }, [isVisible]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isVisible) return null;

  // Calculate checkmark path for SVG animation
  const checkmarkPath = `M 20,50 L 40,70 L 80,30`;
  const pathLength = 90; // Approximate length of the path

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--theme-background)]/95 backdrop-blur-sm"
        onClick={onReset}
      />

      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Success Content */}
      <div className="relative z-10 text-center px-6">
        {/* Animated Checkmark */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Glow behind */}
          <div
            className={cn(
              "absolute inset-0 rounded-full bg-[var(--ace-gold)] blur-2xl transition-opacity duration-500",
              showContent ? "opacity-30" : "opacity-0"
            )}
          />

          {/* Circle */}
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="var(--ace-gold)"
              strokeWidth="2"
              opacity="0.2"
            />

            {/* Animated circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="var(--ace-gold)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={283}
              strokeDashoffset={283 * (1 - checkmarkProgress)}
              transform="rotate(-90 50 50)"
              className="transition-all duration-100"
            />

            {/* Checkmark */}
            <path
              d={checkmarkPath}
              fill="none"
              stroke="var(--ace-gold)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={pathLength}
              strokeDashoffset={pathLength * (1 - Math.max(0, (checkmarkProgress - 0.5) * 2))}
              className="transition-all duration-100"
            />
          </svg>
        </div>

        {/* Success Message */}
        <div
          className={cn(
            "transition-all duration-500",
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-playfair)] text-[var(--theme-text)] mb-4">
            {t('title')}
          </h2>

          <p className="text-lg text-[var(--theme-text-muted)] mb-8 max-w-md mx-auto">
            {successMessage}
          </p>

          <button
            onClick={onReset}
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3",
              "text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]",
              "transition-colors duration-300"
            )}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {tCommon('back')}
          </button>
        </div>
      </div>
    </div>
  );
}
