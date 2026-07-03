"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, TextField, ListField } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";

export default function RegistrationEditor() {
  const [data, setData, save, saving, saved] = useContent("admission", "registration", {
    heroTitle: "Registration Process",
    heroSubtitle: "A simple, transparent admission process for 2026–27.",
    steps: [
      "Visit the school office or apply online at pwscampuscare.in",
      "Fill the registration form and submit required documents",
      "Attend the interaction session with the student",
      "Receive admission confirmation and pay the fee",
    ],
    documents: [
      "Birth Certificate",
      "Previous School Report Card",
      "Passport-size Photographs (4)",
      "Residence Proof (Aadhar / Passport)",
      "Transfer Certificate (if applicable)",
    ],
    registrationFee: "₹500 (non-refundable)",
    contactForAdmission: "8899117704",
  });
  const u = k => v => setData(p => ({ ...p, [k]: v }));

  return (
    <AdminGuard>
      <div style={{ maxWidth: 800 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px", fontFamily: "Georgia,serif" }}>Registration Process Page</h1>
        </div>
        <SectionCard title="Hero" onSave={save} saving={saving}>
          {saved && <div style={{ color: "#86efac", fontSize: 12, marginBottom: 12 }}>✓ Saved</div>}
          <TextField label="Page Title" value={data.heroTitle || ""} onChange={u("heroTitle")} />
          <TextField label="Subtitle" value={data.heroSubtitle || ""} onChange={u("heroSubtitle")} multiline />
        </SectionCard>
        <SectionCard title="Process & Documents" onSave={save} saving={saving}>
          <ListField label="Registration Steps" value={data.steps || []} onChange={u("steps")} />
          <ListField label="Required Documents" value={data.documents || []} onChange={u("documents")} />
          <TextField label="Registration Fee" value={data.registrationFee || ""} onChange={u("registrationFee")} />
          <TextField label="Admission Contact Number" value={data.contactForAdmission || ""} onChange={u("contactForAdmission")} />
        </SectionCard>
      </div>
    </AdminGuard>
  );
}
