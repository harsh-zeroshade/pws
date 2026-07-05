"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ImageField , PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";

export default function ChairpersonEditor() {
  const [data, setData, save, saving, saved] = useContent("chairperson", "message", {
    name: "Mrs. Santosh Bansal",
    role: "Chairperson",
    image: "https://admin.pacificworldschool.com/storage/uploads/1738650887_t2.png",
    paragraphs: [
      "At Pacific World School, we are committed to nurturing the next generation of global citizens equipped with the skills, values, and vision to make a positive difference in the world.",
      "Education is the most powerful tool we can give our children. It shapes not only their careers but their character, their values, and their capacity to contribute meaningfully to society.",
      "Our school is built on the twin pillars of academic excellence and holistic development. We strive to create an environment where curiosity is encouraged, where failures are stepping stones.",
      "I invite you to be a part of the Pacific World School family, where we walk together on the journey of transforming young minds into confident, compassionate, and capable individuals.",
    ],
  });
  const u = k => v => setData(p => ({ ...p, [k]: v }));

  return (
    <AdminGuard>
      <div style={{ maxWidth: 960 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px", fontFamily: "Georgia,serif" }}>Chairperson&apos;s Message</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>Edit the chairperson profile and message content.</p>
        </div>
        <SectionCard title="Profile" onSave={save} saving={saving}>
          {saved && <div style={{ color: "#86efac", fontSize: 12, marginBottom: 12 }}>Ã¢Å“â€œ Saved</div>}
          <TextField label="Full Name" value={data.name || ""} onChange={u("name")} />
          <TextField label="Role / Designation" value={data.role || ""} onChange={u("role")} />
          <ImageField label="Portrait Photo" value={data.image || ""} onChange={u("image")} />
        </SectionCard>
        <SectionCard title="Message Paragraphs" onSave={save} saving={saving}>
          {(data.paragraphs || []).map((p, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Paragraph {i + 1}</label>
              <textarea value={p} rows={3} onChange={e => {
                const next = (data.paragraphs || []).map((x, idx) => idx === i ? e.target.value : x);
                setData(prev => ({ ...prev, paragraphs: next }));
              }} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 13, resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>
          ))}
          <button onClick={() => setData(p => ({ ...p, paragraphs: [...(p.paragraphs || []), ""] }))}
            style={{ padding: "7px 16px", borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 13 }}>
            + Add Paragraph
          </button>
        </SectionCard>
      </div>
    </AdminGuard>
  );
}
