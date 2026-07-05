"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import Link from "next/link";

const T = { bg:"#0a0f1c", card:"#0f172a", border:"#1e2d45", text:"#e2e8f0", muted:"#64748b", gold:"#B8953A", goldLight:"#D4AF5A" };

const ALL_GROUPS = [
  {
    group: "Home Page", color: "#B8953A",
    desc: "Core homepage sections",
    pages: [
      { label: "Hero Section & Stats",   desc: "Headline, CTA buttons, stats bar",      href: "/admin/pages/home" },
      { label: "Hero Video",             desc: "Upload or replace background video",     href: "/admin/pages/hero-video" },
      { label: "Announcements / Ticker", desc: "Scrolling items in the top bar",         href: "/admin/pages/announcements" },
      { label: "Partners / Logos",       desc: "Logo marquee on home page",              href: "/admin/pages/partners" },
    ],
  },
  {
    group: "About Us", color: "#0ea5e9",
    desc: "About section and leadership",
    pages: [
      { label: "About School",             desc: "Hero, mission & vision text",          href: "/admin/pages/about-school" },
      { label: "Chairperson's Message",    desc: "Portrait and message paragraphs",      href: "/admin/pages/chairperson-message" },
      { label: "Pro-Vice Chairperson",     desc: "Portrait, quote and message",          href: "/admin/pages/vice-chairperson-message" },
      { label: "Principal's Message",      desc: "Portrait and message paragraphs",      href: "/admin/pages/principal-message" },
      { label: "Leadership Team",          desc: "Leader cards with photos & quotes",    href: "/admin/pages/leadership-team" },
      { label: "Differentiating Factors",  desc: "The 10 pillars with descriptions",     href: "/admin/pages/differentiating-factors" },
      { label: "Our Faculty",              desc: "Full faculty table — 200+ members",    href: "/admin/pages/our-faculty" },
      { label: "Amenities",                desc: "Campus facility cards with images",    href: "/admin/pages/amenities" },
    ],
  },
  {
    group: "Academics", color: "#10b981",
    desc: "Curriculum and results",
    pages: [
      { label: "CBSE Curriculum",          desc: "Hero, highlights, description",        href: "/admin/pages/academics-cbse" },
      { label: "Cambridge Education",      desc: "Hero, affiliation, highlights",        href: "/admin/pages/academics-cambridge" },
      { label: "Topper Details",           desc: "Board toppers with photos & scores",   href: "/admin/pages/topper-details" },
    ],
  },
  {
    group: "Admission", color: "#8b5cf6",
    desc: "Admission process and fees",
    pages: [
      { label: "Registration Process",     desc: "Steps, documents, fees",              href: "/admin/pages/registration" },
    ],
  },
  {
    group: "Site-Wide", color: "#ec4899",
    desc: "Global settings used across all pages",
    pages: [
      { label: "Contact Information",      desc: "Phone, email, address, social links",  href: "/admin/pages/contact" },
      { label: "School Settings",          desc: "CBSE/Cambridge codes, name, tagline",  href: "/admin/settings" },
    ],
  },
];

function PageCard({ label, desc, href, color }) {
  return (
    <Link href={href}
      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", borderRadius: 11, background: T.card, border: `1px solid ${T.border}`, textDecoration: "none", transition: "all 0.18s", gap: 10 }}
      onMouseEnter={e => { e.currentTarget.style.background = `${color}0a`; e.currentTarget.style.borderColor = `${color}55`; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = T.card; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}>
      <div style={{ minWidth: 0 }}>
        <p style={{ color: T.text, fontSize: 13, fontWeight: 600, margin: 0 }}>{label}</p>
        {desc && <p style={{ color: T.muted, fontSize: 11.5, margin: "2px 0 0" }}>{desc}</p>}
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" style={{ flexShrink: 0 }}>
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </Link>
  );
}

export default function PagesIndex() {
  return (
    <AdminGuard>
      <div style={{ maxWidth: 1000 }}>

        {/* Header */}
        <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ width: 3, height: 22, borderRadius: 2, background: `linear-gradient(to bottom,${T.gold},${T.goldLight})`, display: "inline-block" }} />
            <h1 style={{ color: T.text, fontSize: 20, fontWeight: 800, margin: 0 }}>All Pages</h1>
          </div>
          <p style={{ color: T.muted, fontSize: 13, margin: "0 0 0 13px" }}>
            Select any section to edit its content. Changes save instantly to MongoDB.
          </p>
        </div>

        {/* Groups */}
        {ALL_GROUPS.map(group => (
          <div key={group.group} style={{ marginBottom: 28 }}>
            {/* Group header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: group.color, flexShrink: 0 }} />
              <h2 style={{ color: T.text, fontSize: 13, fontWeight: 700, margin: 0 }}>{group.group}</h2>
              <span style={{ color: T.muted, fontSize: 12 }}>— {group.desc}</span>
              <div style={{ flex: 1, height: 1, background: T.border }} />
              <span style={{ color: T.muted, fontSize: 11 }}>{group.pages.length} pages</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 10 }}>
              {group.pages.map(page => (
                <PageCard key={page.href} {...page} color={group.color} />
              ))}
            </div>
          </div>
        ))}

        {/* Bottom note */}
        <div style={{ padding: "14px 18px", borderRadius: 10, background: "rgba(184,149,58,0.06)", border: "1px solid rgba(184,149,58,0.2)", display: "flex", alignItems: "flex-start", gap: 10 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D4AF5A" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          <p style={{ color: "rgba(212,175,90,0.8)", fontSize: 12.5, margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: "#D4AF5A" }}>Note:</strong> Public pages fall back to built-in defaults when no CMS content is saved. The live site always renders correctly even with an empty database.
          </p>
        </div>
      </div>
    </AdminGuard>
  );
}
