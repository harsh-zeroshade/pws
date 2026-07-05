"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import { SectionCard, AdminTable, TextField , PageHeader } from "@/components/admin/ContentEditor";
import { useContent } from "@/hooks/useContent";
import { useState } from "react";

const EMPTY = { name:"", role:"", exp:"", qual:"" };

const C = { card:"#1e293b", border:"#334155", text:"#f1f5f9", muted:"#94a3b8", accent:"#695CFE",
  inputBg:"#0f172a", dangerBg:"rgba(239,68,68,0.1)", dangerBorder:"rgba(239,68,68,0.35)", danger:"#ef4444" };

const inp = { width:"100%", padding:"9px 12px", borderRadius:7, background:C.inputBg, border:`1px solid ${C.border}`, color:C.text, fontSize:12.5, outline:"none", fontFamily:"inherit", boxSizing:"border-box" };

function EditModal({ member, onSave, onClose }) {
  const [form, setForm] = useState({ ...member });
  const u = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.65)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:C.card, borderRadius:16, border:`1px solid ${C.border}`, width:"100%", maxWidth:520, boxShadow:"0 24px 64px rgba(0,0,0,0.5)" }}>
        <div style={{ padding:"18px 22px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h3 style={{ color:C.text, fontSize:15, fontWeight:700, margin:0 }}>Edit Faculty Member</h3>
          <button onClick={onClose} style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", fontSize:20, lineHeight:1 }}>âœ•</button>
        </div>
        <div style={{ padding:"20px 22px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          {[["name","Full Name"],["role","Designation"],["exp","Experience"],["qual","Qualification"]].map(([k,lbl]) => (
            <div key={k} style={{ gridColumn: k==="qual"?"1 / -1":"auto" }}>
              <label style={{ display:"block", color:C.muted, fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5 }}>{lbl}</label>
              <input value={form[k]||""} onChange={u(k)} style={inp} />
            </div>
          ))}
        </div>
        <div style={{ padding:"14px 22px", borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"flex-end", gap:10 }}>
          <button onClick={onClose} style={{ padding:"8px 18px", borderRadius:8, border:`1px solid ${C.border}`, background:"transparent", color:C.muted, cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>Cancel</button>
          <button onClick={() => onSave(form)} style={{ padding:"8px 18px", borderRadius:8, border:"none", background:C.accent, color:"#fff", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"inherit" }}>Save Member</button>
        </div>
      </div>
    </div>
  );
}

export default function OurFacultyEditor() {
  const [data, setData, save, saving, saved, saveError] = useContent("about", "faculty", { members: [] });
  const [editIdx, setEditIdx] = useState(null);
  const members = data.members || [];

  const handleEdit = (row, i) => setEditIdx(i);
  const handleDelete = (row, i) => {
    if (!confirm(`Remove "${row.name}"?`)) return;
    setData(p => ({ ...p, members: members.filter((_, idx) => idx !== i) }));
  };
  const handleSaveEdit = (updated) => {
    setData(p => ({ ...p, members: members.map((m, i) => i === editIdx ? updated : m) }));
    setEditIdx(null);
  };
  const handleAdd = () => {
    setData(p => ({ ...p, members: [...members, { ...EMPTY }] }));
    setEditIdx(members.length);
  };

  const cols = [
    { key:"name", label:"Name" },
    { key:"role", label:"Designation", muted:false },
    { key:"exp",  label:"Experience",  muted:true },
    { key:"qual", label:"Qualification", muted:true, wrap:true },
  ];

  return (
    <AdminGuard>
      <div style={{ maxWidth:1000 }}>
        <div style={{ marginBottom:24 }}>
          <h1 style={{ color:C.text, fontSize:22, fontWeight:800, margin:"0 0 4px", fontFamily:"Poppins,sans-serif" }}>Our Faculty</h1>
          <p style={{ color:C.muted, fontSize:13, margin:0 }}>Manage all faculty members. Changes reflect on the Our Faculty page.</p>
        </div>

        <SectionCard title={`Faculty Members (${members.length})`} subtitle="Click Edit to modify any entry" onSave={save} saving={saving} saved={saved} error={saveError}>
          <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:14 }}>
            <button onClick={handleAdd}
              style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"9px 18px", borderRadius:9, border:"none", background:C.accent, color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
              <span style={{ fontSize:18, lineHeight:1 }}>+</span> Add Faculty Member
            </button>
          </div>
          <AdminTable columns={cols} rows={members} onEdit={handleEdit} onDelete={handleDelete}
            emptyMessage="No faculty added yet. Click '+ Add Faculty Member' to start." />
        </SectionCard>
      </div>

      {editIdx !== null && members[editIdx] && (
        <EditModal member={members[editIdx]} onSave={handleSaveEdit} onClose={() => setEditIdx(null)} />
      )}
    </AdminGuard>
  );
}
