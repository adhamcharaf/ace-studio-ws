"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Card from "./Card";
import { cn } from "@/lib/utils";

interface CardPosition {
  id: number;
  x: number;
  y: number;
  rotateZ: number;
  rotateY: number;
  type: "lean" | "bridge";
  layer: number;
}

interface CardCastleProps {
  homeHref?: string;
  contactHref?: string;
  texts?: {
    title: string;
    subtitle: string;
    homeButton: string;
    contactButton: string;
    easterEgg: string;
  };
}

const defaultTexts = {
  title: "Tout s'est effondré.",
  subtitle: "Sauf nous — on est toujours là.",
  homeButton: "Retour à l'accueil",
  contactButton: "Nous contacter",
  easterEgg: "Tu cherches quoi exactement ? 👀",
};

export default function CardCastle({
  homeHref = "/",
  contactHref = "/contact",
  texts = defaultTexts,
}: CardCastleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const card404Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [phase, setPhase] = useState<"building" | "tension" | "collapse" | "reveal" | "content">("building");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showReplay, setShowReplay] = useState(false);

  // Generate castle structure positions
  const generateCastlePositions = useCallback((): CardPosition[] => {
    const positions: CardPosition[] = [];
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const isTablet = typeof window !== "undefined" && window.innerWidth < 1024;

    // Adjust dimensions based on screen
    const cardWidth = isMobile ? 60 : 80;
    const cardHeight = isMobile ? 84 : 112;
    const baseY = isMobile ? 100 : 150;
    const layerHeight = cardHeight * 0.75;
    const pairSpacing = cardWidth * 1.4;

    // Number of levels based on screen size
    const levels = isMobile ? 2 : isTablet ? 3 : 3;
    const baseWidth = isMobile ? 2 : isTablet ? 3 : 3; // pairs at base

    let id = 0;

    for (let level = 0; level < levels; level++) {
      const pairsInLevel = baseWidth - level;
      const levelY = baseY - level * layerHeight;
      const levelWidth = pairsInLevel * pairSpacing;
      const startX = -levelWidth / 2 + pairSpacing / 2;

      for (let pair = 0; pair < pairsInLevel; pair++) {
        const pairX = startX + pair * pairSpacing;

        // Left leaning card
        positions.push({
          id: id++,
          x: pairX - cardWidth * 0.3,
          y: levelY,
          rotateZ: -15,
          rotateY: 5,
          type: "lean",
          layer: level,
        });

        // Right leaning card
        positions.push({
          id: id++,
          x: pairX + cardWidth * 0.3,
          y: levelY,
          rotateZ: 15,
          rotateY: -5,
          type: "lean",
          layer: level,
        });
      }

      // Bridge cards (horizontal cards between levels)
      if (level < levels - 1) {
        const bridgesInLevel = pairsInLevel - 1;
        for (let bridge = 0; bridge < bridgesInLevel; bridge++) {
          const bridgeX = startX + bridge * pairSpacing + pairSpacing / 2;
          positions.push({
            id: id++,
            x: bridgeX,
            y: levelY - layerHeight * 0.5,
            rotateZ: 90,
            rotateY: 0,
            type: "bridge",
            layer: level + 0.5,
          });
        }
      }
    }

    return positions;
  }, []);

  const [positions, setPositions] = useState<CardPosition[]>([]);

  // Initialize positions on mount
  useEffect(() => {
    setPositions(generateCastlePositions());

    const handleResize = () => {
      // Only regenerate if not in middle of animation
      if (phase === "content") {
        setPositions(generateCastlePositions());
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [generateCastlePositions, phase]);

  // Main animation sequence
  useEffect(() => {
    if (positions.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setShowReplay(true),
      });
      timelineRef.current = tl;

      // Set initial states
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.set(card, {
            opacity: 0,
            y: -200,
            rotateX: -90,
            scale: 0.5,
          });
        }
      });

      if (card404Ref.current) {
        gsap.set(card404Ref.current, {
          opacity: 0,
          scale: 0,
          y: 100,
        });
      }

      if (contentRef.current) {
        gsap.set(contentRef.current, {
          opacity: 0,
          y: 30,
        });
      }

      // Phase 1: Building (0-3s)
      const sortedCards = [...cardsRef.current].sort((a, b) => {
        const posA = positions.find((p) => p.id === Number(a?.dataset.id));
        const posB = positions.find((p) => p.id === Number(b?.dataset.id));
        return (posB?.layer || 0) - (posA?.layer || 0);
      });

      sortedCards.forEach((card, index) => {
        if (card) {
          const pos = positions.find((p) => p.id === Number(card.dataset.id));
          if (pos) {
            tl.to(
              card,
              {
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
                duration: 0.15,
                ease: "back.out(1.2)",
              },
              index * 0.12
            );
          }
        }
      });

      // Phase 2: Tension (3-4s)
      tl.call(() => setPhase("tension"), [], "+=0.3");

      tl.to(
        cardsRef.current.filter(Boolean),
        {
          x: "+=random(-3, 3)",
          y: "+=random(-2, 2)",
          duration: 0.1,
          repeat: 8,
          yoyo: true,
          ease: "none",
        },
        "+=0.2"
      );

      // Phase 3: Collapse (4-5.5s)
      tl.call(() => setPhase("collapse"), [], "+=0.3");

      // Collapse from top to bottom
      const collapseGroups = [2, 1.5, 1, 0.5, 0];
      collapseGroups.forEach((layer, groupIndex) => {
        const layerCards = cardsRef.current.filter((card) => {
          if (!card) return false;
          const pos = positions.find((p) => p.id === Number(card.dataset.id));
          return pos && pos.layer === layer;
        });

        layerCards.forEach((card) => {
          if (card) {
            const direction = Math.random() > 0.5 ? 1 : -1;
            const distance = 150 + Math.random() * 200;

            tl.to(
              card,
              {
                x: `+=${direction * distance}`,
                y: `+=${200 + Math.random() * 100}`,
                rotateZ: `+=${direction * (180 + Math.random() * 360)}`,
                rotateX: Math.random() * 90,
                rotateY: Math.random() * 90 - 45,
                opacity: 0,
                duration: 0.6 + Math.random() * 0.3,
                ease: "power2.in",
              },
              `-=${groupIndex === 0 ? 0 : 0.4}`
            );
          }
        });
      });

      // Phase 4: Reveal (5.5s+)
      tl.call(() => setPhase("reveal"), [], "+=0.3");

      tl.to(
        card404Ref.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.2"
      );

      // Add glow pulse to 404 card
      tl.to(
        card404Ref.current,
        {
          boxShadow: "0 0 40px rgba(201, 160, 80, 0.6)",
          duration: 0.5,
          repeat: 1,
          yoyo: true,
        },
        "-=0.3"
      );

      // Phase 5: Content
      tl.call(() => setPhase("content"), [], "+=0.3");

      tl.to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [positions]);

  // Handle card click (easter egg)
  const handleCardClick = useCallback(() => {
    if (phase !== "content") return;

    setIsFlipped(true);

    // Redirect after showing easter egg
    setTimeout(() => {
      window.location.href = homeHref;
    }, 2000);
  }, [phase, homeHref]);

  // Replay animation
  const handleReplay = useCallback(() => {
    setShowReplay(false);
    setIsFlipped(false);
    setPhase("building");
    setPositions(generateCastlePositions());
  }, [generateCastlePositions]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center"
    >
      {/* Castle container */}
      <div
        className="relative"
        style={{
          perspective: "1000px",
          perspectiveOrigin: "center center",
          height: "400px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {/* Castle cards */}
        {positions.map((pos) => (
          <div
            key={pos.id}
            ref={(el) => {
              cardsRef.current[pos.id] = el;
            }}
            data-id={pos.id}
            className="absolute"
            style={{
              left: "50%",
              bottom: "20%",
              transform: `translateX(-50%) translateX(${pos.x}px) translateY(${pos.y}px) rotateZ(${pos.rotateZ}deg) rotateY(${pos.rotateY}deg)`,
              transformStyle: "preserve-3d",
              zIndex: Math.floor(10 - pos.layer),
            }}
          >
            <Card />
          </div>
        ))}

        {/* 404 Card (appears after collapse) */}
        <div
          ref={card404Ref}
          className={cn(
            "absolute left-1/2 bottom-[20%] -translate-x-1/2",
            "transition-transform duration-300",
            isHovered && phase === "content" && "scale-110"
          )}
          style={{
            transformStyle: "preserve-3d",
            zIndex: 20,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleCardClick}
        >
          <Card is404 isFlipped={isFlipped} />

          {/* Easter egg message */}
          {isFlipped && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/90 rounded-lg">
              <p className="text-[#c9a050] text-xs md:text-sm text-center px-2 font-medium">
                {texts.easterEgg}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Content (appears after animation) */}
      <div
        ref={contentRef}
        className="text-center mt-8 px-6"
        style={{ opacity: 0 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 font-[var(--font-playfair)]">
          {texts.title}
        </h1>
        <p className="text-lg md:text-xl text-white/60 mb-8">
          {texts.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={homeHref}
            className={cn(
              "inline-flex items-center justify-center",
              "px-8 py-4 rounded-full",
              "bg-[#c9a050] text-[#0a0a0a]",
              "font-medium text-base",
              "transition-all duration-300",
              "hover:bg-[#d4af61] hover:scale-105",
              "hover:shadow-[0_0_30px_rgba(201,160,80,0.5)]"
            )}
          >
            {texts.homeButton}
          </Link>
          <Link
            href={contactHref}
            className={cn(
              "inline-flex items-center justify-center",
              "px-8 py-4 rounded-full",
              "border-2 border-white/30 text-white/80",
              "font-medium text-base",
              "transition-all duration-300",
              "hover:border-[#c9a050] hover:text-[#c9a050]",
              "hover:shadow-[0_0_20px_rgba(201,160,80,0.2)]"
            )}
          >
            {texts.contactButton}
          </Link>
        </div>
      </div>

      {/* Replay button */}
      {showReplay && (
        <button
          onClick={handleReplay}
          className={cn(
            "absolute bottom-6 right-6",
            "text-white/30 hover:text-[#c9a050]",
            "transition-colors duration-300",
            "text-sm flex items-center gap-2"
          )}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Rejouer
        </button>
      )}

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(201, 160, 80, 0.05) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
