"use client";

import { useState } from "react";
import toppersData from "@/data/toppers.json";
import groupBatchesData from "@/data/group-batches.json";
import { Sparkles, Users, Award, Image as ImageIcon, X, ZoomIn, CheckCircle2 } from "lucide-react";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function HomeAchievementsSection() {
  const [activePoster, setActivePoster] = useState<{
    title: string;
    image: string;
    subtitle?: string;
  } | null>(null);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 relative overflow-hidden border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Title Header (Matching Image 1 Mockup) */}
        <RevealOnScroll direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
              Our Achievements & Gallery
            </h2>
            <p className="text-slate-500 text-base sm:text-lg font-medium leading-relaxed max-w-xl mx-auto">
              A glimpse into our academic environment, student achievements, and passed out student batches.
            </p>
          </div>
        </RevealOnScroll>

        {/* ========================================================================= */}
        {/* LOOP 1: INDIVIDUAL CLASS TOPPERS (Single Student Posters & Cards) */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          {/* Infinite Marquee Track 1 (Single Toppers) */}
          <div className="relative w-full overflow-hidden rounded-3xl py-4 bg-slate-100/60 border border-slate-200/80 shadow-inner">
            {/* Edge Shadow Overlays */}
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-slate-100 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-slate-100 to-transparent z-10 pointer-events-none" />

            <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max">
              {[...toppersData, ...toppersData].map((item, idx) => (
                <div
                  key={`topper-loop-${item.id}-${idx}`}
                  onClick={() =>
                    item.image &&
                    setActivePoster({
                      title: item.title,
                      image: item.image,
                      subtitle: item.subtitle,
                    })
                  }
                  className={`w-64 sm:w-72 aspect-[3/4.2] shrink-0 rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-orange/60 transition-all duration-300 group cursor-pointer relative flex flex-col justify-between p-1`}
                >
                  {item.image ? (
                    /* Real Single Student Poster Image */
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="text-white space-y-1">
                          <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                            <ZoomIn className="w-3.5 h-3.5" /> Click to Expand
                          </span>
                          <p className="text-xs font-semibold line-clamp-2">{item.title}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* White Vertical Card Template Placeholder (Matching Image 1 Mockup) */
                    <div className="w-full h-full rounded-xl border-2 border-dashed border-slate-200 bg-white flex flex-col items-center justify-between p-5 text-center group-hover:border-orange/40 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-orange-light text-orange flex items-center justify-center mt-4">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-orange bg-orange/10 px-2.5 py-0.5 rounded-full">
                          Single Topper Poster
                        </span>
                        <h4 className="font-serif font-bold text-navy text-sm leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          {item.subtitle}
                        </p>
                      </div>
                      <div className="w-full py-2 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>Topper Photo Placeholder</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LOOP 2: GROUP & MULTI-STUDENT POSTERS (Grids, Batches & Multi-Toppers) */}
        {/* ========================================================================= */}
        <div className="space-y-6 pt-4">
          {/* Infinite Marquee Track 2 (Reverse Direction Loop for Group Batches & Multi-Student Posters) */}
          <div className="relative w-full overflow-hidden rounded-3xl py-4 bg-slate-100/60 border border-slate-200/80 shadow-inner">
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-slate-100 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-slate-100 to-transparent z-10 pointer-events-none" />

            <div className="flex gap-6 animate-marquee-reverse hover:[animation-play-state:paused] w-max">
              {[...groupBatchesData, ...groupBatchesData].map((item, idx) => (
                <div
                  key={`group-loop-${item.id}-${idx}`}
                  onClick={() =>
                    item.image &&
                    setActivePoster({
                      title: item.title,
                      image: item.image,
                      subtitle: item.subtitle,
                    })
                  }
                  className={`w-72 sm:w-80 aspect-[3/4.2] shrink-0 rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-orange/60 transition-all duration-300 group cursor-pointer relative flex flex-col justify-between p-1`}
                >
                  {item.image ? (
                    /* Real Multi-Student or Group Poster Image */
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="text-white space-y-1">
                          <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                            <ZoomIn className="w-3.5 h-3.5" /> Click to Expand Poster
                          </span>
                          <p className="text-xs font-semibold line-clamp-2">{item.title}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* White Vertical Card Template Placeholder for Group Batches */
                    <div className="w-full h-full rounded-xl border-2 border-dashed border-slate-200 bg-white flex flex-col items-center justify-between p-5 text-center group-hover:border-orange/40 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-navy/10 text-navy flex items-center justify-center mt-4">
                        <Users className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-navy bg-navy/5 px-2.5 py-0.5 rounded-full">
                          Group / Multi-Student Poster
                        </span>
                        <h4 className="font-serif font-bold text-navy text-sm leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          {item.subtitle}
                        </p>
                      </div>
                      <div className="w-full py-2 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>Group Photo Placeholder</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL-SCREEN LIGHTBOX PREVIEW MODAL */}
      {/* ========================================================================= */}
      {activePoster && (
        <div className="fixed inset-0 z-[120] bg-slate-950/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col">
            {/* Modal Top Bar */}
            <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-white">
                  {activePoster.title}
                </h3>
                {activePoster.subtitle && (
                  <p className="text-xs text-slate-400">{activePoster.subtitle}</p>
                )}
              </div>
              <button
                onClick={() => setActivePoster(null)}
                className="p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-orange hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Poster High-Res Image View */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-slate-950">
              <img
                src={activePoster.image}
                alt={activePoster.title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-lg border border-slate-800"
              />
            </div>

            {/* Modal Bottom Strip */}
            <div className="p-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Afsar Educational Academy Result Poster</span>
              </span>
              <button
                onClick={() => setActivePoster(null)}
                className="px-4 py-1.5 rounded-full bg-slate-800 text-white hover:bg-orange transition-colors font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
