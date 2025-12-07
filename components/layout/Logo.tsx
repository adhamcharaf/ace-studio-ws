"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "black" | "white" | "gold";
}

const logoSources = {
  black: "/images/ACE-black-logo.png",
  white: "/images/ACE-white-logo.png",
  gold: "/images/ACE-gold-logo.png",
};

export default function Logo({ className, variant = "black" }: LogoProps) {
  return (
    <Image
      src={logoSources[variant]}
      alt="ACE STUDIO"
      width={120}
      height={120}
      className={cn("object-contain", className)}
      priority
    />
  );
}
