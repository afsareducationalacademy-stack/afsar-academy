"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";

interface Props {
  siteConfig: any;
  contactPageData?: any;
  buildingPhoto?: string | null;
}

export default function ContactClient({ siteConfig, contactPageData, buildingPhoto }: Props) {
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

    const waNumber = (siteConfig.phone || "9052407878").replace(/\D/g, "");
    const targetWa = waNumber.length === 10 ? `91${waNumber}` : waNumber;
    const waUrl = `https://wa.me/${targetWa}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
    setSubmitted(true);
  };

  const hero = contactPageData?.heroSection;
  const loc = contactPageData?.locationSection;
  const directContact = contactPageData?.contactDetails;
  const formSection = contactPageData?.inquiryFormSection;

  const phoneDisplay: string = directContact?.phone || siteConfig.phone || "+91 90524 07878";
  const phoneHref = `tel:${phoneDisplay.replace(/\s+/g, "")}`;
  const whatsappUrl: string = getWhatsAppLink(directContact?.whatsappUrl || siteConfig.whatsappUrl);
  const email: string = directContact?.email || siteConfig.email || "afsarshareef@gmail.com";
  const fullAddress: string =
    loc?.fullAddress ||
    siteConfig.address?.full ||
    "Above Al Hareer textiles, opp. to Al Rehma Bakers, Aghapura, Nampally, Hyderabad, Telangana 500001";
  const landmark: string =
    loc?.landmark || siteConfig.address?.landmark || "";
  const mapEmbedUrl: string =
    loc?.googleMapsEmbedUrl ||
    siteConfig.googleMapsEmbedUrl ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951.8571462651842!2d78.46226846132959!3d17.391207907955238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97710e1687c7%3A0x16b6ca0f5c22cb50!2sAfsar%20Academy!5e0!3m2!1sen!2sin!4v1787290126709!5m2!1sen!2sin";

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero */}
      <section className="bg-navy text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="px-3.5 py-1 rounded-full bg-orange/20 text-orange text-xs font-bold uppercase tracking-wider border border-orange/30">
            {hero?.badge || "Admissions 2026-27"}
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            {hero?.title || "Get in Touch with Afsar Academy"}
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            {hero?.subtitle ||
              "Have questions about admissions, course timings, or fees? Contact our team directly or visit our campus in Nampally, Hyderabad."}
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
                  {loc?.addressTitle || "Visit Our Academy"}
                </h2>
              </div>

              {/* Building Entrance Photo */}
              {buildingPhoto ? (
                <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img
                    src={buildingPhoto}
                    alt={
                      loc?.buildingPhotoCaption ||
                      "Afsar Academy building entrance in Nampally, Hyderabad"
                    }
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={192}
                  />
                </div>
              ) : (
                <div className="w-full h-48 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
                  <ImageIcon className="w-6 h-6 text-orange mb-1" />
                  <span className="text-xs font-bold text-navy uppercase tracking-wider">
                    {loc?.buildingPhotoCaption || "Aghapura Nampally Building Entrance Photo"}
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
                    <strong className="block text-navy font-bold">{loc?.addressTitle || "Address"}</strong>
                    <p className="text-slate-600 text-xs leading-relaxed mt-1">
                      {fullAddress}
                      {landmark && landmark.trim() !== "" && (
                        <>
                          <br />
                          <span className="text-orange font-semibold">({landmark})</span>
                        </>
                      )}
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
                      <a
                        href={`mailto:${email}`}
                        className="text-xs text-slate-600 hover:text-orange"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <Clock className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="block text-navy font-bold text-sm">Batch Timings</strong>
                    <p className="text-slate-600 mt-1">
                      • <strong>Evening Batches:</strong>{" "}
                      {directContact?.eveningBatches ||
                        siteConfig.hours?.eveningBatches ||
                        "5:30 PM to 10:00 PM (Mon - Sat)"}
                    </p>
                    <p className="text-slate-600 mt-0.5">
                      • <strong>Morning Batches:</strong>{" "}
                      {directContact?.morningBatches ||
                        siteConfig.hours?.morningBatches ||
                        "9:00 AM onwards (Regular & Open Schooling)"}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-orange-light border border-orange/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-6 h-6 text-orange shrink-0" />
                    <div>
                      <strong className="block text-navy text-xs font-bold">
                        WhatsApp Instant Enquiry
                      </strong>
                      <span className="text-[11px] text-slate-500">
                        Chat directly with Director Mr. Afsar Shareef
                      </span>
                    </div>
                  </div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-orange hover:bg-orange-hover text-white text-xs font-bold shadow-md transition-colors"
                  >
                    Open Chat
                  </a>
                </div>
              </div>
            </RevealOnScroll>

            {/* Google Map Embed */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-64 sm:h-80">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Afsar Educational Academy Google Maps Location"
              />
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-6">
            <RevealOnScroll direction="right">
              <div className="bg-navy text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-navy-light/40 space-y-6">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-orange/20 text-orange text-xs font-bold uppercase tracking-wider">
                    Direct Admissions
                  </span>
                  <h2 className="font-serif text-3xl font-bold">
                    {formSection?.formHeading || "Send an Admission Inquiry"}
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {formSection?.formSubtitle ||
                      "Fill out the form below. We will instantly redirect you to WhatsApp with your pre-filled inquiry details for immediate response."}
                  </p>
                </div>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h3 className="font-serif text-xl font-bold text-emerald-300">
                      Inquiry Initiated!
                    </h3>
                    <p className="text-slate-300 text-xs">
                      If WhatsApp did not open automatically, please click below:
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 rounded-xl bg-orange text-white text-xs font-bold"
                    >
                      Open WhatsApp Now
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="inquiry-name"
                        className="block text-xs font-bold text-slate-200 mb-1"
                      >
                        Student / Parent Name *
                      </label>
                      <input
                        id="inquiry-name"
                        type="text"
                        required
                        placeholder="e.g. Syed Mohammed / Mohammed Zaid"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="inquiry-phone"
                          className="block text-xs font-bold text-slate-200 mb-1"
                        >
                          Mobile / WhatsApp Number *
                        </label>
                        <input
                          id="inquiry-phone"
                          type="tel"
                          required
                          placeholder="e.g. 9052407878"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="inquiry-email"
                          className="block text-xs font-bold text-slate-200 mb-1"
                        >
                          Email Address (Optional)
                        </label>
                        <input
                          id="inquiry-email"
                          type="email"
                          placeholder="your.email@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-course"
                        className="block text-xs font-bold text-slate-200 mb-1"
                      >
                        Program / Course Interested In *
                      </label>
                      <select
                        id="inquiry-course"
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-navy border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-orange text-sm"
                      >
                        <option value="Class IX & X (SSC / 10th Standard)">
                          Class IX &amp; X (SSC / 10th Standard)
                        </option>
                        <option value="Intermediate (Class XI & XII - MPC/BiPC/CEC/MEC/HEC)">
                          Intermediate (Class XI &amp; XII)
                        </option>
                        <option value="TOSS Open Schooling (SSC & Inter)">
                          TOSS Open Schooling (SSC &amp; Inter)
                        </option>
                        <option value="BOSSE Open Schooling (10th & 12th)">
                          BOSSE Open Schooling (10th &amp; 12th)
                        </option>
                        <option value="NIOS Open Schooling (10th & 12th)">
                          NIOS Open Schooling (10th &amp; 12th)
                        </option>
                        <option value="Degree Level Coaching (B.Com, B.A, B.Sc, BBA)">
                          Degree Level Coaching (B.Com, B.A, B.Sc, BBA)
                        </option>
                        <option value="Class VI to VIII Foundation Tuitions">
                          Class VI to VIII Foundation Tuitions
                        </option>
                        <option value="General Admission Inquiry">General Admission Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-message"
                        className="block text-xs font-bold text-slate-200 mb-1"
                      >
                        Any Questions or Specific Requirements?
                      </label>
                      <textarea
                        id="inquiry-message"
                        rows={3}
                        placeholder="e.g. Batch timings, fee details, study material assistance..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-orange hover:bg-orange-hover text-white font-extrabold text-sm shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{formSection?.submitButtonText || "Send Inquiry via WhatsApp"}</span>
                    </button>

                    <p className="text-[11px] text-slate-400 text-center">
                      🔒 Your contact information is kept strictly private and used only for academic counseling.
                    </p>
                  </form>
                )}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
