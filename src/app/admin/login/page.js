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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      username: form.username,
      password: form.password,
    });
    setLoading(false);
    if (res?.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:"linear-gradient(135deg,#060F1E 0%,#0D2545 100%)" }}>
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"linear-gradient(rgba(184,149,58,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.04) 1px,transparent 1px)", backgroundSize:"48px 48px" }} />

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Card */}
        <div className="rounded-2xl p-8 md:p-10" style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", backdropFilter:"blur(20px)" }}>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image src="/pws-logo-dark.png" alt="Pacific World School" width={140} height={50} className="object-contain" />
          </div>

          <h1 className="font-display font-black text-white text-2xl text-center mb-1">Admin Portal</h1>
          <p className="text-white/40 text-sm text-center font-sans mb-8">Secure access — authorized personnel only</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest font-sans mb-2">Username</label>
              <input
                type="text" required autoComplete="username"
                value={form.username} onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-white text-sm font-sans outline-none transition-colors"
                style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)" }}
                onFocus={e => e.target.style.borderColor="rgba(184,149,58,0.6)"}
                onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.12)"}
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest font-sans mb-2">Password</label>
              <input
                type="password" required autoComplete="current-password"
                value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-white text-sm font-sans outline-none transition-colors"
                style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)" }}
                onFocus={e => e.target.style.borderColor="rgba(184,149,58,0.6)"}
                onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.12)"}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-sans" style={{ background:"rgba(220,38,38,0.1)", border:"1px solid rgba(220,38,38,0.3)", color:"#fca5a5" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm font-sans transition-all"
              style={{ background:loading?"rgba(184,149,58,0.5)":"#B8953A", color:"#fff", cursor:loading?"not-allowed":"pointer" }}>
              {loading ? "Authenticating…" : "Sign In"}
            </button>
          </form>

          <p className="text-white/20 text-xs text-center font-sans mt-8">
            Pacific World School CMS · All access is logged
          </p>
        </div>
      </div>
    </div>
  );
}
