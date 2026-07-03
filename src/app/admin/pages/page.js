"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import Link from "next/link";

const PAGE_LIST = [
  {
    group: "Home Page",
    color: "#B8953A",
    pages: [
      { label: "Hero Section & Video",  desc: "Headline, CTA buttons, background video", href: "/admin/pages/home" },
      { label: "Hero Video",            desc: "Upload / replace the full-screen video",   href: "/admin/pages/hero-video" },
      { label: "Announcements Ticker",  desc: "Scrolling items in the top bar",           href: "/admin/pages/announcements" },
      { label: "Partners / Logos",      desc: "Logo marquee on home page",                href: "/admin/pages/partners" },
    ],
  },
  {
    group: "About Us",
    color: "#1a3a6e",
    pages: [
      { label: "About School",              desc: "Hero, mission, vision sections",          href: "/admin/pages/about-school" },
      { label: "Chairperson's Message",     desc: "Profile photo and message paragraphs",    href: "/admin/pages/chairperson-message" },
      { label: "Pro-Vice Chairperson",      desc: "Profile and message",                     href: "/admin/pages/vice-chairperson-message" },
      { label: "Principal's Message",       desc: "Profile photo and message paragraphs",    href: "/admin/pages/principal-message" },
      { label: "Leadership Team",           desc: "Add / edit / remove leaders",             href: "/admin/pages/leadership-team" },
      { label: "Differentiating Factors",   desc: "Edit the 10 pillars",                     href: "/admin/pages/differentiating-factors" },
      { label: "Our Faculty",               desc: "Full faculty list with roles",            href: "/admin/pages/our-faculty" },
      { label: "Amenities",                 desc: "Campus facilities with images",           href: "/admin/pages/amenities" },
    ],
  },
  {
    group: "Academics",
    color: "#2a5a3e",
    pages: [
      { label: "CBSE Curriculum",       desc: "Hero, highlights, description",    href: "/admin/pages/academics-cbse" },
      { label: "Cambridge Education",   desc: "Hero, affiliation, highlights",    href: "/admin/pages/academics-cambridge" },
      { label: "Topper Details",        desc: "Board toppers with photos",        href: "/admin/pages/topper-details" },
    ],
  },
  {
    group: "Admission",
    color: "#7c3d8f",
    pages: [
      { label: "Registration Process",  desc: "Steps, documents, fees",           href: "/admin/pages/registration" },
    ],
  },
  {
    group: "Site-Wide",
    color: "#b84a1a",
    pages: [
      { label: "Contact Information",   desc: "Phone, email, address, social",    href: "/admin/pages/contact" },
    ],
  },
];

export default function PagesIndex() {
  return (
    <AdminGuard>
      <div style={{ maxWidth: 1000 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px", fontFamily: "Georgia,serif" }}>All Pages</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>Select any page section to edit its content. Changes save to MongoDB instantly.</p>
        </div>
        {PAGE_LIST.map(group => (
          <div key={group.group} style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: group.color, flexShrink: 0 }} />
              <h2 style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>{group.group}</h2>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10 }}>
              {group.pages.map(page => (
                <Link key={page.href} href={page.href}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 10, background: "#1a2235", border: `1px solid ${group.color}20`, textDecoration: "none", transition: "all 0.18s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${group.color}10`; e.currentTarget.style.borderColor = `${group.color}50`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#1a2235"; e.currentTarget.style.borderColor = `${group.color}20`; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div>
                    <p style={{ color: "#fff", fontSize: 13, fontWeight: 700, margin: "0 0 3px" }}>{page.label}</p>
                    <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 11, margin: 0 }}>{page.desc}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={group.color} strokeWidth="2" style={{ flexShrink: 0, marginLeft: 10 }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminGuard>
  );
}
