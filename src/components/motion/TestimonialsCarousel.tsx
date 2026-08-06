"use client";

import { Star, CheckCircle2, ArrowRight } from "lucide-react";

interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  source: string;
  location?: string;
  avatar?: string;
  avatarBg?: string;
  date: string;
  text: string;
}

interface TestimonialsCarouselProps {
  reviews: Review[];
}

export default function TestimonialsCarousel({
  reviews,
}: TestimonialsCarouselProps) {
  const getInitial = (name: string) => {
    return name ? name.trim().charAt(0).toUpperCase() : "G";
  };

  const getAvatarBg = (idx: number) => {
    const bgColors = [
      "bg-purple-600",
      "bg-blue-600",
      "bg-emerald-600",
      "bg-amber-600",
      "bg-indigo-600",
      "bg-rose-600",
    ];
    return bgColors[idx % bgColors.length];
  };

  return (
    <div className="space-y-8">
      {/* Infinite Horizontal Marquee Container */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Smooth Blur Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-slate-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-slate-100 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max">
          {[...reviews, ...reviews].map((rev, idx) => (
            <div
              key={`${rev.id}-${idx}`}
              className="w-80 sm:w-96 shrink-0 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md hover:shadow-xl hover:border-orange/50 transition-all duration-300 flex flex-col justify-between group card-hover"
            >
              <div className="space-y-4">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-sm leading-relaxed font-normal">
                  "{rev.text}"
                </p>
              </div>

              {/* User Profile Avatar & Google Review Info */}
              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-3.5">
                {rev.avatar ? (
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : null}

                <div
                  className={`w-11 h-11 rounded-full ${
                    rev.avatarBg || getAvatarBg(idx)
                  } text-white font-bold text-base flex items-center justify-center shrink-0 shadow-sm`}
                >
                  {getInitial(rev.name)}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider truncate group-hover:text-orange transition-colors">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium truncate flex items-center gap-1">
                    <span>{rev.location || "Google Review"}</span>
                    <span>&bull;</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Read All Reviews Link (Matching Screenshot 2) */}
      <div className="text-center pt-2">
        <a
          href="https://www.google.com/maps"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-navy hover:text-orange transition-colors"
        >
          <span>Read All Google Business Reviews</span>
          <ArrowRight className="w-4 h-4 text-orange" />
        </a>
      </div>
    </div>
  );
}
