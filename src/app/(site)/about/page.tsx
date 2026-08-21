import siteConfigFallback from "@/data/site-config.json";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import { Award, ShieldCheck, HeartHandshake, Sparkles, Image as ImageIcon } from "lucide-react";
import { getSiteConfig, getAboutPage, getAboutPageImages } from "@/lib/queries";

export const revalidate = 0; // always fetch fresh from Sanity

export const metadata = {
  title: "About Us | Afsar Educational Academy Nampally Hyderabad",
  description:
    "Learn about Afsar Educational Academy, established in 2014 in Nampally, Hyderabad. Founded by Mr. Afsar Shareef to build the next generation with quality education.",
  openGraph: {
    title: "About Afsar Educational Academy | Est. 2014, Nampally Hyderabad",
    description:
      "A decade of quality coaching in Hyderabad. SSC, Intermediate, TOSS, BOSSE, NIOS & Degree. Govt. Regd. 1060/2016.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Afsar Educational Academy" }],
  },
};

const defaultPillars = [
  { title: "Quality Education", desc: "Rigorous curriculum coverage with focused exam-oriented notes, chapter-wise assignments, and conceptual clarity.", icon: Award },
  { title: "Strict Discipline", desc: "Attendance monitoring, punctual batch timings, and a respectful environment fostering focused study habits.", icon: ShieldCheck },
  { title: "Unwavering Dedication", desc: "Special interest in every student's learning pace, doubt clearance, and personal academic mentorship.", icon: HeartHandshake },
  { title: "Proven Success", desc: "Over 98% pass rate across SSC, Intermediate, TOSS, BOSSE, and NIOS board examinations year after year.", icon: Sparkles },
];

const defaultTimeline = [
  { year: "2014", title: "Academy Established", desc: "Founded by Mr. Afsar Shareef in Aghapura, Nampally to provide quality tuitions for local students." },
  { year: "2018", title: "State Govt. Registration", desc: "Registered under Govt. of Telangana (Regd. No. 1060/2016) and expanded Intermediate coaching." },
  { year: "2020", title: "Open Schooling Launch", desc: "Introduced direct admission & coaching for TOSS, BOSSE, and NIOS year-saving boards." },
  { year: "2022", title: "500+ Alumni Milestone", desc: "Crossed 500+ successful graduates pursuing engineering, medical, degree, and professional careers." },
  { year: "2024", title: "4.9 Rating Recognition", desc: "Earned 108+ 5-star Google reviews and 138+ Justdial ratings from satisfied parents." },
  { year: "2026", title: "Admissions Open 2026-27", desc: "Launching upgraded interactive batches with expanded subject guidance." },
];

