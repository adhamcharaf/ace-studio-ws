"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  scrambleSpeed?: number;
  onComplete?: () => void;
}

const CHARS = "!<>-_\\/[]{}=+*^?#_ACE";

export default function TextScramble({
  text,
  className,
  delay = 0,
  duration = 1200,
  scrambleSpeed = 50,
  onComplete,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const hasStartedRef = useRef(false);

  const scramble = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    // Calculate how many characters should be revealed
    const revealedLength = Math.floor(progress * text.length);

    let result = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        result += " ";
      } else if (i < revealedLength) {
        // Revealed characters
        result += text[i];
      } else if (i < revealedLength + 3) {
        // Scrambling characters (the "wave" of scrambling)
        result += CHARS[Math.floor(Math.random() * CHARS.length)];
      } else {
        // Not yet reached
        result += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }

    setDisplayText(result);

    if (progress < 1) {
      frameRef.current = window.setTimeout(scramble, scrambleSpeed);
    } else {
      setDisplayText(text);
      setIsComplete(true);
      onComplete?.();
    }
  }, [text, duration, scrambleSpeed, onComplete]);

  useEffect(() => {
    if (hasStartedRef.current) return;

    const timeoutId = setTimeout(() => {
      hasStartedRef.current = true;
      startTimeRef.current = Date.now();
      scramble();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (frameRef.current) {
        clearTimeout(frameRef.current);
      }
    };
  }, [delay, scramble]);

  // Reduced motion support
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayText(text);
      setIsComplete(true);
    }
  }, [text]);

  return (
    <span
      className={cn(
        "inline-block font-mono",
        isComplete && "font-[var(--font-playfair)]",
        className
      )}
      aria-label={text}
    >
      {displayText || text.split("").map(() => CHARS[0]).join("")}
    </span>
  );
}
