"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

function MediaLibraryContent() {
  const { status } = useSession();
  const [media, setMedia]       = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError]       = useState(null);
  const [copied, setCopied]     = useState(null);
  const [deleting, setDeleting] = useState(null);

  const load = async () => {
    setError(null);
    try {
      const res = await fetch("/api/media");
      if (!res.ok) {
        const text = await res.text();
        setError(`Error ${res.status}: ${text || "Failed to load media"}`);
        return;
      }
      const d = await res.json();
      if (Array.isArray(d)) setMedia(d);
    } catch (e) {
      setError(e.message);
    }
  };

  // Only load once authenticated
  useEffect(() => {
    if (status === "authenticated") load();
  }, [status]);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) console.error("Upload failed:", await res.text());
    }
    setUploading(false);
    load();
  };

  const handleDelete = async (item) => {
    if (!confirm(`Delete "${item.filename}"?`)) return;
    setDeleting(item._id);
    await fetch("/api/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item._id }),
    });
    setDeleting(null);
    load();
  };

  const copy = (url) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const images = media.filter(m => m.type === "image");
  const videos = media.filter(m => m.type === "video");
  const docs   = media.filter(m => m.type === "document");

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px", fontFamily: "Georgia,serif" }}>Media Library</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>{media.length} file{media.length !== 1 ? "s" : ""} stored</p>
        </div>
        <label style={{ padding: "9px 18px", borderRadius: 9, background: uploading ? "rgba(184,149,58,0.5)" : "#B8953A", color: "#fff", fontSize: 13, fontWeight: 700, cursor: uploading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
          {uploading ? "Uploading…" : "Upload Files"}
          <input type="file" multiple accept="image/*,video/*,.pdf,.doc,.docx" onChange={handleUpload} disabled={uploading} style={{ display: "none" }} />
        </label>
      </div>

      {/* Error state */}
      {error && (
        <div style={{ padding: "14px 18px", borderRadius: 10, background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", color: "#fca5a5", fontSize: 13, marginBottom: 20 }}>
          {error}
          <button onClick={load} style={{ marginLeft: 12, padding: "3px 10px", borderRadius: 6, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", cursor: "pointer", fontSize: 12 }}>Retry</button>
        </div>
      )}

      {/* Loading */}
      {status === "loading" && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>Authenticating…</div>
      )}

      {/* Images */}
      {images.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>
            Images ({images.length})
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12 }}>
            {images.map(item => (
              <div key={item._id} style={{ background: "#1a2235", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", position: "relative" }}
                onMouseEnter={e => { const o = e.currentTarget.querySelector(".overlay"); if (o) o.style.opacity = "1"; }}
                onMouseLeave={e => { const o = e.currentTarget.querySelector(".overlay"); if (o) o.style.opacity = "0"; }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={item.filename} style={{ width: "100%", height: 120, objectFit: "cover", display: "block" }} />
                <div className="overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", opacity: 0, transition: "opacity 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, flexDirection: "column" }}>
                  <button onClick={() => copy(item.url)} style={{ padding: "5px 10px", borderRadius: 6, background: copied === item.url ? "#86efac" : "rgba(255,255,255,0.15)", color: copied === item.url ? "#14532d" : "#fff", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, width: 100 }}>
                    {copied === item.url ? "✓ Copied!" : "Copy URL"}
                  </button>
                  <button onClick={() => handleDelete(item)} disabled={deleting === item._id} style={{ padding: "5px 10px", borderRadius: 6, background: "rgba(220,38,38,0.25)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.3)", cursor: "pointer", fontSize: 11, fontWeight: 700, width: 100 }}>
                    {deleting === item._id ? "Deleting…" : "Delete"}
                  </button>
                </div>
                <div style={{ padding: "6px 8px" }}>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.filename}</p>
                  {item.size && <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 9, margin: "2px 0 0" }}>{(item.size / 1024).toFixed(0)} KB</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos */}
      {videos.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>
            Videos ({videos.length})
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
            {videos.map(item => (
              <div key={item._id} style={{ background: "#1a2235", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", padding: 12 }}>
                <video src={item.url} controls muted style={{ width: "100%", height: 130, objectFit: "cover", borderRadius: 6, marginBottom: 8 }} />
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, margin: "0 0 8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.filename}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => copy(item.url)} style={{ flex: 1, padding: "6px", borderRadius: 6, background: copied === item.url ? "rgba(134,239,172,0.15)" : "rgba(255,255,255,0.08)", color: copied === item.url ? "#86efac" : "rgba(255,255,255,0.6)", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>
                    {copied === item.url ? "✓ Copied!" : "Copy URL"}
                  </button>
                  <button onClick={() => handleDelete(item)} style={{ padding: "6px 10px", borderRadius: 6, background: "rgba(220,38,38,0.15)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.3)", cursor: "pointer", fontSize: 11 }}>✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents */}
      {docs.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>
            Documents ({docs.length})
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 10 }}>
            {docs.map(item => (
              <div key={item._id} style={{ background: "#1a2235", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(184,149,58,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF5A" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: "#fff", fontSize: 12, fontWeight: 600, margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.filename}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => copy(item.url)} style={{ fontSize: 10, color: copied === item.url ? "#86efac" : "rgba(184,149,58,0.8)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      {copied === item.url ? "Copied!" : "Copy URL"}
                    </button>
                    <button onClick={() => handleDelete(item)} style={{ fontSize: 10, color: "#fca5a5", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!error && media.length === 0 && status === "authenticated" && (
        <div style={{ textAlign: "center", padding: "70px 20px", color: "rgba(255,255,255,0.2)", fontSize: 14 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📁</div>
          <p style={{ margin: "0 0 6px" }}>No files uploaded yet</p>
          <p style={{ fontSize: 12, margin: 0 }}>Click "Upload Files" to add images, videos or documents</p>
        </div>
      )}
    </div>
  );
}

export default function MediaLibraryPage() {
  return (
    <AdminGuard>
      <MediaLibraryContent />
    </AdminGuard>
  );
}
