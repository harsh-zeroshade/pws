"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ListField, PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";
export default function AdmissionPolicyEditor() {
  const [hero,setHero,save,saving,saved,err] = useContent("admission","policy-hero",{title:"Admission Policy",subtitle:"Transparent and fair admission process for all applicants."});
  const [policy,setPolicy,saveP,savingP,savedP,pErr] = useContent("admission","policy-content",{intro:"",criteria:[],documents:[],ageRequirements:[]});
  const hU=k=>v=>setHero(p=>({...p,[k]:v}));
  const pU=k=>v=>setPolicy(p=>({...p,[k]:v}));
  return (
    <AdminGuard><div style={{maxWidth:960}}>
      <PageHeader title="Admission Policy" desc="Edit the admission policy page content."/>
      <SectionCard title="Page Hero" onSave={save} saving={saving} saved={saved} error={err}>
        <TextField label="Title" value={hero.title||""} onChange={hU("title")}/>
        <TextField label="Subtitle" value={hero.subtitle||""} onChange={hU("subtitle")} multiline/>
      </SectionCard>
      <SectionCard title="Policy Content" onSave={saveP} saving={savingP} saved={savedP} error={pErr}>
        <TextField label="Introduction" value={policy.intro||""} onChange={pU("intro")} multiline/>
        <ListField label="Admission Criteria" value={policy.criteria||[]} onChange={pU("criteria")} placeholder="e.g. Merit-based selection"/>
        <ListField label="Required Documents" value={policy.documents||[]} onChange={pU("documents")} placeholder="e.g. Birth Certificate"/>
        <ListField label="Age Requirements" value={policy.ageRequirements||[]} onChange={pU("ageRequirements")} placeholder="e.g. Nursery: 3-4 years"/>
      </SectionCard>
    </div></AdminGuard>
  );
}
