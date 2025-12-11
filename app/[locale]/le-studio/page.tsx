import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import {
  StudioHero,
  Manifeste,
  ADN,
  Methode,
  StudioPersonality,
} from "@/components/sections/studio";
import { type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: 'studio.hero' });
  const tNav = await getTranslations({ locale, namespace: 'navigation' });
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: `${tNav('studio')} | ${tMeta('siteName')}`,
    description: `${t('line1')} ${t('line2')}`,
  };
}

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
