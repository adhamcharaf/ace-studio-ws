import type { Metadata } from "next";
import { ContactPageSchema } from "@/components/seo/JsonLd";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ace-studio-dev.com";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez ACE STUDIO pour votre projet de site web sur mesure à Abidjan. Devis gratuit, réponse sous 24h. WhatsApp, email ou formulaire.",
  keywords: [
    "contact agence web Abidjan",
    "devis site web Côte d'Ivoire",
    "créer site internet Abidjan",
    "agence digitale contact",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contactez ACE STUDIO | Création de sites web à Abidjan",
    description:
      "Discutons de votre projet web. Devis gratuit, réponse sous 24h. Agence web premium à Abidjan, Côte d'Ivoire.",
    url: `${baseUrl}/contact`,
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ContactPageSchema />
      {children}
    </>
  );
}
