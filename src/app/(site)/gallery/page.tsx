"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import MasonryGrid from "@/components/motion/MasonryGrid";
import { Image as ImageIcon, Sparkles, ZoomIn } from "lucide-react";

const galleryCategories = ["All", "Classroom", "Events", "Results", "Campus"];

const galleryItems = [
  { id: 1, title: "Interactive Mathematics Classroom", category: "Classroom", caption: "Students engaging in step-by-step problem solving with senior faculty.", height: "h-64", bgGradient: "from-navy via-slate-800 to-navy-dark" },
  { id: 2, title: "Board Exam High Achievers Felicitation", category: "Results", caption: "Celebrating 9.8+ GPA scorers in SSC & Intermediate examinations.", height: "h-80", bgGradient: "from-orange/90 via-navy to-slate-900" },
  { id: 3, title: "Annual Student Orientation Day", category: "Events", caption: "Welcoming 2026-27 batch students and introducing exam strategies.", height: "h-56", bgGradient: "from-slate-800 via-navy-light to-navy" },
  { id: 4, title: "Spacious Learning Classrooms", category: "Campus", caption: "Well-lit and ventilated setup on 1st & 2nd floors in Aghapura.", height: "h-72", bgGradient: "from-navy-dark via-slate-900 to-navy" },
  { id: 5, title: "TOSS & BOSSE Guidance Workshop", category: "Events", caption: "Special orientation for open schooling students and year-saving paths.", height: "h-60", bgGradient: "from-slate-900 via-navy to-orange/30" },
  { id: 6, title: "Science & Biology Lab Demonstration", category: "Classroom", caption: "Practical concepts explained clearly for BiPC and Science streams.", height: "h-76", bgGradient: "from-navy via-slate-800 to-navy-dark" },
  { id: 7, title: "Faculty Doubt Clearing Session", category: "Classroom", caption: "One-on-one academic support for students before board examinations.", height: "h-64", bgGradient: "from-slate-800 via-navy to-slate-900" },
  { id: 8, title: "Degree & Professional Career Guidance", category: "Events", caption: "Counseling session for undergraduate B.Com, B.A, B.Sc & BBA students.", height: "h-56", bgGradient: "from-navy-dark via-orange/20 to-slate-900" },
  { id: 9, title: "State Board Top Rankers Award", category: "Results", caption: "Distributing merit certificates and gold medals to exemplary performers.", height: "h-72", bgGradient: "from-orange/80 via-navy to-slate-900" },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredItems = activeTab === "All"
    ? galleryItems
    : galleryItems.filter((g) => g.category === activeTab);

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Hero */}
      <section className="bg-navy text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="px-3.5 py-1 rounded-full bg-orange/20 text-orange text-xs font-bold uppercase tracking-wider border border-orange/30">
            Life at Academy
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-white">
            Campus & Activity Masonry Gallery
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Glimpses of our vibrant learning atmosphere, classroom sessions, and student celebrations in Nampally, Hyderabad.
          </p>
        </div>
      </section>

      {/* 2. Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-slate-100 rounded-2xl border border-slate-200">
          {galleryCategories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
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

      {/* 3. Masonry Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MasonryGrid>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all card-hover group"
            >
              {/* Dynamic Staggered Visual Canvas */}
              <div className={`${item.height} text-white flex flex-col justify-between p-6 relative overflow-hidden bg-gradient-to-br ${item.bgGradient}`}>
                <div className="flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full bg-black/40 text-orange text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                <div className="relative z-10 space-y-1">
                  <div className="w-10 h-10 rounded-xl bg-orange/20 text-orange flex items-center justify-center border border-orange/30 mb-2">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white leading-tight group-hover:text-orange transition-colors">
                    {item.title}
                  </h4>
                </div>

                {/* Subtle Ambient Hover Overlay */}
                <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-serif text-base font-bold text-navy">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </MasonryGrid>
      </section>
    </div>
  );
}
