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
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero":
          "linear-gradient(135deg, #f0f7ff 0%, #e8f0fe 30%, #f8faff 60%, #fff 100%)",
        "gradient-blue":
          "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 60%, #60a5fa 100%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,255,0.95) 100%)",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(148, 163, 184, 0.12)",
        medium: "0 8px 40px rgba(148, 163, 184, 0.18)",
        blue: "0 8px 32px rgba(59, 130, 246, 0.22)",
        "blue-lg": "0 16px 48px rgba(59, 130, 246, 0.28)",
        glow: "0 0 30px rgba(59, 130, 246, 0.3), 0 4px 24px rgba(59, 130, 246, 0.15)",
        card: "0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(148,163,184,0.1)",
        "card-hover": "0 4px 24px rgba(0,0,0,0.06), 0 12px 48px rgba(148,163,184,0.18)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "floatDelayed 8s ease-in-out infinite 1s",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-18px) scale(1.015)" },
        },
        floatDelayed: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-14px) scale(1.01)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
