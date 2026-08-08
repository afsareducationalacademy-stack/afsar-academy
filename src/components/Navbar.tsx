"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import siteConfig from "@/data/site-config.json";
import Logo from "@/components/Logo";
import { getWhatsAppLink } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Faculty", href: "/faculty" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-md">
      {/* Top Tier: Brand Header & Main Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3.5 sm:gap-4 group shrink-0">
          <div className="group-hover:scale-105 transition-transform duration-300 shrink-0">
            <Logo size={64} className="w-14 h-14 sm:w-16 sm:h-16" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="block font-serif font-black text-xl sm:text-2xl lg:text-[28px] text-navy leading-tight tracking-tight uppercase group-hover:text-orange transition-colors">
              AFSAR EDUCATIONAL ACADEMY
            </span>
            <span className="block text-xs sm:text-sm font-bold text-slate-500 tracking-wide mt-0.5">
              Govt. Regd. {siteConfig.registrationNo} <span className="text-orange mx-1.5 font-extrabold">•</span> Estd : 2014
            </span>
          </div>
        </Link>

        {/* Desktop Quick Contact & Enroll CTA */}
        <div className="hidden lg:flex items-center gap-5 shrink-0">
          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 text-slate-700 hover:text-navy font-bold text-sm transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center text-orange shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <span className="tracking-wide">{siteConfig.phone}</span>
          </a>
          <a
            href={getWhatsAppLink(siteConfig.whatsappUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-orange hover:bg-orange-hover text-white text-sm font-extrabold shadow-md shadow-orange/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 tracking-wide"
          >
            <span>Enroll Now</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile & Tablet Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-navy hover:bg-orange hover:text-white transition-all active:scale-95"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Tier: Desktop Navigation Bar */}
      <div className="hidden lg:block bg-navy text-white border-t border-navy-light/40 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center gap-10 py-2.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-bold tracking-wide transition-all relative py-1 px-4 rounded-md ${
                    isActive
                      ? "text-orange bg-white/10 font-extrabold"
                      : "text-slate-100 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-orange rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-white p-6 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
          {/* Mobile Drawer Top Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="shrink-0">
                <Logo size={52} className="w-12 h-12" />
              </div>
              <div>
                <span className="block font-serif font-black text-base text-navy leading-tight uppercase">
                  AFSAR EDUCATIONAL ACADEMY
                </span>
                <span className="block text-xs text-slate-500 font-bold mt-0.5">
                  Govt. Regd. {siteConfig.registrationNo} | Estd : 2014
                </span>
              </div>
            </Link>

            {/* Prominent Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-full bg-orange text-white hover:bg-orange-hover shadow-md transition-transform active:scale-90"
              aria-label="Close mobile navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-3 py-6 my-auto">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-orange-light text-orange font-black border-l-4 border-orange"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className={`w-5 h-5 ${isActive ? "text-orange" : "text-slate-400"}`} />
                </Link>
              );
            })}
          </div>

          {/* Bottom Action CTAs */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-navy text-navy font-black text-base"
            >
              <Phone className="w-5 h-5 text-orange" />
              <span>Call: {siteConfig.phone}</span>
            </a>
            <a
              href={getWhatsAppLink(siteConfig.whatsappUrl)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-orange text-white font-black text-base shadow-md"
            >
              <span>Enroll Now / WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}


