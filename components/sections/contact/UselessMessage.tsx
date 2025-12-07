"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function UselessMessageContent() {
  const searchParams = useSearchParams();
  const fromUseless = searchParams.get("from") === "useless";

  if (!fromUseless) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
      <div className="bg-[var(--ace-gold)] text-[var(--ace-black)] px-6 py-3 rounded-full shadow-lg text-sm md:text-base font-medium">
        Puisque t&apos;as du temps, autant qu&apos;on parle de ton projet
      </div>
    </div>
  );
}

export default function UselessMessage() {
  return (
    <Suspense fallback={null}>
      <UselessMessageContent />
    </Suspense>
  );
}
