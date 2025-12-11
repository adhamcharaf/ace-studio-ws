"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
  isGold: boolean;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configuration
    const STAR_COUNT = 500;
    const SPEED = 15;
    const MAX_DEPTH = 1500;
    const TRAIL_LENGTH = 0.6; // How much of the trail to show (0-1)

    // Initialize stars
    const initStars = () => {
      const stars: Star[] = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(createStar(true));
      }
      starsRef.current = stars;
    };

    // Create a single star
    const createStar = (randomZ: boolean = false): Star => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.max(canvas.width, canvas.height);
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: randomZ ? Math.random() * MAX_DEPTH : MAX_DEPTH,
        prevX: 0,
        prevY: 0,
        isGold: Math.random() < 0.15, // 15% golden stars
      };
    };

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Clear with fade effect for smoother trails
      ctx.fillStyle = "rgba(5, 5, 15, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      starsRef.current.forEach((star) => {
        // Store previous screen position for trail
        const prevScreenX = (star.prevX / star.z) * 400 + centerX;
        const prevScreenY = (star.prevY / star.z) * 400 + centerY;

        // Update z position (move towards viewer)
        star.prevX = star.x;
        star.prevY = star.y;
        star.z -= SPEED;

        // Reset star if it's past the viewer
        if (star.z <= 0) {
          const newStar = createStar(false);
          star.x = newStar.x;
          star.y = newStar.y;
          star.z = MAX_DEPTH;
          star.prevX = star.x;
          star.prevY = star.y;
          star.isGold = Math.random() < 0.15;
          return;
        }

        // Calculate screen position with perspective
        const screenX = (star.x / star.z) * 400 + centerX;
        const screenY = (star.y / star.z) * 400 + centerY;

        // Skip if outside viewport
        if (
          screenX < -50 ||
          screenX > canvas.width + 50 ||
          screenY < -50 ||
          screenY > canvas.height + 50
        ) {
          return;
        }

        // Calculate size and brightness based on depth
        const depth = 1 - star.z / MAX_DEPTH;
        const size = Math.max(0.5, depth * 3);
        const brightness = Math.min(1, depth * 1.5);

        // Calculate trail start position (interpolated for smooth trail)
        const trailX = prevScreenX + (screenX - prevScreenX) * (1 - TRAIL_LENGTH);
        const trailY = prevScreenY + (screenY - prevScreenY) * (1 - TRAIL_LENGTH);

        // Draw trail
        if (depth > 0.1) {
          const gradient = ctx.createLinearGradient(trailX, trailY, screenX, screenY);

          if (star.isGold) {
            gradient.addColorStop(0, "rgba(201, 160, 80, 0)");
            gradient.addColorStop(0.5, `rgba(201, 160, 80, ${brightness * 0.3})`);
            gradient.addColorStop(1, `rgba(255, 215, 100, ${brightness})`);
          } else {
            gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
            gradient.addColorStop(0.5, `rgba(200, 220, 255, ${brightness * 0.3})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, ${brightness})`);
          }

          ctx.beginPath();
          ctx.moveTo(trailX, trailY);
          ctx.lineTo(screenX, screenY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = size * 0.8;
          ctx.lineCap = "round";
          ctx.stroke();
        }

        // Draw star head (bright point)
        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);

        if (star.isGold) {
          ctx.fillStyle = `rgba(255, 215, 100, ${brightness})`;
          // Add glow for gold stars
          if (depth > 0.5) {
            ctx.shadowColor = "rgba(201, 160, 80, 0.8)";
            ctx.shadowBlur = size * 4;
          }
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
          if (depth > 0.7) {
            ctx.shadowColor = "rgba(200, 220, 255, 0.5)";
            ctx.shadowBlur = size * 2;
          }
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Add subtle center glow (where stars emerge from)
      const centerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        150
      );
      centerGlow.addColorStop(0, "rgba(201, 160, 80, 0.03)");
      centerGlow.addColorStop(0.5, "rgba(100, 120, 180, 0.02)");
      centerGlow.addColorStop(1, "transparent");
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
