"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface StrikeThroughTextProps {
  text: string;
  className?: string;
}

export default function StrikeThroughText({
  text,
  className,
}: StrikeThroughTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      <span className="relative">
        {text}
        <span
          className={cn(
            "absolute left-0 top-[60%] h-[3px] bg-[var(--ace-gold)]",
            "transition-all duration-500 ease-out",
            isVisible ? "w-full" : "w-0"
          )}
          style={{ transform: "translateY(-50%)" }}
        />
      </span>
    </span>
  );
}
