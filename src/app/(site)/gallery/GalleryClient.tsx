"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import MasonryGrid from "@/components/motion/MasonryGrid";
import { Image as ImageIcon, ZoomIn } from "lucide-react";

const CATEGORIES = ["All", "Classroom", "Events", "Results", "Campus"];

// Gradient fallbacks when no image is uploaded yet
const CATEGORY_GRADIENTS: Record<string, string> = {
  Classroom: "from-navy via-slate-800 to-navy-dark",
  Events:    "from-slate-800 via-navy-light to-navy",
  Results:   "from-orange/90 via-navy to-slate-900",
  Campus:    "from-navy-dark via-slate-900 to-navy",
};

interface GalleryPhoto {
  _id: string;
  title: string;
  caption?: string;
  category: string;
  imageUrl: string | null;
}

interface Props {
  photos: GalleryPhoto[];
}

export default function GalleryClient({ photos }: Props) {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? photos
      : photos.filter((p) => p.category === activeTab);

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Hero */}
      <section className="bg-navy text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="px-3.5 py-1 rounded-full bg-orange/20 text-orange text-xs font-bold uppercase tracking-wider border border-orange/30">
            Life at Academy
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-white">
            Campus &amp; Activity Gallery
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Glimpses of our vibrant learning atmosphere, classroom sessions, and student celebrations in Nampally, Hyderabad.
          </p>
        </div>
      </section>

      {/* 2. Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-slate-100 rounded-2xl border border-slate-200">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                id={`gallery-filter-${cat.toLowerCase()}`}
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
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium">No photos in this category yet.</p>
            <p className="text-xs mt-1">Upload photos in Sanity Studio → Gallery Page → Gallery Photos.</p>
          </div>
        ) : (
          <MasonryGrid>
            {filtered.map((item) => {
              const fallbackGradient =
                CATEGORY_GRADIENTS[item.category] ?? "from-navy via-slate-800 to-navy-dark";

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all card-hover group"
                >
                  {/* Photo or gradient placeholder */}
                  <div className="relative h-56 overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-br ${fallbackGradient} flex flex-col items-center justify-center gap-2 p-6 text-center`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-orange/20 text-orange flex items-center justify-center border border-orange/30">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] text-orange/80 font-semibold uppercase tracking-wider">
                          Upload photo in Sanity Studio
                        </span>
                      </div>
                    )}

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-black/50 text-orange text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10">
                        {item.category}
                      </span>
                    </div>

                    {/* Zoom icon on hover */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-4 h-4" />
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  <div className="p-5 space-y-1.5">
                    <h3 className="font-serif text-base font-bold text-navy leading-tight group-hover:text-orange transition-colors">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </MasonryGrid>
        )}
      </section>
    </div>
  );
}
