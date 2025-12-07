"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

interface ContactBentoProps {
  children: React.ReactNode;
}

export default function ContactBento({ children }: ContactBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".bento-card");

      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            once: true,
          },
        });
      }
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper className="bg-[var(--theme-background)] py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {children}
        </div>
      </div>
    </SectionWrapper>
  );
}
