import CoursesClient from "./CoursesClient";
import coursesFallback from "@/data/courses.json";
import siteConfigFallback from "@/data/site-config.json";
import { getCourses, getSiteConfig } from "@/lib/queries";

export const metadata = {
  title: "Courses & Programs | Afsar Educational Academy Hyderabad",
  description:
    "Explore SSC, Intermediate, TOSS, BOSSE, NIOS and Degree coaching courses at Afsar Educational Academy, Nampally, Hyderabad.",
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
