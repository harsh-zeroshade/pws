"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ImageField , PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";

const EMPTY = { title: "", tag: "", desc: "", img: "" };

export default function AmenitiesEditor() {
  const [data, setData, save, saving, saved] = useContent("about", "amenities", { amenities: [] });
  const items = data.amenities || [];

  const update = (i, key, val) => setData(p => ({ ...p, amenities: items.map((a, idx) => idx === i ? { ...a, [key]: val } : a) }));
  const remove = (i) => setData(p => ({ ...p, amenities: items.filter((_, idx) => idx !== i) }));
  const add = () => setData(p => ({ ...p, amenities: [...items, { ...EMPTY }] }));

  return (
    <AdminGuard>
      <div style={{ maxWidth: 900 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px", fontFamily: "Georgia,serif" }}>Amenities</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>Manage campus amenity cards with images.</p>
        </div>
        <SectionCard title={`Amenities (${items.length})`} onSave={save} saving={saving}>
          {saved && <div style={{ color: "#86efac", fontSize: 12, marginBottom: 12 }}>âœ“ Saved</div>}
          {items.map((a, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 14, marginBottom: 10, border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ color: "#D4AF5A", fontSize: 12, fontWeight: 700 }}>Amenity {i + 1}</span>
                <button onClick={() => remove(i)} style={{ padding: "3px 8px", borderRadius: 5, background: "rgba(220,38,38,0.12)", color: "#fca5a5", border: "none", cursor: "pointer", fontSize: 12 }}>Remove</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <div>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Title</label>
                  <input value={a.title || ""} onChange={e => update(i, "title", e.target.value)} style={{ width: "100%", padding: "8px 10px", borderRadius: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Tag</label>
                  <input value={a.tag || ""} onChange={e => update(i, "tag", e.target.value)} placeholder="e.g. Technology" style={{ width: "100%", padding: "8px 10px", borderRadius: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Description</label>
                <textarea value={a.desc || ""} onChange={e => update(i, "desc", e.target.value)} rows={2} style={{ width: "100%", padding: "8px 10px", borderRadius: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>
              <ImageField label="Image" value={a.img || ""} onChange={v => update(i, "img", v)} />
            </div>
          ))}
          <button onClick={add} style={{ padding: "9px 18px", borderRadius: 8, background: "rgba(184,149,58,0.15)", border: "1px solid rgba(184,149,58,0.3)", color: "#D4AF5A", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>+ Add Amenity</button>
        </SectionCard>
      </div>
    </AdminGuard>
  );
}
