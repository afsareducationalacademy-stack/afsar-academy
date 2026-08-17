"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Building2, Users, Award, Image as ImageIcon, Sparkles } from "lucide-react";
import localHeroSlides from "@/data/hero-slides.json";
import { urlFor } from "@/lib/image";

const categoryIconMap: Record<string, any> = {
  appreciation: Award,
  building: Building2,
  students: Users,
};

interface HeroSlide {
  _id?: string;
  id?: string;
  title: string;
  subtitle?: string;
  image?: any; // can be Sanity image ref or local string path
  tag?: string;
  category?: string;
  recommendedDimensions?: string;
}

interface Props {
  slides?: HeroSlide[];
}

export default function HeroImageCarousel({ slides: propSlides }: Props) {
  const [slides, setSlides] = useState<HeroSlide[]>(propSlides && propSlides.length > 0 ? propSlides : localHeroSlides);
  const [current, setCurrent] = useState(0);
  // Track which slide indices have been shown — preload eagerly on first view only
  const isFirstSlide = current === 0;

  useEffect(() => {
    if (propSlides && propSlides.length > 0) {
      setSlides(propSlides);
    }
  }, [propSlides]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  if (!slides || slides.length === 0) return null;

  const activeSlide = slides[current];
  const IconComp = categoryIconMap[activeSlide.category ?? ""] || Sparkles;

  return (
    <div className="relative w-full mx-auto rounded-[32px] overflow-hidden bg-slate-950 text-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-slate-800 group">
      {/* Large Slide Viewport */}
      <div className="relative w-full h-[300px] sm:h-[420px] lg:h-[520px] bg-slate-950 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-900"
          >
            {activeSlide.image ? (
              <img
                src={
                  typeof activeSlide.image === "string"
                    ? activeSlide.image
                    : urlFor(activeSlide.image).width(1200).height(800).url()
                }
                alt={activeSlide.title}
                className="w-full h-full object-cover object-center"
                // fetchpriority="high" on the first/active hero image (LCP element)
                // so the browser loads it immediately without waiting for JS
                fetchPriority={isFirstSlide ? "high" : "low"}
                loading={isFirstSlide ? "eager" : "lazy"}
                decoding="async"
                width={1200}
                height={800}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
                <div className="p-4 rounded-full bg-slate-800 text-[#F78B1F]">
                  <ImageIcon className="w-10 h-10" />
                </div>
                <span className="text-sm font-extrabold tracking-wider text-slate-300 uppercase">
                  CMS HERO SLIDE PLACEHOLDER
                </span>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  Upload high-res photo of campus, students, or Afsar felicitations.
                </p>
                <span className="text-[11px] font-semibold text-[#F78B1F] bg-slate-900 px-3 py-1 rounded-full border border-orange/30">
                  {activeSlide.recommendedDimensions || "1200 x 800 px"}
                </span>
              </div>
            )}

            {/* Rich Gradient Shadows top & bottom for high text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/40 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Top Floating Pill Badge */}
        <div className="absolute top-5 left-5 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F78B1F] text-white text-xs font-bold shadow-lg">
            <IconComp className="w-4 h-4" />
            <span>{activeSlide.tag}</span>
          </span>
        </div>

        {/* Bottom Title & Subtitle Overlay */}
        <div className="absolute bottom-5 left-5 right-5 z-20 space-y-1.5 pointer-events-none">
          <h3 className="font-serif font-bold text-xl sm:text-2xl lg:text-3xl text-white drop-shadow-md leading-tight">
            {activeSlide.title}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm font-medium drop-shadow-sm leading-relaxed max-w-xl">
            {activeSlide.subtitle}
          </p>
        </div>

        {/* Navigation Arrow Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/80 hover:bg-[#F78B1F] text-white transition-all border border-slate-700 shadow-xl opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/80 hover:bg-[#F78B1F] text-white transition-all border border-slate-700 shadow-xl opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Control Bar with Indicator Dots */}
      <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between">
        {/* Navigation Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === current ? "w-8 bg-[#F78B1F]" : "w-2.5 bg-slate-700 hover:bg-slate-500"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Stat Pill */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <span className="text-[#F78B1F] font-bold">98% Pass Rate</span>
          <span>&bull;</span>
          <span>500+ Alumni</span>
        </div>
      </div>
    </div>
  );
}
