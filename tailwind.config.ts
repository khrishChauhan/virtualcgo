import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#edf2fb",
          100: "#e2eafc",
          200: "#d7e3fc",
          300: "#ccdbfd",
          400: "#c1d3fe",
          500: "#b6ccfe",
          600: "#abc4ff",
        },
        blue: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-hero":   "linear-gradient(160deg, #edf2fb 0%, #e2eafc 30%, #f0f5ff 65%, #f7f9ff 100%)",
        "gradient-blue":   "linear-gradient(135deg, #1d4ed8 0%, #2563eb 55%, #3b82f6 100%)",
        "gradient-card":   "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(237,242,251,0.6) 100%)",
        "gradient-noise":  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        xs:        "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
        soft:      "0 2px 8px rgba(100,116,139,0.08), 0 1px 3px rgba(0,0,0,0.04)",
        medium:    "0 4px 24px rgba(100,116,139,0.12), 0 2px 8px rgba(0,0,0,0.04)",
        large:     "0 8px 40px rgba(100,116,139,0.14), 0 2px 8px rgba(0,0,0,0.06)",
        blue:      "0 4px 16px rgba(37,99,235,0.22), 0 1px 4px rgba(37,99,235,0.12)",
        "blue-md": "0 8px 32px rgba(37,99,235,0.28), 0 2px 8px rgba(37,99,235,0.15)",
        "blue-lg": "0 16px 48px rgba(37,99,235,0.32), 0 4px 12px rgba(37,99,235,0.18)",
        card:      "0 1px 3px rgba(0,0,0,0.04), 0 4px 20px rgba(100,116,139,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
        "card-hover": "0 2px 8px rgba(0,0,0,0.06), 0 12px 40px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
        inner:     "inset 0 2px 8px rgba(100,116,139,0.08)",
        "inner-blue": "inset 0 1px 4px rgba(59,130,246,0.15)",
        glow:      "0 0 0 1px rgba(59,130,246,0.15), 0 4px 24px rgba(59,130,246,0.18)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        "10xl": ["10rem", { lineHeight: "1" }],
      },
      animation: {
        "fade-up":       "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in":       "fadeIn 0.5s ease-out both",
        float:           "float 7s ease-in-out infinite",
        "float-slow":    "float-slow 9s ease-in-out infinite",
        "pulse-glow":    "pulse-glow 4s ease-in-out infinite",
        shimmer:         "shimmer 3s linear infinite",
        "border-pulse":  "border-pulse 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%":      { transform: "translateY(-10px) rotate(0.5deg)" },
          "66%":      { transform: "translateY(-6px) rotate(-0.5deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-16px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%":      { opacity: "0.65", transform: "scale(1.04)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% center" },
          to:   { backgroundPosition: "200% center" },
        },
        "border-pulse": {
          "0%, 100%": { borderColor: "rgba(171, 196, 255, 0.5)" },
          "50%":      { borderColor: "rgba(99, 130, 246, 0.85)" },
        },
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
