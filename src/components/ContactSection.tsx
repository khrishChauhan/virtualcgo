"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const } },
});

const contactCards = [
  {
    id:     "contact-email",
    label:  "Email Us",
    value:  "connect@virtualcgo.com",
    href:   "mailto:connect@virtualcgo.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 4.5H16V13.5C16 14.05 15.55 14.5 15 14.5H3C2.45 14.5 2 14.05 2 13.5V4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 4.5L9 10L16 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id:     "contact-whatsapp",
    label:  "WhatsApp Business",
    value:  "7428-505-344",
    href:   "https://wa.me/917428505344",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.293 1.493 4.85 1.495 5.51 0 9.99-4.474 9.993-9.978.002-2.668-1.03-5.176-2.905-7.054C16.66 1.737 14.153.7 11.49.7 5.976.7 1.497 5.179 1.495 10.685c-.001 1.7.452 3.354 1.31 4.8l-.398 1.452.392 1.433 3.848-1.416z" />
      </svg>
    ),
  },
  {
    id:     "contact-instagram",
    label:  "Instagram",
    value:  "@virtualcgo",
    href:   "https://www.instagram.com/virtualcgo/?hl=en",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="13" cy="5" r="0.8" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id:     "contact-linkedin",
    label:  "LinkedIn",
    value:  "Virtual CGO",
    href:   "https://www.linkedin.com/company/virtualcgo/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
];

export default function ContactSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (!name.trim()) {
      setStatus({ type: "error", message: "Name is required." });
      return;
    }
    if (!email.trim()) {
      setStatus({ type: "error", message: "Email is required." });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    if (!message.trim()) {
      setStatus({ type: "error", message: "Message/project details are required." });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: null });

    try {
      const formData = new FormData();
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');
      formData.append('_subject', 'New VirtualCGO Contact Form Submission');
      formData.append('_autoresponse', 'Thank you for contacting VirtualCGO. We have received your submission and will contact you soon.');
      formData.append('Name', name);
      formData.append('Email', email);
      formData.append('Business Name', businessName);
      formData.append('Message', message);
      const response = await fetch('https://formsubmit.co/ajax/connect@virtualcgo.com', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully. We will get back to you soon."
        });
        setName("");
        setEmail("");
        setBusinessName("");
        setMessage("");
      } else {
        throw new Error("Form submission failed.");
      }
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "Oops! Something went wrong. Please try again or reach out to us directly."
      });
    } finally {
      setLoading(false);
    }
  };

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

            {contactCards.map((c) => (
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

              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {status.message && (
                  <div className={`p-4 rounded-xl text-[14px] font-semibold border ${
                    status.type === "success" 
                      ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
                      : "bg-rose-50 border-rose-100 text-rose-800"
                  }`}>
                    {status.message}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold text-slate-600 tracking-wide">Name</label>
                    <input
                      type="text"
                      placeholder="Aryan Sharma"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#f7f9ff] border border-slate-200/70 text-[14.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#abc4ff] focus:ring-2 focus:ring-[#abc4ff]/30 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold text-slate-600 tracking-wide">Email</label>
                    <input
                      type="email"
                      placeholder="aryan@business.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#f7f9ff] border border-slate-200/70 text-[14.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#abc4ff] focus:ring-2 focus:ring-[#abc4ff]/30 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-slate-600 tracking-wide">Business Name</label>
                  <input
                    type="text"
                    placeholder="Your Business"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#f7f9ff] border border-slate-200/70 text-[14.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#abc4ff] focus:ring-2 focus:ring-[#abc4ff]/30 transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-slate-600 tracking-wide">Tell us about your project</label>
                  <textarea
                    rows={4}
                    placeholder="I need a website for my restaurant in Mumbai..."
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#f7f9ff] border border-slate-200/70 text-[14.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#abc4ff] focus:ring-2 focus:ring-[#abc4ff]/30 transition-all duration-200 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={loading ? undefined : { scale: 1.015 }}
                  whileTap={loading ? undefined : { scale: 0.985 }}
                  className={`btn-primary mt-1 w-full py-3.5 rounded-xl text-white font-semibold text-[15px] flex items-center justify-center gap-2.5 ${
                    loading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2.5 13.5L13.5 2.5M13.5 2.5H7.5M13.5 2.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {loading && (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
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
            <Image src="/images/logo-virtualcgo.png" alt="Virtual CGO" width={100} height={30} className="h-6 w-auto object-contain" />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-slate-400 text-[13px] font-medium">
              © {new Date().getFullYear()} Virtual CGO. All rights reserved.
            </p>
            <p className="text-slate-400/70 text-[11.5px] mt-1 font-normal">
              Virtual CGO is operated under <span className="text-slate-500 font-semibold">Effimony LLP</span>.
            </p>
          </div>
          <div className="flex items-center gap-5 flex-wrap justify-center sm:justify-end">
            <a href="/privacy" className="text-slate-400 hover:text-slate-600 text-[13px] font-medium transition-colors duration-150">Privacy</a>
            <a href="/terms" className="text-slate-400 hover:text-slate-600 text-[13px] font-medium transition-colors duration-150">Terms</a>
            <a href="https://www.instagram.com/virtualcgo/?hl=en" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 text-[13px] font-medium transition-colors duration-150">Instagram</a>
            <a href="https://www.linkedin.com/company/virtualcgo/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 text-[13px] font-medium transition-colors duration-150">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}
