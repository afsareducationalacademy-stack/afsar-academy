"use client";

import { useState, useEffect } from "react";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import MasonryGrid from "@/components/motion/MasonryGrid";
import { Image as ImageIcon, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = ["All", "Classroom", "Events", "Results", "Campus"];

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
  galleryPageData?: any;
}

export default function GalleryClient({ photos, galleryPageData }: Props) {
  const [activeTab, setActiveTab] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const heroBadge = galleryPageData?.heroBadge || "Life at Academy";
  const heroTitle = galleryPageData?.heroTitle || "Campus & Activity Gallery";
  const heroSubtitle =
    galleryPageData?.heroSubtitle ||
    "Glimpses of our vibrant learning atmosphere, toppers achievements, and student celebrations.";

  const filtered =
    activeTab === "All"
      ? photos
      : photos.filter((p) => p.category === activeTab);

  // Close lightbox on Escape and support arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filtered]);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filtered.length - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < filtered.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Hero */}
      <section className="bg-navy text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="px-3.5 py-1 rounded-full bg-orange/20 text-orange text-xs font-bold uppercase tracking-wider border border-orange/30">
            {heroBadge}
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            {heroTitle}
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            {heroSubtitle}
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
                onClick={() => {
                  setActiveTab(cat);
                  setLightboxIndex(null);
                }}
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
            {filtered.map((item, idx) => {
              const fallbackGradient =
                CATEGORY_GRADIENTS[item.category] ?? "from-navy via-slate-800 to-navy-dark";

              const isResults = item.category === "Results";
              const imageHeightClass = isResults ? "aspect-[3/4] h-auto" : "h-56";
              const imageFitClass = isResults ? "object-contain bg-slate-950" : "object-cover";

              return (
                <div
                  key={item._id}
                  onClick={() => setLightboxIndex(idx)}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all card-hover group cursor-pointer"
                >
                  {/* Photo or gradient placeholder */}
                  <div className={`relative ${imageHeightClass} overflow-hidden w-full`}>
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className={`w-full h-full ${imageFitClass} group-hover:scale-105 transition-transform duration-500`}
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-br ${fallbackGradient} flex flex-col items-center justify-center gap-2 p-6 text-center`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-orange/20 text-orange flex items-center justify-center border border-orange/30">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] text-orange/80 font-semibold uppercase tracking-wider">
                          Upload photo in Sanity
                        </span>
                      </div>
                    )}

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 rounded-full bg-black/60 text-orange text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10">
                        {item.category}
                      </span>
                    </div>

                    {/* Zoom icon on hover */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <ZoomIn className="w-4 h-4" />
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Title and caption block */}
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

      {/* 4. Lightbox Modal */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md">
          {/* Controls Header */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-50">
            <span className="px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md">
              {lightboxIndex + 1} / {filtered.length} — {filtered[lightboxIndex].category}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-orange hover:text-white transition-all text-white backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-orange text-white transition-all backdrop-blur-md z-40 hidden sm:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-orange text-white transition-all backdrop-blur-md z-40 hidden sm:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Slide View */}
          <div className="max-w-4xl w-full flex flex-col items-center justify-center space-y-4">
            <div className="relative max-h-[75vh] w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl">
              {filtered[lightboxIndex].imageUrl ? (
                <img
                  src={filtered[lightboxIndex].imageUrl!}
                  alt={filtered[lightboxIndex].title}
                  className="max-h-[75vh] max-w-full object-contain rounded-xl"
                />
              ) : (
                <div className="w-[500px] h-[350px] bg-slate-900 flex flex-col items-center justify-center text-slate-500 rounded-xl">
                  <ImageIcon className="w-12 h-12 mb-2" />
                  <span>No image content</span>
                </div>
              )}
            </div>

            {/* Slide Metadata */}
            <div className="text-center text-white max-w-2xl px-4 space-y-1">
              <h2 className="font-serif text-lg sm:text-xl font-bold tracking-wide">
                {filtered[lightboxIndex].title}
              </h2>
              {filtered[lightboxIndex].caption && (
                <p className="text-slate-300 text-xs sm:text-sm">
                  {filtered[lightboxIndex].caption}
                </p>
              )}
            </div>
          </div>

          {/* Mobile swipe/click helper buttons */}
          <div className="absolute bottom-6 flex gap-4 sm:hidden">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-full bg-white/10 text-white backdrop-blur-md active:bg-orange"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3.5 rounded-full bg-white/10 text-white backdrop-blur-md active:bg-orange"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
