"use client";

import { useState, useEffect, useLayoutEffect, ReactNode } from "react";
import { PageBreaker } from "@/components/easter-eggs";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isPageBroken, setIsPageBroken] = useState(false);

  // Scroll to top BEFORE any other effects run (useLayoutEffect runs synchronously)
  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handlePageBreak = () => {
      setIsPageBroken(true);
    };

    window.addEventListener("page-break", handlePageBreak);

    return () => {
      window.removeEventListener("page-break", handlePageBreak);
    };
  }, []);

  const handleReset = () => {
    setIsPageBroken(false);
    // Reload page to fully restore state
    window.location.reload();
  };

  return (
    <>
      {children}
      <PageBreaker isActive={isPageBroken} onReset={handleReset} />
    </>
  );
}
