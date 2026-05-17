"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden:   { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const trustItems = [
  { label: "₹499", sub: "Starting price" },
  { label: "24h",  sub: "Fast delivery" },
  { label: "100%", sub: "Mobile ready" },
];

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      
      {/* ── Ambient background ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Large radial orbs — brand palette */}
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full animate-pulse-glow"
          style={{ background: "radial-gradient(circle, rgba(193,211,254,0.55) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full animate-pulse-glow delay-700"
          style={{ background: "radial-gradient(circle, rgba(214,227,252,0.45) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] rounded-full animate-pulse-glow delay-300"
          style={{ background: "radial-gradient(circle, rgba(171,196,255,0.3) 0%, transparent 70%)" }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "radial-gradient(circle, #475569 1px, transparent 1px)",
            backgroundSize:  "32px 32px",
          }}
        />

        {/* Top shimmer line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#abc4ff]/60 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full pt-32 pb-20 lg:pt-36 lg:pb-24">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-8 items-center">

          {/* ── Left ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Eyebrow badge */}
            <motion.div variants={fadeUp} className="inline-flex mb-7">
              <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#c1d3fe]/70 text-blue-700 text-[12.5px] font-semibold px-4 py-2 rounded-full shadow-soft tracking-wide">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                Now live — Websites from ₹499
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-bold text-slate-900 leading-[1.07] tracking-[-0.03em] mb-6"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4rem)" }}
            >
              Your business<br />
              deserves a{" "}
              <span className="gradient-text">
                real online
              </span>
              <br />
              <span className="gradient-text">presence.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              className="text-slate-500 leading-[1.75] mb-10 max-w-[440px]"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}
            >
              We build professional websites, GMB profiles, brand identities, and
              landing pages — fast, affordable, and built to convert.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-12">
              <motion.a
                href="#contact"
                id="hero-cta-primary"
                className="btn-primary text-white font-semibold px-6 py-3.5 rounded-xl inline-flex items-center gap-2.5 text-[14.5px]"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Your Project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8H12.5M9.5 5L12.5 8L9.5 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>

              <motion.a
                href="#work"
                id="hero-cta-secondary"
                className="inline-flex items-center gap-2.5 text-slate-600 font-semibold text-[14.5px] px-6 py-3.5 rounded-xl bg-white/70 backdrop-blur-sm border border-slate-200/70 hover:border-[#c1d3fe] hover:text-blue-600 hover:bg-white/90 shadow-soft hover:shadow-medium transition-all duration-250 group"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                See Our Work
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                >
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            </motion.div>

            {/* Trust pills */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
              {trustItems.map((item, i) => (
                <div
                  key={item.label}
                  id={`trust-item-${i}`}
                  className="flex items-center gap-2.5 bg-white/65 backdrop-blur-sm border border-slate-200/60 rounded-xl px-4 py-2.5 shadow-xs hover:shadow-soft hover:border-[#c1d3fe]/70 transition-all duration-200"
                >
                  <span className="text-slate-900 font-bold text-[16px] leading-none tabular-nums">{item.label}</span>
                  <span className="text-slate-400 text-[11.5px] font-medium">{item.sub}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right — Visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Browser chrome card */}
            <div className="relative w-full max-w-[520px] animate-float">
              {/* Outer glow halo */}
              <div className="absolute -inset-4 rounded-[2.5rem] opacity-60"
                style={{ background: "radial-gradient(ellipse at center, rgba(171,196,255,0.5) 0%, transparent 70%)" }}
              />

              {/* Browser window */}
              <div className="relative glass-card rounded-[1.75rem] overflow-hidden shadow-[0_24px_80px_rgba(37,99,235,0.16),0_4px_16px_rgba(37,99,235,0.08)]">
                {/* Chrome bar */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200/50 bg-white/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="inline-flex items-center gap-2 bg-slate-100/80 border border-slate-200/50 rounded-lg px-3.5 py-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-slate-400 text-[11px] font-medium tracking-wide">virtualcgo.app</span>
                    </div>
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-5 bg-gradient-to-b from-white/60 to-[#edf2fb]/40">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-slate-400 text-[10.5px] font-semibold uppercase tracking-widest mb-1">Welcome back</p>
                      <p className="text-slate-800 font-bold text-[15px]">Your Business Dashboard</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/60 rounded-full px-3 py-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-emerald-600 text-[11px] font-semibold">Live</span>
                    </div>
                  </div>

                  {/* Metric cards */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { v: "12.4k", l: "Visitors",  c: "#2563eb" },
                      { v: "342",   l: "Leads",     c: "#7c3aed" },
                      { v: "98",    l: "PageSpeed", c: "#059669" },
                    ].map((m, i) => (
                      <motion.div
                        key={m.l}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.85 + i * 0.08 }}
                        className="bg-white/90 rounded-2xl p-3.5 border border-slate-200/40 shadow-xs"
                      >
                        <p className="text-slate-800 font-bold text-[16px] leading-none mb-1.5 tabular-nums">{m.v}</p>
                        <p className="text-slate-400 text-[10.5px] font-medium">{m.l}</p>
                        <div className="mt-2.5 h-1 rounded-full bg-slate-100 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${[75, 55, 92][i]}%` }}
                            transition={{ delay: 1.2 + i * 0.1, duration: 0.7 }}
                            className="h-full rounded-full"
                            style={{ background: m.c }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mini chart */}
                  <div className="bg-white/80 rounded-2xl p-4 border border-slate-200/40 shadow-xs">
                    <div className="flex items-center justify-between mb-3.5">
                      <p className="text-slate-600 text-[11px] font-semibold">Weekly Traffic</p>
                      <span className="text-emerald-500 text-[11px] font-bold">+18.4%</span>
                    </div>
                    <div className="flex items-end gap-[5px] h-[52px]">
                      {[32, 48, 38, 60, 52, 72, 82, 95].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.6, delay: 1.0 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                          className="flex-1 rounded-t-md"
                          style={{
                            background: i >= 5
                              ? "linear-gradient(to top, #2563eb, #60a5fa)"
                              : "linear-gradient(to top, #ccdbfd, #e2eafc)",
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      {["M","T","W","T","F","S","S","•"].map((d, i) => (
                        <span key={i} className="text-slate-300 text-[9px] font-medium flex-1 text-center">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge 1 — Brand kit */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="absolute -left-8 top-12 glass-card rounded-2xl px-4 py-3 shadow-medium animate-float-slow min-w-[148px]"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl gradient-blue flex items-center justify-center flex-shrink-0 shadow-blue">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 5.5L5.5 9L12 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Brand kit</p>
                    <p className="text-slate-800 font-bold text-[13px]">Ready ✓</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge 2 — GMB */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -right-6 bottom-16 glass-card rounded-2xl px-4 py-3 shadow-medium animate-float-slow min-w-[156px]"
                style={{ animationDelay: "2.5s" }}
              >
                <div>
                  <p className="text-[10px] text-slate-400 font-medium mb-1">GMB Profile</p>
                  <p className="text-slate-800 font-bold text-[13px] mb-1.5">Verified ✓</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="11" height="11" viewBox="0 0 11 11" fill="#f59e0b">
                        <path d="M5.5 1L6.8 4.1H10L7.4 6.2L8.3 9.4L5.5 7.5L2.7 9.4L3.6 6.2L1 4.1H4.2L5.5 1Z"/>
                      </svg>
                    ))}
                    <span className="text-[10px] text-slate-400 font-medium ml-1">5.0</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom section transition */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#f7f9ff] to-transparent pointer-events-none" />
    </section>
  );
}
