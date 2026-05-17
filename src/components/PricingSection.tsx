"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const checkIcon = (
  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const lockIcon = (
  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const basicFeatures = [
  "GMB Profile Setup",
  "Business Logo",
  "App Icon",
  "Website Landing Page",
  "Mobile Responsive Design",
  "Fast Delivery",
];

const premiumFeatures = [
  "Multi-page Website",
  "SEO Optimization",
  "Premium UI Design",
  "Admin Panel",
  "Custom Domain Support",
  "Advanced Branding",
];

export default function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="pricing" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-blue-50/80 to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 text-blue-600 text-[13px] font-semibold tracking-widest uppercase bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-5">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 7a1 1 0 112 0v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H7a1 1 0 110-2h2V7z" clipRule="evenodd" />
            </svg>
            Pricing
          </div>

          <h2 className="text-[2.4rem] sm:text-[2.8rem] lg:text-[3rem] font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-5">
            Affordable <span className="gradient-text">Premium Packages</span>
          </h2>

          <p className="text-slate-500 text-lg leading-relaxed max-w-xl mx-auto">
            Launch your business online with modern branding and high-quality design.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-center">
          
          {/* Card 1 — Featured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="relative group bg-white/90 backdrop-blur-xl border border-blue-200/80 rounded-[2rem] p-8 sm:p-10 shadow-[0_8px_40px_rgba(59,130,246,0.12)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.2)] transition-all duration-300"
          >
            {/* Inner Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-[2rem] -z-10" />
            
            {/* Top Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[12px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-blue">
              Limited Time Offer
            </div>

            <div className="mb-8">
              <h3 className="text-slate-900 font-bold text-2xl mb-4">Basic Package</h3>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-slate-400 font-medium text-xl line-through decoration-slate-300">₹799</span>
                <div className="flex items-start">
                  <span className="text-blue-600 font-extrabold text-5xl tracking-tight">₹499</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 font-semibold text-[13px] px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Save ₹300
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              {basicFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                    {checkIcon}
                  </div>
                  <span className="text-slate-700 font-medium text-[15px]">{feature}</span>
                </li>
              ))}
            </ul>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-center text-[16px] shadow-[0_8px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_12px_28px_rgba(59,130,246,0.4)] transition-all"
            >
              Get Started
            </motion.a>
          </motion.div>

          {/* Card 2 — Premium */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white/40 backdrop-blur-sm border border-slate-200/50 rounded-[2rem] p-8 sm:p-10 shadow-sm opacity-90 transition-all duration-300 group hover:opacity-100"
          >
            {/* Top Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[12px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-soft">
              Launching Soon
            </div>

            <div className="mb-8 opacity-60 group-hover:opacity-80 transition-opacity">
              <h3 className="text-slate-700 font-bold text-2xl mb-4">Premium Package</h3>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-slate-400 font-bold text-4xl tracking-tight">Coming Soon</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-500 font-medium text-[13px] px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                Advanced Features
              </div>
            </div>

            <ul className="space-y-4 mb-10 opacity-50 group-hover:opacity-70 transition-opacity">
              {premiumFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                    {lockIcon}
                  </div>
                  <span className="text-slate-600 font-medium text-[15px]">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              disabled
              className="w-full py-4 px-6 rounded-2xl bg-slate-100 text-slate-400 font-bold text-center text-[16px] cursor-not-allowed border border-slate-200/60"
            >
              Coming Soon
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
