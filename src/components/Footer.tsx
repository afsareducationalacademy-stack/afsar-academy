import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import siteConfig from "@/data/site-config.json";
import Logo from "@/components/Logo";
import FooterLoveLoop from "@/components/motion/FooterLoveLoop";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white pt-12 pb-8 border-t border-navy-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="shrink-0 bg-white p-1 rounded-full shadow-md">
                <Logo size={64} />
              </div>
              <span className="font-serif font-bold text-base text-white uppercase tracking-tight leading-snug">
                AFSAR EDUCATIONAL ACADEMY
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {siteConfig.tagline} — Building strong academic foundations for SSC, Intermediate, Open Schooling (TOSS, BOSSE, NIOS), and Degree students in Hyderabad.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-card/80 text-xs text-orange border border-orange/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Govt. of Telangana Regd. No. {siteConfig.registrationNo}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-orange">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-orange transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange transition-colors">About Academy & Founder</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-orange transition-colors">Academic Courses & Boards</Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-orange transition-colors">Expert Faculty Team</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-orange transition-colors">Campus Photo Gallery</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange transition-colors">Contact Us & Location</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Programs */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-orange">Academic Programs</h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>&bull; Class IX & X (SSC / 10th Standard)</li>
              <li>&bull; Inter (MPC, BiPC, CEC, MEC, HEC)</li>
              <li>&bull; TOSS (Telangana Open Schooling)</li>
              <li>&bull; BOSSE (Board of Open Schooling)</li>
              <li>&bull; NIOS (National Open Schooling)</li>
              <li>&bull; Degree Level Coaching (OU)</li>
              <li>&bull; Class VI to VIII Foundation Tuitions</li>
            </ul>
          </div>

          {/* Column 4: Reach Us */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-orange">Reach Us</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                <span>{siteConfig.address.full}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange shrink-0" />
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors break-all text-xs sm:text-sm">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-400 pt-2 border-t border-slate-700/50">
                <Clock className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                <div>
                  <p><strong className="text-slate-300">Evening:</strong> {siteConfig.hours.eveningBatches}</p>
                  <p><strong className="text-slate-300">Morning:</strong> {siteConfig.hours.morningBatches}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip Centered with Word Rotate & Highlighter combination */}
        <div className="pt-8 border-t border-slate-800 flex flex-col items-center justify-center text-center text-xs text-slate-400 gap-3">
          <p>&copy; {currentYear} AFSAR EDUCATIONAL ACADEMY. All Rights Reserved.</p>
          <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-slate-300">
            <span>Made with</span>
            <FooterLoveLoop />
            <span>by</span>
            <a
              href="https://www.skarcreation.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block font-extrabold text-[#F78B1F] hover:text-white transition-colors group px-1"
            >
              <span>skar</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F78B1F] group-hover:bg-white transition-colors rounded-full" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
