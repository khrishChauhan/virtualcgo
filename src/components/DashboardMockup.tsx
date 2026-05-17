"use client";

import { motion } from "framer-motion";

const barHeights = [35, 48, 42, 58, 52, 68, 78, 92];

export const floatVariant = {
  initial: { y: 0 },
  animate: {
    y: [-12, 0, -12],
    transition: { duration: 5, ease: "easeInOut" as const, repeat: Infinity },
  },
};

export const floatDelayedVariant = {
  initial: { y: 0 },
  animate: {
    y: [0, -16, 0],
    transition: { duration: 7, ease: "easeInOut" as const, repeat: Infinity, delay: 1.5 },
  },
};

export const floatSmallVariant = {
  initial: { y: 0 },
  animate: {
    y: [-8, 0, -8],
    transition: { duration: 4.5, ease: "easeInOut" as const, repeat: Infinity, delay: 0.8 },
  },
};

export default function DashboardMockup() {
  return (
    <div className="relative w-full h-[520px] sm:h-[560px] lg:h-[580px] flex items-center justify-center">
      {/* Glow orb behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

      {/* Main Browser Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        variants={floatVariant}
        className="relative z-10 w-[420px] sm:w-[460px] lg:w-[480px]"
        style={{ animation: "float 6s ease-in-out infinite" }}
      >
        {/* Browser chrome */}
        <div className="glass-card rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(59,130,246,0.18),0_4px_24px_rgba(148,163,184,0.15)]">
          {/* Browser top bar */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200/60 bg-white/60">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-2 bg-slate-100/80 rounded-lg px-3 py-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-slate-400 text-[11px] font-medium tracking-wide">
                  virtualcgo.app/dashboard
                </span>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-5 bg-gradient-to-b from-slate-50/80 to-white/90">
            {/* Header row */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mb-1">
                  Welcome back
                </p>
                <p className="text-slate-800 font-bold text-[15px]">Your Business</p>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/60 rounded-full px-3 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-600 text-[11px] font-semibold">Live</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { icon: "📊", value: "12.4k", label: "Visitors", color: "blue" },
                { icon: "📈", value: "342", label: "Leads", color: "indigo" },
                { icon: "⚡", value: "98", label: "Speed", color: "sky" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="bg-white/90 rounded-2xl p-3 border border-slate-200/50 shadow-soft"
                >
                  <div className="text-lg mb-1">{stat.icon}</div>
                  <p className="text-slate-800 font-bold text-[15px] leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-slate-400 text-[10px] font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Traffic Chart */}
            <div className="bg-white/90 rounded-2xl p-4 border border-slate-200/50 shadow-soft">
              <p className="text-slate-600 text-[11px] font-semibold mb-4">Traffic this week</p>
              <div className="flex items-end gap-2 h-20">
                {barHeights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: 1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex-1 rounded-t-lg ${
                      i >= 5
                        ? "bg-gradient-to-t from-blue-500 to-blue-400"
                        : "bg-gradient-to-t from-blue-300 to-blue-200"
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {["M", "T", "W", "T", "F", "S", "S", "+"].map((d, i) => (
                  <span key={i} className="text-slate-300 text-[9px] font-medium flex-1 text-center">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Brand Kit Card — top left */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ animation: "floatDelayed 7s ease-in-out infinite 1.2s" }}
        className="absolute top-10 left-0 sm:left-2 z-20 glass-card rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(59,130,246,0.15)] min-w-[152px] animate-float-delayed"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 gradient-blue rounded-xl flex items-center justify-center shadow-blue flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-medium">Logo ready</p>
            <p className="text-slate-800 font-bold text-[13px]">Brand kit ✓</p>
          </div>
        </div>
      </motion.div>

      {/* Floating GMB Card — bottom right */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-12 right-0 sm:right-2 z-20 glass-card rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(59,130,246,0.12)] min-w-[170px] animate-float"
        style={{ animationDelay: "2s" }}
      >
        <div>
          <p className="text-[10px] text-slate-400 font-medium mb-1">GMB Profile</p>
          <p className="text-slate-800 font-bold text-[13px] mb-1.5">Verified Listing</p>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">5.0 rated</span>
          </div>
        </div>
      </motion.div>

      {/* Floating performance badge — top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-6 right-2 z-20"
        style={{ animation: "float 5s ease-in-out infinite 3s" }}
      >
        <div className="glass-card rounded-xl px-3 py-2 shadow-soft flex items-center gap-2">
          <div className="relative w-8 h-8">
            <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="12" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <circle
                cx="16" cy="16" r="12"
                fill="none"
                stroke="url(#speedGrad)"
                strokeWidth="3"
                strokeDasharray={`${(98 / 100) * 75.4} 75.4`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1d4ed8" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-slate-700">98</span>
          </div>
          <div>
            <p className="text-[9px] text-slate-400 font-medium">PageSpeed</p>
            <p className="text-[11px] font-bold text-emerald-500">Excellent</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
