"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ImageField, PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";
const inp = {width:"100%",padding:"8px 10px",borderRadius:6,background:"#0a0f1c",border:"1px solid #1e2d45",color:"#e2e8f0",fontSize:12.5,outline:"none",boxSizing:"border-box"};
export default function HousesEditor() {
  const [hero,setHero,save,saving,saved,err] = useContent("beyond-academics","houses-hero",{title:"Houses",subtitle:"Our house system fosters teamwork, leadership and healthy competition.",bgImage:""});
  const [houses,setHouses,saveH,savingH,savedH,hErr] = useContent("beyond-academics","houses-list",{items:[{name:"Columbia",color:"#B8953A",desc:"",img:""},{name:"Fraser",color:"#1a3a6e",desc:"",img:""},{name:"Daintree",color:"#2a5a3e",desc:"",img:""}]});
  const hU=k=>v=>setHero(p=>({...p,[k]:v}));
  const items=houses.items||[];
  const update=(i,k,v)=>setHouses(p=>({...p,items:items.map((x,idx)=>idx===i?{...x,[k]:v}:x)}));
  const add=()=>setHouses(p=>({...p,items:[...items,{name:"",color:"#B8953A",desc:"",img:""}]}));
  const remove=(i)=>setHouses(p=>({...p,items:items.filter((_,idx)=>idx!==i)}));
  return (
    <AdminGuard><div style={{maxWidth:960}}>
      <PageHeader title="Houses" desc="Manage school houses — names, colors, descriptions and images."/>
      <SectionCard title="Page Hero" onSave={save} saving={saving} saved={saved} error={err}>
        <TextField label="Title" value={hero.title||""} onChange={hU("title")}/>
        <TextField label="Subtitle" value={hero.subtitle||""} onChange={hU("subtitle")} multiline/>
        <ImageField label="Hero Image" value={hero.bgImage||""} onChange={hU("bgImage")}/>
      </SectionCard>
      <SectionCard title={`Houses (${items.length})`} onSave={saveH} saving={savingH} saved={savedH} error={hErr}>
        {items.map((item,i)=>(
          <div key={i} style={{background:"#0f172a",borderRadius:10,padding:14,marginBottom:12,border:"1px solid #1e2d45"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:14,height:14,borderRadius:"50%",background:item.color||"#B8953A"}}/><span style={{color:"#D4AF5A",fontSize:12,fontWeight:700}}>{item.name||`House ${i+1}`}</span></div>
              <button onClick={()=>remove(i)} style={{padding:"3px 8px",borderRadius:5,background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",color:"#fca5a5",cursor:"pointer",fontSize:11}}>Remove</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
              <div><label style={{display:"block",color:"#64748b",fontSize:10,fontWeight:700,textTransform:"uppercase",marginBottom:4}}>House Name</label><input value={item.name||""} onChange={e=>update(i,"name",e.target.value)} style={inp}/></div>
              <div><label style={{display:"block",color:"#64748b",fontSize:10,fontWeight:700,textTransform:"uppercase",marginBottom:4}}>Color (hex)</label><input value={item.color||""} onChange={e=>update(i,"color",e.target.value)} style={inp} placeholder="#B8953A"/></div>
            </div>
            <div style={{marginBottom:10}}><label style={{display:"block",color:"#64748b",fontSize:10,fontWeight:700,textTransform:"uppercase",marginBottom:4}}>Description</label><textarea value={item.desc||""} onChange={e=>update(i,"desc",e.target.value)} rows={2} style={{...inp,resize:"vertical",fontFamily:"inherit"}}/></div>
            <ImageField label="House Image" value={item.img||""} onChange={v=>update(i,"img",v)}/>
          </div>
        ))}
        <button onClick={add} style={{padding:"9px 18px",borderRadius:8,background:"rgba(184,149,58,0.12)",border:"1px solid rgba(184,149,58,0.3)",color:"#D4AF5A",cursor:"pointer",fontSize:13,fontWeight:600}}>+ Add House</button>
      </SectionCard>
    </div></AdminGuard>
  );
}
