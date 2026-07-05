"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ImageField, ListField , PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";

export default function CambridgeEditor() {
  const [data, setData, save, saving, saved] = useContent("academics", "cambridge", {
    heroTitle: "Cambridge International Education",
    heroSubtitle: "Globally recognised qualifications opening doors to the world's best universities.",
    heroBg: "",
    affiliation: "IA380",
    highlights: ["Global University Recognition", "Analytical & Critical Thinking", "International Perspective", "Cambridge IGCSE & A Levels"],
    description: "Pacific World School is an authorised Cambridge International School (IA380), offering a world-class curriculum that complements CBSE and prepares students for global opportunities.",
  });
  const u = k => v => setData(p => ({ ...p, [k]: v }));

  return (
    <AdminGuard>
      <div style={{ maxWidth: 800 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px", fontFamily: "Georgia,serif" }}>Cambridge Curriculum Page</h1>
        </div>
        <SectionCard title="Hero Section" onSave={save} saving={saving}>
          {saved && <div style={{ color: "#86efac", fontSize: 12, marginBottom: 12 }}>âœ“ Saved</div>}
          <TextField label="Page Title" value={data.heroTitle || ""} onChange={u("heroTitle")} />
          <TextField label="Subtitle" value={data.heroSubtitle || ""} onChange={u("heroSubtitle")} multiline />
          <TextField label="Cambridge Affiliation Code" value={data.affiliation || ""} onChange={u("affiliation")} />
          <ImageField label="Hero Background Image" value={data.heroBg || ""} onChange={u("heroBg")} />
        </SectionCard>
        <SectionCard title="Content" onSave={save} saving={saving}>
          <TextField label="Description" value={data.description || ""} onChange={u("description")} multiline />
          <ListField label="Highlights" value={data.highlights || []} onChange={u("highlights")} />
        </SectionCard>
      </div>
    </AdminGuard>
  );
}
