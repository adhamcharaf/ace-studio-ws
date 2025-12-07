"use client";

import { useScrollAnimation } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import type { SectionWrapperProps } from "@/types";

export default function SectionWrapper({
  children,
  className,
  id,
  animation = "slide-up",
  delay = 0,
}: SectionWrapperProps) {
  const ref = useScrollAnimation(animation, { delay });

  return (
    <section
      ref={ref}
      id={id}
      className={cn("py-16 md:py-24 lg:py-32", className)}
    >
      {children}
    </section>
  );
}
