"use client";

import { useTranslations } from "next-intl";
import { CardCastle } from "@/components/404";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <CardCastle
      homeHref="/"
      contactHref="/contact"
      texts={{
        title: t("title"),
        subtitle: t("subtitle"),
        homeButton: t("cta.home"),
        contactButton: t("cta.contact"),
        easterEgg: t("easterEgg"),
      }}
    />
  );
}
