"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";
const inp={width:"100%",padding:"8px 10px",borderRadius:6,background:"#0a0f1c",border:"1px solid #1e2d45",color:"#e2e8f0",fontSize:12.5,outline:"none",boxSizing:"border-box"};
const lbl={display:"block",color:"#64748b",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4};
export default function ManagingCommitteeEditor() {
  const [data,setData,save,saving,saved,err] = useContent("committee","managing",{members:[{name:"Mrs. Santosh Bansal",role:"Chairperson"},{name:"Mrs. Nidhi Bansal",role:"Pro-Vice Chairperson"},{name:"Mrs. Pooja Bose",role:"Member Secretary"},{name:"Mr. P.K Roy",role:"Principal, Navodaya Vidyalaya Ghaziabad"},{name:"Ms. Pallavi Upadhyaya",role:"Principal DPS R.N Ext."},{name:"Ms. Anita Jain",role:"Parent Representative"},{name:"Mr. Amit Mohan",role:"Parent Representative"},{name:"Ms. Supriya Kumar",role:"Teacher Representative"},{name:"Ms. Shruti Shikha",role:"Teacher Representative"},{name:"Ms. Neerja Tyagi",role:"Teacher DPS R.N Extn."},{name:"Mr. Aslam",role:"Teacher DPS Indirapuram"}]});
  const members=data.members||[];
  const update=(i,k,v)=>setData(p=>({...p,members:members.map((x,idx)=>idx===i?{...x,[k]:v}:x)}));
  const add=()=>setData(p=>({...p,members:[...members,{name:"",role:"Member"}]}));
  const remove=(i)=>setData(p=>({...p,members:members.filter((_,idx)=>idx!==i)}));
  return (
    <AdminGuard><div style={{maxWidth:960}}>
      <PageHeader title="Managing Committee" desc="Edit managing committee member names and roles."/>
      <SectionCard title={`Members (${members.length})`} onSave={save} saving={saving} saved={saved} error={err}>
        {members.map((m,i)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
            <input value={m.name||""} onChange={e=>update(i,"name",e.target.value)} placeholder="Full Name" style={{...inp,flex:2}}/>
            <input value={m.role||""} onChange={e=>update(i,"role",e.target.value)} placeholder="Role / Designation" style={{...inp,flex:2}}/>
            <button onClick={()=>remove(i)} style={{width:34,height:38,borderRadius:6,background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",color:"#fca5a5",cursor:"pointer",fontSize:13,flexShrink:0}}>✕</button>
          </div>
        ))}
        <button onClick={add} style={{marginTop:8,padding:"9px 18px",borderRadius:8,background:"rgba(184,149,58,0.12)",border:"1px solid rgba(184,149,58,0.3)",color:"#D4AF5A",cursor:"pointer",fontSize:13,fontWeight:600}}>+ Add Member</button>
      </SectionCard>
    </div></AdminGuard>
  );
}
