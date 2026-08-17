import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import siteConfig from "@/data/site-config.json";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      "streetAddress": siteConfig.address.building + ", " + siteConfig.address.street,
      "addressLocality": siteConfig.address.city,
      "addressRegion": siteConfig.address.state,
      "postalCode": siteConfig.address.pincode,
      "addressCountry": "IN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": siteConfig.googleRating.toString(),
      "reviewCount": siteConfig.totalGoogleReviews.toString(),
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
      "streetAddress": siteConfig.address.building + ", " + siteConfig.address.street,
      "addressLocality": siteConfig.address.city,
      "addressRegion": siteConfig.address.state,
      "postalCode": siteConfig.address.pincode,
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
      "ratingValue": siteConfig.googleRating.toString(),
      "reviewCount": siteConfig.totalGoogleReviews.toString(),
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
      <div className="min-h-screen flex flex-col justify-between">
        <AnnouncementBar />
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
