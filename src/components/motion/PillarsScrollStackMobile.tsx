"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, Clock, ShieldCheck, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const pillarsData = [
  {
    id: "p1",
    subtitle: "Open Schooling Specialization",
    title: "TOSS, BOSSE & NIOS Direct Guidance",
    description: "Year-saving options for students needing flexible board exams. Full assistance for enrollment, Tutor Marked Assignments (TMA), practicals, and preparation.",
    tags: ["Telangana Open School (TOSS)", "BOSSE Sikkim", "NIOS Govt. of India"],
    icon: GraduationCap,
    bgColor: "bg-white",
    textColor: "text-navy",
    iconBg: "bg-orange/10 text-orange",
  },
  {
    id: "p2",
    subtitle: "Experienced Faculty",
    title: "Qualified Subject Faculties",
    description: "M.Sc, M.Com, and M.A qualified educators with over a decade of dedicated teaching experience in Hyderabad.",
    linkText: "Meet Our Faculty",
    linkHref: "/faculty",
    icon: Users,
    bgColor: "bg-navy",
    textColor: "text-white",
    iconBg: "bg-orange text-white",
  },
  {
    id: "p3",
    subtitle: "Flexible Schedule",
    title: "Flexible Batch Timings",
    description: "Morning batches from 9:00 AM onwards & Evening batches from 5:30 PM to 10:00 PM for working & regular students.",
    footer: "Mon - Sat Batches Available",
    icon: Clock,
    bgColor: "bg-white",
    textColor: "text-navy",
    iconBg: "bg-navy/10 text-navy",
  },
  {
    id: "p4",
    subtitle: "Campus Infrastructure",
    title: "Safe & Comfortable Environment",
    description: "Clean, well-ventilated classrooms on 1st & 2nd floors above 7 Star Textiles in Aghapura, Nampally. Disciplined atmosphere for student focus.",
    footer: "Aghapura, Nampally Branch",
    icon: ShieldCheck,
    bgColor: "bg-white",
    textColor: "text-navy",
    iconBg: "bg-orange-light text-orange",
  },
  {
    id: "p5",
    subtitle: "Exam Success Drills",
    title: "Daily Mock Tests & Exam Drills",
    description: "Chapter-wise model assessments, previous 10-year solved papers, and individual doubt-clearing sessions to maximize board exam scores.",
    footer: "100% Board Exam Guidance",
    icon: Award,
    bgColor: "bg-white",
    textColor: "text-navy",
    iconBg: "bg-navy/10 text-navy",
  },
];

export default function PillarsScrollStackMobile() {
  return (
    <div className="block md:hidden space-y-4">
      {pillarsData.map((pillar, idx) => {
        const IconComp = pillar.icon;
        const isNavy = pillar.bgColor === "bg-navy";

        return (
          <motion.div
            key={pillar.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            style={{ top: `${75 + idx * 14}px` }}
            className={`sticky rounded-3xl p-6 border shadow-xl space-y-4 ${
              isNavy
                ? "bg-navy text-white border-navy-light/40"
                : "bg-white text-navy border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${pillar.iconBg}`}>
                <IconComp className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-orange/15 text-orange border border-orange/30">
                Pillar {idx + 1} of 5
              </span>
            </div>

            <div>
              {pillar.subtitle && (
                <span className="text-[11px] font-bold text-orange uppercase tracking-wider block mb-1">
                  {pillar.subtitle}
                </span>
              )}
              <h3 className="font-serif text-xl font-bold leading-tight">
                {pillar.title}
              </h3>
            </div>

            <p className={`text-xs leading-relaxed ${isNavy ? "text-slate-300" : "text-slate-600"}`}>
              {pillar.description}
            </p>

            {pillar.tags && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {pillar.tags.map((t, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-medium">
                    ✓ {t}
                  </span>
                ))}
              </div>
            )}

            {pillar.linkHref && (
              <Link href={pillar.linkHref} className="text-xs text-orange font-bold hover:underline inline-flex items-center gap-1 pt-2">
                <span>{pillar.linkText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {pillar.footer && (
              <div className={`pt-2 text-xs font-semibold ${isNavy ? "text-orange" : "text-emerald-600"} flex items-center gap-1.5 border-t border-slate-100/20`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-orange" />
                <span>{pillar.footer}</span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
