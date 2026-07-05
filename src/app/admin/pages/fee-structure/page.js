"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ListField, PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";
const inp = {width:"100%",padding:"8px 10px",borderRadius:6,background:"#0a0f1c",border:"1px solid #1e2d45",color:"#e2e8f0",fontSize:12.5,outline:"none",boxSizing:"border-box"};
export default function FeeStructureEditor() {
  const [hero,setHero,save,saving,saved,err] = useContent("admission","fee-hero",{title:"Fee Structure",subtitle:"Transparent fee structure for Nursery to Class XII."});
  const [fees,setFees,saveF,savingF,savedF,fErr] = useContent("admission","fee-structure",{note:"",categories:[{class:"Nursery – KG",annual:"",quarterly:"",monthly:""},{class:"Class I – V",annual:"",quarterly:"",monthly:""},{class:"Class VI – VIII",annual:"",quarterly:"",monthly:""},{class:"Class IX – X",annual:"",quarterly:"",monthly:""},{class:"Class XI – XII",annual:"",quarterly:"",monthly:""}]});
  const hU=k=>v=>setHero(p=>({...p,[k]:v}));
  const cats=fees.categories||[];
  const updateCat=(i,k,v)=>setFees(p=>({...p,categories:cats.map((x,idx)=>idx===i?{...x,[k]:v}:x)}));
  const addCat=()=>setFees(p=>({...p,categories:[...cats,{class:"",annual:"",quarterly:"",monthly:""}]}));
  const removeCat=(i)=>setFees(p=>({...p,categories:cats.filter((_,idx)=>idx!==i)}));
  return (
    <AdminGuard><div style={{maxWidth:960}}>
      <PageHeader title="Fee Structure" desc="Manage fee categories for all classes."/>
      <SectionCard title="Page Hero" onSave={save} saving={saving} saved={saved} error={err}>
        <TextField label="Title" value={hero.title||""} onChange={hU("title")}/>
        <TextField label="Subtitle" value={hero.subtitle||""} onChange={hU("subtitle")} multiline/>
      </SectionCard>
      <SectionCard title="Fee Table" onSave={saveF} saving={savingF} saved={savedF} error={fErr}>
        <TextField label="Important Note" value={fees.note||""} onChange={v=>setFees(p=>({...p,note:v}))} multiline hint="e.g. Fees subject to revision. GST applicable where required."/>
        <div style={{borderRadius:10,overflow:"hidden",border:"1px solid #1e2d45",marginTop:8}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 40px",gap:0,background:"rgba(184,149,58,0.08)",padding:"10px 12px",borderBottom:"1px solid #1e2d45"}}>
            {["Class","Annual","Quarterly","Monthly",""].map(h=><span key={h} style={{color:"#64748b",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em"}}>{h}</span>)}
          </div>
          {cats.map((cat,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 40px",gap:6,padding:"8px 12px",borderBottom:"1px solid rgba(30,45,69,0.5)",alignItems:"center"}}>
              <input value={cat.class||""} onChange={e=>updateCat(i,"class",e.target.value)} placeholder="Class/Grade" style={inp}/>
              <input value={cat.annual||""} onChange={e=>updateCat(i,"annual",e.target.value)} placeholder="₹0" style={inp}/>
              <input value={cat.quarterly||""} onChange={e=>updateCat(i,"quarterly",e.target.value)} placeholder="₹0" style={inp}/>
              <input value={cat.monthly||""} onChange={e=>updateCat(i,"monthly",e.target.value)} placeholder="₹0" style={inp}/>
              <button onClick={()=>removeCat(i)} style={{width:32,height:32,borderRadius:6,background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",color:"#fca5a5",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
            </div>
          ))}
        </div>
        <button onClick={addCat} style={{marginTop:12,padding:"9px 18px",borderRadius:8,background:"rgba(184,149,58,0.12)",border:"1px solid rgba(184,149,58,0.3)",color:"#D4AF5A",cursor:"pointer",fontSize:13,fontWeight:600}}>+ Add Row</button>
      </SectionCard>
    </div></AdminGuard>
  );
}
