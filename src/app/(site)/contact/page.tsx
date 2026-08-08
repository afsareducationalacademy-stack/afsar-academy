import ContactClient from "./ContactClient";
import siteConfigFallback from "@/data/site-config.json";
import { getSiteConfig, getContactPageImages } from "@/lib/queries";

export const revalidate = 0; // always fetch fresh from Sanity

export const metadata = {
  title: "Contact Us | Afsar Educational Academy Nampally Hyderabad",
  description:
    "Contact Afsar Educational Academy for admissions, course details, and batch timings. Visit us in Nampally, Aghapura, Hyderabad.",
};

export default async function ContactPage() {
  const isSanityConfigured = true;

  const [rawSiteConfig, rawPageImages] = isSanityConfigured
    ? await Promise.all([
        getSiteConfig().catch(() => null),
        getContactPageImages().catch(() => null),
      ])
    : [null, null];

  const siteConfig = rawSiteConfig
    ? {
        ...siteConfigFallback,
        ...rawSiteConfig,
        address: {
          ...siteConfigFallback.address,
          ...(rawSiteConfig.address || {}),
        },
        hours: {
          ...siteConfigFallback.hours,
          ...(rawSiteConfig.hours || {}),
        },
      }
    : siteConfigFallback;
  const buildingPhoto: string | null = rawPageImages?.buildingPhoto ?? null;

  return <ContactClient siteConfig={siteConfig} buildingPhoto={buildingPhoto} />;
}
