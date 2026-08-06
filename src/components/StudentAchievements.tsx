"use client";

import { useState } from "react";
import achievementsData from "@/data/achievements.json";
import { Award, Trophy, Sparkles, Star, Quote, CheckCircle2 } from "lucide-react";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function StudentAchievements() {
  const [filter, setFilter] = useState("all");

  const categories = [
    { key: "all", label: "All Toppers" },
    { key: "SSC", label: "SSC (10th Board)" },
    { key: "Intermediate", label: "Intermediate" },
    { key: "TOSS", label: "TOSS & Open Schooling" },
  ];

  const filteredAchievements = achievementsData.filter((item) => {
    if (filter === "all") return true;
    if (filter === "SSC") return item.board.includes("SSC");
    if (filter === "Intermediate") return item.board.includes("Intermediate");
    if (filter === "TOSS") return item.board.includes("TOSS") || item.board.includes("BOSSE") || item.board.includes("NIOS");
    return true;
  });

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Radial Background Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-navy-light/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <RevealOnScroll direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/20 border border-orange/30 text-orange text-xs sm:text-sm font-bold">
              <Trophy className="w-4 h-4 text-orange" />
              <span>Academic Hall of Fame</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Our Star Performers & Board Toppers
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Celebrating the exceptional academic results of Afsar Educational Academy students across SSC, Intermediate, TOSS, BOSSE, and Degree exams.
            </p>
          </div>
        </RevealOnScroll>

        {/* Board Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                filter === cat.key
                  ? "bg-orange text-white shadow-lg shadow-orange/30 scale-105"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAchievements.map((student, idx) => (
            <RevealOnScroll key={student.id} direction="up" delay={idx * 0.1}>
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-orange/50 hover:shadow-2xl hover:shadow-orange/10 flex flex-col justify-between group">
                <div>
                  {/* Top Badge & Year */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange/20 text-orange text-xs font-extrabold border border-orange/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{student.badge}</span>
                    </span>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-700">
                      Batch {student.year}
                    </span>
                  </div>

                  {/* Student Photo & Details */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-orange/40 shadow-md group-hover:border-orange transition-colors">
                      <img
                        src={student.image}
                        alt={student.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to avatar if image missing
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                      <div className="w-full h-full bg-slate-700 flex items-center justify-center text-orange font-extrabold text-xl">
                        {student.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-white group-hover:text-orange transition-colors">
                        {student.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">
                        {student.board}
                      </p>
                      <div className="flex items-center gap-1 text-amber-400 font-extrabold text-sm mt-1">
                        <Award className="w-4 h-4 text-orange" />
                        <span>{student.score}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed relative">
                    <Quote className="w-4 h-4 text-orange/30 absolute top-2 right-2" />
                    <p className="italic">"{student.quote}"</p>
                  </div>
                </div>

                {/* Bottom Verification Badge */}
                <div className="mt-5 pt-3 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Board Result</span>
                  </span>
                  <span className="text-slate-500 font-medium">Afsar Academy Alumni</span>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
