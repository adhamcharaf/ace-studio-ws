"use client";

import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  layer: number; // 0 = far, 1 = mid, 2 = near
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
  active: boolean;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const lastShootingStarRef = useRef<number>(0);

  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];
    const starCount = Math.floor((width * height) / 3000); // Density based on screen size

    for (let i = 0; i < starCount; i++) {
      const layer = Math.random() < 0.5 ? 0 : Math.random() < 0.7 ? 1 : 2;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: layer === 0 ? 0.5 + Math.random() * 0.5 : layer === 1 ? 1 + Math.random() * 0.5 : 1.5 + Math.random() * 1,
        opacity: 0.3 + Math.random() * 0.7,
        twinkleSpeed: 0.5 + Math.random() * 2,
        twinklePhase: Math.random() * Math.PI * 2,
        layer,
      });
    }

    starsRef.current = stars;
    shootingStarsRef.current = Array(3).fill(null).map(() => ({
      x: 0,
      y: 0,
      length: 80 + Math.random() * 120,
      speed: 15 + Math.random() * 10,
      opacity: 0,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
      active: false,
    }));
  }, []);

  const spawnShootingStar = useCallback((width: number, height: number) => {
    const inactive = shootingStarsRef.current.find(s => !s.active);
    if (inactive) {
      inactive.x = Math.random() * width * 0.7;
      inactive.y = Math.random() * height * 0.3;
      inactive.opacity = 1;
      inactive.active = true;
      inactive.length = 80 + Math.random() * 120;
      inactive.speed = 15 + Math.random() * 10;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;

    const animate = () => {
      if (!canvas || !ctx) return;

      time += 0.016; // ~60fps

      // Clear with deep space gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8
      );
      gradient.addColorStop(0, "#0a0a12");
      gradient.addColorStop(0.5, "#050508");
      gradient.addColorStop(1, "#000002");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with parallax
      const parallaxStrength = [5, 15, 30]; // Different for each layer

      starsRef.current.forEach((star) => {
        const parallax = parallaxStrength[star.layer];
        const offsetX = mouseRef.current.x * parallax;
        const offsetY = mouseRef.current.y * parallax;

        const x = star.x + offsetX;
        const y = star.y + offsetY;

        // Wrap around edges
        const wrappedX = ((x % canvas.width) + canvas.width) % canvas.width;
        const wrappedY = ((y % canvas.height) + canvas.height) % canvas.height;

        // Twinkle effect
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        const finalOpacity = star.opacity * twinkle;

        // Draw star with glow
        ctx.beginPath();
        ctx.arc(wrappedX, wrappedY, star.size, 0, Math.PI * 2);

        // Glow effect for larger stars
        if (star.layer === 2) {
          const glowGradient = ctx.createRadialGradient(
            wrappedX, wrappedY, 0,
            wrappedX, wrappedY, star.size * 4
          );
          glowGradient.addColorStop(0, `rgba(255, 255, 255, ${finalOpacity})`);
          glowGradient.addColorStop(0.3, `rgba(200, 220, 255, ${finalOpacity * 0.3})`);
          glowGradient.addColorStop(1, "transparent");
          ctx.fillStyle = glowGradient;
          ctx.fillRect(wrappedX - star.size * 4, wrappedY - star.size * 4, star.size * 8, star.size * 8);
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
        ctx.fill();
      });

      // Shooting stars
      const now = Date.now();
      if (now - lastShootingStarRef.current > 4000 + Math.random() * 6000) {
        spawnShootingStar(canvas.width, canvas.height);
        lastShootingStarRef.current = now;
      }

      shootingStarsRef.current.forEach((star) => {
        if (!star.active) return;

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.015;

        if (star.opacity <= 0 || star.x > canvas.width || star.y > canvas.height) {
          star.active = false;
          return;
        }

        // Draw shooting star
        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.7, `rgba(255, 255, 255, ${star.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();

        // Bright head
        ctx.beginPath();
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      // Subtle nebula clouds
      const nebulaGradient = ctx.createRadialGradient(
        canvas.width * 0.8,
        canvas.height * 0.2,
        0,
        canvas.width * 0.8,
        canvas.height * 0.2,
        canvas.width * 0.4
      );
      nebulaGradient.addColorStop(0, "rgba(201, 160, 80, 0.02)"); // ace-gold
      nebulaGradient.addColorStop(0.5, "rgba(100, 80, 150, 0.01)");
      nebulaGradient.addColorStop(1, "transparent");
      ctx.fillStyle = nebulaGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initStars, spawnShootingStar]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
