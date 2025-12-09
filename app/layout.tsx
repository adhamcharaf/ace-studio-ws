import type { Metadata } from "next";
import { Playfair_Display, Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ClientLayout from "@/components/layout/ClientLayout";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { JsonLd } from "@/components/seo/JsonLd";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ace-studio-dev.com";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ACE STUDIO | Création de sites web sur mesure à Abidjan",
    template: "%s | ACE STUDIO",
  },
  description:
    "Agence web premium à Abidjan, Côte d'Ivoire. Création de sites web sur mesure, code custom, zéro template. Sites vitrines, projets ambitieux et identité digitale complète.",
  keywords: [
    // Mots-clés principaux ciblés
    "création site web Abidjan",
    "agence web Côte d'Ivoire",
    "site sur mesure Abidjan",
    "développeur web Abidjan",
    "site vitrine premium Côte d'Ivoire",
    // Mots-clés secondaires
    "site web sur mesure",
    "agence web premium",
    "design web Abidjan",
    "développement web Côte d'Ivoire",
    "site internet professionnel Abidjan",
    "création site vitrine",
    "identité digitale",
    "ACE STUDIO",
  ],
  authors: [{ name: "ACE STUDIO", url: baseUrl }],
  creator: "ACE STUDIO",
  publisher: "ACE STUDIO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
    languages: {
      "fr-CI": "/",
    },
  },
  openGraph: {
    title: "ACE STUDIO | Création de sites web sur mesure à Abidjan",
    description:
      "Une présence digitale à votre image. Sites web premium, conçus sur mesure, sans templates. Agence web à Abidjan, Côte d'Ivoire.",
    url: baseUrl,
    siteName: "ACE STUDIO",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ACE STUDIO - Création de sites web sur mesure à Abidjan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ACE STUDIO | Création de sites web sur mesure à Abidjan",
    description:
      "Une présence digitale à votre image. Sites web premium, conçus sur mesure, sans templates. Agence web à Abidjan, Côte d'Ivoire.",
    images: ["/og-image.png"],
    creator: "@acestudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // À compléter avec vos codes de vérification
    // google: "votre-code-google",
    // yandex: "votre-code-yandex",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`if(history.scrollRestoration){history.scrollRestoration='manual';}window.scrollTo(0,0);`}
        </Script>
      </head>
      <body className="bg-[var(--theme-background)] text-[var(--theme-text)] antialiased transition-colors duration-300">
        <JsonLd />
        <ThemeProvider>
          <ClientLayout>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <WhatsAppButton />
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
