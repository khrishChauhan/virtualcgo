"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const } 
  },
});

const basicFeatures = [
  { text: "GMB Profile Setup", highlight: true },
  { text: "Business Logo", highlight: false },
  { text: "WhatsApp Chat Bot", highlight: true },
  { text: "Website Landing Page", highlight: false },
];

const smallTags = ["Mobile Responsive Design", "Fast Delivery (24h)"];

const premiumFeatures = [
  "Advanced Custom CRM",
  "Full Brand Identity Suite",
  "Multi-Page Custom App",
  "Growth Strategy Session",
];

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 text-blue-600">
    <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 text-slate-400">
    <rect x="3" y="6" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative py-32 lg:py-44 overflow-hidden bg-slate-50/50"
    >
      {/* ── BACKGROUND ARTISTRY ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft elegant radial blur centered top-mid */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-40 mix-blend-multiply"
          style={{ background: "radial-gradient(circle, #c1d3fe 0%, #edf2fb 50%, transparent 100%)" }}
        />
        {/* Subtle decorative glowing mesh line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c1d3fe]/50 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── SECTION HEADING ── */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-24"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#e2eafc] border border-[#c1d3fe] text-[11px] font-semibold uppercase tracking-widest text-blue-700/80 mb-5">
            Transparent Pricing
          </span>
          
          <h2
            className="font-bold text-slate-900 tracking-[-0.03em] leading-[1.12] mb-6"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 3.75rem)" }}
          >
            Invest in your{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-[#abc4ff] bg-clip-text text-transparent">
                growth.
              </span>
              <span className="absolute left-0 bottom-[4px] w-full h-[3px] bg-[#abc4ff]/40 rounded-full" />
            </span>
          </h2>

          <p className="text-slate-500 text-[16px] sm:text-[17px] leading-relaxed max-w-[480px] mx-auto font-medium tracking-tight">
            Agency-quality digital presence at startup-friendly prices.
          </p>
        </motion.div>

        {/* ── CARDS GRID ── */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch mb-24">

          {/* ── ESSENTIAL CARD (ACTIVE) ── */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col h-full relative"
          >
            {/* Glowing Backdrop behind active card */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#abc4ff]/20 to-[#c1d3fe]/10 rounded-[2.5rem] blur-2xl opacity-70 pointer-events-none -z-10" />

            <div 
              className="flex-1 bg-white border border-[#c1d3fe]/60 rounded-[2.25rem] p-8 sm:p-10 flex flex-col transition-all duration-300 hover:border-[#abc4ff] hover:shadow-[0_24px_50px_rgba(193,211,254,0.25)] relative overflow-hidden"
              style={{
                boxShadow: "0 4px 30px rgba(193, 211, 254, 0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              {/* Card Ribbon/Badge */}
              <div className="absolute top-6 right-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf2fb] border border-[#c1d3fe]/50 text-[10px] font-bold text-blue-600 tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  Limited Offer
                </span>
              </div>

              <div className="mb-8">
                <h3 className="text-slate-900 font-bold text-[22px] tracking-tight mb-2">Essential</h3>
                <p className="text-slate-400 text-[13.5px] leading-relaxed font-medium">All the core tools to kickstart your premium digital storefront today.</p>
              </div>

              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-slate-900 font-bold tracking-[-0.04em] text-[3.25rem] leading-none">₹499</span>
                <span className="text-slate-400 font-medium text-[14px]">one-time</span>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-[#c1d3fe]/40 via-[#c1d3fe]/20 to-transparent mb-8" />

              {/* FEATURES */}
              <ul className="space-y-4 mb-8 flex-1">
                {basicFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-blue-50/80 border border-[#c1d3fe]/40 flex items-center justify-center flex-shrink-0">
                      <CheckIcon />
                    </div>
                    <span className={`text-[14.5px] font-medium tracking-tight ${f.highlight ? "text-slate-800 font-semibold" : "text-slate-600"}`}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Extra Small Features Strip */}
              <div className="flex flex-wrap gap-2 mb-8 pt-2">
                {smallTags.map((tag, i) => (
                  <span key={i} className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600/90 bg-[#edf2fb] px-2.5 py-1 rounded-md border border-[#c1d3fe]/30">
                    <span className="w-1 h-1 rounded-full bg-blue-500" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* BUTTON */}
              <a
                href="#contact"
                className="w-full relative py-4 rounded-xl font-bold text-[14.5px] text-center text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 overflow-hidden shadow-[0_8px_24px_rgba(37,99,235,0.2)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.3)] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] group"
              >
                <span className="relative z-10">Get Started</span>
                {/* Subtle soft gradient reflection shimmer */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
              </a>
            </div>
          </motion.div>

          {/* ── PREMIUM CARD (COMING SOON) ── */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col h-full relative"
          >
            {/* Soft border wrapper representing disabled gradient */}
            <div className="flex-1 bg-white/60 border border-slate-200/50 rounded-[2.25rem] p-8 sm:p-10 flex flex-col relative overflow-hidden">
              
              {/* Blur locked glass layout overlay */}
              <div className="absolute inset-0 bg-slate-50/10 backdrop-blur-[1.5px] pointer-events-none z-10" />

              {/* Badge */}
              <div className="absolute top-6 right-6 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                  <LockIcon />
                  Launching Soon
                </span>
              </div>

              <div className="mb-8 opacity-60">
                <h3 className="text-slate-600 font-bold text-[22px] tracking-tight mb-2">Premium Agency</h3>
                <p className="text-slate-400 text-[13.5px] leading-relaxed font-medium">Bespoke product designs, enterprise-grade architecture, and strategic growth.</p>
              </div>

              <div className="mb-8 flex items-baseline gap-2 opacity-50">
                <span className="text-slate-400 font-bold tracking-[-0.03em] text-[2.5rem] leading-none">Coming Soon</span>
              </div>

              <div className="h-px w-full bg-slate-200/60 mb-8 opacity-60" />

              {/* FEATURES */}
              <ul className="space-y-4 mb-8 flex-1 opacity-45">
                {premiumFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-slate-100/80 border border-slate-200 flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-slate-400">
                        <path d="M2.5 6L4.5 8L9.5 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="text-[14.5px] font-medium text-slate-500 tracking-tight">{f}</span>
                  </li>
                ))}
              </ul>

              {/* DISABLED BUTTON */}
              <button
                disabled
                className="w-full py-4 rounded-xl font-bold text-[14.5px] text-center text-slate-400 bg-slate-100 border border-slate-200/60 cursor-not-allowed z-20"
              >
                Notify Me When Live
              </button>
            </div>
          </motion.div>

        </div>

        {/* ── TESTIMONIAL CARD ── */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-2xl mx-auto"
        >
          <div 
            className="bg-white/80 border border-[#c1d3fe]/40 rounded-[2rem] p-8 sm:p-10 text-center relative overflow-hidden backdrop-blur-md"
            style={{
              boxShadow: "0 10px 40px rgba(193, 211, 254, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            {/* Mini internal subtle glowing ambient spot */}
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-[#c1d3fe]/30 rounded-full blur-xl pointer-events-none -z-10" />

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#f59e0b" className="flex-shrink-0">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <p className="text-slate-700 text-[15.5px] sm:text-[16px] leading-[1.7] italic font-medium tracking-tight mb-5 max-w-lg mx-auto">
              &ldquo;Virtual CGO delivered a flawless GMB setup and landing page in under 24 hours. The automated WhatsApp setup saves us hours of follow-ups.&rdquo;
            </p>

            {/* Author */}
            <div className="flex flex-col items-center">
              <span className="text-slate-800 font-bold text-[13.5px]">Sarah J.</span>
              <span className="text-slate-400 font-medium text-[11px] tracking-wider uppercase mt-0.5">Tech Founder</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
