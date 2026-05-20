"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";

// ─── Data ────────────────────────────────────────────────────────────────────

const websiteDemos = [
  {
    id: "demo-astro",
    name: "Astro/Vastu Consultations",
    category: "Client Website",
    url: "astrobibhashmishra.com",
    link: "https://www.astrobibhashmishra.com/",
    description: "Vedic astrology consultation website with booking system, native services, and customized modules.",
    image: "/images/astro_hero.png",
    gradient: "from-indigo-900 via-blue-900 to-amber-700",
    categoryColor: "text-indigo-600",
    categoryBg: "bg-indigo-50",
    buttonText: "Visit Live Site"
  },
  {
    id: "demo-furniture",
    name: "E-commerce Furniture Store",
    category: "E-commerce Store",
    url: "embroideryroomz.com",
    link: "https://embroideryroomz.com/",
    description: "Handcrafted cushions, home textiles, and premium decor accessories designed to transform elegant living spaces.",
    image: "/images/furniture-store.png",
    gradient: "from-teal-800 via-emerald-900 to-amber-700",
    categoryColor: "text-emerald-600",
    categoryBg: "bg-emerald-50",
    buttonText: "Visit Live Store"
  },
  {
    id: "demo-studio-mira",
    name: "Studio Mira Showcase",
    category: "Design Portfolio",
    url: "studiomira.virtualcgo.com",
    link: "https://studio-mira.vercel.app/",
    description: "Modern design experience and interaction portfolio built for premium design boutiques.",
    image: "/images/studio-mira.png",
    gradient: "from-violet-500 via-purple-400 to-fuchsia-400",
    categoryColor: "text-violet-600",
    categoryBg: "bg-violet-50",
    buttonText: "Visit Design Demo"
  },
];

const logoDesigns = [
  { id: "logo-nova",   letter: "N", name: "Nova",   gradient: "from-blue-600 to-blue-400" },
  { id: "logo-pulse",  letter: "P", name: "Pulse",  gradient: "from-cyan-500 to-blue-400" },
  { id: "logo-arcade", letter: "A", name: "Arcade", gradient: "from-violet-500 to-purple-400" },
  { id: "logo-orbit",  letter: "O", name: "Orbit",  gradient: "from-blue-500 to-indigo-400" },
  { id: "logo-quartz", letter: "Q", name: "Quartz", gradient: "from-indigo-500 to-violet-400" },
  { id: "logo-vertex", letter: "V", name: "Vertex", gradient: "from-cyan-500 to-blue-500" },
];


// ─── Sub-components ───────────────────────────────────────────────────────────

