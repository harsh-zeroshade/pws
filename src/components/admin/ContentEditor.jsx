"use client";
import { useState } from "react";

/* ── Design tokens ── */
const T = {
  bg:           "#0a0f1c",
  card:         "#0f172a",
  cardBorder:   "#1e2d45",
  cardHeader:   "#111827",
  input:        "#0a0f1c",
  inputBorder:  "#1e2d45",
  inputFocus:   "#B8953A",
  text:         "#e2e8f0",
  muted:        "#64748b",
  subtle:       "#475569",
  gold:         "#B8953A",
  goldLight:    "#D4AF5A",
  success:      "#10b981",
  successBg:    "rgba(16,185,129,0.1)",
  danger:       "#ef4444",
  dangerBg:     "rgba(239,68,68,0.1)",
  dangerBorder: "rgba(239,68,68,0.3)",
};

const inp = (extra = {}) => ({
  width: "100%", padding: "10px 14px", borderRadius: 8,
  background: T.input, border: `1px solid ${T.inputBorder}`,
  color: T.text, fontSize: 13.5, fontFamily: "inherit",
  outline: "none", boxSizing: "border-box", transition: "border-color 0.2s, box-shadow 0.2s",
  ...extra,
});

const onFocus = e => { e.target.style.borderColor = T.inputFocus; e.target.style.boxShadow = `0 0 0 3px rgba(184,149,58,0.15)`; };
const onBlur  = e => { e.target.style.borderColor = T.inputBorder; e.target.style.boxShadow = "none"; };

const lbl = { display: "block", color: T.muted, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 };

