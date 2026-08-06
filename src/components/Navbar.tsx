"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import siteConfig from "@/data/site-config.json";
import Logo from "@/components/Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Faculty", href: "/faculty" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2.5 border-b border-slate-200/80"
          : "bg-white py-3 border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Institution Name */}
        <Link href="/" className="flex items-center gap-3.5 group shrink-0">
          <div className="group-hover:scale-105 transition-transform shrink-0 filter drop-shadow-sm">
            <Logo size={56} />
          </div>
          <div>
            <span className="block font-serif font-extrabold text-lg sm:text-xl text-navy leading-tight tracking-tight uppercase">
              AFSAR EDUCATIONAL ACADEMY
            </span>
            <span className="block text-[11px] text-slate-500 font-semibold tracking-wide">
              Govt. Regd. {siteConfig.registrationNo} | Estd : 2014
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors relative py-1 ${
                  isActive
                    ? "text-orange font-bold"
                    : "text-slate-700 hover:text-navy"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-orange hover:bg-orange-hover text-white text-sm font-semibold shadow-md shadow-orange/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Enroll Now</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2.5 rounded-xl bg-slate-100 text-navy hover:bg-orange hover:text-white transition-colors"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-white p-6 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
          {/* Mobile Drawer Top Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="shrink-0">
                <Logo size={48} />
              </div>
              <div>
                <span className="block font-serif font-bold text-base text-navy leading-tight uppercase">
                  AFSAR EDUCATIONAL ACADEMY
                </span>
                <span className="block text-[11px] text-slate-500 font-medium">
                  Govt. Regd. {siteConfig.registrationNo}
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
                  className={`text-lg font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-orange-light text-orange font-bold border-l-4 border-orange"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className={`w-4 h-4 ${isActive ? "text-orange" : "text-slate-400"}`} />
                </Link>
              );
            })}
          </div>

          {/* Bottom Action CTAs */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-navy text-navy font-bold text-sm"
            >
              <Phone className="w-4 h-4 text-orange" />
              <span>Call: {siteConfig.phone}</span>
            </a>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-orange text-white font-bold text-sm shadow-md"
            >
              <span>Enroll Now / WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
