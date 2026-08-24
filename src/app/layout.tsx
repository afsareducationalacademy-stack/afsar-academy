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
  title: {
    default: "Afsar Academy | SSC, Inter, TOSS, Degree Coaching in Nampally, Hyderabad",
    template: "%s | Afsar Educational Academy",
  },
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
  metadataBase: new URL("https://www.afsaracademy.com"),
  alternates: {
    canonical: "https://www.afsaracademy.com",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Afsar Educational Academy | Excellence in Education",
    description: "Govt. Regd. coaching in Nampally, Hyderabad. SSC, Inter, TOSS, BOSSE & Degree classes. 4.9★ Google Rating.",
    url: "https://www.afsaracademy.com",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/afsaraclogo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
