import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from 'next-intl/server';
import {
  PortfolioHeader,
  ProjectGrid,
} from "@/components/sections/portfolio";
import { type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: 'portfolio.header' });
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: `${t('title')} | ${tMeta('siteName')}`,
    description: t('subtitle'),
  };
}

export default async function RealisationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Redirect if portfolio is hidden
  const showPortfolio = process.env.NEXT_PUBLIC_SHOW_PORTFOLIO === "true";

  if (!showPortfolio) {
    redirect(`/${locale}`);
  }

  return (
    <>
      <PortfolioHeader />
      <ProjectGrid />
    </>
  );
}
