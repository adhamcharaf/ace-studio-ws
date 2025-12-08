"use client";

import { useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { PageBreaker } from "@/components/easter-eggs";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isPageBroken, setIsPageBroken] = useState(false);
  const pathname = usePathname();

  // Scroll to top on route change (client-side navigation)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
