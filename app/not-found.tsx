import { Playfair_Display, Inter } from "next/font/google";
import Link from "next/link";
import { headers } from "next/headers";
import { StarField, FloatingCard } from "@/components/404";
import { cn } from "@/lib/utils";

// Fonts (même config que [locale]/layout.tsx)
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

// Traductions
const translations = {
  fr: {
    title: "Mauvaise pioche.",
    subtitle: "Mais t'inquiète, on est là pour te guider.",
    home: "Repiocher",
    contact: "Appeler le croupier",
  },
  en: {
    title: "Bad draw.",
    subtitle: "Don't worry, we're here to guide you.",
    home: "Draw again",
    contact: "Call the dealer",
  },
} as const;

type Locale = keyof typeof translations;

// Détection de locale côté serveur (pas de hydration mismatch)
async function getLocale(): Promise<Locale> {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";

  if (pathname.startsWith("/en")) return "en";
  return "fr";
}

export default async function NotFound() {
  const locale = await getLocale();
  const t = translations[locale];
  const basePath = `/${locale}`;

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#0a0a0a] text-white antialiased">
        <div className="relative min-h-screen overflow-hidden">
          {/* Starfield Background */}
          <StarField />

          {/* Main content */}
          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
            {/* Floating Card */}
            <div className="mb-10">
              <FloatingCard onClickRedirect={basePath} />
            </div>

            {/* Text content */}
            <div className="text-center max-w-md">
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 font-[var(--font-playfair-display)]">
                {t.title}
              </h1>
              <p className="text-base md:text-lg text-white/60 mb-8">
                {t.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={basePath}
                  className={cn(
                    "inline-flex items-center justify-center",
                    "px-6 py-3 md:px-8 md:py-4 rounded-full",
                    "bg-[#c9a050] text-[#0a0a0a]",
                    "font-medium text-sm md:text-base",
                    "transition-all duration-300",
                    "hover:bg-[#d4af61] hover:scale-105",
                    "hover:shadow-[0_0_30px_rgba(201,160,80,0.5)]"
                  )}
                >
                  {t.home}
                </Link>
                <Link
                  href={`${basePath}/contact`}
                  className={cn(
                    "inline-flex items-center justify-center",
                    "px-6 py-3 md:px-8 md:py-4 rounded-full",
                    "border-2 border-white/30 text-white/80",
                    "font-medium text-sm md:text-base",
                    "transition-all duration-300",
                    "hover:border-[#c9a050] hover:text-[#c9a050]"
                  )}
                >
                  {t.contact}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
