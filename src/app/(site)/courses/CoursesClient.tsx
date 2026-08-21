"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import { BookOpen, CheckCircle2, Award, Clock, MessageCircle, PhoneCall } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";

const CATEGORIES = ["All", "SSC", "Intermediate", "Open Schooling", "Degree"];

interface Course {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  badge?: string;
  description?: string;
  timing?: string;
  features?: string[];
  streams?: string[];
}

interface Props {
  courses: Course[];
  siteConfig: any;
  coursesPageData?: any;
}

export default function CoursesClient({ courses, siteConfig, coursesPageData }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  const heroBadge = coursesPageData?.heroBadge || "Admissions Open 2026-27";
  const heroTitle = coursesPageData?.heroTitle || "Academic Courses & Programs";
  const heroSubtitle =
    coursesPageData?.heroSubtitle ||
    "Explore our comprehensive curriculum tailored for Board Exam Excellence, Open Schooling success, and Degree level coaching.";
  const ctaHeading =
    coursesPageData?.ctaHeading || "Need Guidance on Selecting the Right Course or Board?";
  const ctaSubtitle =
    coursesPageData?.ctaSubtitle ||
    "Speak directly with Director Mr. Afsar Shareef to get personalised academic counseling for SSC, Inter, TOSS, BOSSE, or NIOS.";

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Page Hero */}
      <section className="bg-navy text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="px-3.5 py-1 rounded-full bg-orange/20 text-orange text-xs font-bold uppercase tracking-wider border border-orange/30">
            {heroBadge}
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            {heroTitle}
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">{heroSubtitle}</p>
        </div>
      </section>

      {/* 2. Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 bg-slate-100 rounded-2xl border border-slate-200">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                id={`course-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? "bg-orange text-white shadow-md shadow-orange/20 scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Course Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, idx) => {
            const waText = encodeURIComponent(
              `Hello Sir, I am inquiring about admission details for *${course.title}* at Afsar Educational Academy.`
            );
            const waUrl = `https://wa.me/919052407878?text=${waText}`;

            return (
              <RevealOnScroll key={course._id || course.id || idx} delay={idx * 0.05}>
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between card-hover">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-navy/10 text-navy text-[11px] font-bold uppercase tracking-wider">
                        {course.category}
                      </span>
                      {course.badge && (
                        <span className="px-3 py-1 rounded-full bg-orange-light text-orange text-[11px] font-bold">
                          {course.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-bold text-navy">{course.title}</h3>

                    {course.description && (
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {course.description}
                      </p>
                    )}

                    {course.streams && course.streams.length > 0 && (
                      <div className="pt-2 space-y-1.5">
                        <span className="block text-xs font-bold text-navy">Available Streams:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {course.streams.map((st, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                            >
                              {st}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {course.features && course.features.length > 0 && (
                      <div className="pt-2 space-y-2">
                        <span className="block text-xs font-bold text-navy">
                          Key Course Highlights:
                        </span>
                        {course.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    {course.timing && (
                      <div className="text-xs text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-orange" />
                        <span>{course.timing}</span>
                      </div>
                    )}

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-orange hover:bg-orange-hover text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Inquire Course</span>
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      {/* 4. Bottom Counseling Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-navy text-white rounded-3xl p-8 sm:p-10 border border-navy-light/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">{ctaHeading}</h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">{ctaSubtitle}</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href={getWhatsAppLink(siteConfig.whatsappUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-orange hover:bg-orange-hover text-white font-bold text-sm shadow-md transition-transform hover:scale-105"
            >
              WhatsApp Counseling
            </a>
            <a
              href={`tel:${(siteConfig.phone || "").replace(/\s+/g, "")}`}
              className="px-5 py-3.5 rounded-xl border border-white/20 hover:bg-white/10 text-white font-bold text-sm flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Director</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
