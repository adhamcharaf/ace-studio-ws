"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CardProps } from "@/types";

export default function Card({
  icon,
  title,
  description,
  href,
  className,
}: CardProps) {
  const content = (
    <>
      {icon && (
        <div className="mb-4 text-[var(--theme-accent)]">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2 text-[var(--theme-text)]">
        {title}
      </h3>
      <p className="text-[var(--theme-text-muted)] leading-relaxed">
        {description}
      </p>
    </>
  );

  const cardStyles = cn(
    "group p-6 rounded-2xl bg-[var(--theme-surface)] border border-transparent",
    "shadow-[0_1px_3px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.04)]",
    "transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
    "hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06),0_0_0_1px_rgba(201,160,80,0.2)]",
    "hover:border-[var(--theme-accent)] hover:-translate-y-1",
    className
  );

  if (href) {
    return (
      <Link href={href} className={cardStyles}>
        {content}
        <div className="mt-4 flex items-center text-[var(--theme-accent)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          En savoir plus
          <svg
            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </Link>
    );
  }

  return <div className={cardStyles}>{content}</div>;
}
