"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ImageField, ListField, PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";

function HeroSection() {
  const [data, setData, save, saving, saved, saveError] = useContent("home", "hero", {
    title: "Shaping\nRemarkable\nFutures",
    subtitle: "Greater Noida West",
    cta1Text: "Apply for 2026â€“27",
    cta2Text: "Explore School",
    videoUrl: "/hero-video.mp4",
  });
  const u = k => v => setData(p => ({ ...p, [k]: v }));

  return (
    <SectionCard title="Hero Section" onSave={save} saving={saving} error={saveError}>
      {saved && <div style={{ color:"#86efac", fontSize:12, marginBottom:12 }}>âœ“ Saved successfully</div>}
      <TextField label="Headline (one word per line = 3 lines)" value={data.title || ""} onChange={u("title")} multiline />
      <TextField label="Subtitle / Location Tag" value={data.subtitle || ""} onChange={u("subtitle")} />
      <TextField label="Primary CTA Button" value={data.cta1Text || ""} onChange={u("cta1Text")} />
      <TextField label="Secondary CTA Button" value={data.cta2Text || ""} onChange={u("cta2Text")} />
    </SectionCard>
  );
}

function StatsSection() {
  const [data, setData, save, saving, saved, saveError] = useContent("home", "stats", {
    stats: [
      { value:"10+",    label:"Acre Campus" },
      { value:"250+",   label:"Faculty" },
      { value:"15 yrs", label:"Excellence" },
      { value:"100%",   label:"CBSE Results" },
    ],
  });
  const stats = data.stats || [];
  const updateStat = (i, key, val) =>
    setData(p => ({ ...p, stats: stats.map((s, idx) => idx === i ? { ...s, [key]: val } : s) }));

  return (
    <SectionCard title="Hero Stats Bar" onSave={save} saving={saving} error={saveError}>
      {saved && <div style={{ color:"#86efac", fontSize:12, marginBottom:12 }}>âœ“ Saved</div>}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ padding:12, background:"rgba(255,255,255,0.04)", borderRadius:8, border:"1px solid rgba(255,255,255,0.08)" }}>
            <input placeholder="Value e.g. 10+" value={s.value || ""} onChange={e => updateStat(i,"value",e.target.value)}
              style={{ width:"100%", marginBottom:6, padding:"7px 10px", borderRadius:6, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"#fff", fontSize:13, outline:"none", boxSizing:"border-box" }} />
            <input placeholder="Label e.g. Acre Campus" value={s.label || ""} onChange={e => updateStat(i,"label",e.target.value)}
              style={{ width:"100%", padding:"7px 10px", borderRadius:6, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"#fff", fontSize:13, outline:"none", boxSizing:"border-box" }} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function AnnouncementsSection() {
  const [data, setData, save, saving, saved, saveError] = useContent("home", "announcements", {
    items: ["Admissions open 2026â€“27 â€” Apply Now"],
  });
  return (
    <SectionCard title="Announcements / Ticker" onSave={save} saving={saving} error={saveError}>
      {saved && <div style={{ color:"#86efac", fontSize:12, marginBottom:12 }}>âœ“ Saved</div>}
      <ListField label="Ticker Items" value={data.items || []} onChange={v => setData(p => ({ ...p, items: v }))} />
    </SectionCard>
  );
}

function WhyChooseSection() {
  const [data, setData, save, saving, saved, saveError] = useContent("home", "why-choose-header", {
    heading: "Why Choose Pacific World?",
    subheading: "Ten pillars that set Pacific World School apart.",
  });
  const u = k => v => setData(p => ({ ...p, [k]: v }));
  return (
    <SectionCard title="Why Choose Us â€” Header" onSave={save} saving={saving} error={saveError}>
      {saved && <div style={{ color:"#86efac", fontSize:12, marginBottom:12 }}>âœ“ Saved</div>}
      <TextField label="Heading" value={data.heading || ""} onChange={u("heading")} />
      <TextField label="Sub-heading" value={data.subheading || ""} onChange={u("subheading")} multiline />
    </SectionCard>
  );
}

export default function HomePageEditor() {
  return (
    <AdminGuard>
      <div style={{ maxWidth:960 }}>
        <PageHeader title="Home Page" desc="Edit the home page hero, stats, announcements and section headings." />
        <HeroSection />
        <StatsSection />
        <AnnouncementsSection />
        <WhyChooseSection />
      </div>
    </AdminGuard>
  );
}