/* ─────────────────────────────────────────── TextField */
export function TextField({ label, value, onChange, multiline = false, placeholder = "", hint = "" }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={lbl}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={4}
            onFocus={onFocus} onBlur={onBlur} style={{ ...inp(), resize: "vertical", lineHeight: 1.65 }} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
            onFocus={onFocus} onBlur={onBlur} style={inp()} />
      }
      {hint && <p style={{ color: T.subtle, fontSize: 11, marginTop: 5, marginBottom: 0 }}>{hint}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────── ImageField */
export function ImageField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [drag, setDrag] = useState(false);

  const doUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    const fd = new FormData(); fd.append("file", file);
    const r = await fetch("/api/upload", { method: "POST", body: fd });
    const d = await r.json();
    setUploading(false);
    if (d.url) onChange(d.url);
  };

  return (
    <div style={{ marginBottom: 18 }}>
      <label style={lbl}>{label}</label>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input type="text" value={value || ""} onChange={e => onChange(e.target.value)} placeholder="Paste URL…"
          onFocus={onFocus} onBlur={onBlur} style={{ ...inp(), flex: 1 }} />
        <label style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0 14px", borderRadius: 8, border: `1px solid ${T.inputBorder}`, color: T.muted, background: T.card, fontSize: 12, fontWeight: 600, cursor: uploading ? "not-allowed" : "pointer", flexShrink: 0, transition: "all 0.2s", whiteSpace: "nowrap" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.color = T.goldLight; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = T.inputBorder; e.currentTarget.style.color = T.muted; }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
          {uploading ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*,video/*" onChange={e => doUpload(e.target.files[0])} style={{ display: "none" }} />
        </label>
      </div>
      <div
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); doUpload(e.dataTransfer.files[0]); }}
        style={{ border: `2px dashed ${drag ? T.gold : T.inputBorder}`, borderRadius: 10, padding: "14px 16px", textAlign: "center", background: drag ? "rgba(184,149,58,0.05)" : "transparent", transition: "all 0.2s", minHeight: 70, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {value
          ? /* eslint-disable-next-line @next/next/no-img-element */
            <img src={value} alt="preview" style={{ maxHeight: 90, maxWidth: "100%", borderRadius: 6, objectFit: "contain" }} />
          : <p style={{ color: T.subtle, fontSize: 12, margin: 0 }}>Drop file here or use the upload button</p>
        }
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── ListField */
export function ListField({ label, value = [], onChange, placeholder = "Add item…" }) {
  const add    = () => onChange([...value, ""]);
  const remove = (i) => onChange(value.filter((_, x) => x !== i));
  const update = (i, v) => onChange(value.map((x, idx) => idx === i ? v : x));

  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <label style={{ ...lbl, marginBottom: 0 }}>{label}</label>
        <button onClick={add}
          style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 12px", borderRadius: 6, border: `1px solid ${T.gold}`, background: "rgba(184,149,58,0.08)", color: T.goldLight, fontSize: 11.5, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(184,149,58,0.16)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(184,149,58,0.08)"}>
          + Add
        </button>
      </div>
      {value.length === 0 && (
        <div style={{ padding: "12px 14px", borderRadius: 8, border: `1px dashed ${T.inputBorder}`, color: T.subtle, fontSize: 12, textAlign: "center" }}>
          No items — click <strong style={{ color: T.goldLight }}>+ Add</strong> to start
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {value.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ width: 18, color: T.subtle, fontSize: 11, fontWeight: 700, textAlign: "center", flexShrink: 0 }}>{i+1}</span>
            <input value={item} onChange={e => update(i, e.target.value)} placeholder={placeholder}
              onFocus={onFocus} onBlur={onBlur} style={{ ...inp(), flex: 1 }} />
            <button onClick={() => remove(i)}
              style={{ width: 32, height: 38, borderRadius: 7, border: T.dangerBorder, background: T.dangerBg, color: T.danger, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = T.dangerBg}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── SectionCard */
export function SectionCard({ title, subtitle, children, onSave, saving, error, saved }) {
  return (
    <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 14, overflow: "hidden", marginBottom: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
      {/* Header */}
      <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${T.cardBorder}`, background: T.cardHeader, gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <h3 style={{ color: T.text, fontSize: 14, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 3, height: 16, borderRadius: 2, background: T.gold, flexShrink: 0, display: "inline-block" }} />
            {title}
          </h3>
          {subtitle && <p style={{ color: T.muted, fontSize: 12, margin: "2px 0 0 11px" }}>{subtitle}</p>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          {saved && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: T.success, fontSize: 12, fontWeight: 600 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Saved
            </span>
          )}
          <button onClick={() => onSave()} disabled={saving}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 8, border: "none", background: saving ? T.subtle : `linear-gradient(135deg,${T.gold},${T.goldLight})`, color: "#fff", fontSize: 12.5, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "opacity 0.2s", boxShadow: saving ? "none" : `0 4px 12px rgba(184,149,58,0.3)` }}
            onMouseEnter={e => { if (!saving) e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
            {saving
              ? <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>Saving…</>
              : <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>Save Changes</>
            }
          </button>
        </div>
      </div>
      {/* Error */}
      {error && (
        <div style={{ padding: "10px 20px", background: T.dangerBg, borderBottom: `1px solid ${T.dangerBorder}`, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.danger} strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span style={{ color: "#fca5a5", fontSize: 12.5 }}>Save failed: {error}</span>
        </div>
      )}
      {/* Body */}
      <div style={{ padding: 20 }}>{children}</div>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

/* ─────────────────────────────────────────── AdminTable */
export function AdminTable({ columns, rows, onDelete, onEdit, emptyMessage = "No records found." }) {
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${T.cardBorder}` }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "rgba(184,149,58,0.06)" }}>
              {columns.map(col => (
                <th key={col.key} style={{ padding: "10px 14px", textAlign: "left", color: T.muted, fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: `1px solid ${T.cardBorder}`, whiteSpace: "nowrap" }}>
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th style={{ padding: "10px 14px", textAlign: "right", color: T.muted, fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: `1px solid ${T.cardBorder}` }}>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0
              ? <tr><td colSpan={columns.length + 1} style={{ padding: "28px 14px", textAlign: "center", color: T.subtle, fontSize: 13 }}>{emptyMessage}</td></tr>
              : rows.map((row, i) => (
                <tr key={i}
                  style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)", borderBottom: `1px solid rgba(30,45,69,0.6)`, transition: "background 0.12s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(184,149,58,0.04)"}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)"}>
                  {columns.map(col => (
                    <td key={col.key} style={{ padding: "9px 14px", color: col.muted ? T.muted : T.text, fontSize: 13, verticalAlign: "middle", whiteSpace: col.wrap ? "normal" : "nowrap" }}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td style={{ padding: "9px 14px", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: 6 }}>
                        {onEdit && (
                          <button onClick={() => onEdit(row, i)}
                            style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${T.inputBorder}`, background: "transparent", color: T.muted, fontSize: 11.5, cursor: "pointer", transition: "all 0.2s" }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.color = T.goldLight; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = T.inputBorder; e.currentTarget.style.color = T.muted; }}>
                            Edit
                          </button>
                        )}
                        {onDelete && (
                          <button onClick={() => onDelete(row, i)}
                            style={{ padding: "4px 10px", borderRadius: 6, border: T.dangerBorder, background: T.dangerBg, color: T.danger, fontSize: 11.5, cursor: "pointer", transition: "background 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.18)"}
                            onMouseLeave={e => e.currentTarget.style.background = T.dangerBg}>
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StatCard({ label, value, svg, color = "#B8953A", trend }) {
  return (
    <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 12, padding: "18px 20px", display: "flex", alignItems: "flex-start", gap: 14 }}>
      <div style={{ width: 42, height: 42, borderRadius: 10, background: `${color}15`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {svg ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={svg} />
          </svg>
        ) : (
          <span style={{ color, fontSize: 16 }}>◈</span>
        )}
      </div>
      <div>
        <p style={{ color: T.muted, fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 5px" }}>{label}</p>
        <p style={{ color: T.text, fontSize: 24, fontWeight: 800, margin: 0, lineHeight: 1 }}>{value}</p>
        {trend && <p style={{ color: T.success, fontSize: 11, margin: "4px 0 0" }}>{trend}</p>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── QuickLinkCard */
export function QuickLinkCard({ label, desc, href, svg, icon, color }) {
  const c = color || "#B8953A";
  return (
    <a href={href}
      style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 15px", borderRadius: 12, background: T.card, border: `1px solid ${T.cardBorder}`, textDecoration: "none", transition: "all 0.18s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = c; e.currentTarget.style.background = `${c}0a`; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = T.cardBorder; e.currentTarget.style.background = T.card; e.currentTarget.style.transform = "translateY(0)"; }}>
      <div style={{ width: 36, height: 36, borderRadius: 9, background: `${c}15`, border: `1px solid ${c}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {svg ? (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={svg} />
          </svg>
        ) : (
          <span style={{ color: c, fontSize: 15 }}>{icon || "✦"}</span>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: T.text, fontSize: 13, fontWeight: 600, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</p>
        {desc && <p style={{ color: T.muted, fontSize: 11.5, margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{desc}</p>}
      </div>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" style={{ flexShrink: 0 }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
  );
}

/* ─────────────────────────────────────────── PageHeader */
export function PageHeader({ title, desc }) {
  return (
    <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${T.cardBorder}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <span style={{ width: 3, height: 22, borderRadius: 2, background: `linear-gradient(to bottom,${T.gold},${T.goldLight})`, flexShrink: 0, display: "inline-block" }} />
        <h1 style={{ color: T.text, fontSize: 20, fontWeight: 800, margin: 0 }}>{title}</h1>
      </div>
      {desc && <p style={{ color: T.muted, fontSize: 13, margin: "0 0 0 13px" }}>{desc}</p>}
    </div>
  );
}
