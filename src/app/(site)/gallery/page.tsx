import GalleryClient from "./GalleryClient";
import { getGalleryPhotos, getGalleryPage } from "@/lib/queries";

export const metadata = {
  title: "Gallery | Afsar Educational Academy",
  description:
    "Explore photos from classrooms, events, results celebrations, and campus life at Afsar Educational Academy, Nampally, Hyderabad.",
  openGraph: {
    title: "Gallery | Afsar Educational Academy Nampally Hyderabad",
    description: "Campus life, classroom sessions, results celebrations and events at Afsar Academy, Nampally, Hyderabad.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Afsar Educational Academy Gallery" }],
  },
};

// Placeholder items shown when no photos are uploaded to Sanity yet
const placeholderItems = [
  { _id: "p1", title: "Interactive Mathematics Classroom", category: "Classroom", caption: "Students engaging in step-by-step problem solving with senior faculty.", imageUrl: null },
  { _id: "p2", title: "Board Exam High Achievers Felicitation", category: "Results", caption: "Celebrating 9.8+ GPA scorers in SSC & Intermediate examinations.", imageUrl: null },
  { _id: "p3", title: "Annual Student Orientation Day", category: "Events", caption: "Welcoming 2026-27 batch students and introducing exam strategies.", imageUrl: null },
  { _id: "p4", title: "Spacious Learning Classrooms", category: "Campus", caption: "Well-lit and ventilated setup on 1st & 2nd floors in Aghapura.", imageUrl: null },
  { _id: "p5", title: "TOSS & BOSSE Guidance Workshop", category: "Events", caption: "Special orientation for open schooling students and year-saving paths.", imageUrl: null },
  { _id: "p6", title: "Science & Biology Lab Demonstration", category: "Classroom", caption: "Practical concepts explained clearly for BiPC and Science streams.", imageUrl: null },
  { _id: "p7", title: "Faculty Doubt Clearing Session", category: "Classroom", caption: "One-on-one academic support for students before board examinations.", imageUrl: null },
  { _id: "p8", title: "Degree & Professional Career Guidance", category: "Events", caption: "Counseling session for undergraduate B.Com, B.A, B.Sc & BBA students.", imageUrl: null },
  { _id: "p9", title: "State Board Top Rankers Award", category: "Results", caption: "Distributing merit certificates and gold medals to exemplary performers.", imageUrl: null },
];

export default async function GalleryPage() {
  const isSanityConfigured = true;

  const [sanityPhotos, rawGalleryPage] = isSanityConfigured
    ? await Promise.all([
        getGalleryPhotos().catch(() => null),
        getGalleryPage().catch(() => null),
      ])
    : [null, null];

  const photos =
    sanityPhotos && sanityPhotos.length > 0 ? sanityPhotos : placeholderItems;

  return <GalleryClient photos={photos} galleryPageData={rawGalleryPage} />;
}
