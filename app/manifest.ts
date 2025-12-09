import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ACE STUDIO - Création de sites web sur mesure",
    short_name: "ACE STUDIO",
    description:
      "Une présence digitale à votre image. Sites web premium, conçus sur mesure, sans templates. Abidjan, Côte d'Ivoire.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#C9A050",
    orientation: "portrait-primary",
    categories: ["business", "web development", "design"],
    lang: "fr",
    icons: [
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
