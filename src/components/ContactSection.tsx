"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const } },
});

const contactCards = [
  {
    id:     "contact-email",
    label:  "Email Us",
    value:  "hello@virtualcgo.app",
    href:   "mailto:hello@virtualcgo.app",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 4.5H16V13.5C16 14.05 15.55 14.5 15 14.5H3C2.45 14.5 2 14.05 2 13.5V4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 4.5L9 10L16 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id:     "contact-whatsapp",
    label:  "WhatsApp",
    value:  "+91 98765 43210",
    href:   "https://wa.me/919876543210",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
        <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9c0 1.56.45 3.06 1.26 4.35L1.5 16.5l3.24-1.23A7.44 7.44 0 009 16.5c4.14 0 7.5-3.36 7.5-7.5S13.14 1.5 9 1.5zm0 13.5c-1.35 0-2.61-.39-3.69-1.05l-.27-.15-2.01.75.75-1.98-.18-.3A6 6 0 013 9c0-3.315 2.685-6 6-6s6 2.685 6 6-2.685 6-6 6zm3.33-4.44c-.18-.09-1.065-.525-1.23-.585-.165-.06-.285-.09-.405.09-.12.18-.465.585-.57.705-.105.12-.21.135-.39.045-.18-.09-.765-.285-1.455-.9-.54-.48-.9-1.065-1.005-1.245-.105-.18-.012-.276.078-.366.081-.081.18-.21.27-.315.09-.105.12-.18.18-.3.06-.12.03-.225-.015-.315-.045-.09-.405-.975-.555-1.335-.15-.36-.3-.3-.405-.306-.105-.006-.225-.006-.345-.006-.12 0-.315.045-.48.225-.165.18-.63.615-.63 1.5 0 .885.645 1.74.735 1.86.09.12 1.275 1.95 3.09 2.73.432.186.768.297 1.032.381.432.138.825.117 1.134.072.345-.051 1.065-.435 1.215-.855.15-.42.15-.78.105-.855-.045-.075-.165-.12-.345-.21z"/>
      </svg>
    ),
  },
  {
    id:     "contact-instagram",
    label:  "Instagram",
    value:  "@virtualcgo",
    href:   "https://instagram.com/virtualcgo",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="13" cy="5" r="0.8" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function ContactSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 lg:py-36 overflow-hidden bg-white"
    >
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] opacity-40"
          style={{ background: "radial-gradient(ellipse at center bottom, rgba(193,211,254,0.5) 0%, transparent 65%)" }}
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
            Get In Touch
          </span>
          <h2
            className="font-bold text-slate-900 tracking-[-0.025em] leading-[1.1] mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 2.9rem)" }}
          >
            Let&apos;s build your{" "}
            <span className="gradient-text">online presence</span>
          </h2>
          <p className="text-slate-500 text-[17px] leading-relaxed max-w-[440px] mx-auto">
            Share your idea. We&apos;ll have a plan back within the hour.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start max-w-5xl mx-auto">

          {/* Left — contact cards */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-4"
          >
            {/* Info blurb */}
            <div className="mb-4">
              <p className="text-slate-600 text-[15px] leading-[1.7]">
                Have a project in mind? Reach out via any channel below and we&apos;ll get back to you same day.
              </p>
            </div>

            {contactCards.map((c, i) => (
              <motion.a
                key={c.id}
                id={c.id}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-[#f7f9ff] border border-slate-200/60 hover:border-[#c1d3fe] hover:bg-[#edf2fb]/70 hover:shadow-soft transition-all duration-250"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl gradient-blue flex items-center justify-center text-white shadow-blue group-hover:shadow-blue-md transition-shadow duration-250">
                  {c.icon}
                </div>
                <div>
                  <p className="text-slate-400 text-[12px] font-medium mb-0.5">{c.label}</p>
                  <p className="text-slate-800 font-semibold text-[14.5px] group-hover:text-blue-600 transition-colors duration-150">{c.value}</p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3.5 8H12.5M9.5 5L12.5 8L9.5 11" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.a>
            ))}

            {/* Response time badge */}
            <div className="flex items-center gap-2.5 mt-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-emerald-700 text-[13px] font-medium">Typically responds within <strong>1 hour</strong></p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div
              className="bg-white border border-slate-200/70 rounded-3xl p-7 sm:p-9"
              style={{
                boxShadow: "0 2px 8px rgba(100,116,139,0.07), 0 12px 40px rgba(100,116,139,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <p className="text-slate-900 font-semibold text-[16px] mb-6 tracking-[-0.01em]">Send us a message</p>

              <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold text-slate-600 tracking-wide">Name</label>
                    <input
                      type="text"
                      placeholder="Aryan Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-[#f7f9ff] border border-slate-200/70 text-[14.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#abc4ff] focus:ring-2 focus:ring-[#abc4ff]/30 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold text-slate-600 tracking-wide">Email</label>
                    <input
                      type="email"
                      placeholder="aryan@business.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#f7f9ff] border border-slate-200/70 text-[14.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#abc4ff] focus:ring-2 focus:ring-[#abc4ff]/30 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-slate-600 tracking-wide">Business Name</label>
                  <input
                    type="text"
                    placeholder="Your Business"
                    className="w-full px-4 py-3 rounded-xl bg-[#f7f9ff] border border-slate-200/70 text-[14.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#abc4ff] focus:ring-2 focus:ring-[#abc4ff]/30 transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-slate-600 tracking-wide">Tell us about your project</label>
                  <textarea
                    rows={4}
                    placeholder="I need a website for my restaurant in Mumbai..."
                    className="w-full px-4 py-3 rounded-xl bg-[#f7f9ff] border border-slate-200/70 text-[14.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#abc4ff] focus:ring-2 focus:ring-[#abc4ff]/30 transition-all duration-200 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="btn-primary mt-1 w-full py-3.5 rounded-xl text-white font-semibold text-[15px] flex items-center justify-center gap-2.5"
                >
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2.5 13.5L13.5 2.5M13.5 2.5H7.5M13.5 2.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>

                <p className="text-slate-400 text-[12px] text-center font-medium">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Footer strip */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-24 pt-8 border-t border-slate-200/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg gradient-blue flex items-center justify-center shadow-blue">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L4.5 8.5L10 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-slate-500 text-[13.5px] font-medium tracking-[-0.01em]">
              Virtual <span className="text-blue-600 font-semibold">CGO</span>
            </span>
          </div>
          <p className="text-slate-400 text-[13px]">
            © {new Date().getFullYear()} Virtual CGO. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Instagram"].map((l) => (
              <a key={l} href="#" className="text-slate-400 hover:text-slate-600 text-[13px] font-medium transition-colors duration-150">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
