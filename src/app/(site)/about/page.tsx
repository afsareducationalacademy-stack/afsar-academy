import siteConfigFallback from "@/data/site-config.json";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import { Award, ShieldCheck, HeartHandshake, Sparkles, Image as ImageIcon } from "lucide-react";
import { getSiteConfig, getAboutPageImages } from "@/lib/queries";

export const revalidate = 0; // always fetch fresh from Sanity

export const metadata = {
  title: "About Us | Afsar Educational Academy Nampally Hyderabad",
  description:
    "Learn about Afsar Educational Academy, established in 2014 in Nampally, Hyderabad. Founded by Mr. Afsar Shareef to build the next generation with quality education.",
};

const pillars = [
  { title: "Quality Education", desc: "Rigorous curriculum coverage with focused exam-oriented notes, chapter-wise assignments, and conceptual clarity.", icon: Award },
  { title: "Strict Discipline", desc: "Attendance monitoring, punctual batch timings, and a respectful environment fostering focused study habits.", icon: ShieldCheck },
  { title: "Unwavering Dedication", desc: "Special interest in every student's learning pace, doubt clearance, and personal academic mentorship.", icon: HeartHandshake },
  { title: "Proven Success", desc: "Over 98% pass rate across SSC, Intermediate, TOSS, BOSSE, and NIOS board examinations year after year.", icon: Sparkles },
];

const timeline = [
  { year: "2014", title: "Academy Established", desc: "Founded by Mr. Afsar Shareef in Aghapura, Nampally to provide quality tuitions for local students." },
  { year: "2018", title: "State Govt. Registration", desc: "Registered under Govt. of Telangana (Regd. No. 1060/2016) and expanded Intermediate coaching." },
  { year: "2020", title: "Open Schooling Launch", desc: "Introduced direct admission & coaching for TOSS, BOSSE, and NIOS year-saving boards." },
  { year: "2022", title: "500+ Alumni Milestone", desc: "Crossed 500+ successful graduates pursuing engineering, medical, degree, and professional careers." },
  { year: "2024", title: "4.9 Rating Recognition", desc: "Earned 108+ 5-star Google reviews and 138+ Justdial ratings from satisfied parents." },
  { year: "2026", title: "Admissions Open 2026-27", desc: "Launching upgraded interactive batches with expanded subject guidance." },
];

export default async function AboutPage() {
  const isSanityConfigured = true;

  const [rawSiteConfig, rawPageImages] = isSanityConfigured
    ? await Promise.all([
        getSiteConfig().catch(() => null),
        getAboutPageImages().catch(() => null),
      ])
    : [null, null];

  const siteConfig = rawSiteConfig
    ? {
        ...siteConfigFallback,
        ...rawSiteConfig,
        address: {
          ...siteConfigFallback.address,
          ...(rawSiteConfig.address || {}),
        },
        hours: {
          ...siteConfigFallback.hours,
          ...(rawSiteConfig.hours || {}),
        },
      }
    : siteConfigFallback;
  const classroomPhoto: string | null = rawPageImages?.classroomPhoto ?? null;
  const founderOfficePhoto: string | null = rawPageImages?.founderOfficePhoto ?? null;

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Page Hero Banner */}
      <section className="bg-navy text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="px-3 py-1 rounded-full bg-orange/20 text-orange text-xs font-bold uppercase tracking-wider border border-orange/30">
            Est. {siteConfig.establishedYear ?? "2014"} • Regd. No. {siteConfig.registrationNo}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-white">
            Our Story &amp; Educational Philosophy
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Building the next generation in Hyderabad with quality academics, expert faculty, and structured discipline.
          </p>
        </div>
      </section>

      {/* 2. Academy Story (60/40 Split) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <RevealOnScroll direction="left">
              <span className="text-xs font-bold text-orange uppercase tracking-wider">
                A Decade of Leadership
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
                Empowering Students in Nampally Since 2014
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Afsar Educational Academy was established with a singular mission: to offer accessible, top-tier coaching for students in Nampally, Aghapura, and surrounding areas in Hyderabad.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Recognizing that every student learns at their own pace, we combine traditional board coaching (SSC &amp; Intermediate) with flexible Open Schooling options (TOSS, BOSSE, NIOS). This allows working students, gap-year candidates, and regular schoolgoers to achieve their academic targets seamlessly.
              </p>
              <div className="p-4 rounded-2xl bg-orange-light border border-orange/20 text-navy font-semibold text-sm">
                "Right Foundation at the Right Age — Choose a future-ready learning environment with strong academics and all-round development."
              </div>

              {/* Classroom / Campus Photo — from Sanity or placeholder */}
              {classroomPhoto ? (
                <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img
                    src={classroomPhoto}
                    alt="Classroom interior at Afsar Educational Academy"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-48 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
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
                {/* Founder Office Photo — from Sanity or placeholder */}
                {founderOfficePhoto ? (
                  <div className="w-full h-52 rounded-2xl overflow-hidden border border-white/10">
                    <img
                      src={founderOfficePhoto}
                      alt="Mr. Afsar Shareef – Founder & Director"
                      className="w-full h-full object-cover object-center"
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
                  <h3 className="font-serif text-2xl font-bold">Founder&apos;s Vision</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Mr. Afsar Shareef (M.Sc, B.Ed), with over 15 years of academic leadership, personally oversees classroom instruction and student progress to maintain strict quality standards.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-700 text-xs text-orange font-bold">
                  Government of Telangana Approved Institute
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
              Core Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
              The 4 Pillars of Afsar Academy
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pil, idx) => {
              const IconComp = pil.icon;
              return (
                <RevealOnScroll key={idx} delay={idx * 0.1}>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover:border-orange transition-all h-full space-y-4 card-hover">
                    <div className="w-12 h-12 rounded-xl bg-navy text-orange flex items-center justify-center font-bold">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-navy">{pil.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{pil.desc}</p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Milestones Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <RevealOnScroll className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3.5 py-1.5 rounded-full bg-navy text-white text-xs font-bold tracking-wide">
            Growth &amp; Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
            Our Key Milestones
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {timeline.map((item, tIdx) => (
            <RevealOnScroll key={tIdx} delay={tIdx * 0.08}>
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 relative card-hover">
                <div className="inline-block px-3 py-1 rounded-full bg-orange text-white text-xs font-bold">
                  {item.year}
                </div>
                <h3 className="font-serif text-lg font-bold text-navy">{item.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* 5. Board Accreditations Strip */}
      <section className="bg-navy py-12 text-white border-t border-navy-light/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-orange font-bold">
            Recognized &amp; Supported Board Examinations
          </span>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 text-sm sm:text-base font-bold text-slate-200">
            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">Telangana SSC Board</span>
            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">TS BIE Intermediate</span>
            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">TOSS Open Schooling</span>
            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">BOSSE National Board</span>
            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">NIOS Board</span>
            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">Osmania University Degree</span>
          </div>
        </div>
      </section>
    </div>
  );
}
