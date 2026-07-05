"use client";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TOP_NAV = [
  { label: "Dashboard",     href: "/admin/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { label: "Media Library",  href: "/admin/media",     icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { label: "Settings",       href: "/admin/settings",  icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

const PAGE_GROUPS = [
  { group: "Home", items: [
    { label: "Hero & Stats",     href: "/admin/pages/home" },
    { label: "Hero Video",       href: "/admin/pages/hero-video" },
    { label: "Announcements",    href: "/admin/pages/announcements" },
    { label: "Partners / Logos", href: "/admin/pages/partners" },
  ]},
  { group: "About Us", items: [
    { label: "About School",           href: "/admin/pages/about-school" },
    { label: "Chairperson",            href: "/admin/pages/chairperson-message" },
    { label: "Pro-Vice Chair",         href: "/admin/pages/vice-chairperson-message" },
    { label: "Principal",              href: "/admin/pages/principal-message" },
    { label: "Leadership Team",        href: "/admin/pages/leadership-team" },
    { label: "Differentiating",        href: "/admin/pages/differentiating-factors" },
    { label: "Our Faculty",            href: "/admin/pages/our-faculty" },
    { label: "Amenities",              href: "/admin/pages/amenities" },
  ]},
  { group: "Academics", items: [
    { label: "CBSE",                   href: "/admin/pages/academics-cbse" },
    { label: "Cambridge",              href: "/admin/pages/academics-cambridge" },
    { label: "Toppers",                href: "/admin/pages/topper-details" },
  ]},
  { group: "Admission", items: [
    { label: "Registration Process",   href: "/admin/pages/registration" },
  ]},
  { group: "Site-Wide", items: [
    { label: "Contact Info",           href: "/admin/pages/contact" },
    { label: "School Settings",        href: "/admin/settings" },
  ]},
];

/* Design tokens */
const D = {
  bg:      "#0a0f1c",
  sidebar: "#0f172a",
  border:  "#1e2d45",
  text:    "#e2e8f0",
  muted:   "#64748b",
  hover:   "#1e293b",
  active:  "#B8953A",
  activeBg:"rgba(184,149,58,0.12)",
  gold:    "#D4AF5A",
};

function NavIcon({ path }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d={path}/>
    </svg>
  );
}

export default function AdminShell({ children }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState({});
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setCollapsed(true);
    }
  }, []);

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");
  const inPages  = pathname.startsWith("/admin/pages");

  const allItems = PAGE_GROUPS.flatMap(g => g.items);
  const searchResults = search.trim() ? allItems.filter(p => p.label.toLowerCase().includes(search.toLowerCase())) : [];

  const toggleGroup = (g) => setOpenGroups(p => ({ ...p, [g]: !p[g] }));

  // Auto-open active group
  useEffect(() => {
    PAGE_GROUPS.forEach(g => {
      if (g.items.some(i => isActive(i.href))) {
        setOpenGroups(p => ({ ...p, [g.group]: true }));
      }
    });
  }, [pathname]);

  const sidebarW = collapsed ? 64 : 248;

  const linkStyle = (active) => ({
    display: "flex", alignItems: "center", gap: 10,
    padding: collapsed ? "10px 0" : "9px 12px",
    borderRadius: 10, textDecoration: "none",
    color: active ? D.gold : D.muted,
    background: active ? D.activeBg : "transparent",
    borderLeft: active ? `2px solid ${D.active}` : "2px solid transparent",
    fontSize: 13, fontWeight: active ? 600 : 500,
    transition: "all 0.18s",
    justifyContent: collapsed ? "center" : "flex-start",
    whiteSpace: "nowrap",
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: D.bg, fontFamily: "system-ui,-apple-system,sans-serif", color: D.text }}>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 30, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
      )}

      {/* ── SIDEBAR ── */}
      <aside style={{
        position: "fixed", top: 0, left: 0, height: "100vh",
        width: sidebarW, background: D.sidebar,
        borderRight: `1px solid ${D.border}`,
        display: "flex", flexDirection: "column",
        transition: "width 0.25s ease, transform 0.25s ease",
        zIndex: 40, overflow: "hidden",
        transform: mobileOpen ? "translateX(0)" : undefined,
      }}>

        {/* Logo / header */}
        <div style={{ padding: collapsed ? "16px 0" : "16px 14px", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between", borderBottom: `1px solid ${D.border}`, minHeight: 64, flexShrink: 0 }}>
          {!collapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pws-logo-dark.png" alt="PWS" style={{ height: 30, objectFit: "contain" }} />
            </div>
          )}
          <button onClick={() => setCollapsed(p => !p)}
            style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${D.border}`, background: "transparent", color: D.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = D.hover; e.currentTarget.style.color = D.text; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = D.muted; }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {collapsed ? <path d="M9 18l6-6-6-6"/> : <path d="M15 18l-6-6 6-6"/>}
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: collapsed ? "12px 8px" : "12px 10px", scrollbarWidth: "none" }}>

          {/* Search — only when expanded */}
          {!collapsed && (
            <div style={{ position: "relative", marginBottom: 12 }}>
              <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={D.muted} strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input ref={searchRef} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pages…"
                style={{ width: "100%", padding: "8px 10px 8px 32px", borderRadius: 8, background: D.hover, border: `1px solid ${D.border}`, color: D.text, fontSize: 12.5, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>
          )}

          {/* Search results */}
          {search && !collapsed && searchResults.length > 0 && (
            <div style={{ marginBottom: 10, borderBottom: `1px solid ${D.border}`, paddingBottom: 10 }}>
              {searchResults.map(p => (
                <Link key={p.href} href={p.href} onClick={() => setSearch("")}
                  style={{ ...linkStyle(isActive(p.href)), marginBottom: 2 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg>
                  {p.label}
                </Link>
              ))}
            </div>
          )}

          {/* Top nav */}
          <div style={{ marginBottom: 6 }}>
            {TOP_NAV.map(item => (
              <Link key={item.href} href={item.href}
                style={{ ...linkStyle(isActive(item.href)), marginBottom: 2 }}
                onMouseEnter={e => { if (!isActive(item.href)) { e.currentTarget.style.background = D.hover; e.currentTarget.style.color = D.text; } }}
                onMouseLeave={e => { if (!isActive(item.href)) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = D.muted; } }}>
                <NavIcon path={item.icon} />
                {!collapsed && item.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: D.border, margin: "8px 0 10px" }} />

          {/* Pages label */}
          {!collapsed && (
            <p style={{ color: D.muted, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 6, paddingLeft: 12 }}>Pages</p>
          )}

          {/* Groups */}
          {PAGE_GROUPS.map(g => {
            const isGroupOpen = openGroups[g.group] !== undefined ? openGroups[g.group] : inPages;
            const hasActive = g.items.some(i => isActive(i.href));

            return (
              <div key={g.group} style={{ marginBottom: 2 }}>
                <button onClick={() => !collapsed && toggleGroup(g.group)}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "10px 0" : "8px 12px", borderRadius: 10, border: "none", cursor: "pointer", background: "transparent", color: hasActive ? D.gold : D.muted, fontSize: 12.5, fontWeight: hasActive ? 600 : 500, whiteSpace: "nowrap", transition: "all 0.18s", fontFamily: "inherit", justifyContent: collapsed ? "center" : "flex-start" }}
                  onMouseEnter={e => { if (!hasActive) { e.currentTarget.style.background = D.hover; e.currentTarget.style.color = D.text; } }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = hasActive ? D.gold : D.muted; }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ flexShrink: 0 }}><path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round"/></svg>
                  {!collapsed && (
                    <>
                      <span style={{ flex: 1, textAlign: "left" }}>{g.group}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: "transform 0.2s", transform: isGroupOpen ? "rotate(90deg)" : "rotate(0deg)" }}><path d="M9 18l6-6-6-6"/></svg>
                    </>
                  )}
                </button>

                {!collapsed && isGroupOpen && (
                  <div style={{ paddingLeft: 14, marginTop: 2 }}>
                    <div style={{ borderLeft: `1px solid ${D.border}`, paddingLeft: 10 }}>
                      {g.items.map(item => (
                        <Link key={item.href} href={item.href}
                          style={{ ...linkStyle(isActive(item.href)), fontSize: 12.5, padding: "7px 10px", marginBottom: 1, borderLeft: isActive(item.href) ? "none" : "none" }}
                          onMouseEnter={e => { if (!isActive(item.href)) { e.currentTarget.style.background = D.hover; e.currentTarget.style.color = D.text; } }}
                          onMouseLeave={e => { if (!isActive(item.href)) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = D.muted; } }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: isActive(item.href) ? D.active : D.border, flexShrink: 0 }} />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ padding: collapsed ? "12px 8px" : "12px 10px", borderTop: `1px solid ${D.border}`, flexShrink: 0 }}>
          {!collapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 10, background: D.hover, marginBottom: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#B8953A,#D4AF5A)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 700, color: "#fff" }}>
                {(session?.user?.name || "A")[0].toUpperCase()}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <p style={{ color: D.text, fontSize: 12, fontWeight: 600, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{session?.user?.name || "Admin"}</p>
                <p style={{ color: D.muted, fontSize: 10, margin: 0 }}>Administrator</p>
              </div>
            </div>
          )}
          <button onClick={() => signOut({ callbackUrl: "/admin/login" })}
            style={{ width: "100%", padding: collapsed ? "10px 0" : "8px 12px", borderRadius: 10, border: "none", background: "transparent", color: D.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start", gap: 8, fontSize: 12.5, fontFamily: "inherit", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.color = "#fca5a5"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = D.muted; }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            {!collapsed && "Sign Out"}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, marginLeft: sidebarW, transition: "margin-left 0.25s ease" }}>

        {/* Topbar */}
        <header style={{ position: "sticky", top: 0, zIndex: 20, height: 56, display: "flex", alignItems: "center", padding: "0 20px", gap: 12, background: D.sidebar, borderBottom: `1px solid ${D.border}` }}>
          {/* Mobile burger */}
          <button onClick={() => setMobileOpen(p => !p)}
            style={{ display: "none", width: 36, height: 36, border: `1px solid ${D.border}`, background: "transparent", borderRadius: 8, color: D.muted, cursor: "pointer", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            className="mobile-burger">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>

          <div style={{ flex: 1 }}>
            <span style={{ color: D.muted, fontSize: 12 }}>
              Pacific World School
              <span style={{ color: D.border, margin: "0 6px" }}>›</span>
              <span style={{ color: D.text, fontWeight: 600 }}>Admin CMS</span>
            </span>
          </div>

          <a href="/" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: `1px solid ${D.border}`, color: D.muted, fontSize: 12, textDecoration: "none", fontWeight: 500, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = D.active; e.currentTarget.style.color = D.gold; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = D.border; e.currentTarget.style.color = D.muted; }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            View Site
          </a>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "24px 24px 40px", background: D.bg }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-burger { display: flex !important; }
          aside { transform: translateX(-100%) !important; }
          aside.mobile-open { transform: translateX(0) !important; }
          [data-main] { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}
