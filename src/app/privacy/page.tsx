"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen bg-slate-50/50 text-slate-700 font-sans selection:bg-blue-100 selection:text-blue-800">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-blue-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[400px] bg-indigo-100/20 rounded-full blur-[100px]" />
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Virtual CGO home">
            <div className="w-8 h-8 rounded-xl gradient-blue flex items-center justify-center text-white shadow-blue group-hover:scale-105 transition-transform duration-200">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8L6 12L14 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-slate-850 font-bold text-[16px] tracking-[-0.01em]">
              Virtual <span className="text-blue-600">CGO</span>
            </span>
          </Link>
          <Link 
            href="/"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-550 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 px-4 py-2 rounded-xl transition-all duration-200"
          >
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-card"
        >
          {/* Document Title */}
          <div className="border-b border-slate-100 pb-8 mb-8">
            <span className="text-blue-600 text-[12px] font-bold tracking-widest uppercase bg-blue-50 border border-blue-100/50 rounded-full px-3.5 py-1.5">
              Legal Document
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4 leading-tight">
              Privacy Policy
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-4 text-[13px] text-slate-450 font-medium">
              <p>Company: <span className="text-slate-600 font-semibold">Virtual CGO by Effinomy LLP</span></p>
              <p>Effective Date: <span className="text-slate-600 font-semibold">20th May 2026</span></p>
            </div>
          </div>

          {/* Intro Statement */}
          <div className="text-[15.5px] leading-relaxed text-slate-600 mb-8 space-y-4">
            <p>
              At Virtual CGO (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we are committed to protecting the privacy and confidentiality of visitors, clients, partners, and users of our website and services.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, store, disclose, and protect your information when you visit our website or engage with our services.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-10">
            
            {/* Section 1 */}
            <section className="scroll-mt-24">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-[14px] flex items-center justify-center">1</span>
                Information We Collect
              </h2>
              <div className="pl-9 space-y-4">
                <p className="text-[14.5px] leading-relaxed text-slate-600">
                  We may collect the following types of information:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="font-bold text-slate-800 text-[14px] mb-2.5">A. Personal Information</p>
                    <p className="text-[13.5px] text-slate-500 mb-3">Information voluntarily provided by users including:</p>
                    <ul className="space-y-1.5 text-[13.5px] font-medium text-slate-700">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Full Name
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Phone Number
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Email Address
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Company/Business Name
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Designation
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Address or Location Details
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Inquiry or Service Request Details
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="font-bold text-slate-800 text-[14px] mb-2.5">B. Non-Personal Information</p>
                    <p className="text-[13.5px] text-slate-500 mb-3">Automatically collected information may include:</p>
                    <ul className="space-y-1.5 text-[13.5px] font-medium text-slate-700">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> IP Address
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Browser Type
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Device Information
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Website Usage Data
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Cookies and Tracking Info
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Date and Time of Visit
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="scroll-mt-24">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-[14px] flex items-center justify-center">2</span>
                How We Use Your Information
              </h2>
              <div className="pl-9 space-y-3">
                <p className="text-[14.5px] leading-relaxed text-slate-600 mb-2">
                  Virtual CGO may use collected information to:
                </p>
                <ul className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-[14px] text-slate-650">
                  {[
                    "Respond to inquiries and business requests",
                    "Provide and improve services",
                    "Schedule meetings and consultations",
                    "Share proposals, updates, and business communications",
                    "Process client on-boarding and support requests",
                    "Improve website functionality and user experience",
                    "Maintain internal records and compliance",
                    "Send promotional or marketing communication (where permitted)"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="scroll-mt-24">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-[14px] flex items-center justify-center">3</span>
                Cookies and Tracking Technologies
              </h2>
              <div className="pl-9 space-y-4">
                <p className="text-[14.5px] leading-relaxed text-slate-600">
                  Our website may use cookies and similar technologies to improve website performance and user experience.
                </p>
                <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100/50">
                  <p className="text-[13.5px] text-slate-500 font-semibold mb-2">Cookies may be used to:</p>
                  <ul className="grid sm:grid-cols-2 gap-2 text-[13.5px] font-medium text-slate-700">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Remember user preferences
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Analyse website traffic
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Improve website navigation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Measure marketing effectiveness
                    </li>
                  </ul>
                </div>
                <p className="text-[13.5px] leading-relaxed text-slate-500 italic">
                  Users may disable cookies through browser settings, though certain website features may be affected.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="scroll-mt-24">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-[14px] flex items-center justify-center">4</span>
                Sharing of Information
              </h2>
              <div className="pl-9 space-y-4">
                <p className="text-[14.5px] leading-relaxed text-slate-600">
                  Virtual CGO does not sell, rent, or trade personal information. We may share information only under the following circumstances:
                </p>
                <ul className="space-y-3.5 text-[14px] text-slate-650">
                  {[
                    "With authorized employees or service providers assisting in operations",
                    "With recruitment or business partners where required for service delivery",
                    "When required by law, court order, or government authority",
                    "To protect the legal rights, safety, or property of Virtual CGO"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-slate-350 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-[13px] text-slate-500">
                  All third parties are expected to maintain appropriate confidentiality and security standards.
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="scroll-mt-24">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-[14px] flex items-center justify-center">5</span>
                Data Security
              </h2>
              <div className="pl-9 space-y-4">
                <p className="text-[14.5px] leading-relaxed text-slate-600">
                  We take reasonable administrative, technical, and organizational measures to safeguard personal information against unauthorized access, misuse, alteration, disclosure, loss, or destruction.
                </p>
                <div className="flex gap-3 p-4 rounded-2xl bg-amber-50/60 border border-amber-100 text-amber-800 text-[13px] leading-relaxed">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>
                    No digital platform or internet transmission can be guaranteed completely secure.
                  </span>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="scroll-mt-24">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-[14px] flex items-center justify-center">6</span>
                Data Retention
              </h2>
              <div className="pl-9 space-y-3">
                <p className="text-[14.5px] leading-relaxed text-slate-600">
                  We retain information only for as long as necessary to fulfil business and contractual obligations, comply with legal and regulatory requirements, and resolve disputes.
                </p>
                <p className="text-[13.5px] text-slate-500 italic">
                  Information no longer required may be securely deleted or anonymized.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="scroll-mt-24">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-[14px] flex items-center justify-center">7</span>
                Third-Party Links
              </h2>
              <div className="pl-9 space-y-3">
                <p className="text-[14.5px] leading-relaxed text-slate-600">
                  Our website may contain links to third-party websites or platforms.
                </p>
                <p className="text-[14.5px] leading-relaxed text-slate-600">
                  Virtual CGO is not responsible for the privacy practices, policies, or content of external websites. Users are encouraged to review their respective privacy policies.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="scroll-mt-24">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-[14px] flex items-center justify-center">8</span>
                User Rights
              </h2>
              <div className="pl-9 space-y-3">
                <p className="text-[14.5px] leading-relaxed text-slate-600">
                  Subject to applicable law, users may have the right to request access to their personal information, request correction or update of their information, request deletion of personal data, or withdraw consent for marketing communications.
                </p>
                <p className="text-[13.5px] text-slate-500">
                  Requests may be made using the contact details in the section below.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="scroll-mt-24">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-[14px] flex items-center justify-center">9</span>
                Children&apos;s Privacy
              </h2>
              <div className="pl-9 space-y-3">
                <p className="text-[14.5px] leading-relaxed text-slate-600">
                  Virtual CGO services and website are not directed toward children under 18 years of age. We do not knowingly collect personal information from minors.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section className="scroll-mt-24">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-[14px] flex items-center justify-center">10</span>
                Changes to this Privacy Policy
              </h2>
              <div className="pl-9 space-y-3">
                <p className="text-[14.5px] leading-relaxed text-slate-600">
                  Virtual CGO reserves the right to update or modify this Privacy Policy at any time. Updated versions will be posted on the website with the revised effective date.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section className="scroll-mt-24 border-t border-slate-100 pt-8">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-[14px] flex items-center justify-center">11</span>
                Contact Us
              </h2>
              <div className="pl-9">
                <p className="text-[14.5px] leading-relaxed text-slate-600 mb-6">
                  For questions, concerns, or privacy-related requests, please contact:
                </p>
                <div className="bg-[#f7f9ff] border border-slate-200/50 rounded-2xl p-6 max-w-md space-y-4">
                  <p className="font-bold text-slate-850 text-[15px]">Virtual CGO</p>
                  <div className="space-y-3 text-[14px]">
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:Connect@virtualcgo.com" className="text-blue-600 hover:underline font-semibold">Connect@virtualcgo.com</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 00.996.808H12a1 1 0 00.996-.808l.548-2.2a1 1 0 01.94-.725H19a2 2 0 012 2v3a2 2 0 01-2 2h-1.07a4 4 0 00-3.142 1.54L11 16h-.93l-2.793-2.793a4 4 0 00-3.143-1.54H3V5z" />
                      </svg>
                      <a href="tel:+917428505344" className="text-slate-800 hover:text-blue-600 transition-colors font-medium">7428-505-344</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <a href="https://virtualcgo.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">virtualcgo.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </motion.article>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 bg-white py-8 text-center text-[13px] text-slate-400 font-medium">
        <p>© {new Date().getFullYear()} Virtual CGO. All rights reserved.</p>
        <p className="mt-1 text-[11.5px] text-slate-400/80">Virtual CGO is operated under Effinomy LLP.</p>
      </footer>

    </div>
  );
}
