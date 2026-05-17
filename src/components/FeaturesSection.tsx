"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    id: "feature-fast-delivery",
    title: "Fast Delivery",
    description: "Get your business online within 24 hours.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: "from-blue-600 to-blue-400",
    glow: "rgba(59,130,246,0.18)",
    detail: "24h turnaround",
  },
  {
    id: "feature-premium-branding",
    title: "Premium Branding",
    description: "Modern logos, app icons, and brand identity included.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    gradient: "from-indigo-600 to-blue-500",
    glow: "rgba(99,102,241,0.16)",
    detail: "Full brand kit",
  },
  {
    id: "feature-mobile-optimized",
    title: "Mobile Optimized",
    description: "Perfect responsive experience across all devices.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-sky-500 to-blue-400",
    glow: "rgba(14,165,233,0.16)",
    detail: "100% responsive",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8faff] via-[#eef4ff] to-[#f8faff]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-indigo-200/15 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          {/* Label */}
          <motion.div variants={headerVariants} className="inline-flex mb-5">
            <span className="inline-flex items-center gap-2 text-blue-600 text-[13px] font-semibold tracking-widest uppercase bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Why Us
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={headerVariants}
            className="text-[2.4rem] sm:text-[2.8rem] lg:text-[3rem] font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-5"
          >
            Built for{" "}
            <span className="gradient-text">Modern Businesses</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={headerVariants}
            className="text-slate-500 text-lg leading-relaxed max-w-xl mx-auto"
          >
            Everything you need to launch your online presence professionally.
          </motion.p>
        </motion.div>

        {/* ── Feature Cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              id={feature.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="group relative bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl p-8 shadow-card hover:shadow-card-hover hover:border-blue-200/60 transition-shadow duration-300 overflow-hidden cursor-default"
            >
              {/* Card glow on hover */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 30% 20%, ${feature.glow} 0%, transparent 65%)`,
                }}
              />

              {/* Subtle top border accent */}
              <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-400`} />

              {/* Icon */}
              <div className="relative mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-blue`}
                >
                  {feature.icon}
                </div>
                {/* Glow blob behind icon */}
                <div
                  className={`absolute inset-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-400`}
                />
              </div>

              {/* Detail badge */}
              <div className="inline-flex items-center gap-1.5 bg-blue-50/80 border border-blue-100/80 rounded-full px-2.5 py-1 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-blue-600 text-[11px] font-semibold">{feature.detail}</span>
              </div>

              {/* Title */}
              <h3 className="text-slate-900 font-bold text-[1.15rem] mb-3 tracking-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-[15px] leading-relaxed">
                {feature.description}
              </p>

              {/* Arrow link */}
              <div className="mt-6 flex items-center gap-1.5 text-blue-600 text-[13px] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                <span>Learn more</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom trust strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-wrap justify-center items-center gap-x-8 gap-y-4"
        >
          {[
            { icon: "🔒", text: "Secure & reliable" },
            { icon: "🚀", text: "Launch-ready code" },
            { icon: "💬", text: "Dedicated support" },
            { icon: "✅", text: "Satisfaction guaranteed" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-slate-500 text-[13px] font-medium">
              <span className="text-base">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
