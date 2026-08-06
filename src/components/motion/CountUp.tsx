"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  isDecimal?: boolean;
}

export default function CountUp({
  end,
  duration = 2,
  suffix = "",
  isDecimal = false,
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);

      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easedProgress * end);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {isDecimal ? count.toFixed(1) : Math.floor(count)}
      {suffix}
    </span>
  );
}
