"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = (delay = 0) => ({
  hidden:   { opacity: 0, y: 22 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const } },
});

const features = [
  {
    id: "feat-fast",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5L3 11.5H9.5L9 17.5L17 8.5H10.5L10 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "24h Turnaround",
    desc: "From brief to live website in as little as one business day.",
    color: "#2563eb",
    bg:    "#edf2fb",
    pill:  "Fast delivery",
  },
  {
    id: "feat-brand",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M6 10L9 13L14 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Full Brand Kit",
    desc: "Logo, app icon, colours, and typography — all in one cohesive system.",
    color: "#7c3aed",
    bg:    "#f3f0ff",
    pill:  "Included",
  },
  {
    id: "feat-mobile",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="6" y="2.5" width="8" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="10" cy="15.5" r="0.7" fill="currentColor"/>
      </svg>
    ),
    title: "Mobile-First Design",
    desc: "Every site is pixel-perfect across phones, tablets, and desktops.",
    color: "#0891b2",
    bg:    "#ecfeff",
    pill:  "Responsive",
  },
];

export default function FeaturesSection() {
  const ref      = useRef<HTMLElement>(null);
  const inView   = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f7f9ff 0%, #edf2fb 60%, #f7f9ff 100%)" }}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] opacity-60"
          style={{ background: "radial-gradient(ellipse at center top, rgba(193,211,254,0.5) 0%, transparent 65%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[300px] opacity-40"
          style={{ background: "radial-gradient(ellipse at right bottom, rgba(171,196,255,0.4) 0%, transparent 65%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-blue-600 text-[12.5px] font-semibold tracking-[0.08em] uppercase bg-[#edf2fb] border border-[#c1d3fe]/70 rounded-full px-4 py-1.5 mb-5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 1L7.5 4.5H11L8.25 6.75L9.25 10.25L6 8.25L2.75 10.25L3.75 6.75L1 4.5H4.5L6 1Z"/>
            </svg>
            What We Do
          </span>

          <h2
            className="font-bold text-slate-900 tracking-[-0.025em] leading-[1.1] mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 2.9rem)" }}
          >
            Everything your business{" "}
            <span className="gradient-text">needs to grow</span>
          </h2>

          <p className="text-slate-500 text-[17px] leading-relaxed max-w-[480px] mx-auto">
            A complete digital foundation — not just a website.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.id}
              id={f.id}
              variants={fadeUp(0.1 + i * 0.1)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ y: -6, scale: 1.012 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group relative bg-white/85 backdrop-blur-md border border-slate-200/60 rounded-3xl p-8 overflow-hidden cursor-default"
              style={{
                boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 20px rgba(100,116,139,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 25% 25%, ${f.bg}CC 0%, transparent 60%)` }}
              />

              {/* Top border accent */}
              <div
                className="absolute top-0 left-8 right-8 h-[1.5px] opacity-0 group-hover:opacity-60 transition-opacity duration-400 rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }}
              />

              {/* Icon */}
              <div className="relative mb-7">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  style={{ background: f.bg, color: f.color, boxShadow: `0 2px 12px ${f.color}25` }}
                >
                  {f.icon}
                </div>
                <div
                  className="absolute inset-0 w-12 h-12 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-400"
                  style={{ background: f.color }}
                />
              </div>

              {/* Pill */}
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full mb-4"
                style={{ background: f.bg, color: f.color }}
              >
                <span className="w-1 h-1 rounded-full" style={{ background: f.color }} />
                {f.pill}
              </span>

              <h3 className="text-slate-900 font-semibold text-[18px] tracking-[-0.01em] mb-3">
                {f.title}
              </h3>
              <p className="text-slate-500 text-[14.5px] leading-relaxed">{f.desc}</p>

              {/* Subtle arrow */}
              <div className="flex items-center gap-1 mt-6 text-[13px] font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1" style={{ color: f.color }}>
                Learn more
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M8 4L11 7L8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust strip */}
        <motion.div
          variants={fadeUp(0.5)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {["Secure & reliable", "Launch-ready code", "Dedicated support", "Satisfaction guaranteed"].map((t) => (
            <div key={t} className="flex items-center gap-2 text-slate-400 text-[13px] font-medium">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7L5.5 10L11.5 4" stroke="#abc4ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
