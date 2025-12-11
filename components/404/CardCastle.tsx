"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Card from "./Card";
import { cn } from "@/lib/utils";

interface CardData {
  id: string;
  left: number;      // % from center
  bottom: number;    // px from base
  rotation: number;  // degrees
  level: number;     // for collapse order (higher = falls first)
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
  const castleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const card404Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Card dimensions
  const cardWidth = 70;
  const cardHeight = 98;
  const pairWidth = cardWidth * 0.9; // How wide a /\ pair is at the base
  const levelHeight = cardHeight * 0.8; // Vertical spacing between levels

  // Generate castle structure - simple 2-level pyramid
  const generateCards = useCallback((): CardData[] => {
    const cards: CardData[] = [];

    // Level 0 (base): 2 pairs of leaning cards
    // Left pair
    cards.push({ id: "L0-L1", left: -pairWidth, bottom: 0, rotation: -18, level: 0 });
    cards.push({ id: "L0-R1", left: -pairWidth + cardWidth * 0.5, bottom: 0, rotation: 18, level: 0 });

    // Right pair
    cards.push({ id: "L0-L2", left: pairWidth * 0.1, bottom: 0, rotation: -18, level: 0 });
    cards.push({ id: "L0-R2", left: pairWidth * 0.1 + cardWidth * 0.5, bottom: 0, rotation: 18, level: 0 });

    // Bridge card between pairs (horizontal)
    cards.push({ id: "bridge", left: -cardWidth * 0.25, bottom: levelHeight * 0.6, rotation: 0, level: 0.5 });

    // Level 1 (top): 1 pair
    cards.push({ id: "L1-L", left: -cardWidth * 0.25, bottom: levelHeight, rotation: -18, level: 1 });
    cards.push({ id: "L1-R", left: cardWidth * 0.25, bottom: levelHeight, rotation: 18, level: 1 });

    return cards;
  }, [cardWidth, pairWidth, levelHeight]);

  const [cards] = useState<CardData[]>(generateCards);

  // Run animation
  useEffect(() => {
    const cardElements = Array.from(cardsRef.current.values());
    if (cardElements.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setShowReplay(true);
          setAnimationComplete(true);
        },
      });

      // Initial state: all cards hidden above
      cardElements.forEach((card) => {
        gsap.set(card, {
          opacity: 0,
          y: -150,
        });
      });

      // 404 card hidden
      if (card404Ref.current) {
        gsap.set(card404Ref.current, {
          opacity: 0,
          scale: 0.5,
        });
      }

      // Content hidden
      if (contentRef.current) {
        gsap.set(contentRef.current, {
          opacity: 0,
          y: 20,
        });
      }

      // === PHASE 1: BUILD (0-2.5s) ===
      // Sort cards by level (build from bottom to top)
      const sortedCards = [...cards].sort((a, b) => a.level - b.level);

      sortedCards.forEach((cardData, index) => {
        const cardEl = cardsRef.current.get(cardData.id);
        if (cardEl) {
          tl.to(
            cardEl,
            {
              opacity: 1,
              y: 0,
              duration: 0.25,
              ease: "back.out(1.5)",
            },
            0.3 + index * 0.2 // Stagger
          );
        }
      });

      // === PHASE 2: TENSION (2.5-3.5s) ===
      tl.to(
        cardElements,
        {
          x: "random(-2, 2)",
          y: "random(-1, 1)",
          duration: 0.08,
          repeat: 10,
          yoyo: true,
          ease: "none",
        },
        "+=0.3"
      );

      // Pause dramatique
      tl.to({}, { duration: 0.4 });

      // === PHASE 3: COLLAPSE (3.5-5s) ===
      // Sort by level descending (top falls first)
      const collapseOrder = [...cards].sort((a, b) => b.level - a.level);

