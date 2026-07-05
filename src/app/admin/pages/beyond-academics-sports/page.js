"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ImageField, ListField, PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";

const SPORTS = ["Cricket","Football","Basketball","Badminton","Swimming","Table Tennis","Volleyball","Athletics","Chess","Karate"];

export default function SpecializedSportsEditor() {
  const [hero, setHero, saveHero, savingHero, savedHero, heroErr] = useContent("beyond-academics", "sports-hero", {
    title: "Specialized Sports",
    subtitle: "Mandatory sports participation with certified professional coaches meeting international standards.",
    bgImage: "",
  });
  const [sports, setSports, saveSports, savingSports, savedSports, sportsErr] = useContent("beyond-academics", "sports-list", {
    items: SPORTS.map(s => ({ name: s, desc: "", img: "", coach: "" })),
  });

  const hU = k => v => setHero(p => ({ ...p, [k]: v }));
  const items = sports.items || [];
  const updateItem = (i, k, v) => setSports(p => ({ ...p, items: items.map((x, idx) => idx === i ? { ...x, [k]: v } : x) }));
  const addItem = () => setSports(p => ({ ...p, items: [...items, { name: "", desc: "", img: "", coach: "" }] }));
  const removeItem = (i) => setSports(p => ({ ...p, items: items.filter((_, idx) => idx !== i) }));

  const inp = { width:"100%", padding:"8px 10px", borderRadius:6, background:"#0a0f1c", border:"1px solid #1e2d45", color:"#e2e8f0", fontSize:12.5, outline:"none", boxSizing:"border-box" };

  return (
    <AdminGuard>
      <div style={{ maxWidth:960 }}>
        <PageHeader title="Specialized Sports" desc="Edit the sports page hero and manage individual sport listings." />
        <SectionCard title="Page Hero" onSave={saveHero} saving={savingHero} saved={savedHero} error={heroErr}>
          <TextField label="Page Title" value={hero.title||""} onChange={hU("title")} />
          <TextField label="Subtitle" value={hero.subtitle||""} onChange={hU("subtitle")} multiline />
          <ImageField label="Hero Background" value={hero.bgImage||""} onChange={hU("bgImage")} />
        </SectionCard>
        <SectionCard title={`Sports Programs (${items.length})`} onSave={saveSports} saving={savingSports} saved={savedSports} error={sportsErr}>
          {items.map((item, i) => (
            <div key={i} style={{ background:"#0f172a", borderRadius:10, padding:14, marginBottom:12, border:"1px solid #1e2d45" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                <span style={{ color:"#D4AF5A", fontSize:12, fontWeight:700 }}>Sport {i+1}</span>
                <button onClick={() => removeItem(i)} style={{ padding:"3px 8px", borderRadius:5, background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)", color:"#fca5a5", cursor:"pointer", fontSize:11 }}>Remove</button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                <div><label style={{ display:"block", color:"#64748b", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Sport Name</label><input value={item.name||""} onChange={e => updateItem(i,"name",e.target.value)} style={inp} /></div>
                <div><label style={{ display:"block", color:"#64748b", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Coach</label><input value={item.coach||""} onChange={e => updateItem(i,"coach",e.target.value)} style={inp} /></div>
              </div>
              <div style={{ marginBottom:10 }}><label style={{ display:"block", color:"#64748b", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Description</label><textarea value={item.desc||""} onChange={e => updateItem(i,"desc",e.target.value)} rows={2} style={{ ...inp, resize:"vertical", fontFamily:"inherit", lineHeight:1.5 }} /></div>
              <ImageField label="Sport Image" value={item.img||""} onChange={v => updateItem(i,"img",v)} />
            </div>
          ))}
          <button onClick={addItem} style={{ padding:"9px 18px", borderRadius:8, background:"rgba(184,149,58,0.12)", border:"1px solid rgba(184,149,58,0.3)", color:"#D4AF5A", cursor:"pointer", fontSize:13, fontWeight:600 }}>+ Add Sport</button>
        </SectionCard>
      </div>
    </AdminGuard>
  );
}
