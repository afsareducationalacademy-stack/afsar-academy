import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import siteConfigFallback from "@/data/site-config.json";
import { getSiteConfig } from "@/lib/queries";

export const revalidate = 60; // ISR: refresh layout every 60 seconds

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

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rawSiteConfig = await getSiteConfig().catch(() => null);
  const siteConfig = mergeSanity(siteConfigFallback, rawSiteConfig);

  // Schema 1: EducationalOrganization — used by Google for knowledge graph
  const eduOrgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": siteConfig.academyName,
    "alternateName": siteConfig.shortName,
    "description": siteConfig.tagline,
    "url": "https://afsaracademy.in",
    "logo": "https://afsaracademy.in/afsaraclogo.svg",
    "image": "https://afsaracademy.in/og-image.jpg",
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address?.building + ", " + siteConfig.address?.street,
      "addressLocality": siteConfig.address?.city,
      "addressRegion": siteConfig.address?.state,
      "postalCode": siteConfig.address?.pincode,
      "addressCountry": "IN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": (siteConfig.googleRating || 4.9).toString(),
      "reviewCount": (siteConfig.totalGoogleReviews || 108).toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      siteConfig.instagram,
    ]
  };

  // Schema 2: LocalBusiness — used by Google for the business panel
  // (address, phone, hours, maps link) in mobile search results
  const localBizSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.academyName,
    "description": "Government registered coaching academy in Nampally, Hyderabad offering SSC, Intermediate (MPC/BiPC/CEC), TOSS, BOSSE, NIOS and Degree level coaching.",
    "url": "https://afsaracademy.in",
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "image": "https://afsaracademy.in/og-image.jpg",
    "priceRange": "₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address?.building + ", " + siteConfig.address?.street,
      "addressLocality": siteConfig.address?.city,
      "addressRegion": siteConfig.address?.state,
      "postalCode": siteConfig.address?.pincode,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.39207",
      "longitude": "78.46129"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "09:00",
        "closes": "22:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": (siteConfig.googleRating || 4.9).toString(),
      "reviewCount": (siteConfig.totalGoogleReviews || 108).toString(),
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eduOrgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSchema) }}
      />
      <div className="min-h-screen flex flex-col justify-between overflow-x-hidden w-full">
        <AnnouncementBar siteConfig={siteConfig} />
        <Navbar siteConfig={siteConfig} />
        <main className="grow">{children}</main>
        <Footer siteConfig={siteConfig} />
        <WhatsAppButton siteConfig={siteConfig} />
      </div>
    </>
  );
}