/** Fake "website UI" lines rendered inside a browser mockup preview */
function WebsitePreview({ gradient }: { gradient: string }) {
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} p-4 flex flex-col gap-2`}>
      {/* Nav line */}
      <div className="flex items-center justify-between">
        <div className="h-2 w-16 bg-white/40 rounded-full" />
        <div className="flex gap-1.5">
          {[28, 20, 24, 20].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-white/30" style={{ width: w }} />
          ))}
        </div>
      </div>
      {/* Hero block */}
      <div className="mt-2 flex flex-col gap-1.5">
        <div className="h-2.5 w-3/4 bg-white/50 rounded-full" />
        <div className="h-2 w-1/2 bg-white/35 rounded-full" />
        <div className="h-1.5 w-2/3 bg-white/25 rounded-full" />
      </div>
      {/* Button row */}
      <div className="flex gap-2 mt-1">
        <div className="h-5 w-16 bg-white/50 rounded-lg" />
        <div className="h-5 w-16 bg-white/25 rounded-lg border border-white/30" />
      </div>
      {/* Cards row */}
      <div className="flex gap-1.5 mt-auto">
        {[1, 1, 1].map((_, i) => (
          <div key={i} className="flex-1 h-8 bg-white/20 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

function DemoCard({ demo, index }: { demo: typeof websiteDemos[0]; index: number }) {
  const isReal = true;
  const Wrapper = motion.a;

  return (
    <Wrapper
      href={demo.link}
      target="_blank"
      rel="noopener noreferrer"
      id={demo.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.015 }}
      className={`group bg-white border border-slate-200/70 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:border-blue-200/50 transition-all duration-300 flex flex-col ${isReal ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-100 bg-slate-50/80">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
          <div className="w-2 h-2 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-[10px] text-slate-400 font-medium bg-white border border-slate-200/60 rounded px-2 py-0.5">
            {demo.url}
          </span>
        </div>
      </div>

      {/* Preview area */}
      <div className="h-36 overflow-hidden relative">
        {demo.image ? (
          <Image src={demo.image} alt={demo.name} fill className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <WebsitePreview gradient={demo.gradient} />
        )}
      </div>

      {/* Card footer */}
      <div className="px-4 py-4 flex flex-col flex-grow justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <p className="text-slate-800 font-bold text-[14px] leading-tight">{demo.name}</p>
            <span
              className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap ${demo.categoryColor} ${demo.categoryBg}`}
            >
              {demo.category}
            </span>
          </div>
          <p className="text-slate-500 text-[12px] leading-relaxed line-clamp-2">
            {demo.description}
          </p>
        </div>
        
        <div className="flex justify-end mt-2">
          <div className="btn-primary text-white text-[11px] font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1.5 w-fit group-hover:shadow-[0_8px_16px_rgba(59,130,246,0.3)] transition-all">
            {demo.buttonText}
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}


function LogoCard({ logo, index }: { logo: typeof logoDesigns[0]; index: number }) {
  return (
    <motion.div
      id={logo.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group bg-white border border-slate-200/70 rounded-2xl p-6 flex flex-col items-center gap-3 shadow-card hover:shadow-card-hover hover:border-blue-200/50 transition-all duration-300 cursor-pointer"
    >
      {/* Logo icon */}
      <div className="relative">
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${logo.gradient} flex items-center justify-center shadow-blue`}
        >
          <span className="text-white font-bold text-2xl">{logo.letter}</span>
        </div>
        <div
          className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${logo.gradient} blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300`}
        />
      </div>

      <div className="text-center">
        <p className="text-slate-800 font-bold text-[15px]">{logo.name}</p>
        <p className="text-slate-400 text-[12px] font-medium mt-0.5">Brand Identity</p>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

type Tab = "websites" | "logos";

export default function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState<Tab>("websites");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="work" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8faff] via-white to-[#f0f6ff]" />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-blue-100/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-indigo-100/20 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 text-blue-600 text-[13px] font-semibold tracking-widest uppercase bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-5">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Our Work
          </div>

          <h2 className="text-[2.4rem] sm:text-[2.8rem] lg:text-[3rem] font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-4">
            See What We&apos;ve{" "}
            <span className="gradient-text">Already Built</span>
          </h2>

          <p className="text-slate-500 text-lg max-w-lg mx-auto">
            Explore real website demos and branding designs created for businesses.
          </p>
        </motion.div>

        {/* ── Tab Switcher ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-1 bg-white border border-slate-200/70 rounded-2xl p-1 shadow-soft">
            {(["websites", "logos"] as Tab[]).map((tab) => {
              const label = tab === "websites" ? "Website Demos" : "Logo Designs";
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  id={`tab-${tab}`}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-5 py-2 rounded-xl text-[14px] font-semibold transition-all duration-250 ${
                    isActive
                      ? "text-white shadow-blue"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tab-bg"
                      className="absolute inset-0 gradient-blue rounded-xl"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Content Grid ── */}
        <AnimatePresence mode="wait">
          {activeTab === "websites" ? (
            <motion.div
              key="websites"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {websiteDemos.map((demo, i) => (
                <DemoCard key={demo.id} demo={demo} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="logos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {logoDesigns.map((logo, i) => (
                <LogoCard key={logo.id} logo={logo} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="text-slate-400 text-[14px] mb-4">Want something like this for your business?</p>
          <motion.a
            href="#contact"
            id="showcase-cta"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary inline-flex items-center gap-2 text-white font-semibold px-7 py-3 rounded-2xl text-[15px]"
          >
            Start Your Project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
