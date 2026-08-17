import CoursesClient from "./CoursesClient";
import coursesFallback from "@/data/courses.json";
import siteConfigFallback from "@/data/site-config.json";
import { getCourses, getSiteConfig } from "@/lib/queries";

export const metadata = {
  title: "Courses & Programs | Afsar Educational Academy Hyderabad",
  description:
    "Explore SSC, Intermediate, TOSS, BOSSE, NIOS and Degree coaching courses at Afsar Educational Academy, Nampally, Hyderabad.",
  openGraph: {
    title: "Courses & Programs | Afsar Educational Academy Hyderabad",
    description: "SSC, Intermediate (MPC/BiPC/CEC), TOSS, BOSSE, NIOS & Degree coaching in Nampally, Hyderabad.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Afsar Educational Academy Courses" }],
  },
};

export default async function CoursesPage() {
  const isSanityConfigured = true;

  const [rawCourses, rawSiteConfig] = isSanityConfigured
    ? await Promise.all([
        getCourses().catch(() => null),
        getSiteConfig().catch(() => null),
      ])
    : [null, null];

  const courses =
    rawCourses && rawCourses.length > 0 ? rawCourses : coursesFallback;
  const siteConfig = rawSiteConfig ?? siteConfigFallback;

  return <CoursesClient courses={courses} siteConfig={siteConfig} />;
}
