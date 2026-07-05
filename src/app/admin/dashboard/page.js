"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

/* ── tokens ── */
const T = {
  bg: "#0a0f1c", card: "#0f172a", border: "#1e2d45",
  text: "#e2e8f0", muted: "#64748b", gold: "#B8953A", goldLight: "#D4AF5A",
  success: "#10b981",
};

/* ── Inline SVG stat card (no font dependency) ── */
function StatCard({ label, value, svg, color, trend }) {
  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "18px 20px", display: "flex", alignItems: "flex-start", gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 11, background: `${color}18`, border: `1px solid ${color}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d={svg} />
        </svg>
      </div>
      <div>
        <p style={{ color: T.muted, fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 5px" }}>{label}</p>
        <p style={{ color: T.text, fontSize: 26, fontWeight: 800, margin: 0, lineHeight: 1 }}>{value}</p>
        {trend && <p style={{ color: T.success, fontSize: 11, margin: "4px 0 0" }}>{trend}</p>}
      </div>
    </div>
  );
}

/* ── Quick link card ── */
function QCard({ label, desc, href, svg, color }) {
  return (
    <Link href={href}
      style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 15px", borderRadius: 12, background: T.card, border: `1px solid ${T.border}`, textDecoration: "none", transition: "all 0.18s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = `${color}0d`; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.card; e.currentTarget.style.transform = "translateY(0)"; }}>
      <div style={{ width: 36, height: 36, borderRadius: 9, background: `${color}15`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d={svg} />
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: T.text, fontSize: 13, fontWeight: 600, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</p>
        {desc && <p style={{ color: T.muted, fontSize: 11.5, margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{desc}</p>}
      </div>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" style={{ flexShrink: 0 }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </Link>
  );
}

const QUICK = [
  { label: "Hero Section",       desc: "Headline, CTA, video",       href: "/admin/pages/home",         svg: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",        color: "#B8953A" },
  { label: "Hero Video",         desc: "Replace background video",    href: "/admin/pages/hero-video",   svg: "M15 10l4.553-2.277A1 1 0 0121 8.67v6.66a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z", color: "#0ea5e9" },
  { label: "Announcements",      desc: "Top bar ticker items",        href: "/admin/pages/announcements",svg: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0", color: "#f59e0b" },
  { label: "Our Faculty",        desc: "Add / edit / remove staff",   href: "/admin/pages/our-faculty",  svg: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 7a4 4 0 100 8 4 4 0 000-8z", color: "#10b981" },
  { label: "Topper Details",     desc: "Board exam toppers & photos", href: "/admin/pages/topper-details",svg: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z", color: "#f59e0b" },
  { label: "Partners / Logos",   desc: "Logo marquee on home page",   href: "/admin/pages/partners",     svg: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75", color: "#8b5cf6" },
  { label: "Contact Info",       desc: "Phone, email, address",       href: "/admin/pages/contact",      svg: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z", color: "#ec4899" },
  { label: "Media Library",      desc: "Upload & manage files",       href: "/admin/media",              svg: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", color: "#14b8a6" },
];

/* ── ALL pages grouped ── */
const ALL_PAGES = [
  { group: "Home",          color: "#B8953A", items: [
    { label: "Hero & Stats",     href: "/admin/pages/home" },
    { label: "Hero Video",       href: "/admin/pages/hero-video" },
    { label: "Announcements",    href: "/admin/pages/announcements" },
    { label: "Partners / Logos", href: "/admin/pages/partners" },
  ]},
  { group: "About Us",      color: "#0ea5e9", items: [
    { label: "About School",          href: "/admin/pages/about-school" },
    { label: "Chairperson Message",   href: "/admin/pages/chairperson-message" },
    { label: "Pro-Vice Chairperson",  href: "/admin/pages/vice-chairperson-message" },
    { label: "Principal Message",     href: "/admin/pages/principal-message" },
    { label: "Leadership Team",       href: "/admin/pages/leadership-team" },
    { label: "Differentiating Factors",href: "/admin/pages/differentiating-factors" },
    { label: "Our Faculty",           href: "/admin/pages/our-faculty" },
    { label: "Amenities",             href: "/admin/pages/amenities" },
  ]},
  { group: "Academics",     color: "#10b981", items: [
    { label: "CBSE Curriculum",     href: "/admin/pages/academics-cbse" },
    { label: "Cambridge",           href: "/admin/pages/academics-cambridge" },
    { label: "Topper Details",      href: "/admin/pages/topper-details" },
  ]},
  { group: "Admission",     color: "#8b5cf6", items: [
    { label: "Registration Process", href: "/admin/pages/registration" },
  ]},
  { group: "Site-Wide",     color: "#ec4899", items: [
    { label: "Contact Information",  href: "/admin/pages/contact" },
  ]},
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [contentCount, setContentCount] = useState(null);
  const [mediaCount,   setMediaCount]   = useState(null);
  const now = new Date();
  const greeting = now.getHours() < 12 ? "Good morning" : now.getHours() < 17 ? "Good afternoon" : "Good evening";

  useEffect(() => {
    fetch("/api/content").then(r => r.ok ? r.json() : []).then(d => setContentCount(Array.isArray(d) ? d.length : 0)).catch(() => setContentCount(0));
    fetch("/api/media").then(r => r.ok ? r.json() : []).then(d => setMediaCount(Array.isArray(d) ? d.length : 0)).catch(() => setMediaCount(0));
  }, []);

  return (
    <AdminGuard>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ── Welcome ── */}
        <div style={{ background: "linear-gradient(135deg,#0D2545 0%,#0a1e3d 60%,#071629 100%)", borderRadius: 16, padding: "24px 28px", marginBottom: 24, border: "1px solid #1e2d45", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(184,149,58,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.05) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(184,149,58,0.07)", filter: "blur(50px)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 20, background: "rgba(184,149,58,0.12)", border: "1px solid rgba(184,149,58,0.25)", marginBottom: 12 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
              <span style={{ color: "#D4AF5A", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>{greeting}</span>
            </div>
            <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>Welcome back, {session?.user?.name || "Admin"} 👋</h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>Pacific World School · Content Management System</p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12, marginBottom: 24 }}>
          <StatCard label="Saved Sections" value={contentCount ?? "…"} svg="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M8 11h8M8 15h5" color="#B8953A" trend="MongoDB Atlas" />
          <StatCard label="Media Files"    value={mediaCount ?? "…"}   svg="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" color="#0ea5e9" />
          <StatCard label="Total Pages"    value="25+"                  svg="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" color="#10b981" />
          <StatCard label="Site Status"    value="Live"                 svg="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" color="#10b981" trend="All systems normal" />
        </div>

        {/* ── Quick Access ── */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h2 style={{ color: T.text, fontSize: 14, fontWeight: 700, margin: 0 }}>Quick Access</h2>
              <p style={{ color: T.muted, fontSize: 12, margin: "2px 0 0" }}>Most-used content editors</p>
            </div>
            <Link href="/admin/pages" style={{ color: T.goldLight, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>View all →</Link>
          </div>
          <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 10 }}>
            {QUICK.map(q => <QCard key={q.href} {...q} />)}
          </div>
        </div>

        {/* ── All Pages ── */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}` }}>
            <h2 style={{ color: T.text, fontSize: 14, fontWeight: 700, margin: 0 }}>All Page Sections</h2>
            <p style={{ color: T.muted, fontSize: 12, margin: "2px 0 0" }}>Jump to any editor</p>
          </div>
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
            {ALL_PAGES.map(grp => (
              <div key={grp.group}>
                <p style={{ color: T.muted, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 8px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: grp.color, flexShrink: 0, display: "inline-block" }} />
                  {grp.group}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {grp.items.map(p => (
                    <Link key={p.href} href={p.href}
                      style={{ display: "inline-flex", alignItems: "center", padding: "5px 12px", borderRadius: 20, border: `1px solid ${T.border}`, color: T.muted, fontSize: 12, fontWeight: 500, textDecoration: "none", transition: "all 0.18s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = grp.color; e.currentTarget.style.color = grp.color; e.currentTarget.style.background = `${grp.color}0d`; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; e.currentTarget.style.background = "transparent"; }}>
                      {p.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tip ── */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px", borderRadius: 10, background: "rgba(184,149,58,0.06)", border: "1px solid rgba(184,149,58,0.2)" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D4AF5A" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p style={{ color: "rgba(212,175,90,0.8)", fontSize: 12.5, margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: "#D4AF5A" }}>Tip:</strong> Changes save instantly to MongoDB Atlas. Refresh the public site to see updates. Use the Media Library to upload images and copy URLs.
          </p>
        </div>

      </div>
    </AdminGuard>
  );
}
