import Script from "next/script";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ace-studio-dev.com";

// Schema Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${baseUrl}/#organization`,
  name: "ACE STUDIO",
  url: baseUrl,
  logo: {
    "@type": "ImageObject",
    url: `${baseUrl}/images/ACE-gold-logo.png`,
    width: 512,
    height: 512,
  },
  image: `${baseUrl}/images/ACE-gold-logo.png`,
  description:
    "ACE STUDIO - Agence de création de sites web sur mesure à Abidjan, Côte d'Ivoire. Sites premium, code custom, zéro template.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abidjan",
    addressCountry: "CI",
    addressRegion: "Côte d'Ivoire",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contact@acestudio.ci",
    telephone: "+225 07 47 66 66 67",
    availableLanguage: ["French"],
  },
  sameAs: [],
  founder: {
    "@type": "Person",
    name: "ACE STUDIO",
  },
};

// Schema LocalBusiness / ProfessionalService
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${baseUrl}/#localbusiness`,
  name: "ACE STUDIO",
  image: `${baseUrl}/images/ACE-gold-logo.png`,
  url: baseUrl,
  telephone: "+225 07 47 66 66 67",
  email: "contact@acestudio.ci",
  description:
    "Création de sites web sur mesure à Abidjan. Sites vitrines premium, projets ambitieux et identité digitale complète. Code custom, zéro template.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abidjan",
    addressRegion: "Côte d'Ivoire",
    addressCountry: "CI",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 5.3599517,
    longitude: -4.0082563,
  },
  areaServed: [
    {
      "@type": "City",
      name: "Abidjan",
    },
    {
      "@type": "Country",
      name: "Côte d'Ivoire",
    },
  ],
  priceRange: "$$",
  currenciesAccepted: "XOF",
  paymentAccepted: "Cash, Mobile Money, Bank Transfer",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  serviceType: [
    "Création de sites web",
    "Développement web sur mesure",
    "Site vitrine",
    "Identité digitale",
    "Design web",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services ACE STUDIO",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Site Vitrine",
          description:
            "Site web professionnel sur mesure pour entrepreneurs et PME. Design unique, responsive, optimisé performance.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Projet Ambitieux",
          description:
            "Solutions web complexes pour entreprises établies. Fonctionnalités avancées, architecture évolutive.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Identité Digitale",
          description:
            "Pack complet : logo, charte graphique et site web assorti. Cohérence visuelle garantie.",
        },
      },
    ],
  },
};

// Schema WebSite avec SearchAction
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  url: baseUrl,
  name: "ACE STUDIO",
  description: "Une présence digitale à votre image",
  publisher: {
    "@id": `${baseUrl}/#organization`,
  },
  inLanguage: "fr-FR",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${baseUrl}/?s={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// Schema BreadcrumbList helper
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

// Main JsonLd Component
export function JsonLd() {
  const schemas = [organizationSchema, localBusinessSchema, websiteSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={index}
          id={`json-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          strategy="afterInteractive"
        />
      ))}
    </>
  );
}

// Page-specific Schema components
export function ServicePageSchema() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Site Vitrine",
          description:
            "Site web professionnel sur mesure pour entrepreneurs, indépendants et PME à Abidjan.",
          provider: {
            "@id": `${baseUrl}/#organization`,
          },
          areaServed: "Côte d'Ivoire",
          url: `${baseUrl}/services#site-vitrine`,
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Projet Ambitieux",
          description:
            "Solutions web complexes avec fonctionnalités avancées pour entreprises établies.",
          provider: {
            "@id": `${baseUrl}/#organization`,
          },
          areaServed: "Côte d'Ivoire",
          url: `${baseUrl}/services#projet-ambitieux`,
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "Identité Digitale",
          description:
            "Pack complet incluant logo, charte graphique et site web assorti.",
          provider: {
            "@id": `${baseUrl}/#organization`,
          },
          areaServed: "Côte d'Ivoire",
          url: `${baseUrl}/services#identite-digitale`,
        },
      },
    ],
  };

  return (
    <Script
      id="service-page-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      strategy="afterInteractive"
    />
  );
}

export function ContactPageSchema() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contactez ACE STUDIO",
    description:
      "Contactez ACE STUDIO pour votre projet de site web sur mesure à Abidjan, Côte d'Ivoire.",
    url: `${baseUrl}/contact`,
    mainEntity: {
      "@id": `${baseUrl}/#localbusiness`,
    },
  };

  return (
    <Script
      id="contact-page-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      strategy="afterInteractive"
    />
  );
}

export function AboutPageSchema() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Le Studio - ACE STUDIO",
    description:
      "Découvrez l'ADN d'ACE STUDIO : créativité, exigence et modernité. Notre approche unique pour créer des sites web sur mesure.",
    url: `${baseUrl}/le-studio`,
    mainEntity: {
      "@id": `${baseUrl}/#organization`,
    },
  };

  return (
    <Script
      id="about-page-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      strategy="afterInteractive"
    />
  );
}

export default JsonLd;
