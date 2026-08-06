"use client";

import siteConfig from "@/data/site-config.json";
import { Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AnnouncementBar() {
  if (!siteConfig.showAnnouncementBar) return null;

  return (
    <div className="bg-navy text-white text-xs sm:text-sm py-2.5 px-4 relative z-30 border-b border-navy-light/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="w-2 h-2 rounded-full bg-orange animate-ping" />
          <span className="font-medium tracking-wide">
            {siteConfig.announcementBar}
          </span>
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
