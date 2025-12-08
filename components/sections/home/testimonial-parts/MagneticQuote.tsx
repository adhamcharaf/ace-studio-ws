"use client";

import { useMagneticWords } from "@/lib/hooks";

interface MagneticQuoteProps {
  quote: string;
}

export default function MagneticQuote({ quote }: MagneticQuoteProps) {
  const { words, getWordProps, containerStyle } = useMagneticWords(quote, {
    strength: 0.1,
    maxDistance: 150,
    ease: 0.05,
  });

  return (
    <p
      className="text-xl md:text-2xl lg:text-3xl font-[var(--font-playfair)] text-[var(--ace-black)] leading-relaxed md:leading-relaxed lg:leading-relaxed italic"
      style={containerStyle}
    >
      {words.map((word, index) => (
        <span
          key={index}
          {...getWordProps(index)}
          className={index < words.length - 1 ? "mr-[0.3em]" : ""}
        >
          {word}
        </span>
      ))}
    </p>
  );
}
