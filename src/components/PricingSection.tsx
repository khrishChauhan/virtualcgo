"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const } },
});

const basicFeatures = [
  "GMB Profile Setup",
  "Business Logo & App Icon",
  "Website Landing Page",
  "Mobile Responsive Design",
  "Fast 24h Delivery",
  "Basic SEO Setup",
];

const premiumFeatures = [
  "Multi-page Website",
  "Advanced SEO Optimization",
  "Premium UI/UX Design",
  "Admin Panel Included",
  "Custom Domain Support",
  "Advanced Branding Suite",
];

const Check = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="flex-shrink-0">
    <path d="M2.5 7.5L5.5 10.5L12.5 4" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Lock = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
    <rect x="3" y="6" width="8" height="6" rx="1" stroke="#94a3b8" strokeWidth="1.4"/>
    <path d="M5 6V4.5a2 2 0 014 0V6" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

export default function PricingSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #edf2fb 0%, #f7f9ff 50%, #fff 100%)" }}
    >
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-50"
          style={{ background: "radial-gradient(ellipse at center top, rgba(193,211,254,0.6) 0%, transparent 65%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-blue-600 text-[12.5px] font-semibold tracking-[0.08em] uppercase bg-[#edf2fb] border border-[#c1d3fe]/70 rounded-full px-4 py-1.5 mb-5">
            Pricing
          </span>
          <h2
            className="font-bold text-slate-900 tracking-[-0.025em] leading-[1.1] mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 2.9rem)" }}
          >
            Simple,{" "}
            <span className="gradient-text">transparent</span> pricing
          </h2>
          <p className="text-slate-500 text-[17px] leading-relaxed max-w-[440px] mx-auto">
            No hidden fees. No surprises. Just great work at an honest price.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto items-start">

          {/* Basic — Featured */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative group"
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-[1.5px] rounded-[2rem] opacity-70 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: "linear-gradient(135deg, #c1d3fe, #abc4ff, #d7e3fc)", padding: "1.5px" }}
            >
              <div className="absolute inset-0 rounded-[2rem] bg-white" />
            </div>

            <div className="relative bg-white rounded-[2rem] p-8 sm:p-10"
              style={{
                boxShadow: "0 4px 24px rgba(37,99,235,0.10), 0 1px 4px rgba(37,99,235,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              {/* Badge */}
              <div className="absolute -top-4 left-8">
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[11.5px] font-bold tracking-wide uppercase px-4 py-1.5 rounded-full shadow-blue">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                  Limited Time Offer
                </span>
              </div>

              {/* Spotlight */}
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 opacity-40"
                  style={{ background: "radial-gradient(ellipse at top, rgba(171,196,255,0.7) 0%, transparent 70%)" }}
                />
              </div>

              <div className="pt-4 mb-8">
                <p className="text-blue-600 text-[12.5px] font-semibold tracking-[0.06em] uppercase mb-2">Basic Package</p>
                <div className="flex items-end gap-3 mb-3">
                  <span className="text-slate-300 font-medium text-xl line-through decoration-slate-300">₹799</span>
                  <div className="flex items-start gap-0.5">
                    <span className="text-slate-500 text-2xl font-medium mt-1.5">₹</span>
                    <span className="text-slate-900 font-bold leading-none tracking-[-0.03em]" style={{ fontSize: "clamp(3rem, 7vw, 4rem)" }}>499</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 font-semibold text-[12.5px] px-3 py-1 rounded-full border border-emerald-100">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L4.5 8.5L10 3" stroke="#059669" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Save ₹300 today
                </span>
              </div>

              <ul className="space-y-3.5 mb-9">
                {basicFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Check />
                    </div>
                    <span className="text-slate-700 text-[14.5px] font-medium">{f}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary block w-full py-4 rounded-xl text-white font-semibold text-[15px] text-center"
              >
                Get Started — ₹499
              </motion.a>
            </div>
          </motion.div>

          {/* Premium — Coming Soon */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative group"
          >
            <div
              className="relative bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-[2rem] p-8 sm:p-10 overflow-hidden"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(100,116,139,0.06)" }}
            >
              {/* Badge */}
              <div className="absolute -top-4 left-8">
                <span className="inline-flex items-center gap-1.5 bg-slate-800 text-white text-[11.5px] font-bold tracking-wide uppercase px-4 py-1.5 rounded-full">
                  <Lock />
                  Launching Soon
                </span>
              </div>

              {/* Blur overlay for locked look */}
              <div className="absolute inset-0 rounded-[2rem] bg-white/30 backdrop-blur-[1px] pointer-events-none" />

              <div className="pt-4 mb-8 opacity-50">
                <p className="text-slate-400 text-[12.5px] font-semibold tracking-[0.06em] uppercase mb-2">Premium Package</p>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-slate-400 font-bold text-3xl tracking-tight">Coming Soon</span>
                </div>
                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-400 font-medium text-[12.5px] px-3 py-1 rounded-full">
                  Advanced features
                </span>
              </div>

              <ul className="space-y-3.5 mb-9 opacity-40">
                {premiumFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Lock />
                    </div>
                    <span className="text-slate-500 text-[14.5px] font-medium">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled
                className="relative w-full py-4 rounded-xl bg-slate-100/80 text-slate-400 font-semibold text-[15px] cursor-not-allowed border border-slate-200/60"
              >
                Notify Me
              </button>
            </div>
          </motion.div>

        </div>

        {/* Guarantee strip */}
        <motion.div
          variants={fadeUp(0.4)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-14 text-center"
        >
          <p className="text-slate-400 text-[13.5px] font-medium">
            <span className="text-slate-600 font-semibold">100% satisfaction guarantee</span>
            {" "}· No contract · Cancel anytime · Free revisions
          </p>
        </motion.div>
      </div>
    </section>
  );
}
