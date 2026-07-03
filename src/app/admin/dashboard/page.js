"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { StatCard, QuickLinkCard } from "@/components/admin/ContentEditor";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const QUICK = [
  { label:"Hero Section",         desc:"Headline, CTA, video",         href:"/admin/pages/home",                   icon:"home",         color:"#695CFE" },
  { label:"Hero Video",           desc:"Replace background video",      href:"/admin/pages/hero-video",             icon:"videocam",     color:"#0ea5e9" },
  { label:"Announcements",        desc:"Top bar ticker items",          href:"/admin/pages/announcements",          icon:"campaign",     color:"#f59e0b" },
  { label:"Our Faculty",          desc:"Add / edit / remove staff",     href:"/admin/pages/our-faculty",            icon:"groups",       color:"#10b981" },
  { label:"Topper Details",       desc:"Board exam toppers & photos",   href:"/admin/pages/topper-details",         icon:"emoji_events", color:"#f59e0b" },
  { label:"Partners / Logos",     desc:"Logo marquee on home page",     href:"/admin/pages/partners",               icon:"handshake",    color:"#8b5cf6" },
  { label:"Contact Information",  desc:"Phone, email, address",         href:"/admin/pages/contact",                icon:"contact_phone",color:"#ec4899" },
  { label:"Media Library",        desc:"Upload & manage files",         href:"/admin/media",                        icon:"perm_media",   color:"#14b8a6" },
];

const PAGE_SHORTCUTS = [
  { label:"About School",     href:"/admin/pages/about-school" },
  { label:"Chairperson",      href:"/admin/pages/chairperson-message" },
  { label:"Pro-Vice Chair",   href:"/admin/pages/vice-chairperson-message" },
  { label:"Principal",        href:"/admin/pages/principal-message" },
  { label:"Leadership Team",  href:"/admin/pages/leadership-team" },
  { label:"Differentiating",  href:"/admin/pages/differentiating-factors" },
  { label:"Amenities",        href:"/admin/pages/amenities" },
  { label:"CBSE",             href:"/admin/pages/academics-cbse" },
  { label:"Cambridge",        href:"/admin/pages/academics-cambridge" },
  { label:"Registration",     href:"/admin/pages/registration" },
];

const C = {
  card: "#1e293b", border:"#334155", text:"#f1f5f9", muted:"#94a3b8",
  subtle:"#64748b", accent:"#695CFE", bg:"#0f172a",
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [contentCount, setContentCount] = useState(null);
  const [mediaCount,   setMediaCount]   = useState(null);
  const now = new Date();
  const greeting = now.getHours() < 12 ? "Good morning" : now.getHours() < 17 ? "Good afternoon" : "Good evening";

  useEffect(() => {
    fetch("/api/content")
      .then(r => r.ok ? r.json() : [])
      .then(d => setContentCount(Array.isArray(d) ? d.length : 0))
      .catch(() => setContentCount(0));
    fetch("/api/media")
      .then(r => r.ok ? r.json() : [])
      .then(d => setMediaCount(Array.isArray(d) ? d.length : 0))
      .catch(() => setMediaCount(0));
  }, []);

  return (
    <AdminGuard>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>

        {/* ── Welcome banner ── */}
        <div style={{ background:"linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#1e293b 100%)", borderRadius:16, padding:"28px 32px", marginBottom:28, border:`1px solid #3730a3`, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(105,92,254,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(105,92,254,0.07) 1px,transparent 1px)", backgroundSize:"40px 40px", pointerEvents:"none" }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <p style={{ color:"rgba(165,180,252,0.7)", fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em", margin:"0 0 6px" }}>{greeting}</p>
            <h1 style={{ color:"#fff", fontSize:26, fontWeight:800, margin:"0 0 8px", fontFamily:"Poppins,sans-serif" }}>
              Welcome back, {session?.user?.name || "Admin"} 👋
            </h1>
            <p style={{ color:"rgba(199,210,254,0.65)", fontSize:13.5, margin:0 }}>
              Pacific World School · Content Management System
            </p>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:14, marginBottom:28 }}>
          <StatCard label="Saved Sections"  value={contentCount ?? "—"} icon="database"      color="#695CFE" trend="MongoDB Atlas" />
          <StatCard label="Media Files"     value={mediaCount   ?? "—"} icon="perm_media"    color="#0ea5e9" />
          <StatCard label="Total Pages"     value="25+"                 icon="article"       color="#10b981" />
          <StatCard label="Site Status"     value="Live"                icon="check_circle"  color="#10b981" trend="All systems normal" />
        </div>

        {/* ── Quick access ── */}
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, overflow:"hidden", marginBottom:20 }}>
          <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <h2 style={{ color:C.text, fontSize:15, fontWeight:700, margin:0 }}>Quick Access</h2>
              <p style={{ color:C.muted, fontSize:12, margin:"3px 0 0" }}>Most-used content editors</p>
            </div>
            <a href="/admin/pages" style={{ color:C.accent, fontSize:12, fontWeight:600, textDecoration:"none" }}>View all pages →</a>
          </div>
          <div style={{ padding:"18px 20px", display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:10 }}>
            {QUICK.map(q => <QuickLinkCard key={q.href} {...q} />)}
          </div>
        </div>

        {/* ── All pages shortcuts ── */}
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, overflow:"hidden", marginBottom:20 }}>
          <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}` }}>
            <h2 style={{ color:C.text, fontSize:15, fontWeight:700, margin:0 }}>All Page Sections</h2>
            <p style={{ color:C.muted, fontSize:12, margin:"3px 0 0" }}>Jump to any editor</p>
          </div>
          <div style={{ padding:"14px 20px", display:"flex", flexWrap:"wrap", gap:8 }}>
            {PAGE_SHORTCUTS.map(p => (
              <a key={p.href} href={p.href}
                style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"6px 14px", borderRadius:20, border:`1px solid ${C.border}`, color:C.muted, fontSize:12.5, fontWeight:500, textDecoration:"none", background:"transparent", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=C.accent; e.currentTarget.style.color=C.accent; e.currentTarget.style.background="rgba(105,92,254,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.muted; e.currentTarget.style.background="transparent"; }}>
                {p.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Info tip ── */}
        <div style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"14px 18px", borderRadius:12, background:"rgba(245,158,11,0.07)", border:"1px solid rgba(245,158,11,0.25)" }}>
          <span className="material-symbols-rounded" style={{ color:"#f59e0b", fontSize:18, flexShrink:0, marginTop:1 }}>tips_and_updates</span>
          <p style={{ color:"rgba(253,230,138,0.8)", fontSize:12.5, margin:0, lineHeight:1.6 }}>
            <strong style={{ color:"#fcd34d" }}>Tip:</strong> Changes save instantly to MongoDB Atlas and reflect on the live site after a page refresh. Use the Media Library to upload images and copy URLs for use in any field.
          </p>
        </div>

      </div>
    </AdminGuard>
  );
}
