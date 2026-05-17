"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const } },
});

const projects = [
  {
    id:       "proj-astro",
    name:     "Astro Bibhash Mishra",
    tag:      "Vedic Astrology",
    url:      "astrobibhashmishra.com",
    href:     "https://www.astrobibhashmishra.com/",
    preview:  "/images/astro_hero.png",
    hasImage: true,
    color:    "#7c3aed",
    bg:       "#f3f0ff",
  },
  {
    id:       "proj-college",
    name:     "College Management System",
    tag:      "EdTech SaaS",
    url:      "college-mgmt.app",
    href:     "#",
    preview:  null,
    hasImage: false,
    color:    "#0891b2",
    bg:       "#ecfeff",
  },
  {
    id:       "proj-retail",
    name:     "RetailEdge POS",
    tag:      "Retail Software",
    url:      "retailedge.in",
    href:     "#",
    preview:  null,
    hasImage: false,
    color:    "#059669",
    bg:       "#ecfdf5",
  },
  {
    id:       "proj-consult",
    name:     "ConsultPro Agency",
    tag:      "Consulting",
    url:      "consultpro.io",
    href:     "#",
    preview:  null,
    hasImage: false,
    color:    "#d97706",
    bg:       "#fffbeb",
  },
];

function SkeletonPreview({ color, bg }: { color: string; bg: string }) {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: bg }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-black/5 bg-white/50">
        <div className="w-2 h-2 rounded-full bg-red-300/70" />
        <div className="w-2 h-2 rounded-full bg-amber-300/70" />
        <div className="w-2 h-2 rounded-full bg-emerald-300/70" />
        <div className="flex-1 mx-3 h-2.5 bg-white/60 rounded-md" />
      </div>
      {/* Content skeleton */}
      <div className="flex-1 p-4 space-y-3">
        {/* Hero bar */}
        <div className="h-8 rounded-lg w-3/4" style={{ background: `${color}22` }} />
        <div className="h-4 rounded-md w-5/6" style={{ background: `${color}14` }} />
        <div className="h-4 rounded-md w-2/3" style={{ background: `${color}10` }} />
        <div className="flex gap-2 pt-2">
          <div className="h-7 w-24 rounded-lg" style={{ background: color, opacity: 0.25 }} />
          <div className="h-7 w-20 rounded-lg" style={{ background: `${color}18` }} />
        </div>
        <div className="grid grid-cols-3 gap-2 pt-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-14 rounded-xl bg-white/60" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div className="p-2">
                <div className="h-3 w-3/4 rounded mb-1.5" style={{ background: `${color}20` }} />
                <div className="h-2 w-1/2 rounded" style={{ background: `${color}14` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ShowcaseSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="work"
      ref={ref}
      className="relative py-28 lg:py-36 overflow-hidden bg-white"
    >
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-30"
          style={{ background: "radial-gradient(ellipse at center, rgba(193,211,254,0.5) 0%, transparent 65%)" }}
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
            Portfolio
          </span>
          <h2
            className="font-bold text-slate-900 tracking-[-0.025em] leading-[1.1] mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 2.9rem)" }}
          >
            What we&apos;ve{" "}
            <span className="gradient-text">already built</span>
          </h2>
          <p className="text-slate-500 text-[17px] leading-relaxed max-w-[420px] mx-auto">
            Real projects. Real results. Delivered fast.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              id={p.id}
              variants={fadeUp(0.1 + i * 0.09)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group relative bg-white border border-slate-200/60 rounded-3xl overflow-hidden cursor-default flex flex-col"
              style={{
                boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 20px rgba(100,116,139,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              {/* Preview area */}
              <div className="relative w-full overflow-hidden rounded-t-3xl" style={{ height: "180px" }}>
                {p.hasImage && p.preview ? (
                  <>
                    <img
                      src={p.preview}
                      alt={`${p.name} preview`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Browser chrome overlay at top */}
                    <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-3 py-2 bg-white/80 backdrop-blur-sm border-b border-black/5">
                      <div className="w-2 h-2 rounded-full bg-red-300/80" />
                      <div className="w-2 h-2 rounded-full bg-amber-300/80" />
                      <div className="w-2 h-2 rounded-full bg-emerald-300/80" />
                      <div className="flex-1 mx-2 h-2 bg-slate-200/70 rounded-sm" />
                    </div>
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </>
                ) : (
                  <SkeletonPreview color={p.color} bg={p.bg} />
                )}
              </div>

              {/* Card info */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-slate-900 font-semibold text-[14.5px] leading-snug tracking-[-0.01em]">
                    {p.name}
                  </h3>
                  {p.hasImage && (
                    <span className="flex-shrink-0 w-2 h-2 rounded-full mt-1.5 bg-emerald-400" title="Live site" />
                  )}
                </div>

                <span
                  className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full mb-4 w-fit"
                  style={{ background: p.bg, color: p.color }}
                >
                  {p.tag}
                </span>

                <div className="flex items-center gap-1.5 mt-auto">
                  <span className="text-slate-400 text-[11.5px] font-medium truncate">{p.url}</span>
                </div>

                {p.href && p.href !== "#" && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold border border-slate-200/80 text-slate-600 hover:text-blue-600 hover:border-[#c1d3fe] hover:bg-[#edf2fb]/60 transition-all duration-200"
                  >
                    Visit Site
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
                {(!p.href || p.href === "#") && (
                  <div className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-medium bg-slate-50 text-slate-400 border border-slate-100 cursor-default select-none">
                    In Progress
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
