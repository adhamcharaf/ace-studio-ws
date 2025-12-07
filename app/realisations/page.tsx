import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  PortfolioHeader,
  ProjectGrid,
} from "@/components/sections/portfolio";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Découvrez nos créations et projets réalisés. Sites vitrines, identités digitales et projets ambitieux.",
};

export default function RealisationsPage() {
  // Redirect if portfolio is hidden
  const showPortfolio = process.env.NEXT_PUBLIC_SHOW_PORTFOLIO === "true";

  if (!showPortfolio) {
    redirect("/");
  }

  return (
    <>
      <PortfolioHeader />
      <ProjectGrid />
    </>
  );
}
