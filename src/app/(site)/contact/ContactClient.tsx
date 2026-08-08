"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";

interface Props {
  siteConfig: any;
  buildingPhoto?: string | null;
}

export default function ContactClient({ siteConfig, buildingPhoto }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "Class IX & X (SSC)",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `*New Admission Inquiry - Afsar Academy*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email || "N/A"}\n` +
      `*Interested Course:* ${formData.course}\n` +
      `*Message:* ${formData.message || "N/A"}`;

    const waUrl = `https://wa.me/919052407878?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
    setSubmitted(true);
  };

  const phoneDisplay: string = siteConfig.phone ?? "+91 90524 07878";
  const phoneHref = `tel:${phoneDisplay.replace(/\s+/g, "")}`;
  const whatsappUrl: string = getWhatsAppLink(siteConfig.whatsappUrl);
  const email: string = siteConfig.email ?? "afsarshareef@gmail.com";

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero */}
      <section className="bg-navy text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="px-3.5 py-1 rounded-full bg-orange/20 text-orange text-xs font-bold uppercase tracking-wider border border-orange/30">
            Admissions 2026-27
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-white">
            Get in Touch with Afsar Academy
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Have questions about admissions, course timings, or fees? Contact our team directly or visit our campus in Nampally, Hyderabad.
          </p>
        </div>
      </section>

      {/* 2. Side-by-Side Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Info & Google Maps */}
          <div className="lg:col-span-6 space-y-8">
            <RevealOnScroll direction="left" className="space-y-6">
              <div>
                <span className="text-xs font-bold text-orange uppercase tracking-wider">
                  Campus Location
                </span>
                <h2 className="font-serif text-3xl font-bold text-navy">
                  Visit Our Academy
                </h2>
              </div>

              {/* Building Entrance Photo — from Sanity contactPageImages or placeholder */}
              {buildingPhoto ? (
                <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img
                    src={buildingPhoto}
                    alt="Afsar Academy building entrance in Nampally, Hyderabad"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-48 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
                  <ImageIcon className="w-6 h-6 text-orange mb-1" />
                  <span className="text-xs font-bold text-navy uppercase tracking-wider">
                    Aghapura Nampally Building Entrance Photo
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Upload in Sanity Studio → 📞 Contact Page → Building Photo
                  </span>
                </div>
              )}

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <MapPin className="w-6 h-6 text-orange shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-navy font-bold">Address &amp; Landmark</strong>
                    <p className="text-slate-600 text-xs leading-relaxed mt-1">
                      {siteConfig.address?.full}
                      <br />
                      <span className="text-orange font-semibold">({siteConfig.address?.landmark})</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <Phone className="w-5 h-5 text-orange shrink-0" />
                    <div>
                      <strong className="block text-navy font-bold text-xs">Phone Call</strong>
                      <a href={phoneHref} className="text-xs text-slate-600 hover:text-orange">
                        {phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <Mail className="w-5 h-5 text-orange shrink-0" />
                    <div>
                      <strong className="block text-navy font-bold text-xs">Email Us</strong>
                      <a href={`mailto:${email}`} className="text-xs text-slate-600 hover:text-orange">
                        {email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <Clock className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="block text-navy font-bold text-sm">Batch Timings</strong>
                    <p className="text-slate-600 mt-1">• <strong>Evening Batches:</strong> {siteConfig.hours?.eveningBatches}</p>
                    <p className="text-slate-600">• <strong>Morning Batches:</strong> {siteConfig.hours?.morningBatches}</p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              {siteConfig.googleMapsEmbedUrl && (
                <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md h-[360px]">
                  <iframe
                    title="Afsar Educational Academy Map Location"
                    src={siteConfig.googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </RevealOnScroll>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-6">
            <RevealOnScroll direction="right">
              <div className="bg-navy text-white rounded-3xl p-8 sm:p-10 border border-navy-light/40 shadow-2xl space-y-6">
                <div>
                  <span className="text-xs font-bold text-orange uppercase tracking-wider">
                    Quick Admission Form
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-1">
                    Send an Online Inquiry
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Fill out the details below to dispatch your inquiry directly to our admissions team via WhatsApp.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-orange/20 border border-orange/40 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-orange mx-auto" />
                    <h4 className="font-serif text-xl font-bold text-white">Inquiry Dispatched!</h4>
                    <p className="text-xs text-slate-200">
                      Thank you! Your inquiry has been sent to our WhatsApp desk. We will respond shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter student / parent full name"
                        className="w-full px-4 py-3 rounded-xl bg-navy-card border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 rounded-xl bg-navy-card border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">Email Address (Optional)</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full px-4 py-3 rounded-xl bg-navy-card border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">Interested Course / Program *</label>
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-navy-card border border-slate-700 text-white text-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                      >
                        <option value="Class IX & X (SSC)">Class IX &amp; X (SSC / 10th)</option>
                        <option value="Intermediate (MPC/BiPC/CEC/MEC)">Intermediate (MPC / BiPC / CEC / MEC)</option>
                        <option value="TOSS Open Schooling">TOSS Open Schooling (10th / 12th)</option>
                        <option value="BOSSE Open Schooling">BOSSE Open Schooling</option>
                        <option value="NIOS Open Schooling">NIOS Open Schooling</option>
                        <option value="Degree Level Coaching">Degree Level Coaching</option>
                        <option value="Class VI to VIII Tuitions">Class VI to VIII Foundation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">Your Message / Questions</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Ask about batch timings, fees, or admission documents..."
                        className="w-full px-4 py-3 rounded-xl bg-navy-card border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-orange hover:bg-orange-hover text-white font-bold text-base shadow-lg shadow-orange/30 transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Submit &amp; Dispatch to WhatsApp</span>
                    </button>
                  </form>
                )}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 3. Direct WhatsApp CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-whatsapp text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold">Prefer Direct WhatsApp Chat?</h3>
            <p className="text-xs sm:text-sm text-slate-100">
              Speak directly with Mr. Afsar Shareef or our admissions desk on WhatsApp.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-white text-navy font-bold text-sm shadow-md hover:scale-105 transition-transform shrink-0 flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5 text-whatsapp" />
            <span>Chat +91 90524 07878</span>
          </a>
        </div>
      </section>
    </div>
  );
}
