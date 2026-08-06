"use client";

import { useState } from "react";
import courses from "@/data/courses.json";
import siteConfig from "@/data/site-config.json";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import { BookOpen, CheckCircle2, Award, Clock, ArrowRight, MessageCircle, Image as ImageIcon } from "lucide-react";

const categories = ["All", "SSC", "Intermediate", "Open Schooling", "Degree"];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses = activeCategory === "All"
    ? courses
    : courses.filter((c) => c.category === activeCategory);

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Page Hero */}
      <section className="bg-navy text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="px-3.5 py-1 rounded-full bg-orange/20 text-orange text-xs font-bold uppercase tracking-wider border border-orange/30">
            Admissions Open 2026-27
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-white">
            Academic Courses & Programs
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Explore our comprehensive curriculum tailored for Board Exam Excellence, Open Schooling success, and Degree level coaching.
          </p>
        </div>
      </section>

      {/* 2. Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 bg-slate-100 rounded-2xl border border-slate-200">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? "bg-orange text-white shadow-md scale-105"
                    : "text-slate-600 hover:text-navy hover:bg-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Course Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCourses.map((course, idx) => (
            <RevealOnScroll key={course.id} delay={idx * 0.08}>
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between card-hover border-l-4 border-l-orange">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-navy text-white text-xs font-bold">
                      {course.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-orange-light text-orange text-xs font-bold border border-orange/20 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      {course.badge}
                    </span>
                  </div>

                  {/* Course Banner Thumbnail Placeholder */}
                  <div className="w-full h-40 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center p-3 text-center my-2">
                    <ImageIcon className="w-6 h-6 text-orange mb-1" />
                    <span className="text-xs font-bold text-navy uppercase tracking-wider">
                      {course.title} Cover Photo
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                      Recommended Dimensions: 800 &times; 400 px (2:1 Ratio)
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-navy">
                    {course.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {course.description}
                  </p>

                  {"streams" in course && (
                    <div className="pt-2">
                      <span className="block text-xs font-bold text-navy mb-1">
                        Available Streams:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {(course as any).streams.map((st: string, sIdx: number) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                          >
                            {st}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 space-y-2">
                    <span className="block text-xs font-bold text-navy">Key Course Highlights:</span>
                    {course.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-orange" />
                    <span>{course.timing}</span>
                  </div>

                  <a
                    href={siteConfig.whatsappUrl}
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
          ))}
        </div>
      </section>
    </div>
  );
}
