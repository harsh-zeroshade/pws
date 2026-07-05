"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const res = await signIn("credentials", { redirect: false, username: form.username, password: form.password });
    setLoading(false);
    if (res?.ok) router.push("/admin/dashboard");
    else setError("Invalid username or password. Please try again.");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#060f1e", fontFamily: "system-ui,sans-serif", overflow: "hidden", position: "relative" }}>

      {/* ── Left panel — branding ── */}
      <div style={{ display: "none", flex: "0 0 45%", background: "linear-gradient(160deg,#0D2545 0%,#0a1e3d 100%)", padding: "48px", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}
        className="lg-flex">
        {/* Grid overlay */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(184,149,58,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.06) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        {/* Glow */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(184,149,58,0.08)", filter: "blur(80px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <Image src="/pws-logo-dark.png" alt="Pacific World School" width={130} height={44} style={{ objectFit: "contain" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 20, background: "rgba(184,149,58,0.12)", border: "1px solid rgba(184,149,58,0.25)", marginBottom: 24 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
            <span style={{ color: "#D4AF5A", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Admin Portal</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 16px" }}>
            Content<br /><span style={{ color: "#D4AF5A" }}>Management</span><br />System
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, lineHeight: 1.7, margin: "0 0 32px" }}>
            Manage every page, image, and announcement on the Pacific World School website from one secure place.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["Edit home page content instantly", "Upload and manage media files", "Update faculty, toppers & more"].map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, background: "rgba(184,149,58,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#D4AF5A" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 12, position: "relative", zIndex: 1 }}>© 2026 Pacific World School</p>
      </div>

      {/* ── Right panel — form ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 20px", position: "relative", zIndex: 1 }}>
        {/* Background glow */}
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, borderRadius: "50%", background: "rgba(105,92,254,0.05)", filter: "blur(80px)", pointerEvents: "none" }} />

        <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>

          {/* Mobile logo */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Image src="/pws-logo-dark.png" alt="Pacific World School" width={110} height={38} style={{ objectFit: "contain", display: "inline-block" }} />
          </div>

          {/* Card */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 32, backdropFilter: "blur(20px)" }}>
            <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "0 0 6px", fontFamily: "inherit" }}>Sign in</h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, margin: "0 0 28px" }}>Authorized personnel only</p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Username */}
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Username</label>
                <div style={{ position: "relative" }}>
                  <input type="text" required autoComplete="username" value={form.username}
                    onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                    style={{ width: "100%", padding: "12px 14px 12px 42px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s" }}
                    onFocus={e => e.target.style.borderColor = "rgba(184,149,58,0.6)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    placeholder="admin" />
                  <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showPass ? "text" : "password"} required autoComplete="current-password" value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    style={{ width: "100%", padding: "12px 44px 12px 42px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s" }}
                    onFocus={e => e.target.style.borderColor = "rgba(184,149,58,0.6)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    placeholder="••••••••" />
                  <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  <button type="button" onClick={() => setShowPass(p => !p)}
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 4, display: "flex" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {showPass ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <span style={{ color: "#fca5a5", fontSize: 13 }}>{error}</span>
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={loading}
                style={{ padding: "13px", borderRadius: 12, border: "none", background: loading ? "rgba(184,149,58,0.4)" : "linear-gradient(135deg,#B8953A,#D4AF5A)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s", marginTop: 4 }}>
                {loading ? (
                  <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>Authenticating…</>
                ) : "Sign In to Admin Panel"}
              </button>
            </form>
          </div>

          <p style={{ color: "rgba(255,255,255,0.12)", fontSize: 11, textAlign: "center", marginTop: 20 }}>
            Pacific World School CMS · All sessions are logged
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @media (min-width: 1024px) { .lg-flex { display: flex !important; } }
      `}</style>
    </div>
  );
}
