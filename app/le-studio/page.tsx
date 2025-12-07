import type { Metadata } from "next";
import {
  StudioHero,
  Manifeste,
  ADN,
  Methode,
  StudioPersonality,
} from "@/components/sections/studio";

export const metadata: Metadata = {
  title: "Le Studio | ACE STUDIO",
  description:
    "Découvrez l'ADN d'ACE STUDIO : créativité, exigence et modernité. Notre approche unique pour créer des sites web sur mesure qui vous ressemblent.",
};

export default function LeStudioPage() {
  return (
    <>
      <StudioHero />
      <Manifeste />
      <ADN />
      <Methode />
      <StudioPersonality />
    </>
  );
}
