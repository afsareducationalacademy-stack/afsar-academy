import type { Metadata } from "next";
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";

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

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Afsar Academy | SSC, Inter, TOSS, Degree Coaching",
  description:
    "Govt. Regd. (1060/2016) coaching in Nampally, Hyderabad. Expert classes for SSC, Inter, TOSS, BOSSE, NIOS & Degree. Join Afsar Educational Academy.",
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://afsaracademy.in")
  ),
  openGraph: {
    title: "Afsar Educational Academy | Excellence in Education",
    description: "Govt. Regd. coaching in Nampally, Hyderabad. SSC, Inter, TOSS, BOSSE & Degree classes. 4.9★ Google Rating.",
    url: "https://afsaracademy.in",
    siteName: "Afsar Educational Academy",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Afsar Educational Academy – SSC, Intermediate, TOSS, BOSSE Coaching Hyderabad",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Afsar Educational Academy | Excellence in Education",
    description: "Govt. Regd. coaching in Nampally, Hyderabad. SSC, Inter, TOSS, BOSSE & Degree classes. 4.9★ Google Rating.",
    images: ["/og-image.jpg"],
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
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${dancing.variable}`}>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
