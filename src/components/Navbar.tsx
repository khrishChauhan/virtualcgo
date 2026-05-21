"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "About",    href: "#about" },
  { label: "Work",     href: "#work" },
  { label: "Pricing",  href: "#pricing" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2.5" : "py-4"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className={`flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-500 ${
            scrolled
              ? "glass-nav shadow-medium"
              : "bg-white/60 backdrop-blur-xl border border-white/70 shadow-soft"
          }`}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group" aria-label="Virtual CGO home">
   <Image src="/images/logo-virtualcgo.png" alt="Virtual CGO" width={120} height={32} className="h-8 w-auto object-contain" priority />
</a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.38 }}
                className="relative px-4 py-2 text-[13.5px] font-medium text-slate-500 hover:text-slate-900 rounded-xl transition-colors duration-150 group"
              >
                {link.label}
                <span className="absolute inset-0 bg-slate-100/80 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
              </motion.a>
            ))}
          </nav>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.38 }}
            className="hidden md:flex items-center gap-3"
          >
            <motion.a
              href="#contact"
              id="navbar-cta"
              className="btn-primary text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-xl inline-flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M8 4L11 7L8 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </motion.div>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-btn"
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            <div className="flex flex-col gap-[5px]">
              <span className={`block w-[18px] h-[1.5px] bg-slate-700 rounded-full transition-all duration-250 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block w-[18px] h-[1.5px] bg-slate-700 rounded-full transition-all duration-250 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-[18px] h-[1.5px] bg-slate-700 rounded-full transition-all duration-250 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={mobileOpen ? { height: "auto", opacity: 1, y: 0 } : { height: 0, opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="md:hidden overflow-hidden mt-2"
        >
          <div className="glass-card rounded-2xl px-3 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-600 hover:text-slate-900 font-medium text-[14px] px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 pb-1 px-1">
              <a
                href="#contact"
                className="btn-primary text-white text-[14px] font-semibold px-5 py-3 rounded-xl flex items-center justify-center gap-2"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M8 4L11 7L8 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
