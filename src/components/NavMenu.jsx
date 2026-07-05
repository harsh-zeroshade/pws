"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const NAV = [
  { label: "Home", href: "/", icon: "⌂" },
  {
    label: "About Us", icon: "◈",
    sub: [
      { label: "About School",                  href: "/about/school" },
      { label: "Chairperson's Message",         href: "/about/chairperson-message" },
      { label: "Pro-Vice Chairperson",          href: "/about/vice-chairperson-message" },
      { label: "Principal's Message",           href: "/about/principal-message" },
      { label: "Differentiating Factors",       href: "/about/differentiating-factors" },
      { label: "Core Team",                     href: "/about/leadership-team" },
      { label: "Our Faculty",                   href: "/about/our-faculty" },
      { label: "Amenities",                     href: "/about/ameneties" },
    ],
  },
  {
    label: "Academics", icon: "✦",
    sub: [
      { label: "CBSE Curriculum",               href: "/academics/cbse" },
      { label: "Cambridge International",       href: "/academics/cambridge" },
      { label: "Teacher Engagement Program",    href: "/academics/teacher-engagement-program" },
      { label: "Examination Policy (III–XI)",   href: "/academics/examination-policy" },
      { label: "Examination Policy (I–II)",     href: "/academics/examination-policy-2" },
      { label: "Topper Details",                href: "/academics/topper-details" },
    ],
  },
  {
    label: "Beyond Academics", icon: "◎",
    sub: [
      { label: "Specialized Sports",            href: "/beyond-academics/specialized-sports" },
      { label: "Trips & Excursions",            href: "/beyond-academics/trips" },
      { label: "Community Service",             href: "/beyond-academics/community-service-and-social-work" },
      { label: "Hobby Clubs",                   href: "/beyond-academics/hobby-clubs" },
      { label: "Houses",                        href: "/beyond-academics/houses" },
    ],
  },
  {
    label: "Admission", icon: "→",
    sub: [
      { label: "Brochure",                      href: "/admission/brochure" },
      { label: "Admission Policy",              href: "/admission/admission-policy" },
      { label: "Registration Process",          href: "/admission/registration-process" },
      { label: "Fee Structure (Nursery–XII)",   href: "/admission/fee-structure" },
      { label: "Cambridge Fee Structure",       href: "/admission/cambridge-fee-structure" },
      { label: "School Schedule",               href: "/admission/school-schedule" },
    ],
  },
  {
    label: "Committees", icon: "⊞",
    sub: [
      { label: "Managing Committee",            href: "/committee/managing-committee-members" },
      { label: "Disaster Management",           href: "/committee/disaster-management-committee" },
      { label: "POCSO Committee",               href: "/committee/pocso-committee" },
      { label: "School Curriculum",             href: "/committee/school-curriculum-committee" },
      { label: "Discipline Committee",          href: "/committee/discipline-committee-members" },
      { label: "Student Council",               href: "/committee/student-council-committee" },
    ],
  },
  { label: "Awards & Achievements", href: "/achievements", icon: "★" },
  { label: "Gallery",               href: "/gallery",      icon: "◻" },
  { label: "Contact Us",            href: "/contact",      icon: "◉" },
  {
    label: "More", icon: "⋯",
    sub: [
      { label: "PACMUN",            href: "/pacmun/pacific-mun" },
      { label: "Blog",              href: "/blogs" },
      { label: "Alumni",            href: "/school-alumni/school-alumni" },
      { label: "Career",            href: "/career/career" },
      { label: "Rule Book",         href: "https://admin.pacificworldschool.com/storage/pdf/1774951400_PWS_almanac_2026-2027.pdf", external: true },
      { label: "Mandatory Disclosure", href: "/mandatory-disclosure/mandatory-public-disclosure" },
    ],
  },
];

const CTAs = [
  { label: "Apply 2026–27",   href: "/admission/brochure",                                      primary: true },
  { label: "ERP Login",       href: "https://www.pwscampuscare.in/",                             primary: false },
  { label: "Admission Enquiry",href:"https://www.pwscampuscare.in//Logon/TPLoginRegistrationEnq",primary: false },
];

