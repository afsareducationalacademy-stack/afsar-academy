import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 72 }: LogoProps) {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`relative shrink-0 flex items-center justify-center filter drop-shadow-md hover:scale-105 transition-transform duration-300 ${className}`}
    >
      <img
        src="/afsaraclogo.svg"
        alt="AFSAR EDUCATIONAL ACADEMY Logo"
        width={375}
        height={375}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

