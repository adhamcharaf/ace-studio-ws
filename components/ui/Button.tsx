"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/types";

const variants = {
  primary:
    "bg-[var(--ace-gold)] text-[var(--ace-black)] hover:bg-[var(--ace-gold-light)] shadow-[0_2px_8px_rgba(0,0,0,0.08),0_4px_16px_rgba(201,160,80,0.15)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12),0_8px_24px_rgba(201,160,80,0.25)]",
  secondary:
    "bg-transparent border-2 border-[var(--ace-gold)] text-[var(--ace-gold)] hover:bg-[var(--ace-gold)] hover:text-[var(--ace-black)] shadow-[0_0_0_0_transparent] hover:shadow-[0_4px_16px_rgba(201,160,80,0.2)]",
  ghost:
    "bg-transparent text-[var(--ace-black)] hover:text-[var(--ace-gold)] link-underline",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className,
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-250 ease-out",
    "transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ace-gold)] focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
    >
      {children}
    </button>
  );
}
