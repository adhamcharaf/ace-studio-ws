import type { Metadata } from "next";
import { Playfair_Display, Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ClientLayout from "@/components/layout/ClientLayout";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

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
    default: "ACE STUDIO | Création de sites web sur mesure",
    template: "%s | ACE STUDIO",
  },
  description:
    "Une présence digitale à votre image. Sites web premium, conçus sur mesure, sans templates. Abidjan, Côte d'Ivoire.",
  keywords: [
    "création site web",
    "site web sur mesure",
    "agence web Abidjan",
    "design web premium",
    "développement web Côte d'Ivoire",
    "ACE STUDIO",
  ],
  authors: [{ name: "ACE STUDIO" }],
  creator: "ACE STUDIO",
  publisher: "ACE STUDIO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://acestudio.ci"),
  openGraph: {
    title: "ACE STUDIO | Création de sites web sur mesure",
    description:
      "Une présence digitale à votre image. Sites web premium, conçus sur mesure, sans templates.",
    url: "/",
    siteName: "ACE STUDIO",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACE STUDIO | Création de sites web sur mesure",
    description:
      "Une présence digitale à votre image. Sites web premium, conçus sur mesure, sans templates.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
