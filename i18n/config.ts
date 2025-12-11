export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
};

// Mapping pays vers locale pour la géolocalisation IP
export const countryToLocale: Record<string, Locale> = {
  // Pays francophones
  CI: 'fr', // Côte d'Ivoire
  FR: 'fr', // France
  BE: 'fr', // Belgique
  CH: 'fr', // Suisse
  SN: 'fr', // Sénégal
  ML: 'fr', // Mali
  BF: 'fr', // Burkina Faso
  BJ: 'fr', // Bénin
  TG: 'fr', // Togo
  NE: 'fr', // Niger
  CM: 'fr', // Cameroun
  GA: 'fr', // Gabon
  CG: 'fr', // Congo
  CD: 'fr', // RDC
  MG: 'fr', // Madagascar
  MA: 'fr', // Maroc
  TN: 'fr', // Tunisie
  DZ: 'fr', // Algérie
  LU: 'fr', // Luxembourg
  MC: 'fr', // Monaco

  // Pays anglophones
  US: 'en', // États-Unis
  GB: 'en', // Royaume-Uni
  AU: 'en', // Australie
  CA: 'en', // Canada (mix, mais EN par défaut)
  NG: 'en', // Nigeria
  GH: 'en', // Ghana
  KE: 'en', // Kenya
  ZA: 'en', // Afrique du Sud
  NZ: 'en', // Nouvelle-Zélande
  IE: 'en', // Irlande
  SG: 'en', // Singapour
  IN: 'en', // Inde
};

// Fonction utilitaire pour obtenir la locale depuis le pays
export function getLocaleFromCountry(countryCode: string | null | undefined): Locale {
  if (!countryCode) return defaultLocale;
  return countryToLocale[countryCode.toUpperCase()] || defaultLocale;
}
