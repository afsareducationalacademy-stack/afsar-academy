import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1A1A5C",
          dark: "#0F0F3D",
          light: "#262680",
          card: "#1E293B",
        },
        orange: {
          DEFAULT: "#F58220",
          hover: "#E06D0C",
          light: "#FFF4EB",
        },
        brandBg: {
          light: "#F8FAFC",
          dark: "#1E293B",
        },
        whatsapp: "#25D366",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
