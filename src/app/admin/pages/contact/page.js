"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField , PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";

export default function ContactEditor() {
  const [data, setData, save, saving, saved] = useContent("site", "contact", {
    phone1: "9643370000",
    phone2: "9643380000",
    admissionPhone: "8899117704",
    email: "info@pacificworldschool.com",
    address: "HS-02, Tech Zone-4, Near Ek Murti Chowk, Greater Noida West - 201308",
    mapEmbed: "",
    facebookUrl: "https://www.facebook.com/PacificWorldSchool",
    instagramUrl: "https://www.instagram.com/pacificworldschoolgnw",
    linkedinUrl: "https://www.linkedin.com/school/pacific-world-school/",
    youtubeUrl: "https://www.youtube.com/channel/UC7nckMCz-8ucPwV2hvYEVNA",
  });
  const u = k => v => setData(p => ({ ...p, [k]: v }));

  return (
    <AdminGuard>
      <div style={{ maxWidth: 700 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px", fontFamily: "Georgia,serif" }}>Contact Information</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>Used in the top bar, footer, and contact page.</p>
        </div>
        <SectionCard title="Phone & Email" onSave={save} saving={saving}>
          {saved && <div style={{ color: "#86efac", fontSize: 12, marginBottom: 12 }}>âœ“ Saved</div>}
          <TextField label="Front Desk Phone 1" value={data.phone1 || ""} onChange={u("phone1")} />
          <TextField label="Front Desk Phone 2" value={data.phone2 || ""} onChange={u("phone2")} />
          <TextField label="Admission Phone" value={data.admissionPhone || ""} onChange={u("admissionPhone")} />
          <TextField label="Email Address" value={data.email || ""} onChange={u("email")} />
          <TextField label="Full Address" value={data.address || ""} onChange={u("address")} multiline />
          <TextField label="Google Maps Embed URL" value={data.mapEmbed || ""} onChange={u("mapEmbed")} placeholder="https://maps.google.com/..." />
        </SectionCard>
        <SectionCard title="Social Media Links" onSave={save} saving={saving}>
          <TextField label="Facebook URL" value={data.facebookUrl || ""} onChange={u("facebookUrl")} />
          <TextField label="Instagram URL" value={data.instagramUrl || ""} onChange={u("instagramUrl")} />
          <TextField label="LinkedIn URL" value={data.linkedinUrl || ""} onChange={u("linkedinUrl")} />
          <TextField label="YouTube URL" value={data.youtubeUrl || ""} onChange={u("youtubeUrl")} />
        </SectionCard>
      </div>
    </AdminGuard>
  );
}
