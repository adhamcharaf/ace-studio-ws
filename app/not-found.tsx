"use client";

import { CardCastle } from "@/components/404";

export default function NotFound() {
  return (
    <CardCastle
      homeHref="/fr"
      contactHref="/fr/contact"
      texts={{
        title: "Tout s'est effondré.",
        subtitle: "Sauf nous — on est toujours là.",
        homeButton: "Retour à l'accueil",
        contactButton: "Nous contacter",
        easterEgg: "Tu cherches quoi exactement ? 👀",
      }}
    />
  );
}
