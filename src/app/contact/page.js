"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

const contactInfo = [
  { icon: "📍", label: "Address",    val: "HS-02, Tech Zone-4, Near Ek Murti Chowk, Greater Noida West — 201308", href: "#" },
  { icon: "📞", label: "Admissions", val: "8899117704",                         href: "tel:8899117704" },
  { icon: "📱", label: "Front Desk", val: "9643370000 / 9643380000",             href: "tel:9643370000" },
  { icon: "✉️", label: "Email",      val: "info@pacificworldschool.com",         href: "mailto:info@pacificworldschool.com" },
];

const socials = [
  { label: "Facebook",  icon: "https://cdn.simpleicons.org/facebook/0D2545",  href: "https://www.facebook.com/PacificWorldSchool" },
  { label: "Instagram", icon: "https://cdn.simpleicons.org/instagram/0D2545", href: "https://www.instagram.com/pacificworldschoolgnw" },
  { label: "YouTube",   icon: "https://cdn.simpleicons.org/youtube/0D2545",   href: "https://www.youtube.com/@PacificWorldSchool" },
  { label: "LinkedIn",  icon: "https://cdn.simpleicons.org/linkedin/0D2545",  href: "https://www.linkedin.com/school/pacific-world-school/" },
];

export default function ContactPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", grade: "", message: "" });

  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <PageLayout>
      <PageHero
        title="Contact Us"
        subtitle="We're here to answer any questions about admissions, curriculum, or life at Pacific World School."
        breadcrumb={[{ label: "Contact Us" }]}
      />

      <section ref={ref} className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16">

            {/* Left — contact info */}
            <div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}
                className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-[#B8953A]" />
                <span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">Get in Touch</span>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-black text-[#0D2545] leading-tight mb-10"
                style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
                Visit Us or <em className="text-[#B8953A] not-italic">Reach Out</em>
              </motion.h2>

              <div className="space-y-5 mb-10">
                {contactInfo.map((c, i) => (
                  <motion.a key={c.label} href={c.href}
                    initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#F5F0E8] border border-[#e8e4d9] flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-[#0D2545] group-hover:border-[#0D2545] transition-all">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-[10px] text-[#9a9a8a] uppercase tracking-widest font-sans">{c.label}</p>
                      <p className="text-[#0D2545] font-semibold text-[14px] font-sans group-hover:text-[#B8953A] transition-colors mt-0.5">{c.val}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Socials */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}
                className="flex gap-3 mb-10">
                {socials.map((s) => (
                  <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    className="w-11 h-11 rounded-xl bg-[#F5F0E8] border border-[#e8e4d9] flex items-center justify-center hover:bg-[#0D2545] hover:border-[#0D2545] transition-all group"
                    aria-label={s.label}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.icon} alt={s.label} width={16} height={16} className="group-hover:brightness-0 group-hover:invert transition-all" />
                  </motion.a>
                ))}
              </motion.div>

              {/* Map */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 }}
                className="rounded-3xl overflow-hidden border border-[#e8e4d9] shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0!2d77.4268!3d28.6469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5b1e2a2a3b5%3A0x4f8f6f8f8f8f8f8f!2sPacific%20World%20School!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%" height="260" style={{ border: 0, display: "block" }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  title="Pacific World School Location"
                />
              </motion.div>
            </div>

            {/* Right — form */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="p-10 rounded-3xl bg-[#FAFAF8] border border-[#e8e4d9]"
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0D2545] to-[#1a3a6e] flex items-center justify-center text-4xl mb-6 shadow-xl">✓</div>
                  <h3 className="font-display font-black text-[#0D2545] text-2xl mb-3">Message Sent!</h3>
                  <p className="text-[#6b6b5a] text-[15px] font-sans max-w-xs leading-relaxed">Our admissions team will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="font-display font-black text-[#0D2545] text-2xl mb-8">Send a Message</h3>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    {[
                      { name: "name",    label: "Parent / Guardian Name", placeholder: "Your full name",            type: "text" },
                      { name: "email",   label: "Email Address",          placeholder: "you@email.com",             type: "email" },
                      { name: "phone",   label: "Phone Number",           placeholder: "+91 XXXXX XXXXX",           type: "tel" },
                      { name: "grade",   label: "Child's Grade",          placeholder: "e.g. LKG or Class 5",       type: "text" },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="block text-[11px] font-semibold text-[#9a9a8a] uppercase tracking-wider mb-2 font-sans">{f.label}</label>
                        <input
                          type={f.type} placeholder={f.placeholder} required
                          value={form[f.name]}
                          onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#e8e4d9] text-[#0D2545] placeholder-[#c0bdb0] text-[14px] font-sans focus:outline-none focus:border-[#B8953A] focus:ring-1 focus:ring-[#B8953A]/30 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mb-6">
                    <label className="block text-[11px] font-semibold text-[#9a9a8a] uppercase tracking-wider mb-2 font-sans">Message (optional)</label>
                    <textarea rows={4} placeholder="Any questions or additional information..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#e8e4d9] text-[#0D2545] placeholder-[#c0bdb0] text-[14px] font-sans focus:outline-none focus:border-[#B8953A] focus:ring-1 focus:ring-[#B8953A]/30 transition-all resize-none"
                    />
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="flex-1 py-4 bg-[#0D2545] text-white font-bold rounded-2xl text-[14px] font-sans hover:bg-[#1a3a6e] transition-colors shadow-lg">
                      Send Message
                    </motion.button>
                    <motion.a href="tel:8899117704" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="flex-1 py-4 bg-[#B8953A] text-white font-bold rounded-2xl text-[14px] font-sans hover:bg-[#a07d2e] transition-colors shadow-lg text-center">
                      📞 Call Now
                    </motion.a>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
