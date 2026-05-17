"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const } 
  },
});

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 lg:py-44 overflow-hidden bg-white"
    >
      {/* ── AMBIENT BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] opacity-40 mix-blend-multiply rounded-full"
          style={{ background: "radial-gradient(circle, #c1d3fe 0%, #edf2fb 50%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/4 left-0 -translate-x-1/2 w-[600px] h-[600px] opacity-30 mix-blend-multiply rounded-full"
          style={{ background: "radial-gradient(circle, #abc4ff 0%, #edf2fb 50%, transparent 70%)" }}
        />
        {/* Subtle mesh overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-12 items-center">
          
          {/* ── LEFT: CONTENT ── */}
          <div className="flex flex-col">
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <span className="inline-flex items-center gap-2 text-blue-600 text-[11.5px] font-semibold tracking-[0.12em] uppercase bg-[#edf2fb] border border-[#c1d3fe]/60 rounded-full px-4 py-1.5 mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                About Virtual CGO
              </span>
              
              <h2
                className="font-bold text-slate-900 tracking-[-0.03em] leading-[1.08] mb-7"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
              >
                We Help Businesses{" "}
                <span className="bg-gradient-to-br from-blue-600 via-blue-500 to-[#abc4ff] bg-clip-text text-transparent inline-block pb-1">
                  Scale
                </span>{" "}
                <span className="bg-gradient-to-br from-blue-600 via-blue-500 to-[#abc4ff] bg-clip-text text-transparent inline-block pb-1">
                  Smarter
                </span>
              </h2>

              <p className="text-slate-600 text-[17px] sm:text-[18px] leading-[1.75] font-medium tracking-tight mb-5 max-w-[480px]">
                Our Virtual CGO service helps businesses scale by making operations system-driven and introducing the latest technology. This allows businesses to grow smoothly, improve efficiency, and multiply revenue with modern digital infrastructure.
              </p>
              
              <p className="text-slate-500 text-[15px] leading-relaxed mb-10 max-w-[460px]">
                We don&apos;t just build websites — we help businesses evolve into scalable modern brands.
              </p>
            </motion.div>

            {/* Premium Quote Block */}
            <motion.div
              variants={fadeUp(0.1)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative group mb-10 max-w-[500px]"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#abc4ff] via-[#e2eafc] to-[#c1d3fe] rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
              <div className="relative bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 lg:p-7 flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 mt-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-800 text-[16px] font-semibold leading-[1.6] tracking-[-0.01em]">
                    Would you like to hear how we partner with businesses to help them grow into national brands?
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp(0.2)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <a
                href="#contact"
                className="btn-primary inline-flex items-center gap-2.5 text-white font-semibold text-[15px] px-8 py-4 rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Partner With Us
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT: VISUAL COMPOSITION ── */}
          <motion.div
            variants={fadeUp(0.3)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative lg:h-[600px] w-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0"
          >
            {/* Ambient visual glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#abc4ff]/20 to-transparent blur-3xl rounded-full" />

            <div className="relative w-full max-w-[500px] aspect-square">
              
              {/* Base Platform / Grid Card */}
              <div 
                className="absolute inset-4 bg-white/40 backdrop-blur-3xl border border-white/80 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden"
              >
                {/* Internal grid lines */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                
                {/* Node connections visual */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.6)] animate-pulse" />
                <div className="absolute top-1/2 left-2/3 w-2 h-2 rounded-full bg-[#abc4ff] shadow-[0_0_10px_rgba(171,196,255,0.8)]" />
                <div className="absolute bottom-1/3 left-1/3 w-4 h-4 rounded-full bg-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.5)]" />
                
                {/* SVG Connecting lines */}
                <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
                  <path d="M125 125 Q 250 250 333 250" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                  <path d="M125 125 Q 166 333 166 333" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Floating Card 1: Growth Chart */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-4 w-[240px] bg-white/90 backdrop-blur-md border border-white rounded-2xl p-5 shadow-[0_12px_40px_rgba(37,99,235,0.12)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider">Revenue Growth</span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 9L5.5 5.5L8 8L11 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 3H11V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    240%
                  </span>
                </div>
                <div className="flex items-end gap-[6px] h-20">
                  {[30, 45, 40, 60, 55, 80, 100].map((h, i) => (
                    <div key={i} className="flex-1 w-full relative group">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        className="absolute bottom-0 w-full rounded-t-sm bg-gradient-to-t from-[#c1d3fe] to-[#8fb1ff]"
                        style={{ opacity: i === 6 ? 1 : 0.5 }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating Card 2: System Automation */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-12 -left-8 w-[280px] bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl p-4 shadow-[0_16px_50px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-indigo-600">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-slate-800 leading-none mb-1">Workflow Automation</h4>
                    <p className="text-[11px] text-slate-400 font-medium">System operational</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { l: "Lead Capture", s: "Success", c: "bg-emerald-400" },
                    { l: "Client Onboarding", s: "Active", c: "bg-blue-500" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100/50">
                      <span className="text-[12px] font-medium text-slate-600">{item.l}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.c }} />
                        <span className="text-[10px] font-semibold text-slate-500">{item.s}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating Card 3: Small node */}
              <motion.div
                animate={{ y: [0, -8, 0], x: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 -right-8 w-16 h-16 bg-white border border-slate-100 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] flex items-center justify-center"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-[#c1d3fe]/50">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                    <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
