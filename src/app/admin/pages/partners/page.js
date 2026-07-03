"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, ImageField } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";
import { useState } from "react";

export default function PartnersEditor() {
  const [data, setData, save, saving, saved] = useContent("home", "partners", {
    logos: [
      "https://admin.pacificworldschool.com/storage/uploads/1735625840_2.png",
      "https://admin.pacificworldschool.com/storage/uploads/1744786759_3.png",
      "https://admin.pacificworldschool.com/storage/uploads/1735625860_4.png",
      "https://admin.pacificworldschool.com/storage/uploads/1735625871_5.png",
      "https://admin.pacificworldschool.com/storage/uploads/1735625881_6.png",
      "https://admin.pacificworldschool.com/storage/uploads/1744786870_1.png",
      "https://admin.pacificworldschool.com/storage/uploads/1748690409_com.png",
    ],
  });

  const logos = data.logos || [];
  const update = (i, v) => setData(p => ({ ...p, logos: logos.map((x, idx) => idx === i ? v : x) }));
  const remove = (i) => setData(p => ({ ...p, logos: logos.filter((_, idx) => idx !== i) }));
  const add = () => setData(p => ({ ...p, logos: [...logos, ""] }));

  return (
    <AdminGuard>
      <div style={{ maxWidth:800 }}>
        <div style={{ marginBottom:24 }}>
          <h1 style={{ color:"#fff", fontSize:22, fontWeight:900, margin:"0 0 4px", fontFamily:"Georgia,serif" }}>Partners / Logo Marquee</h1>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:13, margin:0 }}>Manage logos shown in the scrolling marquee on the home page.</p>
        </div>
        <SectionCard title="Partner Logos" onSave={save} saving={saving}>
          {saved && <div style={{ color:"#86efac", fontSize:12, marginBottom:12 }}>✓ Saved</div>}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14 }}>
            {logos.map((url, i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.04)", borderRadius:8, padding:12, border:"1px solid rgba(255,255,255,0.08)" }}>
                <ImageField label={`Logo ${i+1}`} value={url} onChange={v => update(i, v)} />
                <button onClick={() => remove(i)} style={{ width:"100%", padding:"6px", borderRadius:6, background:"rgba(220,38,38,0.1)", color:"#fca5a5", border:"1px solid rgba(220,38,38,0.3)", cursor:"pointer", fontSize:12 }}>Remove</button>
              </div>
            ))}
          </div>
          <button onClick={add} style={{ marginTop:14, padding:"9px 18px", borderRadius:8, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.7)", cursor:"pointer", fontSize:13 }}>+ Add Logo</button>
        </SectionCard>
      </div>
    </AdminGuard>
  );
}
