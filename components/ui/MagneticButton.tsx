"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMagneticEffect } from "@/lib/hooks";
import type { ButtonProps } from "@/types";

interface MagneticButtonProps extends ButtonProps {
  magnetStrength?: number;
  magnetDistance?: number;
}

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

export default function MagneticButton({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className,
  disabled = false,
  type = "button",
  magnetStrength = 0.4,
  magnetDistance = 120,
}: MagneticButtonProps) {
  // Use separate hooks for button and link to avoid type issues
  const buttonMagnetic = useMagneticEffect<HTMLButtonElement>({
    strength: magnetStrength,
    maxDistance: magnetDistance,
    scale: 1.05,
    disabled: disabled || !!href,
  });

  const linkMagnetic = useMagneticEffect<HTMLAnchorElement>({
    strength: magnetStrength,
    maxDistance: magnetDistance,
    scale: 1.05,
    disabled: disabled || !href,
  });

  const isActive = href ? linkMagnetic.isActive : buttonMagnetic.isActive;

  const baseStyles = cn(
    "inline-flex items-center justify-center font-medium rounded-full",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ace-gold)] focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    isActive && "shadow-[0_8px_32px_rgba(201,160,80,0.4)]",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={linkMagnetic.ref}
        className={baseStyles}
        style={linkMagnetic.style}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      ref={buttonMagnetic.ref}
      className={baseStyles}
      style={buttonMagnetic.style}
    >
      {children}
    </button>
  );
}
