"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";

function ContactSettings() {
  const [data, setData, save, saving, saved] = useContent("site", "contact", {
    phone1: "9643370000", phone2: "9643380000",
    email: "info@pacificworldschool.com",
    address: "HS-02, Tech Zone-4, Near Ek Murti Chowk, Greater Noida West - 201308",
    admissionPhone: "8899117704",
  });
  const u = k => v => setData(p => ({ ...p, [k]: v }));

  return (
    <SectionCard title="Contact Information" onSave={save} saving={saving}>
      {saved && <div style={{ color:"#86efac", fontSize:12, marginBottom:12 }}>✓ Saved</div>}
      <TextField label="Phone 1" value={data.phone1 || ""} onChange={u("phone1")} />
      <TextField label="Phone 2" value={data.phone2 || ""} onChange={u("phone2")} />
      <TextField label="Admission Phone" value={data.admissionPhone || ""} onChange={u("admissionPhone")} />
      <TextField label="Email" value={data.email || ""} onChange={u("email")} />
      <TextField label="Address" value={data.address || ""} onChange={u("address")} multiline />
    </SectionCard>
  );
}

function SchoolSettings() {
  const [data, setData, save, saving, saved] = useContent("site", "school-info", {
    name: "Pacific World School",
    cbseCode: "61276", cbseAffiliation: "2133246",
    cambridgeAffiliation: "IA380",
    tagline: "Excellence · Empathy · Empowerment",
  });
  const u = k => v => setData(p => ({ ...p, [k]: v }));

  return (
    <SectionCard title="School Information" onSave={save} saving={saving}>
      {saved && <div style={{ color:"#86efac", fontSize:12, marginBottom:12 }}>✓ Saved</div>}
      <TextField label="School Name" value={data.name || ""} onChange={u("name")} />
      <TextField label="Tagline" value={data.tagline || ""} onChange={u("tagline")} />
      <TextField label="CBSE School Code" value={data.cbseCode || ""} onChange={u("cbseCode")} />
      <TextField label="CBSE Affiliation Number" value={data.cbseAffiliation || ""} onChange={u("cbseAffiliation")} />
      <TextField label="Cambridge Affiliation" value={data.cambridgeAffiliation || ""} onChange={u("cambridgeAffiliation")} />
    </SectionCard>
  );
}

export default function SettingsPage() {
  return (
    <AdminGuard>
      <div style={{ maxWidth:800 }}>
        <div style={{ marginBottom:24 }}>
          <h1 style={{ color:"#fff", fontSize:22, fontWeight:900, margin:"0 0 4px", fontFamily:"Georgia,serif" }}>Settings</h1>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:13, margin:0 }}>Site-wide settings and contact information.</p>
        </div>
        <SchoolSettings />
        <ContactSettings />
        <div style={{ padding:"14px 18px", borderRadius:10, background:"rgba(184,149,58,0.07)", border:"1px solid rgba(184,149,58,0.2)" }}>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:12, margin:0 }}>
            <span style={{ color:"#B8953A", fontWeight:700 }}>Security: </span>
            To change the admin password, update <code style={{ background:"rgba(255,255,255,0.1)", padding:"1px 5px", borderRadius:3 }}>ADMIN_PASSWORD</code> in <code style={{ background:"rgba(255,255,255,0.1)", padding:"1px 5px", borderRadius:3 }}>.env.local</code> and restart the server.
          </p>
        </div>
      </div>
    </AdminGuard>
  );
}
