"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ImageField , PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";

const EMPTY = { name: "", role: "", org: "", img: "", quote: "" };

export default function LeadershipTeamEditor() {
  const [data, setData, save, saving, saved] = useContent("about", "leadership-team", {
    leaders: [
      { name: "Mrs. Santosh Bansal", role: "Chairperson", org: "Pacific World School & DPS Indirapuram", img: "https://admin.pacificworldschool.com/storage/uploads/1738650887_t2.png", quote: "" },
      { name: "Mrs. Nidhi Bansal", role: "Pro Vice Chairperson", org: "Pacific World School", img: "https://admin.pacificworldschool.com/storage/uploads/1738650923_t3.png", quote: "" },
      { name: "Mrs. Pooja Bose", role: "Principal", org: "Pacific World School", img: "https://admin.pacificworldschool.com/storage/uploads/1735626077_t1.png", quote: "" },
    ],
  });

  const leaders = data.leaders || [];
  const update = (i, key, val) => setData(p => ({ ...p, leaders: leaders.map((l, idx) => idx === i ? { ...l, [key]: val } : l) }));
  const remove = (i) => setData(p => ({ ...p, leaders: leaders.filter((_, idx) => idx !== i) }));
  const add = () => setData(p => ({ ...p, leaders: [...leaders, { ...EMPTY }] }));

  return (
    <AdminGuard>
      <div style={{ maxWidth: 900 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px", fontFamily: "Georgia,serif" }}>Leadership Team</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>Manage leadership cards shown on the Core Team page.</p>
        </div>
        <SectionCard title={`Leaders (${leaders.length})`} onSave={save} saving={saving}>
          {saved && <div style={{ color: "#86efac", fontSize: 12, marginBottom: 12 }}>âœ“ Saved</div>}
          {leaders.map((l, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16, marginBottom: 12, border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ color: "#D4AF5A", fontSize: 12, fontWeight: 700 }}>Leader {i + 1}</span>
                <button onClick={() => remove(i)} style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(220,38,38,0.12)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.25)", cursor: "pointer", fontSize: 12 }}>Remove</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["name", "Full Name"], ["role", "Role / Designation"], ["org", "Organisation"]].map(([k, lbl]) => (
                  <div key={k}>
                    <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{lbl}</label>
                    <input value={l[k] || ""} onChange={e => update(i, k, e.target.value)}
                      style={{ width: "100%", padding: "8px 10px", borderRadius: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 12, outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10 }}>
                <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Quote</label>
                <textarea value={l.quote || ""} onChange={e => update(i, "quote", e.target.value)} rows={2}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 12, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>
              <div style={{ marginTop: 10 }}>
                <ImageField label="Portrait Photo" value={l.img || ""} onChange={v => update(i, "img", v)} />
              </div>
            </div>
          ))}
          <button onClick={add} style={{ padding: "9px 18px", borderRadius: 8, background: "rgba(184,149,58,0.15)", border: "1px solid rgba(184,149,58,0.3)", color: "#D4AF5A", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>+ Add Leader</button>
        </SectionCard>
      </div>
    </AdminGuard>
  );
}
