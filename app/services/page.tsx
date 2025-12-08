import type { Metadata } from "next";
import {
  ServicesHeader,
  CodeToDesign,
  ServicesTriptych,
  Comparison,
  ServicesCTA,
} from "@/components/sections/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Sites vitrines, projets ambitieux et identité digitale sur mesure. Découvrez nos offres de création web premium.",
};

export default function ServicesPage() {
  return (
    <>
      <CodeToDesign />
      <ServicesHeader />
      <ServicesTriptych />
      <Comparison />
      <ServicesCTA />
    </>
  );
}
