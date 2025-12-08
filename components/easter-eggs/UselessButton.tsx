"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { wait } from "@/lib/utils";

// Configuration
const DETECTION_RADIUS = 150;
const THROTTLE_MS = 50;

// Messages évolutifs - vitesse constante jusqu'à l'abandon
const STAGES = [
  { text: "Ce bouton ne fait rien", distance: 300 },
  { text: "Ce bouton ne fait rien", distance: 300 },
  { text: "Ce bouton ne fait rien", distance: 300 },
  { text: "Tu perds ton temps", distance: 300 },
  { text: "Tu perds ton temps", distance: 300 },
  { text: "Tu perds ton temps", distance: 300 },
  { text: "Sérieusement ?", distance: 300 },
  { text: "Sérieusement ?", distance: 300 },
  { text: "Sérieusement ?", distance: 300 },
  { text: "T'as que ça à faire ?", distance: 300 },
  { text: "T'as que ça à faire ?", distance: 300 },
  { text: "T'as que ça à faire ?", distance: 300 },
  { text: "Je peux faire ça toute la journée", distance: 300 },
  { text: "Je peux faire ça toute la journée", distance: 300 },
  { text: "Je peux faire ça toute la journée", distance: 300 },
  { text: "Tu lâches jamais toi", distance: 300 },
  { text: "Tu lâches jamais toi", distance: 300 },
  { text: "Tu lâches jamais toi", distance: 300 },
  { text: "...", distance: 300 },
  { text: "...", distance: 300 },
  { text: "...", distance: 300 },
  { text: "Bon...", distance: 300 },
  { text: "Bon...", distance: 300 },
  { text: "Bon...", distance: 300 },
  { text: "Ok t'as gagné", distance: 300 },
  { text: "Ok t'as gagné", distance: 300 },
  { text: "Ok t'as gagné", distance: 300 },
  { text: "😮‍💨", distance: 0 },
];

export default function UselessButton() {
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastMoveRef = useRef(0);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const stage = STAGES[Math.min(attempts, STAGES.length - 1)];
  const hasGivenUp = attempts >= STAGES.length - 1;

  // Tremblement quand presque épuisé
  useEffect(() => {
    if (attempts >= 10 && !hasGivenUp) {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 400);
      return () => clearTimeout(timer);
    }
  }, [attempts, hasGivenUp]);

  // Écouter les mouvements de souris
  useEffect(() => {
    if (hasGivenUp || isLoading) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMoveRef.current < THROTTLE_MS) return;

      const btn = buttonRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const dx = btnCenterX - e.clientX;
      const dy = btnCenterY - e.clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > DETECTION_RADIUS || dist === 0) return;

      lastMoveRef.current = now;

      // Plus proche = fuite plus forte
      const intensity = 1 - dist / DETECTION_RADIUS;
      const fleeDistance = stage.distance * (0.5 + intensity * 0.5);

      // Direction opposée au curseur
      const moveX = (dx / dist) * fleeDistance;
      const moveY = (dy / dist) * fleeDistance;

      // Nouvelle position
      let newX = offset.x + moveX;
      let newY = offset.y + moveY;

      // Limites du viewport
      const margin = 30;
      const maxX = window.innerWidth / 2 - margin;

      // Limiter Y vers le haut (viewport)
      const maxYUp = window.innerHeight / 2 - margin;

      // Limiter Y vers le bas (ne pas dépasser le bas du conteneur parent/section)
      const parent = btn.closest("section");
      const parentRect = parent?.getBoundingClientRect();
      const maxYDown = parentRect
        ? parentRect.bottom - rect.bottom - margin
        : window.innerHeight / 2 - margin;

      newX = Math.max(-maxX, Math.min(maxX, newX));
      newY = Math.max(-maxYUp, Math.min(maxYDown, newY));

      setOffset({ x: newX, y: newY });
      setAttempts((prev) => prev + 1);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [hasGivenUp, isLoading, offset, stage.distance]);

  const handleClick = async () => {
    if (!hasGivenUp) {
      // Pénalité si on essaie de cliquer avant qu'il abandonne
      setAttempts((prev) => Math.min(prev + 3, STAGES.length - 1));
      return;
    }

    setIsLoading(true);
    await wait(1500);
    router.push("/contact?from=useless");
  };

  return (
    <div className="relative flex items-center justify-center min-h-[100px] w-full overflow-visible">
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        <button
          ref={buttonRef}
          onClick={handleClick}
          disabled={isLoading}
          className={cn(
            "relative inline-flex items-center justify-center",
            "px-6 py-3 rounded-full",
            "text-sm font-medium tracking-wide",
            "border border-[var(--ace-gray)]/30",
            "text-[var(--ace-gray)]",
            "bg-[var(--ace-black)]",
            "transition-all duration-200",
            "select-none",
            "disabled:opacity-50 disabled:cursor-wait",
            isShaking && "animate-wiggle",
            !hasGivenUp && "cursor-default",
            hasGivenUp && [
              "cursor-pointer",
              "border-[var(--ace-gold)]",
              "text-[var(--ace-gold)]",
              "shadow-[0_0_25px_rgba(201,160,80,0.3)]",
              "hover:shadow-[0_0_35px_rgba(201,160,80,0.5)]",
            ]
          )}
        >
          {/* Badge compteur */}
          {!isLoading && !hasGivenUp && attempts > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-[var(--ace-black)] border border-[var(--ace-gold)]/50 text-[10px] text-[var(--ace-gold)] font-mono">
              {STAGES.length - 1 - attempts}
            </span>
          )}

          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Chargement...
            </>
          ) : (
            <span className={cn(stage.text === "😮‍💨" && "text-lg")}>
              {stage.text}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