      collapseOrder.forEach((cardData, index) => {
        const cardEl = cardsRef.current.get(cardData.id);
        if (cardEl) {
          const direction = cardData.rotation < 0 ? -1 : cardData.rotation > 0 ? 1 : (Math.random() > 0.5 ? 1 : -1);

          tl.to(
            cardEl,
            {
              x: direction * (200 + Math.random() * 150),
              y: 300 + Math.random() * 100,
              rotation: direction * (90 + Math.random() * 180),
              opacity: 0,
              duration: 0.5 + Math.random() * 0.2,
              ease: "power2.in",
            },
            `-=${index === 0 ? 0 : 0.35}`
          );
        }
      });

      // === PHASE 4: REVEAL 404 CARD (5-5.5s) ===
      tl.to(
        card404Ref.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.6)",
        },
        "-=0.3"
      );

      // Glow pulse
      tl.fromTo(
        card404Ref.current,
        { boxShadow: "0 0 0px rgba(201, 160, 80, 0)" },
        {
          boxShadow: "0 0 50px rgba(201, 160, 80, 0.7)",
          duration: 0.4,
          yoyo: true,
          repeat: 1,
        },
        "-=0.2"
      );

      // === PHASE 5: SHOW CONTENT ===
      tl.to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

    }, containerRef);

    return () => ctx.revert();
  }, [cards]);

  // Replay
  const handleReplay = useCallback(() => {
    setShowReplay(false);
    setAnimationComplete(false);
    setIsFlipped(false);
    // Force re-mount by updating key (handled in parent or via state)
    window.location.reload();
  }, []);

  // Easter egg click
  const handleCardClick = useCallback(() => {
    if (!animationComplete) return;
    setIsFlipped(true);
    setTimeout(() => {
      window.location.href = homeHref;
    }, 2000);
  }, [animationComplete, homeHref]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center"
    >
      {/* Castle area */}
      <div
        ref={castleRef}
        className="relative"
        style={{
          width: "350px",
          height: "280px",
        }}
      >
        {/* Castle cards */}
        {cards.map((cardData) => (
          <div
            key={cardData.id}
            ref={(el) => {
              if (el) cardsRef.current.set(cardData.id, el);
            }}
            className="absolute"
            style={{
              left: "50%",
              bottom: "30px",
              marginLeft: cardData.left,
              marginBottom: cardData.bottom,
              transform: `rotate(${cardData.rotation}deg)`,
              transformOrigin: "bottom center",
              zIndex: Math.floor((2 - cardData.level) * 10),
            }}
          >
            <Card />
          </div>
        ))}

        {/* 404 Card - center */}
        <div
          ref={card404Ref}
          className={cn(
            "absolute left-1/2 -translate-x-1/2 cursor-pointer",
            "transition-transform duration-200",
            isHovered && animationComplete && !isFlipped && "scale-110"
          )}
          style={{
            bottom: "30px",
            zIndex: 50,
          }}
          onClick={handleCardClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Card is404 isFlipped={isFlipped} />

          {/* Easter egg overlay */}
          {isFlipped && (
            <div
              className="absolute inset-0 flex items-center justify-center rounded-lg"
              style={{
                background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
                border: "1px solid rgba(201, 160, 80, 0.3)"
              }}
            >
              <p className="text-[#c9a050] text-[10px] md:text-xs text-center px-2 font-medium leading-tight">
                {texts.easterEgg}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="text-center mt-6 px-6"
      >
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 font-[var(--font-playfair)]">
          {texts.title}
        </h1>
        <p className="text-base md:text-lg text-white/60 mb-8">
          {texts.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={homeHref}
            className={cn(
              "inline-flex items-center justify-center",
              "px-6 py-3 md:px-8 md:py-4 rounded-full",
              "bg-[#c9a050] text-[#0a0a0a]",
              "font-medium text-sm md:text-base",
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
              "px-6 py-3 md:px-8 md:py-4 rounded-full",
              "border-2 border-white/30 text-white/80",
              "font-medium text-sm md:text-base",
              "transition-all duration-300",
              "hover:border-[#c9a050] hover:text-[#c9a050]"
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
          className="absolute bottom-6 right-6 text-white/30 hover:text-[#c9a050] transition-colors text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Rejouer
        </button>
      )}

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center 70%, rgba(201, 160, 80, 0.03) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}
