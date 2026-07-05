"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";
const inp={width:"100%",padding:"8px 10px",borderRadius:6,background:"#0a0f1c",border:"1px solid #1e2d45",color:"#e2e8f0",fontSize:12.5,outline:"none",boxSizing:"border-box"};
const GROUPS=[{group:"School Leadership",items:[{name:"Mhridul Mishra",role:"Head Boy",class:"XI"},{name:"Navya Vats",role:"Head Girl",class:"XI"},{name:"Punya Shukla",role:"Vice Head Boy",class:"X"},{name:"Aahana Shekhawat",role:"Vice Head Girl",class:"X"},{name:"Priyal Mishra",role:"Student President",class:"XI"},{name:"Saathvik Gannavarapu",role:"Student President",class:"XI"},{name:"Rishit Singh",role:"Student Secretary",class:"XI"},{name:"Shalviya Gupta",role:"Student Secretary",class:"XI"},{name:"Jazveen Kaur",role:"Sports Captain",class:"XI"},{name:"Aishi Jain",role:"Vice Sports Captain",class:"X"}]},{group:"Cultural",items:[{name:"Parinita Sharma",role:"Cultural President",class:"XI"},{name:"Gaurav Seth",role:"Cultural Secretary",class:"XI"}]},{group:"Special Roles",items:[{name:"Atharv Shrivastava",role:"Technical Lead",class:"XI"},{name:"Aarvi Goel",role:"Happiness Lead",class:"XI"},{name:"Prisha Garg",role:"Creative Lead",class:"XI"},{name:"Aadya Gupta",role:"Literary Luminary",class:"XI"},{name:"Tejas Jalan",role:"Oratory Maestro",class:"X"}]}];
export default function StudentCouncilEditor() {
  const [data,setData,save,saving,saved,err] = useContent("committee","student-council",{groups:GROUPS});
  const groups=data.groups||[];
  const updateMember=(gi,mi,k,v)=>setData(p=>({...p,groups:groups.map((g,gIdx)=>gIdx===gi?{...g,items:g.items.map((m,mIdx)=>mIdx===mi?{...m,[k]:v}:m)}:g)}));
  const addMember=(gi)=>setData(p=>({...p,groups:groups.map((g,gIdx)=>gIdx===gi?{...g,items:[...g.items,{name:"",role:"",class:""}]}:g)}));
  const removeMember=(gi,mi)=>setData(p=>({...p,groups:groups.map((g,gIdx)=>gIdx===gi?{...g,items:g.items.filter((_,mIdx)=>mIdx!==mi)}:g)}));
  return (
    <AdminGuard><div style={{maxWidth:960}}>
      <PageHeader title="Student Council Committee" desc="Edit student council members by group."/>
      {groups.map((g,gi)=>(
        <SectionCard key={gi} title={g.group} onSave={save} saving={saving} saved={saved} error={err}>
          <div style={{overflowX:"auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"2fr 2fr 80px 40px",gap:6,padding:"6px 0",borderBottom:"1px solid #1e2d45",marginBottom:6}}>
              {["Name","Role","Class",""].map(h=><span key={h} style={{color:"#64748b",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em"}}>{h}</span>)}
            </div>
            {g.items.map((m,mi)=>(
              <div key={mi} style={{display:"grid",gridTemplateColumns:"2fr 2fr 80px 40px",gap:6,marginBottom:6,alignItems:"center"}}>
                <input value={m.name||""} onChange={e=>updateMember(gi,mi,"name",e.target.value)} placeholder="Student Name" style={inp}/>
                <input value={m.role||""} onChange={e=>updateMember(gi,mi,"role",e.target.value)} placeholder="Role" style={inp}/>
                <input value={m.class||""} onChange={e=>updateMember(gi,mi,"class",e.target.value)} placeholder="XI" style={inp}/>
                <button onClick={()=>removeMember(gi,mi)} style={{width:34,height:38,borderRadius:6,background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",color:"#fca5a5",cursor:"pointer",fontSize:13}}>✕</button>
              </div>
            ))}
            <button onClick={()=>addMember(gi)} style={{marginTop:6,padding:"7px 14px",borderRadius:7,background:"rgba(184,149,58,0.12)",border:"1px solid rgba(184,149,58,0.3)",color:"#D4AF5A",cursor:"pointer",fontSize:12,fontWeight:600}}>+ Add Member</button>
          </div>
        </SectionCard>
      ))}
    </div></AdminGuard>
  );
}
