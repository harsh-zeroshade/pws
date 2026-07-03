"use client";
import { useState } from "react";

/* ── Design tokens ── */
const C = {
  bg:        "#0f172a",
  card:      "#1e293b",
  cardHover: "#243044",
  border:    "#334155",
  borderFocus:"#695CFE",
  text:      "#f1f5f9",
  muted:     "#94a3b8",
  subtle:    "#64748b",
  accent:    "#695CFE",
  accentHover:"#7c6fff",
  gold:      "#f59e0b",
  success:   "#10b981",
  danger:    "#ef4444",
  dangerBg:  "rgba(239,68,68,0.1)",
  dangerBorder:"rgba(239,68,68,0.35)",
};

/* ── Base input style ── */
const inputBase = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 8,
  background: "#0f172a",
  border: `1px solid ${C.border}`,
  color: C.text,
  fontSize: 13.5,
  fontFamily: "Poppins,system-ui,sans-serif",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

function focusInput(e) {
  e.target.style.borderColor = C.borderFocus;
  e.target.style.boxShadow   = `0 0 0 3px rgba(105,92,254,0.15)`;
}
function blurInput(e) {
  e.target.style.borderColor = C.border;
  e.target.style.boxShadow   = "none";
}

/* ────────────────────────────────────────────
   TextField
──────────────────────────────────────────── */
export function TextField({ label, value, onChange, multiline = false, placeholder = "", hint = "" }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display:"block", color:C.muted, fontSize:11.5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder} rows={4}
          onFocus={focusInput} onBlur={blurInput}
          style={{ ...inputBase, resize:"vertical", lineHeight:1.6 }}
        />
      ) : (
        <input
          type="text" value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={focusInput} onBlur={blurInput}
          style={inputBase}
        />
      )}
      {hint && <p style={{ color:C.subtle, fontSize:11, marginTop:5, marginBottom:0 }}>{hint}</p>}
    </div>
  );
}

