import type { Metadata } from "next";
import {
  ServicesHeader,
  CodeToDesign,
  ServicesTriptych,
  Comparison,
  ServicesCTA,
} from "@/components/sections/services";
import { ServicePageSchema } from "@/components/seo/JsonLd";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ace-studio-dev.com";

export const metadata: Metadata = {
  title: "Services de création web",
  description:
    "Sites vitrines sur mesure, projets ambitieux et identité digitale complète à Abidjan. Création de sites web premium en Côte d'Ivoire. Devis gratuit.",
  keywords: [
    "site vitrine Abidjan",
    "création site web prix Côte d'Ivoire",
    "agence web services",
    "développement web sur mesure",
    "identité digitale Abidjan",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | ACE STUDIO - Création web sur mesure à Abidjan",
    description:
      "Découvrez nos offres : sites vitrines premium, projets ambitieux et identité digitale complète. Agence web à Abidjan, Côte d'Ivoire.",
    url: `${baseUrl}/services`,
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicePageSchema />
      <CodeToDesign />
      <ServicesHeader />
      <ServicesTriptych />
      <Comparison />
      <ServicesCTA />
    </>
  );
}
