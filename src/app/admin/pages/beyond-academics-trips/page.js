"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ImageField, ListField, PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";

export default function TripsEditor() {
  const [hero, setHero, save, saving, saved, err] = useContent("beyond-academics", "trips-hero", { title:"Trips & Excursions", subtitle:"Enriching educational journeys beyond the classroom.", bgImage:"" });
  const [trips, setTrips, saveTrips, savingTrips, savedTrips, tripsErr] = useContent("beyond-academics", "trips-list", { items: [] });
  const hU = k => v => setHero(p => ({ ...p, [k]: v }));
  const items = trips.items || [];
  const update = (i,k,v) => setTrips(p => ({ ...p, items: items.map((x,idx) => idx===i ? {...x,[k]:v} : x) }));
  const add = () => setTrips(p => ({ ...p, items: [...items, { name:"", dest:"", desc:"", img:"" }] }));
  const remove = (i) => setTrips(p => ({ ...p, items: items.filter((_,idx) => idx!==i) }));
  const inp = { width:"100%", padding:"8px 10px", borderRadius:6, background:"#0a0f1c", border:"1px solid #1e2d45", color:"#e2e8f0", fontSize:12.5, outline:"none", boxSizing:"border-box" };
  return (
    <AdminGuard><div style={{ maxWidth:960 }}>
      <PageHeader title="Trips & Excursions" desc="Manage educational trip listings and page hero." />
      <SectionCard title="Page Hero" onSave={save} saving={saving} saved={saved} error={err}>
        <TextField label="Title" value={hero.title||""} onChange={hU("title")} />
        <TextField label="Subtitle" value={hero.subtitle||""} onChange={hU("subtitle")} multiline />
        <ImageField label="Hero Image" value={hero.bgImage||""} onChange={hU("bgImage")} />
      </SectionCard>
      <SectionCard title={`Trips (${items.length})`} onSave={saveTrips} saving={savingTrips} saved={savedTrips} error={tripsErr}>
        {items.map((item,i) => (
          <div key={i} style={{ background:"#0f172a", borderRadius:10, padding:14, marginBottom:12, border:"1px solid #1e2d45" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
              <span style={{ color:"#D4AF5A", fontSize:12, fontWeight:700 }}>Trip {i+1}</span>
              <button onClick={() => remove(i)} style={{ padding:"3px 8px", borderRadius:5, background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)", color:"#fca5a5", cursor:"pointer", fontSize:11 }}>Remove</button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
              <div><label style={{ display:"block", color:"#64748b", fontSize:10, fontWeight:700, textTransform:"uppercase", marginBottom:4 }}>Trip Name</label><input value={item.name||""} onChange={e=>update(i,"name",e.target.value)} style={inp} /></div>
              <div><label style={{ display:"block", color:"#64748b", fontSize:10, fontWeight:700, textTransform:"uppercase", marginBottom:4 }}>Destination</label><input value={item.dest||""} onChange={e=>update(i,"dest",e.target.value)} style={inp} /></div>
            </div>
            <div style={{ marginBottom:10 }}><label style={{ display:"block", color:"#64748b", fontSize:10, fontWeight:700, textTransform:"uppercase", marginBottom:4 }}>Description</label><textarea value={item.desc||""} onChange={e=>update(i,"desc",e.target.value)} rows={2} style={{ ...inp, resize:"vertical", fontFamily:"inherit" }} /></div>
            <ImageField label="Image" value={item.img||""} onChange={v=>update(i,"img",v)} />
          </div>
        ))}
        <button onClick={add} style={{ padding:"9px 18px", borderRadius:8, background:"rgba(184,149,58,0.12)", border:"1px solid rgba(184,149,58,0.3)", color:"#D4AF5A", cursor:"pointer", fontSize:13, fontWeight:600 }}>+ Add Trip</button>
      </SectionCard>
    </div></AdminGuard>
  );
}
