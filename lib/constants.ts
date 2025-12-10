// ACE STUDIO - Constants

export const SITE_CONFIG = {
  name: "ACE STUDIO",
  tagline: "Une présence digitale à votre image.",
  description: "Sites web premium, conçus sur mesure, sans templates.",
  location: "Abidjan, Côte d'Ivoire",
  email: "contact@ace-studio-dev.com",
  whatsappNumber: "2250747666667",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://acestudio.ci",
} as const;

export const WHATSAPP_LINK = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
  "Bonjour ACE STUDIO, je souhaite discuter de mon projet."
)}`;

export const NAVIGATION = [
  { name: "Accueil", href: "/" },
  { name: "Le Studio", href: "/le-studio" },
  { name: "Services", href: "/services" },
  // Portfolio is hidden for now
  // { name: "Réalisations", href: "/realisations" },
  { name: "Contact", href: "/contact" },
] as const;

export const COLORS = {
  black: "#0A0A0A",
  white: "#FFFFFF",
  offWhite: "#F5F5F5",
  gold: "#C9A050",
  goldLight: "#D4B36A",
  gray: "#6B6B6B",
} as const;

export const STATS = [
  {
    value: 500,
    suffix: "+",
    label: "tasses de café",
  },
  {
    value: 100,
    suffix: "%",
    label: "sur mesure",
  },
  {
    value: 24,
    suffix: "h",
    label: "temps de réponse",
  },
] as const;

export const SERVICES = [
  {
    id: "site-vitrine",
    title: "Site Vitrine",
    subtitle: "Votre vitrine professionnelle",
    description: "Parfait pour entrepreneurs, indépendants et PME.",
    features: [
      "Design sur mesure",
      "Responsive (mobile, tablette, desktop)",
      "Optimisé performance",
      "Livraison rapide",
    ],
    icon: "vitrine",
    hasProject: true,
    project: {
      id: "arena",
      title: "Arena",
      category: "Site Vitrine",
      year: "2024",
      description: "Complexe sportif premium à Abidjan. Design moderne avec mode sombre/clair.",
      url: "https://arena-website-hbfbb989u-adhamch123-6733s-projects.vercel.app",
      video: "/videos/arena-preview.mp4",
      poster: "/images/portfolio/arena-poster.png",
    },
  },
  {
    id: "projet-ambitieux",
    title: "Projet Ambitieux",
    subtitle: "Pour les projets qui voient grand",
    description: "Parfait pour entreprises établies et projets complexes.",
    features: [
      "Fonctionnalités avancées",
      "Architecture évolutive",
      "Accompagnement approfondi",
      "Sur devis",
    ],
    icon: "ambitieux",
    hasProject: false,
    comingSoon: {
      teaser: "Projets complexes en cours...",
      badge: "Bientôt",
    },
  },
  {
    id: "identite-digitale",
    title: "Identité Digitale",
    subtitle: "Plus qu'un site, une identité",
    description: "Parfait pour ceux qui partent de zéro.",
    features: [
      "Logo et charte graphique",
      "Site web assorti",
      "Cohérence visuelle",
      "Pack complet",
    ],
    icon: "identite",
    hasProject: false,
    comingSoon: {
      teaser: "Identités en création...",
      badge: "En préparation",
    },
  },
] as const;

export const VALUES = [
  {
    id: "creativity",
    title: "Créativité",
    description: "Chaque site est une création, jamais un copier-coller.",
    icon: "creativity",
  },
  {
    id: "fidelity",
    title: "Fidélité",
    description: "Relation de confiance, accompagnement durable.",
    icon: "fidelity",
  },
  {
    id: "modernity",
    title: "Modernité",
    description: "Standards actuels, design contemporain.",
    icon: "modernity",
  },
] as const;

export const COMPARISON = [
  {
    template: "Design générique",
    aceStudio: "Design unique",
  },
  {
    template: "Code surchargé",
    aceStudio: "Code optimisé",
  },
  {
    template: "Comme 10 000 autres",
    aceStudio: "Comme personne",
  },
  {
    template: "Limité",
    aceStudio: "Évolutif",
  },
  {
    template: "Support inexistant",
    aceStudio: "Accompagnement réel",
  },
] as const;

export const FEATURED_PROJECTS = [
  {
    id: "arena",
    title: "Arena",
    category: "Site Vitrine",
    year: "2024",
    description: "Complexe sportif premium à Abidjan. Design moderne avec mode sombre/clair.",
    url: "https://arena-website-hbfbb989u-adhamch123-6733s-projects.vercel.app",
    video: "/videos/arena-preview.mp4",
    poster: "/images/portfolio/arena-poster.png",
  },
] as const;

export const TIME_GREETINGS = {
  morning: "Bonne matinée !",
  lunch: "Bon appétit !",
  afternoon: "Bonne après-midi !",
  evening: "Bonne soirée !",
  night: "Tu travailles tard toi aussi ?",
} as const;

export function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return TIME_GREETINGS.morning;
  if (hour >= 12 && hour < 14) return TIME_GREETINGS.lunch;
  if (hour >= 14 && hour < 18) return TIME_GREETINGS.afternoon;
  if (hour >= 18 && hour < 22) return TIME_GREETINGS.evening;
  return TIME_GREETINGS.night;
}

// Contact Form Options
export const PROJECT_TYPES = [
  { value: "site-vitrine", label: "Site Vitrine" },
  { value: "projet-ambitieux", label: "Projet Ambitieux" },
  { value: "identite-digitale", label: "Identite Digitale" },
  { value: "autre", label: "Autre" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "a-definir", label: "A definir" },
  { value: "less-500k", label: "< 500 000 FCFA" },
  { value: "500k-1m", label: "500 000 - 1 000 000 FCFA" },
  { value: "1m-2m", label: "1 000 000 - 2 000 000 FCFA" },
  { value: "more-2m", label: "> 2 000 000 FCFA" },
] as const;

export const FORM_STEPS = [
  { id: 1, title: "Qui etes-vous ?", subtitle: "Faisons connaissance" },
  { id: 2, title: "Votre projet", subtitle: "Parlez-nous de vos ambitions" },
  { id: 3, title: "Dites-nous tout", subtitle: "Les details qui comptent" },
] as const;

export const FUNNY_PLACEHOLDERS = {
  name: "Batman, Beyonce, ou votre vrai nom",
  email: "celui que vous checkez vraiment",
  message: "Dites-nous tout. On ne juge pas. (Sauf les sites Wix.)",
} as const;

export const FUNNY_ERRORS = {
  emailInvalid: "Hmm, ce mail a l'air aussi faux qu'un template WordPress",
  fieldEmpty: "Ce champ se sent un peu seul...",
  messageTooShort: "Allez, un petit effort ! Minimum 10 caracteres.",
} as const;

export const LOADING_MESSAGES = [
  "Envoi en cours...",
  "On reveille le serveur...",
  "Preparation de votre reponse sur mesure...",
] as const;

export function getSuccessMessage(): string {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "Message envoye ! On attaque ca avec notre cafe.";
  if (hour >= 12 && hour < 18) return "Recu ! On s'y met entre deux lignes de code.";
  if (hour >= 18 && hour < 22) return "Envoye ! On repond demain, promis. (Ou ce soir si on n'a pas de vie.)";
  return "Un message a cette heure ? On s'entend deja bien.";
}
