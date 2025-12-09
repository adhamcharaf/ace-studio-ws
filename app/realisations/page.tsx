import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  PortfolioHeader,
  ProjectGrid,
} from "@/components/sections/portfolio";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ace-studio-dev.com";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Portfolio ACE STUDIO : découvrez nos créations web à Abidjan. Sites vitrines, identités digitales et projets ambitieux réalisés en Côte d'Ivoire.",
  keywords: [
    "portfolio agence web Abidjan",
    "réalisations sites web Côte d'Ivoire",
    "exemples sites internet Abidjan",
  ],
  alternates: {
    canonical: "/realisations",
  },
  openGraph: {
    title: "Nos Réalisations | ACE STUDIO - Portfolio",
    description:
      "Découvrez nos créations : sites vitrines premium, identités digitales et projets ambitieux réalisés à Abidjan.",
    url: `${baseUrl}/realisations`,
    type: "website",
  },
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
