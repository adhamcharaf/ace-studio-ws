"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
  onClickRedirect?: string;
  easterEggText?: string;
}

export default function FloatingCard({
  onClickRedirect = "/",
  easterEggText = "Tu cherches quoi exactement ? 👀",
}: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for premium feel
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  // Glow intensity based on mouse position
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize to -0.5 to 0.5
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = () => {
    if (isFlipped) return;

    setIsFlipped(true);
    mouseX.set(0);
    mouseY.set(0);

    // Redirect after showing easter egg
    setTimeout(() => {
      window.location.href = onClickRedirect;
    }, 2500);
  };

  return (
    <div
      ref={cardRef}
      className="relative cursor-pointer"
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Animated glow behind card */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-2xl"
        style={{
          background: "radial-gradient(ellipse at center, rgba(201, 160, 80, 0.4) 0%, transparent 70%)",
          x: glowX,
          y: glowY,
          scale: 1.3,
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Card container */}
      <motion.div
        className="relative w-[140px] h-[196px] md:w-[180px] md:h-[252px]"
        style={{
          transformStyle: "preserve-3d",
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
        }}
        animate={{
          y: isFlipped ? 0 : [0, -15, 0],
          rotateY: isFlipped ? 180 : undefined,
        }}
        transition={
          isFlipped
            ? { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
            : { y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
        }
      >
        {/* Front of card - Image */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-xl overflow-hidden",
            "shadow-2xl"
          )}
          style={{
            backfaceVisibility: "hidden",
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.8),
              0 0 60px rgba(201, 160, 80, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
          }}
        >
          {/* Card image */}
          <div className="relative w-full h-full bg-white rounded-xl overflow-hidden">
            <Image
              src="/images/Ace_of_spades.svg.png"
              alt="Ace of Spades"
              fill
              className="object-contain p-2"
              priority
            />

            {/* 404 overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-5xl md:text-6xl font-bold font-[var(--font-playfair)] text-[#c9a050]"
                style={{
                  textShadow: `
                    0 0 20px rgba(201, 160, 80, 0.8),
                    0 0 40px rgba(201, 160, 80, 0.4),
                    2px 2px 4px rgba(0, 0, 0, 0.5)
                  `,
                }}
                animate={{
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                404
              </motion.span>
            </div>

            {/* Subtle shine effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.3) 45%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.3) 55%, transparent 60%)",
              }}
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Golden border */}
          <div className="absolute inset-0 rounded-xl border-2 border-[#c9a050]/50 pointer-events-none" />
        </motion.div>

        {/* Back of card (easter egg) */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-xl",
            "bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]",
            "border-2 border-[#c9a050]/50",
            "flex items-center justify-center p-6"
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.8),
              0 0 60px rgba(201, 160, 80, 0.2)
            `,
          }}
        >
          {/* Elegant pattern background */}
          <div className="absolute inset-4 rounded-lg border border-[#c9a050]/30 overflow-hidden">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <pattern id="backPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="#c9a050" />
                  <path d="M0 10 L20 10 M10 0 L10 20" stroke="#c9a050" strokeWidth="0.3" opacity="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#backPattern)" />
            </svg>
          </div>

          {/* Center spade icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
            <SpadeIcon className="w-24 h-24 md:w-32 md:h-32 text-[#c9a050]" />
          </div>

          {/* Easter egg text */}
          <motion.p
            className="relative text-[#c9a050] text-sm md:text-base text-center font-medium leading-relaxed z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={isFlipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {easterEggText}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Floating shadow */}
      <motion.div
        className={cn(
          "absolute -bottom-6 left-1/2 -translate-x-1/2",
          "w-[70%] h-6 rounded-full",
          "bg-black/40 blur-xl"
        )}
        animate={
          isFlipped
            ? { scale: 1, opacity: 0.4 }
            : {
                scale: [1, 0.85, 1],
                opacity: [0.4, 0.25, 0.4],
              }
        }
        transition={{
          duration: 4,
          repeat: isFlipped ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Spade Icon
function SpadeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <path d="M50 10 C50 10, 15 40, 15 55 C15 70, 30 75, 50 60 C70 75, 85 70, 85 55 C85 40, 50 10, 50 10 Z" />
      <path d="M45 60 L45 85 L40 85 C40 85, 50 75, 60 85 L55 85 L55 60 Z" />
    </svg>
  );
}
