"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ── nav tree ── */
const TOP_NAV = [
  { label: "Dashboard",    href: "/admin/dashboard",  icon: "dashboard" },
  { label: "Media Library",href: "/admin/media",       icon: "perm_media" },
  { label: "Settings",     href: "/admin/settings",    icon: "settings" },
];

const PAGE_GROUPS = [
  { group: "Home", icon: "home", items: [
    { label: "Hero & Stats",       href: "/admin/pages/home" },
    { label: "Hero Video",         href: "/admin/pages/hero-video" },
    { label: "Announcements",      href: "/admin/pages/announcements" },
    { label: "Partners / Logos",   href: "/admin/pages/partners" },
  ]},
  { group: "About Us", icon: "info", items: [
    { label: "About School",       href: "/admin/pages/about-school" },
    { label: "Chairperson",        href: "/admin/pages/chairperson-message" },
    { label: "Pro-Vice Chair",     href: "/admin/pages/vice-chairperson-message" },
    { label: "Principal",          href: "/admin/pages/principal-message" },
    { label: "Leadership Team",    href: "/admin/pages/leadership-team" },
    { label: "Differentiating",    href: "/admin/pages/differentiating-factors" },
    { label: "Our Faculty",        href: "/admin/pages/our-faculty" },
    { label: "Amenities",          href: "/admin/pages/amenities" },
  ]},
  { group: "Academics", icon: "school", items: [
    { label: "CBSE",               href: "/admin/pages/academics-cbse" },
    { label: "Cambridge",          href: "/admin/pages/academics-cambridge" },
    { label: "Toppers",            href: "/admin/pages/topper-details" },
  ]},
  { group: "Admission", icon: "how_to_reg", items: [
    { label: "Registration",       href: "/admin/pages/registration" },
  ]},
  { group: "Site-Wide", icon: "public", items: [
    { label: "Contact Info",       href: "/admin/pages/contact" },
  ]},
];

