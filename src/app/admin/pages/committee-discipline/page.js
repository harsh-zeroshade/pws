"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";
const inp={width:"100%",padding:"8px 10px",borderRadius:6,background:"#0a0f1c",border:"1px solid #1e2d45",color:"#e2e8f0",fontSize:12.5,outline:"none",boxSizing:"border-box"};
export default function DisciplineCommitteeEditor() {
  const [data,setData,save,saving,saved,err] = useContent("committee","discipline",{members:[{name:"Ms. Pooja Bose",role:"Head"},{name:"Mr. Navin Jain",role:"Member"},{name:"Ms. Pooja Suri",role:"Member"},{name:"Ms. Amandeep Kaur",role:"Member"},{name:"Ms. Shikha Yadav",role:"Member"},{name:"Ms. Suhani Chauhan",role:"School Counselor"},{name:"Dr. Aditi",role:"Member (Medical Cases)"},{name:"Ms. Manvi Bhandari",role:"Member"},{name:"Coordinator",role:"Member"}]});
  const members=data.members||[];
  const update=(i,k,v)=>setData(p=>({...p,members:members.map((x,idx)=>idx===i?{...x,[k]:v}:x)}));
  const add=()=>setData(p=>({...p,members:[...members,{name:"",role:"Member"}]}));
  const remove=(i)=>setData(p=>({...p,members:members.filter((_,idx)=>idx!==i)}));
  return (
    <AdminGuard><div style={{maxWidth:960}}>
      <PageHeader title="Discipline Committee" desc="Edit discipline committee member names and roles."/>
      <SectionCard title={`Members (${members.length})`} onSave={save} saving={saving} saved={saved} error={err}>
        {members.map((m,i)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
            <input value={m.name||""} onChange={e=>update(i,"name",e.target.value)} placeholder="Full Name" style={{...inp,flex:2}}/>
            <input value={m.role||""} onChange={e=>update(i,"role",e.target.value)} placeholder="Role" style={{...inp,flex:1}}/>
            <button onClick={()=>remove(i)} style={{width:34,height:38,borderRadius:6,background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",color:"#fca5a5",cursor:"pointer",fontSize:13,flexShrink:0}}>✕</button>
          </div>
        ))}
        <button onClick={add} style={{marginTop:8,padding:"9px 18px",borderRadius:8,background:"rgba(184,149,58,0.12)",border:"1px solid rgba(184,149,58,0.3)",color:"#D4AF5A",cursor:"pointer",fontSize:13,fontWeight:600}}>+ Add Member</button>
      </SectionCard>
    </div></AdminGuard>
  );
}
