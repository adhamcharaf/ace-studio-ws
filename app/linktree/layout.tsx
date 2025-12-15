import type { Metadata, Viewport } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "ACE STUDIO | Links",
  description: "ACE STUDIO - Sites web premium, conçus sur mesure. Retrouvez tous nos liens ici.",
  openGraph: {
    title: "ACE STUDIO | Links",
    description: "Sites web premium, conçus sur mesure.",
    type: "website",
    locale: "fr_FR",
    siteName: "ACE STUDIO",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACE STUDIO | Links",
    description: "Sites web premium, conçus sur mesure.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export default function LinktreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Outfit:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A0A0A] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
