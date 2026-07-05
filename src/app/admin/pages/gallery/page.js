"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ImageField, PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";
const inp={width:"100%",padding:"8px 10px",borderRadius:6,background:"#0a0f1c",border:"1px solid #1e2d45",color:"#e2e8f0",fontSize:12.5,outline:"none",boxSizing:"border-box"};
export default function GalleryEditor() {
  const [hero,setHero,save,saving,saved,err] = useContent("gallery","hero",{title:"Gallery",subtitle:"Moments of excellence, joy, and growth from Pacific World School."});
  const [albums,setAlbums,saveA,savingA,savedA,aErr] = useContent("gallery","albums",{items:[]});
  const hU=k=>v=>setHero(p=>({...p,[k]:v}));
  const items=albums.items||[];
  const update=(i,k,v)=>setAlbums(p=>({...p,items:items.map((x,idx)=>idx===i?{...x,[k]:v}:x)}));
  const add=()=>setAlbums(p=>({...p,items:[...items,{title:"",desc:"",cover:"",images:[]}]}));
  const remove=(i)=>setAlbums(p=>({...p,items:items.filter((_,idx)=>idx!==i)}));
  return (
    <AdminGuard><div style={{maxWidth:960}}>
      <PageHeader title="Gallery" desc="Manage the gallery page hero and photo albums."/>
      <SectionCard title="Page Hero" onSave={save} saving={saving} saved={saved} error={err}>
        <TextField label="Title" value={hero.title||""} onChange={hU("title")}/>
        <TextField label="Subtitle" value={hero.subtitle||""} onChange={hU("subtitle")} multiline/>
      </SectionCard>
      <SectionCard title={`Albums (${items.length})`} onSave={saveA} saving={savingA} saved={savedA} error={aErr}
        subtitle="Each album has a cover image. Individual photos are managed via the Media Library.">
        {items.map((item,i)=>(
          <div key={i} style={{background:"#0f172a",borderRadius:10,padding:14,marginBottom:12,border:"1px solid #1e2d45"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
              <span style={{color:"#D4AF5A",fontSize:12,fontWeight:700}}>Album {i+1}: {item.title||"Untitled"}</span>
              <button onClick={()=>remove(i)} style={{padding:"3px 8px",borderRadius:5,background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",color:"#fca5a5",cursor:"pointer",fontSize:11}}>Remove</button>
            </div>
            <div style={{marginBottom:10}}><label style={{display:"block",color:"#64748b",fontSize:10,fontWeight:700,textTransform:"uppercase",marginBottom:4}}>Album Title</label><input value={item.title||""} onChange={e=>update(i,"title",e.target.value)} style={inp}/></div>
            <div style={{marginBottom:10}}><label style={{display:"block",color:"#64748b",fontSize:10,fontWeight:700,textTransform:"uppercase",marginBottom:4}}>Description</label><textarea value={item.desc||""} onChange={e=>update(i,"desc",e.target.value)} rows={2} style={{...inp,resize:"vertical",fontFamily:"inherit"}}/></div>
            <ImageField label="Cover Image" value={item.cover||""} onChange={v=>update(i,"cover",v)}/>
          </div>
        ))}
        <button onClick={add} style={{padding:"9px 18px",borderRadius:8,background:"rgba(184,149,58,0.12)",border:"1px solid rgba(184,149,58,0.3)",color:"#D4AF5A",cursor:"pointer",fontSize:13,fontWeight:600}}>+ Add Album</button>
      </SectionCard>
    </div></AdminGuard>
  );
}
