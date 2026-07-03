"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, ImageField } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";

const EMPTY = { name: "", class: "", percentage: "", subject: "", image: "" };

function TopperRow({ topper, index, onChange, onRemove }) {
  const u = k => v => onChange(index, { ...topper, [k]: typeof v === "string" ? v : v.target?.value ?? v });
  const inp = (val, ph, key) => (
    <input value={val} onChange={u(key)} placeholder={ph}
      style={{ flex: 1, minWidth: 0, padding: "7px 10px", borderRadius: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 12, outline: "none" }} />
  );
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        {inp(topper.name, "Student Name", "name")}
        {inp(topper.class, "Class / Stream", "class")}
        {inp(topper.percentage, "% / Score", "percentage")}
        {inp(topper.subject, "Subject / Board", "subject")}
        <button onClick={() => onRemove(index)} style={{ padding: "6px 10px", borderRadius: 6, background: "rgba(220,38,38,0.12)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.25)", cursor: "pointer", fontSize: 12 }}>✕</button>
      </div>
      <ImageField label="Student Photo" value={topper.image || ""} onChange={v => u("image")(v)} />
    </div>
  );
}

export default function TopperDetailsEditor() {
  const [data, setData, save, saving, saved] = useContent("academics", "toppers", { toppers: [] });
  const toppers = data.toppers || [];

  const update = (i, val) => setData(p => ({ ...p, toppers: toppers.map((t, idx) => idx === i ? val : t) }));
  const remove = (i) => setData(p => ({ ...p, toppers: toppers.filter((_, idx) => idx !== i) }));
  const add = () => setData(p => ({ ...p, toppers: [...toppers, { ...EMPTY }] }));

  return (
    <AdminGuard>
      <div style={{ maxWidth: 900 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px", fontFamily: "Georgia,serif" }}>Topper Details</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>Add board exam toppers with their photo and scores.</p>
        </div>
        <SectionCard title={`Toppers (${toppers.length})`} onSave={save} saving={saving}>
          {saved && <div style={{ color: "#86efac", fontSize: 12, marginBottom: 12 }}>✓ Saved</div>}
          {toppers.map((t, i) => (
            <TopperRow key={i} topper={t} index={i} onChange={update} onRemove={remove} />
          ))}
          {toppers.length === 0 && (
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, textAlign: "center", padding: "24px 0" }}>No toppers added. Click below to add.</p>
          )}
          <button onClick={add} style={{ marginTop: 10, padding: "9px 18px", borderRadius: 8, background: "rgba(184,149,58,0.15)", border: "1px solid rgba(184,149,58,0.3)", color: "#D4AF5A", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            + Add Topper
          </button>
        </SectionCard>
      </div>
    </AdminGuard>
  );
}
