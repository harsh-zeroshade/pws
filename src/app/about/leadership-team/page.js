"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

const leaders = [
  {
    name: "Mrs. Santosh Bansal",
    role: "Chairperson",
    org: "Pacific World School & DPS Indirapuram",
    img: "https://admin.pacificworldschool.com/storage/uploads/1738650887_t2.png",
    color: "#B8953A",
    href: "/about/chairperson-message",
    quote: "At Pacific World School, we are committed to nurturing the next generation of global citizens equipped with the skills, values, and vision to make a positive difference.",
    tags: ["Visionary Leader", "Education Reformer"],
  },
  {
    name: "Mrs. Nidhi Bansal",
    role: "Pro Vice Chairperson",
    org: "Pacific World School",
    img: "https://admin.pacificworldschool.com/storage/uploads/1738650923_t3.png",
    color: "#1a3a6e",
    href: "/about/vice-chairperson-message",
    quote: "Every child is unique and deserving of an education that recognises, respects, and cultivates their individual strengths and aspirations.",
    tags: ["Student Advocate", "Holistic Development"],
  },
  {
    name: "Mrs. Pooja Bose",
    role: "Principal",
    org: "Pacific World School",
    img: "https://admin.pacificworldschool.com/storage/uploads/1735626077_t1.png",
    color: "#0D2545",
    href: "/about/principal-message",
    quote: "Education is not just about acquiring knowledge; it is about building character, fostering curiosity, and preparing young minds to lead with confidence.",
    tags: ["Academic Excellence", "Mentor"],
  },
];

export default function LeadershipTeamPage() {
  const contentRef = useRef(null);
  const inView = useInView(contentRef, { once: true, margin: "-5%" });

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background:"linear-gradient(135deg,#060F1E 0%,#0D2545 60%,#0a1e3d 100%)", minHeight:"55vh", display:"flex", alignItems:"center" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"linear-gradient(rgba(184,149,58,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.05) 1px,transparent 1px)", backgroundSize:"56px 56px" }} />
        <div aria-hidden className="absolute top-0 right-1/3 w-96 h-96 rounded-full pointer-events-none" style={{ background:"rgba(184,149,58,0.07)", filter:"blur(80px)" }} />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16 py-32">
          <motion.nav initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:.5 }}
            className="flex items-center gap-2 mb-8 text-[12px] font-sans">
            <Link href="/" className="text-white/40 hover:text-[#B8953A] transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link href="/about/school" className="text-white/40 hover:text-[#B8953A] transition-colors">About Us</Link>
            <span className="text-white/20">/</span>
            <span className="text-[#B8953A]">Leadership Team</span>
          </motion.nav>
          <motion.div initial={{ opacity:0,x:-20 }} animate={{ opacity:1,x:0 }} transition={{ duration:.6 }}
            className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-[#B8953A]" />
            <span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">Our Leaders</span>
          </motion.div>
          <motion.h1 initial={{ opacity:0,y:40 }} animate={{ opacity:1,y:0 }} transition={{ delay:.1,duration:.9,ease:[.22,1,.36,1] }}
            className="font-display font-black text-white leading-[1.0]" style={{ fontSize:"clamp(2.8rem,6vw,5rem)" }}>
            Leadership <em className="text-[#D4AF5A] not-italic">Team</em>
          </motion.h1>
          <motion.p initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:.25,duration:.8 }}
            className="text-white/50 text-[17px] leading-relaxed font-sans mt-4 max-w-2xl">
            The visionary leaders who guide Pacific World School towards excellence every day.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background:"linear-gradient(to right,transparent,#B8953A,transparent)" }} />
      </section>

      {/* ── Cards ── */}
      <section ref={contentRef} className="relative overflow-hidden py-24" style={{ background:"linear-gradient(180deg,#060F1E 0%,#0a1628 100%)" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"linear-gradient(rgba(184,149,58,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.03) 1px,transparent 1px)", backgroundSize:"56px 56px" }} />
        <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background:"rgba(13,37,69,0.3)", filter:"blur(100px)" }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid md:grid-cols-3 gap-8">
            {leaders.map((l, i) => (
              <motion.div key={l.name}
                initial={{ opacity:0,y:60 }} animate={inView?{opacity:1,y:0}:{}}
                transition={{ delay:i*.15,duration:.9,ease:[.22,1,.36,1] }}
                className="group relative flex flex-col rounded-2xl overflow-hidden"
                style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", transition:"border-color 0.3s,transform 0.3s,box-shadow 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=`${l.color}66`; e.currentTarget.style.transform="translateY(-8px)"; e.currentTarget.style.boxShadow=`0 24px 48px rgba(0,0,0,0.4),0 0 0 1px ${l.color}33`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
              >
                {/* Photo */}
                <div className="relative overflow-hidden" style={{ height:320 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.img} alt={l.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(6,15,30,0.9) 0%,rgba(6,15,30,0.2) 60%,transparent 100%)" }} />
                  {/* Role badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-sans text-white"
                    style={{ background:`${l.color}cc`, backdropFilter:"blur(8px)" }}>
                    {l.role}
                  </div>
                  {/* Name on image bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="h-0.5 w-8 rounded-full mb-3 transition-all duration-300 group-hover:w-16" style={{ background:"#D4AF5A" }} />
                    <h3 className="font-display font-black text-white text-xl">{l.name}</h3>
                    <p className="text-white/50 text-[12px] font-sans mt-0.5">{l.org}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <blockquote className="flex-1 mb-5 pl-4 border-l-2" style={{ borderColor:`${l.color}60` }}>
                    <p className="text-white/50 text-[13.5px] leading-[1.85] italic font-sans">&ldquo;{l.quote}&rdquo;</p>
                  </blockquote>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {l.tags.map(t => (
                      <span key={t} className="text-[10px] px-2.5 py-1 rounded-full font-sans"
                        style={{ background:`${l.color}18`, color:"rgba(255,255,255,0.6)", border:`1px solid ${l.color}33` }}>{t}</span>
                    ))}
                  </div>
                  <Link href={l.href}
                    className="inline-flex items-center gap-2 text-[12px] font-semibold font-sans transition-all group/btn"
                    style={{ color:l.color==="#0D2545"?"#D4AF5A":l.color }}>
                    Read Full Message
                    <svg className="transition-transform group-hover/btn:translate-x-1" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
