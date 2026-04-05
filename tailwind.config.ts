import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        stone: {
          50: "#FAFAF9",
          100: "#F5F5F4",
          200: "#E7E5E4",
          300: "#D6D3D1",
          400: "#A8A29E",
          500: "#78716C",
          600: "#57534E",
          700: "#44403C",
          800: "#292524",
          900: "#1C1917",
        },
        accent: {
          DEFAULT: "#7C3AED",
          light: "#EDE9FE",
          dark: "#6D28D9",
        },
        gold: "#B8860B",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Crimson Pro", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0, 0, 0, 0.06)",
        lifted: "0 8px 32px rgba(0, 0, 0, 0.1)",
        glow: "0 0 24px rgba(124, 58, 237, 0.3)",
      },
      borderRadius: {
        card: "16px",
        button: "12px",
        input: "10px",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
        shimmer: "shimmer 2s infinite",
        pulse: "pulse 2s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
