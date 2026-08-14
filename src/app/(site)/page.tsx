import Link from "next/link";
import {
  GraduationCap,
  ShieldCheck,
  Star,
  CheckCircle2,
  Users,
  Clock,
  BookOpen,
  Award,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Image as ImageIcon,
  Book,
  Pencil,
  Notebook,
  MapPin,
} from "lucide-react";
import siteConfigFallback from "@/data/site-config.json";
import coursesFallback from "@/data/courses.json";
import reviewsFallback from "@/data/reviews.json";
import statsFallback from "@/data/stats.json";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import RotatingText from "@/components/motion/RotatingText";
import HomeAchievementsSection from "@/components/HomeAchievementsSection";
import HeroImageCarousel from "@/components/motion/HeroImageCarousel";
import PillarsScrollStackMobile from "@/components/motion/PillarsScrollStackMobile";
import CountUp from "@/components/motion/CountUp";
import ScrollStack from "@/components/motion/ScrollStack";
import TestimonialsCarousel from "@/components/motion/TestimonialsCarousel";
import { getWhatsAppLink } from "@/lib/utils";
import { getSiteConfig, getCourses, getReviews, getStats, getHeroSlides, getTopperPosters, getGroupBatches } from "@/lib/queries";

const rotatingWords = ["SSC", "Inter", "Degree", "TOSS", "BOSSE", "NIOS"];

