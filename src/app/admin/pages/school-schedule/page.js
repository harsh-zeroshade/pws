"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ListField, PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";
const inp = {width:"100%",padding:"8px 10px",borderRadius:6,background:"#0a0f1c",border:"1px solid #1e2d45",color:"#e2e8f0",fontSize:12.5,outline:"none",boxSizing:"border-box"};
export default function SchoolScheduleEditor() {
  const [hero,setHero,save,saving,saved,err] = useContent("admission","schedule-hero",{title:"School Schedule",subtitle:"Timings and academic calendar for Pacific World School."});
  const [sched,setSched,saveS,savingS,savedS,sErr] = useContent("admission","schedule-content",{timing:[{label:"School Timings",value:"8:00 AM – 2:30 PM"},{label:"Pre-Primary Timings",value:"8:30 AM – 1:00 PM"},{label:"Office Hours",value:"8:00 AM – 3:30 PM"}],holidays:[],notes:[]});
  const hU=k=>v=>setHero(p=>({...p,[k]:v}));
  const timing=sched.timing||[];
  const updateTiming=(i,k,v)=>setSched(p=>({...p,timing:timing.map((x,idx)=>idx===i?{...x,[k]:v}:x)}));
  const addTiming=()=>setSched(p=>({...p,timing:[...timing,{label:"",value:""}]}));
  const removeTiming=(i)=>setSched(p=>({...p,timing:timing.filter((_,idx)=>idx!==i)}));
  return (
    <AdminGuard><div style={{maxWidth:960}}>
      <PageHeader title="School Schedule" desc="Edit timings, holidays and schedule notes."/>
      <SectionCard title="Page Hero" onSave={save} saving={saving} saved={saved} error={err}>
        <TextField label="Title" value={hero.title||""} onChange={hU("title")}/>
        <TextField label="Subtitle" value={hero.subtitle||""} onChange={hU("subtitle")} multiline/>
      </SectionCard>
      <SectionCard title="School Timings" onSave={saveS} saving={savingS} saved={savedS} error={sErr}>
        {timing.map((t,i)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
            <input value={t.label||""} onChange={e=>updateTiming(i,"label",e.target.value)} placeholder="Label e.g. School Timings" style={{...inp,flex:1}}/>
            <input value={t.value||""} onChange={e=>updateTiming(i,"value",e.target.value)} placeholder="e.g. 8:00 AM – 2:30 PM" style={{...inp,flex:1}}/>
            <button onClick={()=>removeTiming(i)} style={{width:34,height:38,borderRadius:6,background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",color:"#fca5a5",cursor:"pointer",fontSize:13,flexShrink:0}}>✕</button>
          </div>
        ))}
        <button onClick={addTiming} style={{padding:"7px 14px",borderRadius:7,background:"rgba(184,149,58,0.12)",border:"1px solid rgba(184,149,58,0.3)",color:"#D4AF5A",cursor:"pointer",fontSize:12,fontWeight:600,marginBottom:16}}>+ Add Timing</button>
        <ListField label="Public Holidays / Breaks" value={sched.holidays||[]} onChange={v=>setSched(p=>({...p,holidays:v}))} placeholder="e.g. Diwali Break – Oct 20-25"/>
        <ListField label="Important Notes" value={sched.notes||[]} onChange={v=>setSched(p=>({...p,notes:v}))} placeholder="e.g. Saturday is a working day for Classes IX-XII"/>
      </SectionCard>
    </div></AdminGuard>
  );
}
