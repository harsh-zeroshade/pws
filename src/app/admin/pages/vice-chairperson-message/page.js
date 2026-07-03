"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ImageField } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";

export default function ViceChairpersonEditor() {
  const [data, setData, save, saving, saved] = useContent("vice-chairperson", "message", {
    name: "Mrs. Nidhi Bansal",
    role: "Pro-Vice Chairperson",
    image: "https://admin.pacificworldschool.com/storage/uploads/1738650923_t3.png",
    quote: "Tell me and I forget, Teach me and I remember, Involve me and I learn - Benjamin Franklin",
    paragraphs: [
      "At Pacific World School, every child is recognised, nurtured and treasured as we believe that each child is unique and special.",
      "It is our sincere effort to develop our students as Global Citizens with respect, patience and appreciation for diverse cultures and religions.",
      "The school curriculum has been designed on scientific guidelines to provide students with intellectual stimulation, emotional independence and strong moral values.",
    ],
  });
  const u = k => v => setData(p => ({ ...p, [k]: v }));

  return (
    <AdminGuard>
      <div style={{ maxWidth: 800 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px", fontFamily: "Georgia,serif" }}>Pro-Vice Chairperson&apos;s Message</h1>
        </div>
        <SectionCard title="Profile" onSave={save} saving={saving}>
          {saved && <div style={{ color: "#86efac", fontSize: 12, marginBottom: 12 }}>✓ Saved</div>}
          <TextField label="Full Name" value={data.name || ""} onChange={u("name")} />
          <TextField label="Role" value={data.role || ""} onChange={u("role")} />
          <TextField label="Inspirational Quote" value={data.quote || ""} onChange={u("quote")} multiline />
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
