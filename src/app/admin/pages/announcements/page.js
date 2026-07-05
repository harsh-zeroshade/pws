"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, ListField , PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";

export default function AnnouncementsEditor() {
  const [data, setData, save, saving, saved] = useContent("home", "announcements", {
    items: [
      "Admissions open for 2026â€“27 â€” Apply Now",
      "PACMUN 2025 registration is now live",
    ],
  });

  return (
    <AdminGuard>
      <div style={{ maxWidth: 700 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px", fontFamily: "Georgia,serif" }}>Announcements / Ticker</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>These items scroll in the top bar across all pages.</p>
        </div>
        <SectionCard title="Ticker Items" onSave={save} saving={saving}>
          {saved && <div style={{ color: "#86efac", fontSize: 12, marginBottom: 12 }}>âœ“ Saved</div>}
          <ListField label="Announcements" value={data.items || []} onChange={v => setData(p => ({ ...p, items: v }))} />
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: 8 }}>Each item will scroll in the top navigation bar. Leave empty to hide.</p>
        </SectionCard>
      </div>
    </AdminGuard>
  );
}
