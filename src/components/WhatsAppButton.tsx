"use client";

import siteConfig from "@/data/site-config.json";
import { getWhatsAppLink } from "@/lib/utils";

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppLink(siteConfig.whatsappUrl)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
    >
      <img
        src="/whatsapp-icon.png"
        alt="WhatsApp Admissions Chat"
        className="w-full h-full object-cover rounded-2xl drop-shadow-md"
      />
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-navy text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none border border-white/10">
        Chat with Admissions
      </span>
    </a>
  );
}