export default function AdminShell({ children }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(true);
  const [openGroups, setOpenGroups] = useState({});
  const [search, setSearch] = useState("");

  /* restore theme + sidebar state */
  useEffect(() => {
    const saved = localStorage.getItem("admin-theme");
    const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(saved ? saved === "dark" : sysDark);
    if (window.innerWidth > 768) setCollapsed(false);
    else setCollapsed(true);
  }, []);

  const toggleTheme = () => {
    setDark(d => {
      localStorage.setItem("admin-theme", !d ? "dark" : "light");
      return !d;
    });
  };

  const toggleGroup = (g) => setOpenGroups(p => ({ ...p, [g]: !p[g] }));

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  const inPagesSection = pathname.startsWith("/admin/pages");

  /* filter search */
  const allPages = PAGE_GROUPS.flatMap(g => g.items);
  const searchResults = search.trim()
    ? allPages.filter(p => p.label.toLowerCase().includes(search.toLowerCase()))
    : [];

  /* theme tokens */
  const t = dark ? {
    bg:       "#111827",
    sidebar:  "#1f2937",
    border:   "#3B475C",
    text:     "#F1F5F9",
    muted:    "#A6B7D2",
    secondary:"#3D4859",
    hover:    "#48566a",
    active:   "#695CFE",
    shadow:   "rgba(0,0,0,0.3)",
  } : {
    bg:       "#f9fafb",
    sidebar:  "#ffffff",
    border:   "#E2E8F0",
    text:     "#1F2936",
    muted:    "#798EAE",
    secondary:"#ECECFD",
    hover:    "#e2e2fb",
    active:   "#695CFE",
    shadow:   "rgba(0,0,0,0.05)",
  };

  const sidebarW = collapsed ? 72 : 260;

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:t.bg, color:t.text, fontFamily:"Poppins,system-ui,sans-serif" }}>

      {/* ── Mobile overlay ── */}
      {!collapsed && (
        <div onClick={() => setCollapsed(true)}
          style={{ display:"none", position:"fixed", inset:0, zIndex:10, background:"rgba(0,0,0,0.6)",
            ...(typeof window !== "undefined" && window.innerWidth <= 768 ? { display:"block" } : {}) }}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside style={{
        position:"sticky", top:0, height:"100vh", flexShrink:0, display:"flex", flexDirection:"column",
        width:sidebarW, background:t.sidebar, borderRight:`1px solid ${t.border}`,
        boxShadow:`0 3px 9px ${t.shadow}`, transition:"width 0.35s ease", overflow:"hidden",
        zIndex:20,
      }}>

        {/* Header */}
        <div style={{ padding:"18px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${t.border}`, position:"relative", minHeight:72 }}>
          {!collapsed && (
            <img src="/pws-logo-dark.png" alt="PWS" style={{ height:38, objectFit:"contain", transition:"opacity 0.3s", opacity:collapsed?0:1, maxWidth:130 }} />
          )}
          <button onClick={() => setCollapsed(p => !p)}
            style={{ width:38, height:38, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:8, color:t.text, background:t.secondary, flexShrink:0, marginLeft:"auto", transition:"all 0.3s" }}>
            <span className="material-symbols-rounded" style={{ fontSize:22, transition:"transform 0.35s", transform:collapsed?"rotate(180deg)":"rotate(0deg)" }}>chevron_left</span>
          </button>
        </div>

        {/* Content */}
        <div style={{ flex:1, padding:"16px 12px", overflowY:"auto", overflowX:"hidden", scrollbarWidth:collapsed?"none":"thin", scrollbarColor:`${t.muted} transparent` }}>

          {/* Search */}
          <div onClick={() => collapsed && setCollapsed(false)}
            style={{ display:"flex", alignItems:"center", gap:10, borderRadius:8, padding:"0 12px", minHeight:44, background:t.secondary, marginBottom:16, cursor:collapsed?"pointer":"default", whiteSpace:"nowrap", transition:"background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background=t.hover}
            onMouseLeave={e => e.currentTarget.style.background=t.secondary}>
            <span className="material-symbols-rounded" style={{ color:t.muted, fontSize:20, flexShrink:0 }}>search</span>
            {!collapsed && (
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pages…"
                style={{ background:"none", border:"none", outline:"none", color:t.text, fontSize:13, width:"100%", fontFamily:"inherit" }}
                onClick={e => e.stopPropagation()} />
            )}
          </div>

          {/* Search results */}
          {search && !collapsed && searchResults.length > 0 && (
            <div style={{ marginBottom:12 }}>
              {searchResults.map(p => (
                <Link key={p.href} href={p.href} onClick={() => setSearch("")}
                  style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:8, textDecoration:"none", color:isActive(p.href)?"#fff":t.text, background:isActive(p.href)?t.active:"transparent", marginBottom:2, fontSize:13, transition:"all 0.2s" }}
                  onMouseEnter={e => { if(!isActive(p.href)) e.currentTarget.style.background=t.hover; }}
                  onMouseLeave={e => { if(!isActive(p.href)) e.currentTarget.style.background="transparent"; }}>
                  <span className="material-symbols-rounded" style={{ fontSize:18 }}>article</span>
                  {p.label}
                </Link>
              ))}
            </div>
          )}

          {/* Top nav items */}
          <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:3, padding:0, margin:"0 0 8px" }}>
            {TOP_NAV.map(item => (
              <li key={item.href}>
                <Link href={item.href}
                  style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 12px", borderRadius:8, textDecoration:"none", whiteSpace:"nowrap", color:isActive(item.href)?"#fff":t.text, background:isActive(item.href)?t.active:"transparent", fontSize:13, fontWeight:500, transition:"all 0.2s" }}
                  onMouseEnter={e => { if(!isActive(item.href)) e.currentTarget.style.background=t.hover; }}
                  onMouseLeave={e => { if(!isActive(item.href)) e.currentTarget.style.background="transparent"; }}>
                  <span className="material-symbols-rounded" style={{ fontSize:20, flexShrink:0 }}>{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div style={{ height:1, background:t.border, margin:"8px 4px 12px" }} />

          {/* Pages section label */}
          {!collapsed && (
            <p style={{ color:t.muted, fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", padding:"0 4px", marginBottom:8 }}>Pages</p>
          )}

          {/* Page groups */}
          {PAGE_GROUPS.map(g => {
            const groupOpen = openGroups[g.group] !== undefined ? openGroups[g.group] : inPagesSection;
            const hasActive = g.items.some(i => isActive(i.href));
            return (
              <div key={g.group} style={{ marginBottom:4 }}>
                {/* Group header */}
                <button onClick={() => !collapsed && toggleGroup(g.group)}
                  style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"10px 12px", borderRadius:8, border:"none", cursor:"pointer", color:hasActive?"#fff":t.text, background:hasActive && collapsed ? t.active:"transparent", fontSize:13, fontWeight:500, whiteSpace:"nowrap", transition:"all 0.2s", fontFamily:"inherit" }}
                  onMouseEnter={e => { if(!hasActive||!collapsed) e.currentTarget.style.background=t.hover; }}
                  onMouseLeave={e => { e.currentTarget.style.background=(hasActive&&collapsed)?t.active:"transparent"; }}>
                  <span className="material-symbols-rounded" style={{ fontSize:20, flexShrink:0, color:hasActive?(!collapsed?"inherit":"#fff"):t.muted }}>{g.icon}</span>
                  {!collapsed && (
                    <>
                      <span style={{ flex:1, textAlign:"left" }}>{g.group}</span>
                      <span className="material-symbols-rounded" style={{ fontSize:16, color:t.muted, transition:"transform 0.25s", transform:groupOpen?"rotate(90deg)":"rotate(0deg)" }}>chevron_right</span>
                    </>
                  )}
                </button>

                {/* Sub-items */}
                {!collapsed && groupOpen && (
                  <ul style={{ listStyle:"none", padding:"2px 0 2px 16px", margin:0, display:"flex", flexDirection:"column", gap:2 }}>
                    {g.items.map(item => (
                      <li key={item.href}>
                        <Link href={item.href}
                          style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", borderRadius:8, textDecoration:"none", color:isActive(item.href)?"#fff":t.text, background:isActive(item.href)?t.active:"transparent", fontSize:12.5, whiteSpace:"nowrap", transition:"all 0.2s" }}
                          onMouseEnter={e => { if(!isActive(item.href)) e.currentTarget.style.background=t.hover; }}
                          onMouseLeave={e => { if(!isActive(item.href)) e.currentTarget.style.background="transparent"; }}>
                          <span style={{ width:5, height:5, borderRadius:"50%", background:isActive(item.href)?"#fff":t.muted, flexShrink:0 }} />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer — theme toggle + sign out */}
        <div style={{ padding:"14px 12px", borderTop:`1px solid ${t.border}`, whiteSpace:"nowrap" }}>
          {/* Theme toggle */}
          <button onClick={toggleTheme}
            style={{ width:"100%", minHeight:44, borderRadius:8, display:"flex", alignItems:"center", gap:10, padding:"0 12px", border:"none", cursor:"pointer", color:t.text, background:t.secondary, fontFamily:"inherit", fontSize:13, fontWeight:500, transition:"background 0.2s", marginBottom:8 }}
            onMouseEnter={e => e.currentTarget.style.background=t.hover}
            onMouseLeave={e => e.currentTarget.style.background=t.secondary}>
            <span className="material-symbols-rounded" style={{ fontSize:20, flexShrink:0 }}>{dark?"light_mode":"dark_mode"}</span>
            {!collapsed && (
              <>
                <span style={{ flex:1, textAlign:"left" }}>{dark?"Light Mode":"Dark Mode"}</span>
                {/* Toggle track */}
                <div style={{ width:44, height:22, borderRadius:999, background:dark?"#695CFE":"#c3d1ec", position:"relative", transition:"background 0.3s", flexShrink:0 }}>
                  <div style={{ position:"absolute", top:3, left:3, width:16, height:16, borderRadius:"50%", background:"#fff", boxShadow:"0 2px 4px rgba(0,0,0,0.15)", transition:"transform 0.3s", transform:dark?"translateX(22px)":"translateX(0)" }} />
                </div>
              </>
            )}
          </button>

          {/* Sign out */}
          {!collapsed && (
            <button onClick={() => signOut({ callbackUrl:"/admin/login" })}
              style={{ width:"100%", minHeight:40, borderRadius:8, display:"flex", alignItems:"center", gap:10, padding:"0 12px", border:`1px solid ${t.border}`, cursor:"pointer", color:t.muted, background:"transparent", fontFamily:"inherit", fontSize:12, transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(220,38,38,0.1)"; e.currentTarget.style.color="#fca5a5"; e.currentTarget.style.borderColor="rgba(220,38,38,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color=t.muted; e.currentTarget.style.borderColor=t.border; }}>
              <span className="material-symbols-rounded" style={{ fontSize:18 }}>logout</span>
              Sign Out · {session?.user?.name}
            </button>
          )}
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>

        {/* Top bar */}
        <header style={{ position:"sticky", top:0, zIndex:15, height:60, display:"flex", alignItems:"center", padding:"0 20px", gap:12, background:t.sidebar, borderBottom:`1px solid ${t.border}`, boxShadow:`0 1px 3px ${t.shadow}` }}>
          {/* Mobile hamburger */}
          <button onClick={() => setCollapsed(p => !p)}
            style={{ display:"none", width:38, height:38, border:"none", cursor:"pointer", alignItems:"center", justifyContent:"center", borderRadius:8, color:t.text, background:t.secondary, flexShrink:0,
              ...(typeof window !== "undefined" && window.innerWidth <= 768 ? { display:"flex" } : {}) }}>
            <span className="material-symbols-rounded" style={{ fontSize:22 }}>menu</span>
          </button>

          {/* Breadcrumb path */}
          <span style={{ color:t.muted, fontSize:13 }}>
            Pacific World School <span style={{ color:t.border }}>›</span>{" "}
            <span style={{ color:t.text, fontWeight:600 }}>Admin Panel</span>
          </span>

          <div style={{ flex:1 }} />

          {/* View site */}
          <a href="/" target="_blank" rel="noopener noreferrer"
            style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 14px", borderRadius:8, border:`1px solid ${t.border}`, color:t.muted, fontSize:12, textDecoration:"none", fontWeight:500, transition:"all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=t.active; e.currentTarget.style.color=t.active; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=t.border; e.currentTarget.style.color=t.muted; }}>
            <span className="material-symbols-rounded" style={{ fontSize:15 }}>open_in_new</span>
            View Site
          </a>
        </header>

        {/* Page content */}
        <main style={{ flex:1, overflowY:"auto", padding:"28px 28px 40px", background:t.bg }}>
          {children}
        </main>
      </div>

      {/* Google Material Symbols font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        .material-symbols-rounded { font-family: 'Material Symbols Rounded'; font-weight: normal; font-style: normal; display: inline-block; line-height: 1; text-transform: none; letter-spacing: normal; word-wrap: normal; white-space: nowrap; direction: ltr; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        @media (max-width: 768px) {
          aside { position: fixed !important; top: 0; left: 0; height: 100% !important; transition: transform 0.35s ease !important; width: 260px !important; }
        }
      `}</style>
    </div>
  );
}
