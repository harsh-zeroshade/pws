"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";
import { useState } from "react";

export default function HeroVideoEditor() {
  const [data, setData, save, saving, saved] = useContent("home", "hero", {
    title: "Shaping Remarkable Futures",
    videoUrl: "/hero-video.mp4",
  });
  const [uploading, setUploading] = useState(false);

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/upload", { method: "POST", body: fd });
    const d = await r.json();
    setUploading(false);
    if (d.url) setData(p => ({ ...p, videoUrl: d.url }));
  };

  return (
    <AdminGuard>
      <div style={{ maxWidth: 700 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px", fontFamily: "Georgia,serif" }}>Hero Video</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>Replace the full-screen background video on the home page.</p>
        </div>

        <SectionCard title="Background Video" onSave={save} saving={saving}>
          {saved && <div style={{ color: "#86efac", fontSize: 12, marginBottom: 12 }}>✓ Saved successfully</div>}

          {/* Current video preview */}
          {data.videoUrl && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Current Video</p>
              <video src={data.videoUrl} controls muted style={{ width: "100%", maxHeight: 240, borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "#000" }} />
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 6 }}>{data.videoUrl}</p>
            </div>
          )}

          {/* URL input */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Video URL (or upload below)</label>
            <input type="text" value={data.videoUrl || ""} onChange={e => setData(p => ({ ...p, videoUrl: e.target.value }))}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>

          {/* Upload */}
          <label style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 9, background: uploading ? "rgba(184,149,58,0.4)" : "#B8953A", color: "#fff", fontSize: 13, fontWeight: 700, cursor: uploading ? "not-allowed" : "pointer" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
            {uploading ? "Uploading…" : "Upload New Video"}
            <input type="file" accept="video/*" onChange={handleVideoUpload} style={{ display: "none" }} />
          </label>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 10 }}>Recommended: MP4, max 50MB. Video will autoplay muted on the home page.</p>
        </SectionCard>
      </div>
    </AdminGuard>
  );
}
