import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import siteConfig from "@/data/site-config.json";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Afsar Educational Academy Nampally | SSC, Intermediate, TOSS, BOSSE Coaching Hyderabad",
  description:
    "Afsar Educational Academy in Nampally, Hyderabad. Government registered (Regd 1060/2016). Quality coaching for Class VI-X (SSC), Inter (MPC, BiPC, CEC, MEC), TOSS, BOSSE, NIOS, and Degree.",
  keywords: [
    "Afsar Educational Academy",
    "Afsar Academy Nampally",
    "SSC Coaching Hyderabad",
    "Intermediate Coaching Nampally",
    "TOSS Open Schooling Hyderabad",
    "BOSSE Admissions Hyderabad",
    "NIOS 10th 12th Coaching",
    "Degree Coaching Osmania University",
    "Aghapura Coaching Center"
  ],
  authors: [{ name: "Afsar Educational Academy" }],
  openGraph: {
    title: "Afsar Educational Academy | Excellence in Education",
    description: "Building the next generation with quality education, expert faculty, and proven results in Hyderabad.",
    url: "https://afsaracademy.in",
    siteName: "Afsar Educational Academy",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: [{ url: "/afsaraclogo.svg", type: "image/svg+xml" }],
    shortcut: "/afsaraclogo.svg",
    apple: "/afsaraclogo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": siteConfig.academyName,
    "alternateName": siteConfig.shortName,
    "description": siteConfig.tagline,
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
      "reviewCount": siteConfig.totalGoogleReviews.toString()
    }
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col justify-between">
        <AnnouncementBar />
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
