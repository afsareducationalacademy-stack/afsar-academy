"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FooterLoveLoopProps {
  words?: string[];
  duration?: number;
}

export default function FooterLoveLoop({
  words = ["<3", "with love", "❤️", "passion"],
  duration = 2200,
}: FooterLoveLoopProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(timer);
  }, [words, duration]);

  return (
    <span className="inline-flex items-center justify-center relative overflow-hidden min-w-[54px] h-6 px-2 mx-1 rounded bg-[#F78B1F]/15 border border-[#F78B1F]/30 align-middle">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="inline-block font-mono font-bold text-[#F78B1F] relative text-xs tracking-wide"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
