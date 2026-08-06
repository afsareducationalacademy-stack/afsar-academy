"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, CheckCircle2, ArrowRight, Award } from "lucide-react";

interface CourseItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  boards: string[];
  classes: string;
  timing: string;
  features: string[];
}

interface ScrollStackProps {
  courses: CourseItem[];
}

export default function ScrollStack({ courses }: ScrollStackProps) {
  return (
    <div className="space-y-6">
      {courses.map((course, idx) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="sticky top-24 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all card-hover"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-navy text-white text-xs font-bold tracking-wide">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-orange/10 text-orange text-xs font-semibold flex items-center gap-1 border border-orange/20">
                  <Award className="w-3.5 h-3.5" />
                  {course.badge}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {course.timing}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy">
                {course.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {course.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {course.features.slice(0, 2).map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-orange shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              <div className="text-xs text-slate-500 text-left lg:text-right">
                <span className="block font-semibold text-slate-700">Target Boards:</span>
                <span>{course.boards.join(", ")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
