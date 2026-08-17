"use client";

import { motion } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";

interface MasonryGridProps {
  children: ReactNode[];
  className?: string;
}

function getColumnsForWidth(width: number): number {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
}

export default function MasonryGrid({
  children,
  className = "",
}: MasonryGridProps) {
  // Default to 1 (mobile-first) to match SSR output on small screens.
  // A mounted flag prevents a flash: we only render the grid after the client
  // has confirmed the correct column count, so there is no layout shift.
  const [columnsCount, setColumnsCount] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const updateColumns = () => {
      setColumnsCount(getColumnsForWidth(window.innerWidth));
    };

    updateColumns();
    setMounted(true);
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // While we haven't measured the viewport yet, render a single-column
  // fallback so the page is visible immediately without any horizontal glitch.
  const cols = mounted ? columnsCount : 1;

  // Distribute children into column arrays for true staggered masonry layout
  const columns: ReactNode[][] = Array.from({ length: cols }, () => []);
  children.forEach((child, index) => {
    columns[index % cols].push(child);
  });

  return (
    <div className={`flex gap-6 items-start ${className}`}>
      {columns.map((colItems, colIdx) => (
        <div key={colIdx} className="flex-1 flex flex-col gap-6">
          {colItems.map((child, itemIdx) => (
            <motion.div
              key={itemIdx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: (colIdx + itemIdx * cols) * 0.08,
                ease: "easeOut",
              }}
            >
              {child}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}
