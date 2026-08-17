"use client";

import siteConfig from "@/data/site-config.json";
import { Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AnnouncementBar() {
  if (!siteConfig.showAnnouncementBar) return null;

  const [announcementText, callText] = siteConfig.announcementBar.split(" | ");

  return (
    <div className="bg-navy text-white text-[11px] sm:text-sm py-2 sm:py-2.5 px-4 relative z-30 border-b border-navy-light/30 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2 sm:gap-2.5 min-w-0 pt-0.5 sm:pt-0">
          <span className="w-2 h-2 rounded-full bg-orange animate-ping shrink-0 mt-1.5 sm:mt-0" />
          <div className="font-medium tracking-wide leading-snug sm:leading-relaxed flex flex-col sm:flex-row sm:items-center">
            <span>{announcementText}</span>
            {callText && (
              <>
                <span className="hidden sm:inline mx-1.5 text-navy-light">|</span>
                <span className="inline-block whitespace-nowrap text-slate-300 sm:text-white mt-0.5 sm:mt-0">
                  {callText}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs">
          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-1.5 hover:text-orange transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-orange" />
            <span>{siteConfig.phone}</span>
          </a>
          <span className="text-navy-light">|</span>
          <Link
            href="/contact"
            className="flex items-center gap-1 text-orange hover:underline font-semibold"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