/* ────────────────────────────────────────────
   ImageField
──────────────────────────────────────────── */
export function ImageField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver,  setDragOver]  = useState(false);

  const doUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res  = await fetch("/api/upload", { method:"POST", body:fd });
    const data = await res.json();
    setUploading(false);
    if (data.url) onChange(data.url);
  };

  return (
    <div style={{ marginBottom:20 }}>
      <label style={{ display:"block", color:C.muted, fontSize:11.5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>
        {label}
      </label>

      {/* URL row */}
      <div style={{ display:"flex", gap:8, marginBottom:10 }}>
        <input
          type="text" value={value || ""} onChange={e => onChange(e.target.value)}
          placeholder="Paste image URL…"
          onFocus={focusInput} onBlur={blurInput}
          style={{ ...inputBase, flex:1 }}
        />
        <label style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"0 14px", borderRadius:8, border:`1px solid ${C.border}`, color:C.muted, background:C.card, fontSize:12.5, fontWeight:600, cursor:uploading?"not-allowed":"pointer", whiteSpace:"nowrap", flexShrink:0, transition:"all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor=C.accent; e.currentTarget.style.color=C.text; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.muted; }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
          {uploading ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*,video/*" onChange={e => doUpload(e.target.files[0])} style={{ display:"none" }} />
        </label>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); doUpload(e.dataTransfer.files[0]); }}
        style={{ border:`2px dashed ${dragOver?C.accent:C.border}`, borderRadius:10, padding:"18px 16px", textAlign:"center", background:dragOver?"rgba(105,92,254,0.06)":"transparent", transition:"all 0.2s", cursor:"default" }}>
        {value ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={value} alt="preview" style={{ maxHeight:100, maxWidth:"100%", borderRadius:6, objectFit:"contain", display:"block", margin:"0 auto" }} />
        ) : (
          <p style={{ color:C.subtle, fontSize:12, margin:0 }}>Drag &amp; drop an image here, or use the upload button above</p>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   ListField
──────────────────────────────────────────── */
export function ListField({ label, value = [], onChange, placeholder = "Add item…" }) {
  const add    = () => onChange([...value, ""]);
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));
  const update = (i, v) => onChange(value.map((x, idx) => idx === i ? v : x));

  return (
    <div style={{ marginBottom:20 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
        <label style={{ color:C.muted, fontSize:11.5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>{label}</label>
        <button onClick={add}
          style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"5px 12px", borderRadius:6, border:`1px solid ${C.accent}`, background:"rgba(105,92,254,0.1)", color:C.accent, fontSize:12, fontWeight:600, cursor:"pointer", transition:"all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(105,92,254,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="rgba(105,92,254,0.1)"; }}>
          + Add
        </button>
      </div>

      {value.length === 0 && (
        <div style={{ padding:"14px 16px", borderRadius:8, border:`1px dashed ${C.border}`, color:C.subtle, fontSize:12, textAlign:"center" }}>
          No items yet — click <strong style={{ color:C.accent }}>+ Add</strong> to start
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        {value.map((item, i) => (
          <div key={i} style={{ display:"flex", gap:8, alignItems:"center" }}>
            <div style={{ width:20, flexShrink:0, color:C.subtle, fontSize:11, fontWeight:700, textAlign:"center" }}>{i+1}</div>
            <input
              value={item} onChange={e => update(i, e.target.value)} placeholder={placeholder}
              onFocus={focusInput} onBlur={blurInput}
              style={{ ...inputBase, flex:1 }}
            />
            <button onClick={() => remove(i)}
              style={{ width:32, height:36, borderRadius:7, border:`1px solid ${C.dangerBorder}`, background:C.dangerBg, color:C.danger, cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(239,68,68,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background=C.dangerBg; }}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   SectionCard
──────────────────────────────────────────── */
export function SectionCard({ title, subtitle, children, onSave, saving, error, saved }) {
  return (
    <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden", marginBottom:20, boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }}>
      {/* Card header */}
      <div style={{ padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:`1px solid ${C.border}`, background:"rgba(255,255,255,0.02)" }}>
        <div>
          <h3 style={{ color:C.text, fontSize:14.5, fontWeight:700, margin:0 }}>{title}</h3>
          {subtitle && <p style={{ color:C.muted, fontSize:12, margin:"3px 0 0" }}>{subtitle}</p>}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {saved && (
            <span style={{ display:"inline-flex", alignItems:"center", gap:5, color:C.success, fontSize:12, fontWeight:600 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Saved
            </span>
          )}
          <button
            onClick={() => onSave()} disabled={saving}
            style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"8px 18px", borderRadius:8, border:"none", background:saving?C.subtle:C.accent, color:"#fff", fontSize:13, fontWeight:600, cursor:saving?"not-allowed":"pointer", transition:"all 0.2s", fontFamily:"inherit" }}
            onMouseEnter={e => { if(!saving) e.currentTarget.style.background=C.accentHover; }}
            onMouseLeave={e => { if(!saving) e.currentTarget.style.background=C.accent; }}>
            {saving ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation:"spin 1s linear infinite" }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                Saving…
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div style={{ padding:"10px 20px", background:C.dangerBg, borderBottom:`1px solid ${C.dangerBorder}`, display:"flex", alignItems:"center", gap:8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.danger} strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span style={{ color:"#fca5a5", fontSize:12.5 }}>Save failed: {error}</span>
        </div>
      )}

      {/* Body */}
      <div style={{ padding:"20px" }}>
        {children}
      </div>

      <style>{`@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}

/* ────────────────────────────────────────────
   AdminTable  — sortable, striped data table
──────────────────────────────────────────── */
export function AdminTable({ columns, rows, onDelete, onEdit, emptyMessage = "No records found." }) {
  return (
    <div style={{ borderRadius:12, overflow:"hidden", border:`1px solid ${C.border}` }}>
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead>
            <tr style={{ background:"rgba(105,92,254,0.08)" }}>
              {columns.map(col => (
                <th key={col.key} style={{ padding:"11px 16px", textAlign:"left", color:C.muted, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", borderBottom:`1px solid ${C.border}`, whiteSpace:"nowrap" }}>
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th style={{ padding:"11px 16px", textAlign:"right", color:C.muted, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", borderBottom:`1px solid ${C.border}` }}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} style={{ padding:"32px 16px", textAlign:"center", color:C.subtle, fontSize:13 }}>
                  {emptyMessage}
                </td>
              </tr>
            ) : rows.map((row, i) => (
              <tr key={i}
                style={{ background:i%2===0?"transparent":"rgba(255,255,255,0.02)", borderBottom:`1px solid rgba(51,65,85,0.5)`, transition:"background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(105,92,254,0.06)"}
                onMouseLeave={e => e.currentTarget.style.background=i%2===0?"transparent":"rgba(255,255,255,0.02)"}>
                {columns.map(col => (
                  <td key={col.key} style={{ padding:"10px 16px", color:col.muted?C.muted:C.text, fontSize:13, verticalAlign:"middle", whiteSpace:col.wrap?"normal":"nowrap" }}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td style={{ padding:"10px 16px", textAlign:"right", whiteSpace:"nowrap" }}>
                    <div style={{ display:"inline-flex", gap:6 }}>
                      {onEdit && (
                        <button onClick={() => onEdit(row, i)}
                          style={{ padding:"5px 12px", borderRadius:6, border:`1px solid ${C.border}`, background:"transparent", color:C.muted, fontSize:12, cursor:"pointer", transition:"all 0.2s" }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor=C.accent; e.currentTarget.style.color=C.accent; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.muted; }}>
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(row, i)}
                          style={{ padding:"5px 12px", borderRadius:6, border:C.dangerBorder, background:C.dangerBg, color:C.danger, fontSize:12, cursor:"pointer", transition:"all 0.2s" }}
                          onMouseEnter={e => { e.currentTarget.style.background="rgba(239,68,68,0.2)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background=C.dangerBg; }}>
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   StatCard  — dashboard metric card
──────────────────────────────────────────── */
export function StatCard({ label, value, icon, color = C.accent, trend }) {
  return (
    <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"20px 22px", display:"flex", alignItems:"flex-start", gap:16, boxShadow:"0 1px 3px rgba(0,0,0,0.15)" }}>
      <div style={{ width:46, height:46, borderRadius:12, background:`${color}18`, border:`1px solid ${color}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <span className="material-symbols-rounded" style={{ fontSize:22, color }}>{icon}</span>
      </div>
      <div>
        <p style={{ color:C.muted, fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em", margin:"0 0 6px" }}>{label}</p>
        <p style={{ color:C.text, fontSize:26, fontWeight:800, margin:0, lineHeight:1, fontFamily:"Poppins,sans-serif" }}>{value}</p>
        {trend && <p style={{ color:C.success, fontSize:11, margin:"5px 0 0" }}>{trend}</p>}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   QuickLinkCard
──────────────────────────────────────────── */
export function QuickLinkCard({ label, desc, href, icon, color }) {
  return (
    <a href={href}
      style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px", borderRadius:12, background:C.card, border:`1px solid ${C.border}`, textDecoration:"none", transition:"all 0.2s", boxShadow:"0 1px 2px rgba(0,0,0,0.1)" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor=color||C.accent; e.currentTarget.style.background=C.cardHover; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 4px 16px rgba(0,0,0,0.2)`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.card; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)"; }}>
      <div style={{ width:38, height:38, borderRadius:10, background:`${color||C.accent}18`, border:`1px solid ${color||C.accent}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <span className="material-symbols-rounded" style={{ fontSize:19, color:color||C.accent }}>{icon||"edit_note"}</span>
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{ color:C.text, fontSize:13, fontWeight:600, margin:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{label}</p>
        {desc && <p style={{ color:C.muted, fontSize:11.5, margin:"2px 0 0", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{desc}</p>}
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color||C.accent} strokeWidth="2" style={{ flexShrink:0 }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
  );
}
