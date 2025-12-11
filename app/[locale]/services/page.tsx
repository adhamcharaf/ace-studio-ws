import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import {
  ServicesHeader,
  CodeToDesign,
  ServicesTriptych,
  Comparison,
  ServicesCTA,
} from "@/components/sections/services";
import { type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: 'services.header' });
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: `${t('title')} | ${tMeta('siteName')}`,
    // Remove XML tags from tagline for plain text description
    description: t('taglinePlain'),
  };
}

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
