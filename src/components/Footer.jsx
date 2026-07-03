"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const cols = [
  {
    heading: "About Us",
    links: [
      { label: "About School",            href: "/about/school" },
      { label: "Chairperson's Message",   href: "/about/chairperson-message" },
      { label: "Principal's Message",     href: "/about/principal-message" },
      { label: "Leadership Team",         href: "/about/leadership-team" },
      { label: "Differentiating Factors", href: "/about/differentiating-factors" },
    ],
  },
  {
    heading: "Academics",
    links: [
      { label: "CBSE Curriculum",          href: "/academics/cbse" },
      { label: "Cambridge International",  href: "/academics/cambridge" },
      { label: "Teacher Engagement",       href: "/academics/teacher-engagement-program" },
      { label: "Examination Policy",       href: "/academics/examination-policy" },
      { label: "Topper Details",           href: "/academics/topper-details" },
    ],
  },
  {
    heading: "Campus Life",
    links: [
      { label: "Specialized Sports",  href: "/beyond-academics/specialized-sports" },
      { label: "Trips & Excursions",  href: "/beyond-academics/trips" },
      { label: "Hobby Clubs",         href: "/beyond-academics/hobby-clubs" },
      { label: "Houses",              href: "/beyond-academics/houses" },
      { label: "Community Service",   href: "/beyond-academics/community-service" },
    ],
  },
  {
    heading: "Admissions",
    links: [
      { label: "Apply 2026–27",        href: "/admission/brochure" },
      { label: "Admission Policy",     href: "/admission/admission-policy" },
      { label: "Registration Process", href: "/admission/registration-process" },
      { label: "Fee Structure",        href: "/admission/fee-structure" },
      { label: "School Schedule",      href: "/admission/school-schedule" },
    ],
  },
];

const socials = [
  { label: "Facebook",  icon: "https://cdn.simpleicons.org/facebook/ffffff",  href: "https://www.facebook.com/PacificWorldSchool" },
  { label: "Instagram", icon: "https://cdn.simpleicons.org/instagram/ffffff", href: "https://www.instagram.com/pacificworldschoolgnw" },
  { label: "YouTube",   icon: "https://cdn.simpleicons.org/youtube/ffffff",   href: "https://www.youtube.com/@PacificWorldSchool" },
  { label: "LinkedIn",  icon: "https://cdn.simpleicons.org/linkedin/ffffff",  href: "https://www.linkedin.com/school/pacific-world-school/" },
];

export default function Footer() {
  return (
    <footer className="bg-[#060F1E] text-white border-t border-white/5">

      {/* CTA banner */}
      <div className="border-b border-white/8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16 py-12 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-display font-bold text-2xl text-white mb-1">Admissions Open — Session 2026–27</p>
            <p className="text-white/40 text-[14px] font-sans">Limited seats available. Apply early to secure your child's future.</p>
          </div>
          <div className="flex gap-4 flex-shrink-0">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/admission/brochure"
                className="px-6 py-3 bg-[#B8953A] text-white font-bold rounded-xl text-[14px] font-sans hover:bg-[#a07d2e] transition-colors block">
                Apply Now
              </Link>
            </motion.div>
            <motion.a href="tel:8899117704" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl text-[14px] font-sans hover:bg-white/15 transition-colors border border-white/10">
              📞 8899117704
            </motion.a>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16 pt-16 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

          {/* Brand col */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image src="/pws-logo.png" alt="Pacific World School" width={92} height={40} className="object-contain" />
            </Link>
            <p className="text-white/35 text-[13px] leading-relaxed mb-6 font-sans">
              Premier CBSE &amp; Cambridge international school in Greater Noida West. Excellence · Empathy · Empowerment.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center hover:bg-[#B8953A] hover:border-[#B8953A] transition-all"
                  aria-label={s.label}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.icon} alt={s.label} width={13} height={13} className="opacity-60 hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="font-sans font-semibold text-[10px] uppercase tracking-[0.2em] text-white/30 mb-5">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}
                      className="text-white/45 hover:text-[#D4AF5A] text-[13px] font-sans transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#B8953A] after:transition-all after:duration-300 hover:after:w-full">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="border-t border-white/8 pt-8 pb-4 grid sm:grid-cols-3 gap-4 mb-8 text-[13px]">
          <div className="flex items-center gap-3 text-white/40 font-sans">
            <span>📍</span>
            <span>HS-02, Tech Zone-4, Greater Noida West — 201308</span>
          </div>
          <a href="tel:8899117704" className="flex items-center gap-3 text-white/40 hover:text-white/80 font-sans transition-colors">
            <span>📞</span><span>8899117704 (Admissions)</span>
          </a>
          <a href="mailto:info@pacificworldschool.com" className="flex items-center gap-3 text-white/40 hover:text-white/80 font-sans transition-colors">
            <span>✉️</span><span>info@pacificworldschool.com</span>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-[12px] font-sans">© 2026 Pacific World School · All Rights Reserved</p>
          <div className="flex gap-6">
            <a href="https://www.pacificworldschool.com" target="_blank" rel="noopener noreferrer"
              className="text-white/25 hover:text-white/50 text-[12px] font-sans transition-colors">Terms &amp; Conditions</a>
            <a href="https://www.pacificworldschool.com" target="_blank" rel="noopener noreferrer"
              className="text-white/25 hover:text-white/50 text-[12px] font-sans transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
