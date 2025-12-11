import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://acestudio.ci';

// Liste des routes du site
const routes = [
  '',           // Home
  '/le-studio',
  '/services',
  '/contact',
];

// Ajouter conditionnellement la page portfolio
const showPortfolio = process.env.NEXT_PUBLIC_SHOW_PORTFOLIO === 'true';
if (showPortfolio) {
  routes.push('/realisations');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    // Créer les alternates pour chaque langue
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${baseUrl}/${locale}${route}`;
    }
    // Ajouter x-default pointant vers le français (marché principal)
    languages['x-default'] = `${baseUrl}/fr${route}`;

    // Ajouter une entrée pour chaque locale
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
