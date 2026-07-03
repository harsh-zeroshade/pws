"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

/** Reusable dark hero for all committee/about pages */
export function PageHeroDark({ label, title, titleGold, subtitle, breadcrumb }) {
  return (
    <section className="relative overflow-hidden" style={{ background:"linear-gradient(135deg,#060F1E 0%,#0D2545 60%,#0a1e3d 100%)", minHeight:"clamp(320px,50vh,520px)", display:"flex", alignItems:"center" }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"linear-gradient(rgba(184,149,58,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.05) 1px,transparent 1px)", backgroundSize:"56px 56px" }} />
      <div aria-hidden className="absolute top-0 right-1/3 w-72 h-72 rounded-full pointer-events-none" style={{ background:"rgba(184,149,58,0.07)", filter:"blur(80px)" }} />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-20 sm:py-28">
        <motion.nav initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:.5 }}
          className="flex items-center flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8 text-[11px] sm:text-[12px] font-sans">
          <Link href="/" className="text-white/40 hover:text-[#B8953A] transition-colors">Home</Link>
          {breadcrumb.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-white/20">/</span>
              {c.href ? <Link href={c.href} className="text-white/40 hover:text-[#B8953A] transition-colors">{c.label}</Link>
                : <span className="text-[#B8953A]">{c.label}</span>}
            </span>
          ))}
        </motion.nav>
        <motion.div initial={{ opacity:0,x:-20 }} animate={{ opacity:1,x:0 }} transition={{ duration:.6 }}
          className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
          <div className="h-px w-10 sm:w-12 bg-[#B8953A]" />
          <span className="text-[#B8953A] text-[10px] sm:text-[11px] font-semibold tracking-[.3em] uppercase font-sans">{label}</span>
        </motion.div>
        <motion.h1 initial={{ opacity:0,y:40 }} animate={{ opacity:1,y:0 }} transition={{ delay:.1,duration:.9,ease:[.22,1,.36,1] }}
          className="font-display font-black text-white leading-[1.05]"
          style={{ fontSize:"clamp(2rem,7vw,4.8rem)" }}>
          {title}{" "}<em className="text-[#D4AF5A] not-italic">{titleGold}</em>
        </motion.h1>
        {subtitle && (
          <motion.p initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:.25,duration:.8 }}
            className="text-white/50 text-[14px] sm:text-[16px] leading-relaxed font-sans mt-3 sm:mt-4 max-w-2xl">{subtitle}</motion.p>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background:"linear-gradient(to right,transparent,#B8953A,transparent)" }} />
    </section>
  );
}

/** Member card grid */
export function MemberGrid({ members }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-5%" });
  const heads = members.filter(m => m.isHead);
  const rest  = members.filter(m => !m.isHead);

  return (
    <section ref={ref} className="relative overflow-hidden py-12 sm:py-16 lg:py-20" style={{ background:"linear-gradient(180deg,#060F1E 0%,#0a1628 100%)" }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"linear-gradient(rgba(184,149,58,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.025) 1px,transparent 1px)", backgroundSize:"56px 56px" }} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        {/* Heads */}
        {heads.length > 0 && (
          <div className="mb-8 sm:mb-10 flex flex-wrap gap-4">
            {heads.map((m, i) => <MemberCard key={i} m={m} i={i} inView={inView} isHead />)}
          </div>
        )}

        {/* Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {rest.map((m, i) => <MemberCard key={i} m={m} i={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}

function MemberCard({ m, i, inView, isHead }) {
  return (
    <motion.div
      initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
      transition={{ delay:Math.min(i*.05,.4), duration:.6, ease:[.22,1,.36,1] }}
      className="group relative rounded-2xl overflow-hidden flex items-center gap-3 sm:gap-4 p-4 sm:p-5"
      style={{
        background: isHead ? "rgba(184,149,58,0.08)" : "rgba(255,255,255,0.03)",
        border: isHead ? "1px solid rgba(184,149,58,0.3)" : "1px solid rgba(255,255,255,0.07)",
        transition: "border-color .3s, background .3s",
        ...(isHead ? { minWidth: "min(280px, 100%)" } : {}),
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor=isHead?"rgba(184,149,58,0.6)":"rgba(184,149,58,0.3)"; e.currentTarget.style.background=isHead?"rgba(184,149,58,0.13)":"rgba(184,149,58,0.05)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor=isHead?"rgba(184,149,58,0.3)":"rgba(255,255,255,0.07)"; e.currentTarget.style.background=isHead?"rgba(184,149,58,0.08)":"rgba(255,255,255,0.03)"; }}
    >
      <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-display font-black text-sm"
        style={{ background: isHead ? "rgba(184,149,58,0.25)" : "rgba(255,255,255,0.06)", color: isHead ? "#D4AF5A" : "rgba(255,255,255,0.5)", border: isHead ? "1px solid rgba(184,149,58,0.4)" : "1px solid rgba(255,255,255,0.1)" }}>
        {m.name.split(" ").map(w => w[0]).slice(0,2).join("")}
      </div>
      <div className="min-w-0">
        <p className="font-display font-bold text-white text-[13px] sm:text-[14px] leading-tight truncate group-hover:text-[#D4AF5A] transition-colors">{m.name}</p>
        <p className="text-[10px] sm:text-[11px] font-sans mt-0.5 uppercase tracking-wider truncate" style={{ color: isHead ? "#B8953A" : "rgba(255,255,255,0.35)" }}>{m.role}</p>
      </div>
    </motion.div>
  );
}

/** Full committee page wrapper */
export function CommitteePage({ label, title, titleGold, subtitle, breadcrumb, members }) {
  return (
    <PageLayout>
      <PageHeroDark label={label} title={title} titleGold={titleGold} subtitle={subtitle} breadcrumb={breadcrumb} />
      <MemberGrid members={members} />
    </PageLayout>
  );
}
