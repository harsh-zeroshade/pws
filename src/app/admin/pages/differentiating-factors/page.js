"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard , PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";

const DEFAULT_FACTORS = [
  { n:"01", title:"Parent Teacher Communication",   desc:"Seamless connectivity through our dedicated CampusCare app and regular PTMs ensure parents stay informed of their child's every milestone and achievement." },
  { n:"02", title:"Excellence in Academics",         desc:"Consistently outstanding CBSE and Cambridge results driven by passionate educators with a 1:15 teacher-student ratio ensuring personalised attention." },
  { n:"03", title:"World Class Infrastructure",      desc:"Air-conditioned digital classrooms, amphitheater, state-of-the-art science and computer labs, well-stocked library, and a stunning 10-acre campus." },
  { n:"04", title:"Personal Attention",              desc:"A 1:15 teacher-student ratio ensures every child is seen, heard, and nurtured. Teachers identify and hone the uniqueness of every child." },
  { n:"05", title:"Entrepreneurial Development",     desc:"Programs designed to foster innovation, critical thinking, and entrepreneurial mindset from the earliest years through project-based learning." },
  { n:"06", title:"Safety Measures",                 desc:"Comprehensive CCTV surveillance across campus, trained support staff, and robust child safety protocols ensure a secure environment for every student." },
  { n:"07", title:"Cultural & Global Awareness",     desc:"Multicultural events, Pacific MUN, and a global curriculum prepare students to be thoughtful, empathetic world citizens." },
  { n:"08", title:"International Collaborations",    desc:"Partnerships with Microsoft, AFS, IAYP and Scholastic provide global exposure and transformative learning opportunities for our students." },
  { n:"09", title:"Sports Coaching",                 desc:"Specialized coaching in cricket, football, swimming, badminton, basketball, and more by certified professional coaches meeting international standards." },
  { n:"10", title:"Dual Curriculum",                 desc:"A unique combination of CBSE and Cambridge International Education gives students an unmatched academic edge and global university recognition." },
];

export default function DifferentiatingFactorsEditor() {
  const [data, setData, save, saving, saved] = useContent("about", "differentiating-factors", { factors: DEFAULT_FACTORS });
  const factors = data.factors || [];

  const update = (i, key, val) =>
    setData(p => ({ ...p, factors: factors.map((f, idx) => idx === i ? { ...f, [key]: val } : f) }));
  const remove = (i) =>
    setData(p => ({ ...p, factors: factors.filter((_, idx) => idx !== i) }));
  const add = () =>
    setData(p => ({ ...p, factors: [...factors, { n: String(factors.length + 1).padStart(2, "0"), title: "", desc: "" }] }));

  const inputStyle = { padding: "8px 10px", borderRadius: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 12, outline: "none" };

  return (
    <AdminGuard>
      <div style={{ maxWidth: 900 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px", fontFamily: "Georgia,serif" }}>Differentiating Factors</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>Manage the pillars shown on the Differentiating Factors page.</p>
        </div>
        <SectionCard title={`Factors (${factors.length})`} onSave={save} saving={saving}>
          {saved && <div style={{ color: "#86efac", fontSize: 12, marginBottom: 12 }}>âœ“ Saved successfully</div>}

          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "48px 1fr 2fr 36px", gap: 8, paddingBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 4 }}>
            {["#", "Title", "Description", ""].map(h => (
              <span key={h} style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
            ))}
          </div>

          {factors.map((f, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "48px 1fr 2fr 36px", gap: 8, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <input value={f.n || ""} onChange={e => update(i, "n", e.target.value)}
                style={{ ...inputStyle, textAlign: "center", color: "#D4AF5A", fontWeight: 700 }} />
              <input value={f.title || ""} onChange={e => update(i, "title", e.target.value)} placeholder="Title"
                style={{ ...inputStyle }} />
              <textarea value={f.desc || ""} onChange={e => update(i, "desc", e.target.value)} placeholder="Description" rows={2}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} />
              <button onClick={() => remove(i)}
                style={{ alignSelf: "flex-start", padding: "8px", borderRadius: 6, background: "rgba(220,38,38,0.12)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.25)", cursor: "pointer", fontSize: 13 }}>âœ•</button>
            </div>
          ))}

          <button onClick={add}
            style={{ marginTop: 14, padding: "9px 18px", borderRadius: 8, background: "rgba(184,149,58,0.15)", border: "1px solid rgba(184,149,58,0.3)", color: "#D4AF5A", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            + Add Factor
          </button>
        </SectionCard>
      </div>
    </AdminGuard>
  );
}