export default async function HomePage() {
  // Fetch from Sanity if configured, fall back to local JSON
  const isSanityConfigured = true;

  const [rawSiteConfig, rawCourses, rawReviews, rawStats, heroSlides, topperPosters, groupBatches] = isSanityConfigured
    ? await Promise.all([
        getSiteConfig().catch(() => null),
        getCourses().catch(() => null),
        getReviews().catch(() => null),
        getStats().catch(() => null),
        getHeroSlides().catch(() => null),
        getTopperPosters().catch(() => null),
        getGroupBatches().catch(() => null),
      ])
    : [null, null, null, null, null, null, null];

  // Merge Sanity config into fallback — but only overwrite fields that Sanity
  // actually has a non-empty value for (prevents empty Sanity fields from
  // wiping out the local JSON fallbacks like registrationNo).
  function mergeSanity(fallback: any, sanity: any): any {
    if (!sanity) return fallback;
    const result = { ...fallback };
    for (const key of Object.keys(sanity)) {
      const val = sanity[key];
      // keep sanity value only if it's a non-empty, non-null value
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
  const courses = (rawCourses && rawCourses.length > 0) ? rawCourses : coursesFallback;
  const reviews = (rawReviews && rawReviews.length > 0) ? rawReviews : reviewsFallback;
  const stats = (rawStats && rawStats.length > 0) ? rawStats : statsFallback;
  return (
    <div className="pb-16">
      {/* 1. HERO SECTION (12-Column Grid Redesign) */}
      <section className="relative overflow-hidden bg-[#FAFAFC] pt-8 pb-12 lg:pt-12 lg:pb-16 flex items-center border-b border-slate-200/60">
        {/* Subtle Radial Gradient Accents (Opacity < 8%) */}
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-[#F78B1F]/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-24 w-[550px] h-[550px] bg-[#1F2668]/[0.06] rounded-full blur-3xl pointer-events-none" />

        {/* 3 Heavily Blurred Circles */}
        <div className="absolute top-10 left-1/3 w-72 h-72 bg-[#F78B1F]/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#1F2668]/[0.05] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-white/60 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Academic Decorative Icons (Very low opacity) */}
        <div className="absolute top-16 left-12 opacity-10 text-[#1F2668] pointer-events-none hidden sm:block">
          <Book className="w-8 h-8" />
        </div>
        <div className="absolute bottom-20 left-1/4 opacity-10 text-[#F78B1F] pointer-events-none hidden sm:block">
          <GraduationCap className="w-10 h-10" />
        </div>
        <div className="absolute top-24 right-1/3 opacity-10 text-[#1F2668] pointer-events-none hidden lg:block">
          <Pencil className="w-7 h-7" />
        </div>
        <div className="absolute bottom-16 right-16 opacity-10 text-[#F78B1F] pointer-events-none hidden sm:block">
          <Notebook className="w-9 h-9" />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* LEFT SIDE CONTENT (55% -> 7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Top Badge */}
              <RevealOnScroll direction="down">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#F78B1F] text-[#1F2668] text-xs sm:text-sm font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
                  <ShieldCheck className="w-4 h-4 text-[#F78B1F]" />
                  <span>Govt. Registered ({siteConfig.registrationNo}) • Estd. 2014</span>
                </div>
              </RevealOnScroll>

              {/* Main Heading */}
              <RevealOnScroll direction="up">
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1F2668] leading-[1.1] tracking-tight">
                  Excellence in{" "}
                  <RotatingText words={rotatingWords} interval={2200} />
                  <br />
                  Education
                </h1>
              </RevealOnScroll>

              {/* Description */}
              <RevealOnScroll direction="up" delay={0.1}>
                <p className="text-[#4A5568] text-base sm:text-[18px] max-w-[620px] leading-relaxed">
                  Join one of Hyderabad's trusted educational academies offering quality education, experienced faculty, disciplined learning, and excellent academic results for students preparing for their future.
                </p>
              </RevealOnScroll>

              {/* Feature Chips */}
              <RevealOnScroll direction="up" delay={0.15}>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {[
                    "Morning & Evening Batches",
                    "Experienced Faculty",
                    "Govt Registered",
                    "10+ Years Excellence",
                    "Personal Mentorship",
                    "Affordable Fees",
                  ].map((chip, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-xs font-semibold text-[#1F2668] shadow-[0_8px_20px_rgba(0,0,0,0.05)] flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F78B1F]" />
                      <span>{chip}</span>
                    </span>
                  ))}
                </div>
              </RevealOnScroll>

              {/* Action Buttons */}
              <RevealOnScroll direction="up" delay={0.2}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
                  <a
                    href={getWhatsAppLink(siteConfig.whatsappUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-xl bg-[#F78B1F] text-white font-bold text-base shadow-[0_12px_30px_rgba(247,139,31,0.22)] hover:bg-[#e07912] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(247,139,31,0.32)] active:scale-95 transition-all text-center flex items-center justify-center gap-2 group"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <Link
                    href="/courses"
                    className="px-8 py-4 rounded-xl bg-white border-2 border-[#1F2668] text-[#1F2668] hover:bg-[#1F2668] hover:text-white font-bold text-base shadow-sm transition-all text-center flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>View Courses</span>
                  </Link>
                </div>
              </RevealOnScroll>

              {/* Trust Indicators */}
              <RevealOnScroll direction="up" delay={0.25}>
                <div className="pt-5 border-t border-slate-200/80 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#4A5568]">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span className="font-bold text-[#1F2668] ml-1">{siteConfig.googleRating}</span>
                    </div>
                    <span className="font-medium">({siteConfig.totalGoogleReviews}+ Google Reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold text-[#1F2668]">
                    <GraduationCap className="w-4 h-4 text-[#F78B1F]" />
                    <span>10+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold text-[#1F2668]">
                    <MapPin className="w-4 h-4 text-[#F78B1F]" />
                    <span>Nampally, Hyderabad</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold text-[#1F2668]">
                    <ShieldCheck className="w-4 h-4 text-[#F78B1F]" />
                    <span>Govt Registered</span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* RIGHT SIDE CONTENT (Hero Image Slideshow) */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center lg:justify-end">
              <RevealOnScroll direction="right" className="w-full">
                <HeroImageCarousel slides={heroSlides} />
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ACHIEVEMENTS & TOPPERS SECTION (Right after Hero) */}
      <HomeAchievementsSection toppers={topperPosters} groupBatches={groupBatches} />

      {/* 3. STATS BAR SECTION */}
      <section className="bg-navy py-12 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-navy-light/40">
            {stats.map((st: any, idx: number) => (
              <RevealOnScroll key={st._id || st.id} delay={idx * 0.1} className="p-4 space-y-2">
                <div className="font-serif text-4xl sm:text-5xl font-extrabold text-orange tracking-tight">
                  <CountUp
                    end={st.value}
                    suffix={st.suffix}
                    isDecimal={st.isDecimal}
                  />
                </div>
                <h4 className="font-semibold text-white text-base sm:text-lg">
                  {st.label}
                </h4>
                <p className="text-xs text-slate-300 max-w-[200px] mx-auto">
                  {st.description}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL ABOUT PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Feature Card */}
          <div className="lg:col-span-5">
            <RevealOnScroll direction="left">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden card-hover">

                {/* Orange accent top bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-orange via-orange/70 to-transparent" />

                {/* Founder Portrait Photo */}
                {siteConfig.directorPhoto ? (
                  <div className="w-full h-64 overflow-hidden">
                    <img
                      src={siteConfig.directorPhoto}
                      alt="Mr. Afsar Shareef – Founder & Director, Afsar Academy"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 bg-navy/90 flex flex-col items-center justify-center p-4 text-center">
                    <div className="p-3 rounded-full bg-orange/10 text-orange mb-2 border border-orange/20">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Mr. Afsar Shareef (Director Photo)
                    </span>
                    <span className="text-[11px] text-orange/90 mt-1 font-semibold">
                      Upload in Sanity Studio → ⚙️ Global Site Settings
                    </span>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6 sm:p-8 space-y-5 bg-white">

                  {/* Label */}
                  <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-orange">
                    Founder&apos;s Message
                  </span>

                  {/* Heading */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy leading-snug -mt-1">
                    Building the Next Generation
                  </h3>

                  {/* Quote */}
                  <p className="text-slate-600 text-sm leading-relaxed italic border-l-4 border-orange pl-4 bg-orange/5 py-2 pr-3 rounded-r-xl">
                    &ldquo;Education is not just about passing exams, but about building discipline, character, and lifelong confidence. At Afsar Academy, we ensure every student receives dedicated guidance to fulfill their true potential.&rdquo;
                  </p>

                  {/* Founder Signature Strip */}
                  <div className="pt-4 mt-2 border-t-2 border-slate-100">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      {/* Cursive name */}
                      <div>
                        <p className="font-cursive text-[28px] sm:text-[32px] leading-tight font-bold text-navy">
                          Afsar Shareef
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="block h-0.5 w-6 rounded-full bg-orange" />
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                            Mr. Afsar Shareef
                          </span>
                        </div>
                      </div>
                      {/* Title badge */}
                      <span className="shrink-0 px-4 py-2 rounded-full bg-navy text-orange text-[11px] font-bold uppercase tracking-wider shadow-md">
                        Founder &amp; Director
                      </span>
                    </div>
                  </div>

                </div>{/* end card body */}

              </div>
            </RevealOnScroll>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <RevealOnScroll direction="right">
              <span className="px-3.5 py-1.5 rounded-full bg-orange-light text-orange text-xs font-bold tracking-wide">
                Why Afsar Academy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy leading-tight">
                A Decade of Proven Academic Leadership in Nampally
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Founded in 2014 and registered under the Government of Telangana (Regd. No. {siteConfig.registrationNo}), Afsar Educational Academy has evolved into one of Hyderabad's most trusted coaching centers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  { title: "Quality Education", desc: "Structured syllabus with conceptual clarity & notes." },
                  { title: "Strict Discipline", desc: "Regular attendance tracking and parent feedback." },
                  { title: "Dedicated Faculty", desc: "Experienced subject specialists with 10+ years exp." },
                  { title: "Proven Success", desc: "Consistent top grades in Board & Open Schooling exams." },
                ].map((pillar, pIdx) => (
                  <div key={pIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-2 text-navy font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-orange" />
                      <span>{pillar.title}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-normal pl-6">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-orange font-bold hover:underline text-sm"
                >
                  <span>Read Our Full Story & Milestones</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 4. COURSES PREVIEW (Scroll Stack) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <RevealOnScroll className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3.5 py-1.5 rounded-full bg-navy text-white text-xs font-bold tracking-wide">
            Our Academic Programs
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
            Comprehensive Courses for Every Educational Goal
          </h2>
          <p className="text-slate-600 text-sm">
            From regular school tuitions to recognized open schooling boards and degree coaching.
          </p>
        </RevealOnScroll>

        <ScrollStack courses={courses.slice(0, 5)} />

        <div className="text-center pt-6">
          <Link
            href="/courses"
            className="px-8 py-3.5 rounded-full bg-navy hover:bg-navy-light text-white font-bold text-sm inline-flex items-center gap-2 shadow-md"
          >
            <span>Explore All {courses.length} Course Categories</span>
            <ArrowRight className="w-4 h-4 text-orange" />
          </Link>
        </div>
      </section>

      {/* 5. WHY CHOOSE US (Bento Grid) */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <RevealOnScroll className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3.5 py-1.5 rounded-full bg-orange-light text-orange text-xs font-bold tracking-wide">
              Academy Advantages
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
              5 Pillars of Future-Ready Learning
            </h2>
          </RevealOnScroll>

          {/* Mobile Only: Sticky ScrollStack */}
          <PillarsScrollStackMobile />

          {/* Desktop & Tablet Only: Bento Grid (hidden md:grid) */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1 (Span 2 Cols) */}
            <RevealOnScroll className="md:col-span-2">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between card-hover">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange/10 text-orange flex items-center justify-center font-bold">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-orange uppercase tracking-wider">
                    Open Schooling Specialization
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-navy">
                    TOSS, BOSSE & NIOS Direct Guidance
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Year-saving options for students needing flexible board exams. Full assistance for enrollment, Tutor Marked Assignments (TMA), practicals, and preparation.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-6">
                  {["Telangana Open School (TOSS)", "BOSSE Sikkim", "NIOS Govt. of India"].map((b, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                      ✓ {b}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Bento Card 2 */}
            <RevealOnScroll delay={0.1}>
              <div className="bg-navy text-white rounded-3xl p-8 border border-navy-light/40 shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between card-hover">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange text-white flex items-center justify-center font-bold">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Qualified Subject Faculties
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    M.Sc, M.Com, and M.A qualified educators with over a decade of dedicated teaching experience in Hyderabad.
                  </p>
                </div>
                <Link href="/faculty" className="text-xs text-orange font-bold hover:underline pt-4 flex items-center gap-1">
                  <span>Meet Our Faculty</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </RevealOnScroll>

            {/* Bento Card 3 */}
            <RevealOnScroll delay={0.2}>
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between card-hover">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-navy/10 text-navy flex items-center justify-center font-bold">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy">
                    Flexible Batch Timings
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Morning batches from {siteConfig.hours?.morningBatches || "9:00 AM onwards"} & Evening batches {siteConfig.hours?.eveningBatches || "5:30 PM to 10:00 PM"} for working & regular students.
                  </p>
                </div>
                <span className="text-xs text-slate-500 font-semibold pt-4">Mon - Sat Batches</span>
              </div>
            </RevealOnScroll>

            {/* Bento Card 4 */}
            <RevealOnScroll delay={0.3}>
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between card-hover">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-light text-orange flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy">
                    Safe & Comfortable Environment
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Clean, well-ventilated classrooms on 1st & 2nd floors above 7 Star Textiles in Aghapura, Nampally. Disciplined atmosphere for student focus.
                  </p>
                </div>
                <div className="pt-4 text-xs font-semibold text-orange">
                  Aghapura, Nampally Branch
                </div>
              </div>
            </RevealOnScroll>

            {/* Bento Card 5 */}
            <RevealOnScroll delay={0.4}>
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between card-hover">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-navy/10 text-navy flex items-center justify-center font-bold">
                    <Award className="w-6 h-6 text-navy" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy">
                    Daily Mock Tests & Exam Drills
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Chapter-wise model assessments, previous 10-year solved papers, and individual doubt-clearing sessions to maximize board exam scores.
                  </p>
                </div>
                <div className="pt-4 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Board Exam Guidance</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <RevealOnScroll className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3.5 py-1.5 rounded-full bg-navy text-white text-xs font-bold tracking-wide">
            Student & Parent Reviews
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
            Trusted by 500+ Families in Hyderabad
          </h2>
        </RevealOnScroll>

        <TestimonialsCarousel reviews={reviews} />
      </section>

      {/* 7. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-orange text-white rounded-3xl p-6 sm:p-14 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left w-full">
            <span className="px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
              Admissions 2026-27 Open
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Ready to Give Your Child the Right Foundation?
            </h2>
            <p className="text-orange-light text-sm sm:text-base">
              Enroll today in SSC, Intermediate, TOSS, BOSSE, or Degree coaching at Afsar Educational Academy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
            <a
              href={getWhatsAppLink(siteConfig.whatsappUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white text-navy hover:bg-slate-100 font-bold text-sm sm:text-base shadow-lg transition-transform hover:scale-105 text-center"
            >
              Enroll Now / WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.phone?.replace(/\s+/g, "") ?? ""}`}
              className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl border-2 border-white text-white hover:bg-white/10 font-bold text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Call Us Now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
