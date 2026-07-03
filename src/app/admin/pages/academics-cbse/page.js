"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ImageField, ListField } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";

export default function CbseEditor() {
  const [data, setData, save, saving, saved] = useContent("academics", "cbse", {
    heroTitle: "CBSE Curriculum",
    heroSubtitle: "Rigorous national framework preparing students for board excellence and beyond.",
    heroBg: "",
    highlights: ["1:15 Teacher-Student Ratio", "100% Board Pass Rate", "Experiential Learning", "Critical Thinking Focus"],
    description: "Pacific World School follows the CBSE curriculum with a focus on conceptual understanding, critical thinking, and experiential learning.",
  });
  const u = k => v => setData(p => ({ ...p, [k]: v }));

  return (
    <AdminGuard>
      <div style={{ maxWidth: 800 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px", fontFamily: "Georgia,serif" }}>CBSE Curriculum Page</h1>
        </div>
        <SectionCard title="Hero Section" onSave={save} saving={saving}>
          {saved && <div style={{ color: "#86efac", fontSize: 12, marginBottom: 12 }}>✓ Saved</div>}
          <TextField label="Page Title" value={data.heroTitle || ""} onChange={u("heroTitle")} />
          <TextField label="Subtitle" value={data.heroSubtitle || ""} onChange={u("heroSubtitle")} multiline />
          <ImageField label="Hero Background Image" value={data.heroBg || ""} onChange={u("heroBg")} />
        </SectionCard>
        <SectionCard title="Content" onSave={save} saving={saving}>
          <TextField label="Description Paragraph" value={data.description || ""} onChange={u("description")} multiline />
          <ListField label="Highlight Points" value={data.highlights || []} onChange={u("highlights")} />
        </SectionCard>
      </div>
    </AdminGuard>
  );
}
