import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ace-studio-dev.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Pages principales
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/le-studio`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Ajouter la page réalisations si elle est activée
  const showPortfolio = process.env.NEXT_PUBLIC_SHOW_PORTFOLIO === "true";
  if (showPortfolio) {
    routes.push({
      url: `${baseUrl}/realisations`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    });
  }

  return routes;
}
