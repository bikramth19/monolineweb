import { prisma } from "@/lib/prisma";
import { siteSettings } from "@/lib/settings";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  const settings = await siteSettings();
  return {
    applicationName: settings.brandName,
    icons: { icon: settings.faviconUrl || "/images/monoline-logo.png" },
  };
}
export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, pages] = await Promise.all([
    siteSettings(),
    prisma.page.findMany({
      where: { status: "published", showInNav: true, NOT: { slug: "home" } },
      select: { title: true, slug: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);
  return (
    <>
      <SiteHeader settings={settings} pages={pages} />
      <main>{children}</main>
      <SiteFooter settings={settings} pages={pages} />
      <ScrollReveal />
    </>
  );
}
