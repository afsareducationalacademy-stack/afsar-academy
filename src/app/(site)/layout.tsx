import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import siteConfigFallback from "@/data/site-config.json";
import { getSiteConfig } from "@/lib/queries";
import { Analytics } from "@vercel/analytics/next";

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

  // Schema 1: WebSite — used by Google Search for the Site Name ("Heading")
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Afsar Educational Academy",
    "alternateName": [
      "Afsar Academy",
      "Afsar Educational Academy Nampally",
      "Afsar Academy Hyderabad",
      "Afsar Coaching Academy"
    ],
    "url": "https://www.afsaracademy.com",
    "description": siteConfig.tagline || "Government registered (1060/2016) coaching academy in Nampally, Hyderabad offering SSC, Intermediate, TOSS, BOSSE, NIOS and Degree classes.",
    "inLanguage": "en-IN",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Afsar Educational Academy",
      "url": "https://www.afsaracademy.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.afsaracademy.com/icon.png",
        "width": 192,
        "height": 192
      }
    }
  };

  // Schema 2: EducationalOrganization — used by Google for Knowledge Graph
  const eduOrgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": siteConfig.academyName || "Afsar Educational Academy",
    "alternateName": siteConfig.shortName || "Afsar Academy",
    "description": siteConfig.tagline || "A Place You Can Grow and Develop",
    "url": "https://www.afsaracademy.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.afsaracademy.com/icon.png",
      "width": 192,
      "height": 192
    },
    "image": "https://www.afsaracademy.com/og-image.jpg",
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address?.building + ", " + siteConfig.address?.street,
      "addressLocality": siteConfig.address?.city || "Hyderabad",
      "addressRegion": siteConfig.address?.state || "Telangana",
      "postalCode": siteConfig.address?.pincode || "500001",
      "addressCountry": "IN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": (siteConfig.googleRating || 4.9).toString(),
      "reviewCount": (siteConfig.totalGoogleReviews || 127).toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      siteConfig.instagram,
    ]
  };

  // Schema 3: LocalBusiness — used by Google for the business panel / Local pack
  const localBizSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.academyName || "Afsar Educational Academy",
    "alternateName": siteConfig.shortName || "Afsar Academy",
    "description": "Government registered coaching academy in Nampally, Hyderabad offering SSC, Intermediate (MPC/BiPC/CEC), TOSS, BOSSE, NIOS and Degree level coaching.",
    "url": "https://www.afsaracademy.com",
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "image": "https://www.afsaracademy.com/og-image.jpg",
    "priceRange": "₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Bank Transfer, UPI",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address?.building + ", " + siteConfig.address?.street,
      "addressLocality": siteConfig.address?.city || "Hyderabad",
      "addressRegion": siteConfig.address?.state || "Telangana",
      "postalCode": siteConfig.address?.pincode || "500001",
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
      "reviewCount": (siteConfig.totalGoogleReviews || 127).toString(),
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
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
      <Analytics />
    </>
  );
}
