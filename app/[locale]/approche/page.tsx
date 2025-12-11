import { redirect } from "next/navigation";

// Redirect old /approche URL to new /le-studio
export default async function ApprochePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/le-studio`);
}
