"use client";

import { motion } from "framer-motion";
import DashboardMockup from "./DashboardMockup";

const stats = [
  {
    id: "stat-delivery",
    value: "24h",
    label: "Fast delivery",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "stat-mobile",
    value: "100%",
    label: "Mobile ready",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "stat-price",
    value: "₹499",
    label: "Starting price",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* === BACKGROUND === */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#eef4ff] via-[#f0f6ff] to-[#f8faff]" />

        {/* Radial glow blobs */}
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] bg-indigo-200/20 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: "3s" }} />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Premium badge pill highlight at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
      </div>

      {/* === MAIN CONTENT === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ─── LEFT COLUMN ─── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex mb-8">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200/60 text-blue-700 rounded-full px-4 py-1.5 text-[13px] font-semibold shadow-soft">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                ✦ Premium websites starting at ₹499
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-[3rem] sm:text-[3.5rem] lg:text-[3.75rem] font-extrabold text-slate-900 leading-[1.08] tracking-tight mb-6 text-balance"
            >
              Build Your Business{" "}
              <span className="relative inline-block">
                <span className="gradient-text">Presence Online</span>
                {/* Underline accent */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] gradient-blue rounded-full origin-left block"
                />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-slate-500 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl font-normal"
            >
              Professional websites, GMB setup, branding, logos, and landing pages
              <span className="text-slate-600 font-medium"> — all in one affordable package.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 mb-12"
            >
              <motion.a
                href="#contact"
                id="hero-cta-primary"
                className="btn-primary text-white font-semibold px-7 py-3.5 rounded-2xl flex items-center gap-2.5 text-[15px]"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>

              <motion.a
                href="#pricing"
                id="hero-cta-secondary"
                className="group bg-white/80 backdrop-blur-sm text-slate-700 font-semibold px-7 py-3.5 rounded-2xl flex items-center gap-2.5 text-[15px] border border-slate-200/80 hover:border-blue-300/80 hover:text-blue-600 shadow-soft hover:shadow-blue transition-all duration-300"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                View Packages
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 flex-wrap"
            >
              {stats.map((stat, i) => (
                <div key={stat.id} className="flex items-center">
                  <div
                    id={stat.id}
                    className="flex items-center gap-2.5 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-2xl px-4 py-3 shadow-soft group hover:shadow-medium hover:border-blue-200/60 transition-all duration-200"
                  >
                    <div className="w-8 h-8 gradient-blue rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-[17px] leading-none">{stat.value}</p>
                      <p className="text-slate-400 text-[11px] font-medium mt-0.5">{stat.label}</p>
                    </div>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="w-px h-8 bg-slate-200/80 mx-2 hidden sm:block" />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT COLUMN — Dashboard Mockup ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <DashboardMockup />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden lg:flex"
        >
          <span className="text-slate-400 text-xs font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-5 flex items-center justify-center text-slate-400"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
