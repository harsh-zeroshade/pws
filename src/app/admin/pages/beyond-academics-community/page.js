"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ImageField, ListField, PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";
export default function CommunityServiceEditor() {
  const [hero,setHero,save,saving,saved,err] = useContent("beyond-academics","community-hero",{title:"Community Service & Social Work",subtitle:"Building empathy and responsibility through meaningful community engagement.",bgImage:""});
  const [content,setContent,saveC,savingC,savedC,cErr] = useContent("beyond-academics","community-content",{intro:"",initiatives:[],gallery:[]});
  const hU=k=>v=>setHero(p=>({...p,[k]:v}));
  const cU=k=>v=>setContent(p=>({...p,[k]:v}));
  return (
    <AdminGuard><div style={{maxWidth:960}}>
      <PageHeader title="Community Service" desc="Edit the community service page content and initiatives."/>
      <SectionCard title="Page Hero" onSave={save} saving={saving} saved={saved} error={err}>
        <TextField label="Title" value={hero.title||""} onChange={hU("title")}/>
        <TextField label="Subtitle" value={hero.subtitle||""} onChange={hU("subtitle")} multiline/>
        <ImageField label="Hero Image" value={hero.bgImage||""} onChange={hU("bgImage")}/>
      </SectionCard>
      <SectionCard title="Page Content" onSave={saveC} saving={savingC} saved={savedC} error={cErr}>
        <TextField label="Introduction Paragraph" value={content.intro||""} onChange={cU("intro")} multiline/>
        <ListField label="Key Initiatives" value={content.initiatives||[]} onChange={cU("initiatives")} placeholder="e.g. Tree Plantation Drive"/>
      </SectionCard>
    </div></AdminGuard>
  );
}
