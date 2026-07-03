"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

const factors = [
  { n:"01", title:"Parent Teacher Communication", desc:"Seamless connectivity through our dedicated CampusCare app and regular PTMs ensure parents stay informed of their child's every milestone and achievement.", color:"#B8953A",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> },
  { n:"02", title:"Excellence in Academics", desc:"Consistently outstanding CBSE and Cambridge results driven by passionate educators with a 1:15 teacher-student ratio ensuring personalised attention.", color:"#1a3a6e",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 15l-8.5 4.5 2-9.5L1 6l9.5-1L12 1l1.5 4L23 6l-4.5 4 2 9.5z"/></svg> },
  { n:"03", title:"World Class Infrastructure", desc:"Air-conditioned digital classrooms, amphitheater, state-of-the-art science and computer labs, well-stocked library, and a stunning 10-acre campus.", color:"#2a5a3e",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11"/></svg> },
  { n:"04", title:"Personal Attention", desc:"A 1:15 teacher-student ratio ensures every child is seen, heard, and nurtured. Teachers identify and hone the uniqueness of every child.", color:"#7c3d8f",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
  { n:"05", title:"Entrepreneurial Development", desc:"Programs designed to foster innovation, critical thinking, and entrepreneurial mindset from the earliest years through project-based learning.", color:"#b84a1a",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96-.46L5 14H3a2 2 0 01-2-2v-2a2 2 0 012-2h2l2.04-5.54A2.5 2.5 0 019.5 2z"/><path d="M14.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 004.96-.46L19 14h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2l-2.04-5.54A2.5 2.5 0 0014.5 2z"/></svg> },
  { n:"06", title:"Safety Measures", desc:"Comprehensive CCTV surveillance across campus, trained support staff, and robust child safety protocols ensure a secure environment for every student.", color:"#B8953A",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { n:"07", title:"Cultural & Global Awareness", desc:"Multicultural events, Pacific MUN, and a global curriculum prepare students to be thoughtful, empathetic world citizens.", color:"#1a3a6e",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> },
  { n:"08", title:"International Collaborations", desc:"Partnerships with Microsoft, AFS, IAYP and Scholastic provide global exposure and transformative learning opportunities for our students.", color:"#2a5a3e",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg> },
  { n:"09", title:"Sports Coaching", desc:"Specialized coaching in cricket, football, swimming, badminton, basketball, and more by certified professional coaches meeting international standards.", color:"#7c3d8f",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/></svg> },
  { n:"10", title:"Dual Curriculum", desc:"A unique combination of CBSE and Cambridge International Education gives students an unmatched academic edge and global university recognition.", color:"#b84a1a",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg> },
];

export default function DifferentiatingFactorsPage() {
  const contentRef = useRef(null);
  const inView = useInView(contentRef, { once: true, margin: "-5%" });

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background:"linear-gradient(135deg,#060F1E 0%,#0D2545 60%,#0a1e3d 100%)", minHeight:"55vh", display:"flex", alignItems:"center" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"linear-gradient(rgba(184,149,58,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.05) 1px,transparent 1px)", backgroundSize:"56px 56px" }} />
        <div aria-hidden className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background:"rgba(184,149,58,0.06)", filter:"blur(80px)" }} />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16 py-32">
          <motion.nav initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:.5 }}
            className="flex items-center gap-2 mb-8 text-[12px] font-sans">
            <Link href="/" className="text-white/40 hover:text-[#B8953A] transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link href="/about/school" className="text-white/40 hover:text-[#B8953A] transition-colors">About Us</Link>
            <span className="text-white/20">/</span>
            <span className="text-[#B8953A]">Differentiating Factors</span>
          </motion.nav>
          <motion.div initial={{ opacity:0,x:-20 }} animate={{ opacity:1,x:0 }} transition={{ duration:.6 }}
            className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-[#B8953A]" />
            <span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">What Sets Us Apart</span>
          </motion.div>
          <motion.h1 initial={{ opacity:0,y:40 }} animate={{ opacity:1,y:0 }} transition={{ delay:.1,duration:.9,ease:[.22,1,.36,1] }}
            className="font-display font-black text-white leading-[1.0]" style={{ fontSize:"clamp(2.8rem,6vw,5rem)" }}>
            Differentiating <em className="text-[#D4AF5A] not-italic">Factors</em>
          </motion.h1>
          <motion.p initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:.25,duration:.8 }}
            className="text-white/50 text-[17px] leading-relaxed font-sans mt-4 max-w-2xl">
            Ten pillars that make Pacific World School the premier choice in Greater Noida West.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background:"linear-gradient(to right,transparent,#B8953A,transparent)" }} />
      </section>

      {/* ── Factors grid ── */}
      <section ref={contentRef} className="relative overflow-hidden py-24" style={{ background:"linear-gradient(180deg,#060F1E 0%,#0a1628 100%)" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"linear-gradient(rgba(184,149,58,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.03) 1px,transparent 1px)", backgroundSize:"56px 56px" }} />
        <div aria-hidden className="absolute top-1/2 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background:"rgba(184,149,58,0.04)", filter:"blur(80px)" }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {factors.map((f, i) => (
              <motion.div key={f.n}
                initial={{ opacity:0,y:40 }} animate={inView?{opacity:1,y:0}:{}}
                transition={{ delay:i*.06,duration:.7,ease:[.22,1,.36,1] }}
                className="group relative p-7 rounded-2xl overflow-hidden flex flex-col"
                style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", transition:"border-color 0.3s,transform 0.3s,box-shadow 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=`${f.color}55`; e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow=`0 20px 40px rgba(0,0,0,0.35),0 0 0 1px ${f.color}33`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
              >
                {/* Corner radial glow */}
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background:`radial-gradient(circle at top right,${f.color}20,transparent 70%)` }} />

                {/* Number + icon row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background:`${f.color}18`, border:`1px solid ${f.color}33`, color:f.color }}>
                    {f.icon}
                  </div>
                  <span className="font-display font-black text-4xl leading-none" style={{ color:`${f.color}18`, transition:"color 0.3s" }}
                    ref={el => { if(el) el.addEventListener("mouseover", () => { el.style.color=`${f.color}35`; }); }}>
                    {f.n}
                  </span>
                </div>

                {/* Accent bar */}
                <div className="h-0.5 w-8 rounded-full mb-4 transition-all duration-300 group-hover:w-16"
                  style={{ background:`linear-gradient(to right,${f.color},transparent)` }} />

                <h3 className="font-display font-black text-white text-lg mb-3 transition-colors duration-300 group-hover:text-[#D4AF5A]">
                  {f.title}
                </h3>
                <p className="text-white/45 text-[13.5px] leading-[1.8] font-sans group-hover:text-white/65 transition-colors duration-300">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div initial={{ opacity:0,y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.7,duration:.7 }}
            className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl"
            style={{ background:"rgba(184,149,58,0.06)", border:"1px solid rgba(184,149,58,0.2)" }}>
            <div>
              <h3 className="font-display font-black text-white text-xl mb-1">Ready to experience the Pacific difference?</h3>
              <p className="text-white/45 text-[14px] font-sans">Join the 2026–27 admission cycle and be part of something exceptional.</p>
            </div>
            <Link href="/admission/brochure"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-bold font-sans transition-all hover:gap-3"
              style={{ background:"#B8953A", color:"#fff" }}>
              Apply Now
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
