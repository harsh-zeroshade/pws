"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";
export default function ContactPageEditor() {
  const [data,setData,save,saving,saved,err] = useContent("site","contact",{phone1:"9643370000",phone2:"9643380000",admissionPhone:"8899117704",email:"info@pacificworldschool.com",address:"HS-02, Tech Zone-4, Near Ek Murti Chowk, Greater Noida West - 201308",mapEmbed:"",facebookUrl:"https://www.facebook.com/PacificWorldSchool",instagramUrl:"https://www.instagram.com/pacificworldschoolgnw",linkedinUrl:"https://www.linkedin.com/school/pacific-world-school/",youtubeUrl:"https://www.youtube.com/channel/UC7nckMCz-8ucPwV2hvYEVNA"});
  const u=k=>v=>setData(p=>({...p,[k]:v}));
  return (
    <AdminGuard><div style={{maxWidth:960}}>
      <PageHeader title="Contact Page" desc="Edit all contact details shown on the contact page and footer."/>
      <SectionCard title="Phone & Email" onSave={save} saving={saving} saved={saved} error={err}>
        <TextField label="Front Desk Phone 1" value={data.phone1||""} onChange={u("phone1")}/>
        <TextField label="Front Desk Phone 2" value={data.phone2||""} onChange={u("phone2")}/>
        <TextField label="Admission Phone" value={data.admissionPhone||""} onChange={u("admissionPhone")}/>
        <TextField label="Email Address" value={data.email||""} onChange={u("email")}/>
        <TextField label="Full Address" value={data.address||""} onChange={u("address")} multiline/>
        <TextField label="Google Maps Embed URL" value={data.mapEmbed||""} onChange={u("mapEmbed")} hint="Paste the iframe src URL from Google Maps → Share → Embed"/>
      </SectionCard>
      <SectionCard title="Social Media" onSave={save} saving={saving} saved={saved} error={err}>
        <TextField label="Facebook URL" value={data.facebookUrl||""} onChange={u("facebookUrl")}/>
        <TextField label="Instagram URL" value={data.instagramUrl||""} onChange={u("instagramUrl")}/>
        <TextField label="LinkedIn URL" value={data.linkedinUrl||""} onChange={u("linkedinUrl")}/>
        <TextField label="YouTube URL" value={data.youtubeUrl||""} onChange={u("youtubeUrl")}/>
      </SectionCard>
    </div></AdminGuard>
  );
}