export default async function AboutPage() {
  const isSanityConfigured = true;

  const [rawAboutPage, rawSiteConfig, rawLegacyImages] = isSanityConfigured
    ? await Promise.all([
        getAboutPage().catch(() => null),
        getSiteConfig().catch(() => null),
        getAboutPageImages().catch(() => null),
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
  const hero = rawAboutPage?.heroSection;
  const story = rawAboutPage?.storySection;
  const pillarsSection = rawAboutPage?.pillarsSection;
  const timelineSection = rawAboutPage?.timelineSection;
  const accreditation = rawAboutPage?.accreditationSection;

  const classroomPhoto: string | null =
    story?.classroomPhoto ||
    rawLegacyImages?.classroomPhoto ||
    siteConfig?.classroomPhoto ||
    null;

  const founderOfficePhoto: string | null =
    story?.founderOfficePhoto ||
    rawLegacyImages?.founderOfficePhoto ||
    siteConfig?.founderOfficePhoto ||
    null;

  const pillarsList =
    pillarsSection?.pillars && pillarsSection.pillars.length > 0
      ? pillarsSection.pillars.map((p: any, idx: number) => ({
          title: p.title,
          desc: p.desc,
          icon: defaultPillars[idx % defaultPillars.length].icon,
        }))
      : defaultPillars;

  const timelineItems =
    timelineSection?.timelineItems && timelineSection.timelineItems.length > 0
      ? timelineSection.timelineItems
      : defaultTimeline;

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Page Hero Banner */}
      <section className="bg-navy text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="px-3 py-1 rounded-full bg-orange/20 text-orange text-xs font-bold uppercase tracking-wider border border-orange/30">
            {hero?.badge ||
              `Est. ${siteConfig.establishedYear ?? "2014"} • Regd. No. ${siteConfig.registrationNo}`}
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            {hero?.title || "Our Story & Educational Philosophy"}
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            {hero?.subtitle ||
              "Building the next generation in Hyderabad with quality academics, expert faculty, and structured discipline."}
          </p>
        </div>
      </section>

      {/* 2. Academy Story (60/40 Split) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <RevealOnScroll direction="left">
              <span className="text-xs font-bold text-orange uppercase tracking-wider">
                {story?.badge || "A Decade of Leadership"}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
                {story?.heading || "Empowering Students in Nampally Since 2014"}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {story?.paragraph1 ||
                  "Afsar Educational Academy was established with a singular mission: to offer accessible, top-tier coaching for students in Nampally, Aghapura, and surrounding areas in Hyderabad."}
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                {story?.paragraph2 ||
                  "Recognizing that every student learns at their own pace, we combine traditional board coaching (SSC & Intermediate) with flexible Open Schooling options (TOSS, BOSSE, NIOS). This allows working students, gap-year candidates, and regular schoolgoers to achieve their academic targets seamlessly."}
              </p>
              <div className="p-4 rounded-2xl bg-orange-light border border-orange/20 text-navy font-semibold text-sm">
                {story?.quoteBox ||
                  `"Right Foundation at the Right Age — Choose a future-ready learning environment with strong academics and all-round development."`}
              </div>

              {/* Classroom Photo */}
              {classroomPhoto ? (
                <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-200 shadow-sm mt-4">
                  <img
                    src={classroomPhoto}
                    alt="Classroom interior at Afsar Educational Academy"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={192}
                  />
                </div>
              ) : (
                <div className="w-full h-48 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center p-4 text-center mt-4">
                  <ImageIcon className="w-6 h-6 text-orange mb-1" />
                  <span className="text-xs font-bold text-navy uppercase tracking-wider">
                    Classroom Interior / Campus Facade Photo
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Upload in Sanity Studio → ℹ️ About Page → Classroom Photo
                  </span>
                </div>
              )}
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-5">
            <RevealOnScroll direction="right">
              <div className="bg-navy text-white rounded-3xl p-8 shadow-xl border border-navy-light/40 space-y-6 card-hover">
                {/* Founder Office Photo */}
                {founderOfficePhoto ? (
                  <div className="w-full h-52 rounded-2xl overflow-hidden border border-white/10">
                    <img
                      src={founderOfficePhoto}
                      alt="Mr. Afsar Shareef – Founder & Director"
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={208}
                    />
                  </div>
                ) : (
                  <div className="w-full h-52 rounded-2xl border-2 border-dashed border-orange/40 bg-white/5 flex flex-col items-center justify-center p-4 text-center">
                    <ImageIcon className="w-6 h-6 text-orange mb-1" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Mr. Afsar Shareef (Founder Office Photo)
                    </span>
                    <span className="text-[11px] text-orange/90 font-semibold mt-0.5">
                      Upload in Sanity Studio → ℹ️ About Page → Founder Office Photo
                    </span>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold">
                    {story?.founderVisionTitle || "Founder's Vision"}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {story?.founderVisionDescription ||
                      "Mr. Afsar Shareef (M.Sc, B.Ed), with over 15 years of academic leadership, personally oversees classroom instruction and student progress to maintain strict quality standards."}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-700 text-xs text-orange font-bold">
                  {story?.founderVisionBadge || "Government of Telangana Approved Institute"}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 3. 4 Pillars of Excellence */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <RevealOnScroll className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3.5 py-1.5 rounded-full bg-orange-light text-orange text-xs font-bold tracking-wide">
              {pillarsSection?.badge || "Core Principles"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
              {pillarsSection?.heading || "The 4 Pillars of Afsar Academy"}
            </h2>
            <p className="text-slate-600 text-sm">
              {pillarsSection?.subtitle ||
                "Our philosophy centres on nurturing academic potential through structured principles that drive consistent results."}
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillarsList.map((p: any, idx: number) => {
              const IconComp = p.icon || Award;
              return (
                <RevealOnScroll key={idx} delay={idx * 0.1}>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4 h-full card-hover">
                    <div className="w-12 h-12 rounded-xl bg-orange-light text-orange flex items-center justify-center font-bold">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-navy">{p.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{p.desc}</p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Academy Journey / Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <RevealOnScroll className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3.5 py-1.5 rounded-full bg-orange-light text-orange text-xs font-bold tracking-wide">
            {timelineSection?.badge || "Our Growth"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
            {timelineSection?.heading || "A Decade of Educational Excellence"}
          </h2>
          <p className="text-slate-600 text-sm">
            {timelineSection?.subtitle ||
              "From a humble beginning in 2014 to Hyderabad's premier registered academy."}
          </p>
        </RevealOnScroll>

        <div className="relative border-l-2 border-orange/30 ml-4 sm:ml-32 space-y-10 py-4">
          {timelineItems.map((item: any, idx: number) => (
            <RevealOnScroll key={idx} delay={idx * 0.1}>
              <div className="relative pl-8 group">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-orange border-4 border-white shadow-sm group-hover:scale-125 transition-transform" />
                <span className="hidden sm:inline-block absolute -left-28 top-0.5 text-orange font-bold text-sm tracking-wider w-20 text-right">
                  {item.year}
                </span>
                <span className="sm:hidden inline-block text-orange font-bold text-xs mb-1">
                  Year {item.year}
                </span>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-xl">
                  <h3 className="font-serif text-lg font-bold text-navy">{item.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* 5. Official Verification & Registration */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-light text-orange text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>{accreditation?.badge || "Official Verification"}</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-navy">
            {accreditation?.title || "Government of Telangana Registered Institute"}
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            {accreditation?.description ||
              `Afsar Educational Academy operates under official registration by the Government of Telangana (Regd. No. ${siteConfig.registrationNo}), adhering to the highest standards of academic excellence, student safety, and curriculum integrity.`}
          </p>
          <div className="text-xs font-semibold text-slate-400">
            Regd. No. {accreditation?.regNo || siteConfig.registrationNo} • Aghapura, Nampally, Hyderabad
          </div>
        </div>
      </section>
    </div>
  );
}
