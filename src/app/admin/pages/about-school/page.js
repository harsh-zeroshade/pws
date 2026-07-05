"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ImageField, ListField , PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";

function HeroEditor() {
  const [data, setData, save, saving, saved] = useContent("about-school", "hero", {
    title: "About Pacific World School",
    subtitle: "A state-of-the-art institution nestled in 10 acres of lush green environs in Greater Noida West.",
    bgImage: "https://admin.pacificworldschool.com/storage/about_us/About-1735900537.png",
  });
  const u = k => v => setData(p => ({ ...p, [k]: v }));
  return (
    <SectionCard title="Hero Section" onSave={save} saving={saving}>
      {saved && <div style={{ color:"#86efac", fontSize:12, marginBottom:12 }}>âœ“ Saved</div>}
      <TextField label="Title" value={data.title || ""} onChange={u("title")} />
      <TextField label="Subtitle" value={data.subtitle || ""} onChange={u("subtitle")} multiline />
      <ImageField label="Background Image" value={data.bgImage || ""} onChange={u("bgImage")} />
    </SectionCard>
  );
}

function MissionEditor() {
  const [data, setData, save, saving, saved] = useContent("about-school", "mission-vision", {
    missionTitle: "Our Mission",
    missionText: "Pacific World School is set to emerge as a center of excellence...",
    visionTitle: "Our Vision",
    visionText: "We are committed to providing high-quality education...",
  });
  const u = k => v => setData(p => ({ ...p, [k]: v }));
  return (
    <SectionCard title="Mission & Vision" onSave={save} saving={saving}>
      {saved && <div style={{ color:"#86efac", fontSize:12, marginBottom:12 }}>âœ“ Saved</div>}
      <TextField label="Mission Title" value={data.missionTitle || ""} onChange={u("missionTitle")} />
      <TextField label="Mission Text" value={data.missionText || ""} onChange={u("missionText")} multiline />
      <TextField label="Vision Title" value={data.visionTitle || ""} onChange={u("visionTitle")} />
      <TextField label="Vision Text" value={data.visionText || ""} onChange={u("visionText")} multiline />
    </SectionCard>
  );
}

export default function AboutSchoolEditor() {
  return (
    <AdminGuard>
      <div style={{ maxWidth:800 }}>
        <div style={{ marginBottom:24 }}>
          <h1 style={{ color:"#fff", fontSize:22, fontWeight:900, margin:"0 0 4px", fontFamily:"Georgia,serif" }}>About School Page</h1>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:13, margin:0 }}>Edit hero, mission, vision and emblem content.</p>
        </div>
        <HeroEditor />
        <MissionEditor />
      </div>
    </AdminGuard>
  );
}