export default function NavMenu({ onClose }) {
  const [openIdx, setOpenIdx] = useState(null);
  const toggle = (i) => setOpenIdx(prev => prev === i ? null : i);

  return (
    <div style={{
      height: "100%",
      background: "linear-gradient(160deg, #0a0f1e 0%, #0D2545 60%, #0a1628 100%)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Subtle grid overlay */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(184,149,58,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.04) 1px,transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Glow */}
      <div aria-hidden style={{
        position: "absolute", top: -100, right: -100,
        width: 300, height: 300, borderRadius: "50%",
        background: "rgba(184,149,58,0.06)", filter: "blur(80px)", pointerEvents: "none",
      }} />

      {/* ── Header ── */}
      <div style={{
        padding: "20px 22px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0, position: "relative", zIndex: 1,
      }}>
        <Link href="/" onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/pws-logo-dark.png" alt="Pacific World School" width={110} height={38} style={{ objectFit: "contain" }} />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, letterSpacing: "0.1em" }}>MENU</span>
          <button
            onClick={onClose}
            style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M3 3L15 15M15 3L3 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Scrollable Nav ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 0", position: "relative", zIndex: 1, scrollbarWidth: "none" }}>
        <style>{`.nav-scroll::-webkit-scrollbar{display:none}`}</style>
        <ul className="nav-scroll" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map((item, i) => {
            const hasChildren = item.sub && item.sub.length > 0;
            const isOpen = openIdx === i;

            return (
              <li key={i}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggle(i)}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", gap: 12,
                        padding: "11px 14px", borderRadius: 12, border: "none", cursor: "pointer",
                        background: isOpen ? "rgba(184,149,58,0.1)" : "transparent",
                        color: isOpen ? "#D4AF5A" : "rgba(255,255,255,0.75)",
                        fontFamily: "inherit", textAlign: "left",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                      onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = "transparent"; }}
                    >
                      <span style={{ fontSize: 13, opacity: 0.5, width: 16, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
                      <span style={{ flex: 1, fontSize: 14, fontWeight: 600, letterSpacing: "0.01em" }}>{item.label}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "flex", alignItems: "center", color: isOpen ? "#D4AF5A" : "rgba(255,255,255,0.3)", flexShrink: 0 }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div style={{
                            margin: "4px 0 4px 14px",
                            padding: "6px 0 6px 16px",
                            borderLeft: "1px solid rgba(184,149,58,0.25)",
                          }}>
                            {item.sub.map((s, si) => (
                              <Link
                                key={si}
                                href={s.href}
                                target={s.external ? "_blank" : undefined}
                                rel={s.external ? "noopener noreferrer" : undefined}
                                onClick={onClose}
                                style={{
                                  display: "flex", alignItems: "center", gap: 10,
                                  padding: "8px 12px", borderRadius: 9,
                                  color: "rgba(255,255,255,0.6)", fontSize: 13,
                                  textDecoration: "none", transition: "all 0.15s",
                                  fontWeight: 500,
                                }}
                                onMouseEnter={e => { e.currentTarget.style.color = "#D4AF5A"; e.currentTarget.style.background = "rgba(184,149,58,0.08)"; }}
                                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.background = "transparent"; }}
                              >
                                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#B8953A", opacity: 0.6, flexShrink: 0 }} />
                                {s.label}
                                {s.external && (
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4, marginLeft: "auto" }}>
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                                  </svg>
                                )}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "11px 14px", borderRadius: 12,
                      color: "rgba(255,255,255,0.75)", fontSize: 14, fontWeight: 600,
                      textDecoration: "none", transition: "all 0.2s", letterSpacing: "0.01em",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                  >
                    <span style={{ fontSize: 13, opacity: 0.5, width: 16, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Footer CTAs ── */}
      <div style={{
        padding: "14px 16px 20px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex", flexDirection: "column", gap: 8,
        flexShrink: 0, position: "relative", zIndex: 1,
      }}>
        {CTAs.map(cta => (
          <Link
            key={cta.label}
            href={cta.href}
            onClick={onClose}
            target={cta.href.startsWith("http") ? "_blank" : undefined}
            rel={cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
            style={{
              display: "block", textAlign: "center",
              padding: cta.primary ? "12px" : "10px",
              borderRadius: 12, textDecoration: "none",
              fontSize: 13, fontWeight: 700,
              transition: "all 0.2s", fontFamily: "inherit",
              ...(cta.primary
                ? { background: "linear-gradient(135deg,#B8953A,#D4AF5A)", color: "#fff", boxShadow: "0 6px 20px rgba(184,149,58,0.35)" }
                : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.1)" }
              ),
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
          >
            {cta.label}
          </Link>
        ))}

        {/* School info strip */}
        <div style={{ marginTop: 4, display: "flex", justifyContent: "center", gap: 16 }}>
          {[["CBSE", "2133246"], ["Cambridge", "IA380"]].map(([label, code]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p style={{ color: "#D4AF5A", fontSize: 11, fontWeight: 700, margin: 0 }}>{code}</p>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
