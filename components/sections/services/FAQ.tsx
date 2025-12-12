"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "border-b border-[var(--ace-gold)]/20",
        "transition-colors duration-300",
        isOpen && "border-[var(--ace-gold)]/40"
      )}
    >
      <button
        onClick={onClick}
        className="w-full py-5 md:py-6 flex items-center justify-between gap-4 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "text-base md:text-lg font-medium transition-colors duration-300",
            isOpen
              ? "text-[var(--ace-gold)]"
              : "text-[var(--ace-white)] group-hover:text-[var(--ace-gold)]"
          )}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "flex-shrink-0 w-6 h-6 flex items-center justify-center",
            "rounded-full border transition-colors duration-300",
            isOpen
              ? "border-[var(--ace-gold)] text-[var(--ace-gold)]"
              : "border-[var(--ace-gray)] text-[var(--ace-gray)] group-hover:border-[var(--ace-gold)] group-hover:text-[var(--ace-gold)]"
          )}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 md:pb-6 text-[var(--ace-gray)] text-sm md:text-base leading-relaxed pr-10">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Array<{ question: string; answer: string }>;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Schema.org FAQPage JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="relative py-20 md:py-28 bg-[var(--ace-black)]">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,160,80,0.05) 0%, transparent 50%)`,
        }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Art Deco divider */}
          <div className="divider-art-deco mb-8">
            <div className="divider-art-deco-diamond" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[var(--font-playfair)] text-[var(--ace-white)] mb-4">
            {t("title")}
          </h2>
          <p className="text-[var(--ace-gray)] text-base md:text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          {items.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => toggleItem(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
