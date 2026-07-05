"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ImageField , PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";

export default function PrincipalEditor() {
  const [data, setData, save, saving, saved] = useContent("principal", "message", {
    name: "Mrs. Pooja Bose",
    role: "Principal",
    image: "https://admin.pacificworldschool.com/storage/uploads/1735626077_t1.png",
    paragraphs: [
      "Education is not just about acquiring knowledge; it is about building character, fostering curiosity, and preparing young minds to lead with confidence and compassion.",
      "At Pacific World School, we believe that every student is unique and gifted with extraordinary potential.",
      "We combine the rigor of a world-class curriculum with the warmth of a caring community.",
      "We aim to produce not just academically excellent students, but responsible global citizens ready to face tomorrow's challenges with resilience, empathy, and integrity.",
    ],
  });
  const u = k => v => setData(p => ({ ...p, [k]: v }));

  return (
    <AdminGuard>
      <div style={{ maxWidth: 800 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px", fontFamily: "Georgia,serif" }}>Principal&apos;s Message</h1>
        </div>
        <SectionCard title="Profile" onSave={save} saving={saving}>
          {saved && <div style={{ color: "#86efac", fontSize: 12, marginBottom: 12 }}>âœ“ Saved</div>}
          <TextField label="Full Name" value={data.name || ""} onChange={u("name")} />
          <TextField label="Role" value={data.role || ""} onChange={u("role")} />
          <ImageField label="Portrait Photo" value={data.image || ""} onChange={u("image")} />
        </SectionCard>
        <SectionCard title="Message Paragraphs" onSave={save} saving={saving}>
          {(data.paragraphs || []).map((p, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Paragraph {i + 1}</label>
              <textarea value={p} rows={3} onChange={e => { const next = (data.paragraphs || []).map((x, idx) => idx === i ? e.target.value : x); setData(prev => ({ ...prev, paragraphs: next })); }}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 13, resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>
          ))}
          <button onClick={() => setData(p => ({ ...p, paragraphs: [...(p.paragraphs || []), ""] }))}
            style={{ padding: "7px 16px", borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 13 }}>+ Add Paragraph</button>
        </SectionCard>
      </div>
    </AdminGuard>
  );
}
