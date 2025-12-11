import type { Metadata } from "next";
import {
  StudioHero,
  Manifeste,
  ADN,
  Methode,
  StudioPersonality,
} from "@/components/sections/studio";
import { AboutPageSchema } from "@/components/seo/JsonLd";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ace-studio-dev.com";

export const metadata: Metadata = {
  title: "Le Studio",
  description:
    "Découvrez ACE STUDIO, agence web à Abidjan. Notre ADN : créativité, exigence et modernité. Nous créons des sites web sur mesure qui reflètent votre identité.",
  keywords: [
    "agence web Abidjan",
    "ACE STUDIO équipe",
    "studio création web Côte d'Ivoire",
    "développeur web Abidjan",
  ],
  alternates: {
    canonical: "/le-studio",
  },
  openGraph: {
    title: "Le Studio | ACE STUDIO - Agence web à Abidjan",
    description:
      "Découvrez notre approche unique : créativité, exigence et modernité. Agence de création web sur mesure à Abidjan, Côte d'Ivoire.",
    url: `${baseUrl}/le-studio`,
    type: "website",
  },
};

export default function LeStudioPage() {
  return (
    <>
      <AboutPageSchema />
      <StudioHero />
      <Manifeste />
      <ADN />
      <Methode />
      <StudioPersonality />
    </>
  );
}
