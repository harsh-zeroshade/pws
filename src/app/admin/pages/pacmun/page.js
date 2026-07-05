"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ImageField, ListField, PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";
export default function PacmunEditor() {
  const [data,setData,save,saving,saved,err] = useContent("pacmun","main",{title:"Pacific MUN",subtitle:"Model United Nations — Developing tomorrow's global leaders through diplomacy and debate.",bgImage:"",description:"",highlights:[],registrationLink:""});
  const u=k=>v=>setData(p=>({...p,[k]:v}));
  return (
    <AdminGuard><div style={{maxWidth:960}}>
      <PageHeader title="PACMUN" desc="Edit the Pacific MUN page content, highlights and registration link."/>
      <SectionCard title="PACMUN Page" onSave={save} saving={saving} saved={saved} error={err}>
        <TextField label="Page Title" value={data.title||""} onChange={u("title")}/>
        <TextField label="Subtitle" value={data.subtitle||""} onChange={u("subtitle")} multiline/>
        <ImageField label="Hero / Banner Image" value={data.bgImage||""} onChange={u("bgImage")}/>
        <TextField label="Description" value={data.description||""} onChange={u("description")} multiline/>
        <ListField label="Key Highlights" value={data.highlights||[]} onChange={u("highlights")} placeholder="e.g. 500+ delegates from 50 schools"/>
        <TextField label="Registration Link" value={data.registrationLink||""} onChange={u("registrationLink")} hint="External URL for MUN registration"/>
      </SectionCard>
    </div></AdminGuard>
  );
}
