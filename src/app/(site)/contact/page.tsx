import ContactClient from "./ContactClient";
import siteConfigFallback from "@/data/site-config.json";
import { getSiteConfig, getContactPage, getContactPageImages } from "@/lib/queries";

export const revalidate = 0; // always fetch fresh from Sanity

export const metadata = {
  title: "Contact Us | Afsar Educational Academy Nampally Hyderabad",
  description:
    "Contact Afsar Educational Academy for admissions, course details, and batch timings. Visit us in Nampally, Aghapura, Hyderabad.",
  openGraph: {
    title: "Contact & Admissions | Afsar Educational Academy Hyderabad",
    description:
      "Enroll now at Afsar Academy. Morning & Evening batches for SSC, Intermediate, TOSS, BOSSE, NIOS in Nampally, Hyderabad.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Afsar Educational Academy Contact" }],
  },
};

export default async function ContactPage() {
  const isSanityConfigured = true;

  const [rawContactPage, rawSiteConfig, rawLegacyImages] = isSanityConfigured
    ? await Promise.all([
        getContactPage().catch(() => null),
        getSiteConfig().catch(() => null),
        getContactPageImages().catch(() => null),
      ])
    : [null, null, null];

  function mergeSanity(fallback: any, sanity: any): any {
    if (!sanity) return fallback;
    const result = { ...fallback };
    for (const key of Object.keys(sanity)) {
      const val = sanity[key];
      if (val !== null && val !== undefined && val !== "") {
        if (typeof val === "object" && !Array.isArray(val)) {
          result[key] = mergeSanity(fallback[key] || {}, val);
        } else {
          result[key] = val;
        }
      }
    }
    return result;
  }

  const siteConfig = mergeSanity(siteConfigFallback, rawSiteConfig);
  const locationSection = rawContactPage?.locationSection;

  const buildingPhoto: string | null =
    locationSection?.buildingPhoto ||
    rawLegacyImages?.buildingPhoto ||
    siteConfig?.buildingPhoto ||
    null;

  return (
    <ContactClient
      siteConfig={siteConfig}
      contactPageData={rawContactPage}
      buildingPhoto={buildingPhoto}
    />
  );
}
