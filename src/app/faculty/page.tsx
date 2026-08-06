import facultyFallback from "@/data/faculty.json";
import siteConfigFallback from "@/data/site-config.json";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import MasonryGrid from "@/components/motion/MasonryGrid";
import { GraduationCap, Award, Mail, PhoneCall, Image as ImageIcon } from "lucide-react";
import { getFaculty, getSiteConfig } from "@/lib/queries";
import { urlFor } from "@/lib/image";

export const metadata = {
  title: "Faculty & Mentors | Afsar Educational Academy Hyderabad",
  description: "Meet the experienced, qualified faculty at Afsar Educational Academy led by Founder & Director Mr. Afsar Shareef.",
};

export default async function FacultyPage() {
  const isSanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const [rawFaculty, rawSiteConfig] = isSanityConfigured
    ? await Promise.all([
        getFaculty().catch(() => null),
        getSiteConfig().catch(() => null),
      ])
    : [null, null];

  const facultyData = (rawFaculty && rawFaculty.length > 0) ? rawFaculty : facultyFallback;
  const siteConfig = rawSiteConfig ?? siteConfigFallback;

  function getFacultyPhotoUrl(fac: any): string | null {
    if (!fac.photo) return null;
    if (typeof fac.photo === "string") return fac.photo || null;
    try { return urlFor(fac.photo).width(400).height(400).fit("crop").url(); } catch { return null; }
  }
  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero */}
      <section className="bg-navy text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="px-3.5 py-1 rounded-full bg-orange/20 text-orange text-xs font-bold uppercase tracking-wider border border-orange/30">
            Expert Educators
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-white">
            Our Qualified & Dedicated Faculty
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Experienced mentors committed to conceptual understanding, exam preparation, and individual student success.
          </p>
        </div>
      </section>

      {/* 2. Faculty Masonry Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MasonryGrid>
          {(facultyData as any[]).map((fac) => (
            <div
              key={fac.id}
              className={`rounded-3xl p-8 border shadow-md hover:shadow-xl transition-all card-hover space-y-4 ${
                fac.isFounder
                  ? "bg-navy text-white border-navy-light/40"
                  : "bg-white text-slate-800 border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl font-serif ${
                  fac.isFounder ? "bg-orange text-white" : "bg-navy text-orange"
                }`}>
                  {fac.name.charAt(4) || "A"}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  fac.isFounder
                    ? "bg-orange/20 text-orange border border-orange/30"
                    : "bg-slate-100 text-slate-700"
                }`}>
                  {fac.experience}
                </span>
              </div>

              {/* Faculty Profile Photo */}
              {(() => {
                const photoUrl = getFacultyPhotoUrl(fac);
                return photoUrl ? (
                  <div className={`w-full h-44 rounded-2xl overflow-hidden`}>
                    <img
                      src={photoUrl}
                      alt={`${fac.name} photo`}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
                    />
                  </div>
                ) : (
                  <div className={`w-full h-44 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-3 text-center ${
                    fac.isFounder ? "border-orange/40 bg-white/5 text-white" : "border-slate-300 bg-slate-50 text-slate-700"
                  }`}>
                    <ImageIcon className="w-6 h-6 text-orange mb-1" />
                    <span className="text-xs font-bold uppercase tracking-wider">{fac.name} Headshot</span>
                    <span className={`text-[11px] font-medium mt-0.5 ${fac.isFounder ? "text-orange/90" : "text-slate-500"}`}>
                      Recommended Dimensions: 400 &times; 400 px (1:1 Ratio)
                    </span>
                  </div>
                );
              })()}

              <div>
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  fac.isFounder ? "text-orange" : "text-slate-500"
                }`}>
                  {fac.role}
                </span>
                <h3 className="font-serif text-2xl font-bold mt-1">
                  {fac.name}
                </h3>
                <p className={`text-xs font-semibold mt-0.5 ${
                  fac.isFounder ? "text-slate-300" : "text-navy"
                }`}>
                  {fac.qualification}
                </p>
              </div>

              <div className={`p-3 rounded-xl text-xs font-semibold ${
                fac.isFounder ? "bg-white/10 text-orange" : "bg-orange-light text-orange"
              }`}>
                Subject: {fac.subject}
              </div>

              <p className={`text-xs leading-relaxed ${
                fac.isFounder ? "text-slate-300" : "text-slate-600"
              }`}>
                {fac.bio}
              </p>
            </div>
          ))}
        </MasonryGrid>
      </section>

      {/* 3. We Are Hiring CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="bg-slate-100 rounded-3xl p-8 sm:p-12 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-orange-light text-orange text-xs font-bold tracking-wide">
              Join Our Faculty
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
              Are You a Passionate Educator?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              We are always looking for qualified subject experts for SSC, Intermediate (MPC, BiPC, CEC), and Open Schooling subjects.
            </p>
          </div>

          <a
            href={`mailto:${siteConfig.email}?subject=Faculty Application - Afsar Academy`}
            className="px-6 py-3.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md shrink-0"
          >
            <Mail className="w-4 h-4 text-orange" />
            <span>Send Resume via Email</span>
          </a>
        </RevealOnScroll>
      </section>
    </div>
  );
}
