"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ImageField, ListField, PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";
export default function AdmissionBrochureEditor() {
  const [hero,setHero,save,saving,saved,err] = useContent("admission","brochure-hero",{title:"Admissions 2026–27",subtitle:"Begin your child's journey towards excellence at Pacific World School.",bgImage:"",brochureUrl:""});
  const [info,setInfo,saveInfo,savingInfo,savedInfo,infoErr] = useContent("admission","brochure-info",{highlights:["World-class 10-acre campus","Dual CBSE & Cambridge curriculum","1:16 teacher-student ratio"],applyLink:"https://www.pwscampuscare.in//Logon/TPLoginRegistrationEnq"});
  const hU=k=>v=>setHero(p=>({...p,[k]:v}));
  const iU=k=>v=>setInfo(p=>({...p,[k]:v}));
  return (
    <AdminGuard><div style={{maxWidth:960}}>
      <PageHeader title="Admission Brochure Page" desc="Edit the brochure page hero, highlights and download link."/>
      <SectionCard title="Page Hero" onSave={save} saving={saving} saved={saved} error={err}>
        <TextField label="Page Title" value={hero.title||""} onChange={hU("title")}/>
        <TextField label="Subtitle" value={hero.subtitle||""} onChange={hU("subtitle")} multiline/>
        <ImageField label="Hero Background Image" value={hero.bgImage||""} onChange={hU("bgImage")}/>
        <TextField label="Brochure PDF URL" value={hero.brochureUrl||""} onChange={hU("brochureUrl")} hint="Link to download the PDF brochure"/>
      </SectionCard>
      <SectionCard title="Highlights & Links" onSave={saveInfo} saving={savingInfo} saved={savedInfo} error={infoErr}>
        <ListField label="Key Highlights" value={info.highlights||[]} onChange={iU("highlights")}/>
        <TextField label="Apply Now Link" value={info.applyLink||""} onChange={iU("applyLink")}/>
      </SectionCard>
    </div></AdminGuard>
  );
}
