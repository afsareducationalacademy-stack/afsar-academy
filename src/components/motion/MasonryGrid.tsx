"use client";

import { motion } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";

interface MasonryGridProps {
  children: ReactNode[];
  className?: string;
}

export default function MasonryGrid({
  children,
  className = "",
}: MasonryGridProps) {
  const [columnsCount, setColumnsCount] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumnsCount(1);
      } else if (window.innerWidth < 1024) {
        setColumnsCount(2);
      } else {
        setColumnsCount(3);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Distribute children into column arrays for true staggered masonry layout
  const columns: ReactNode[][] = Array.from({ length: columnsCount }, () => []);
  children.forEach((child, index) => {
    columns[index % columnsCount].push(child);
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
                delay: (colIdx + itemIdx * columnsCount) * 0.08,
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
