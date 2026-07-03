"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { usePublicContent } from "@/hooks/useContent";

const values = [
  { label: "Global Citizenship",      icon: "🌍" },
  { label: "Rational Thinking",       icon: "🧠" },
  { label: "Emotional Independence",  icon: "💛" },
  { label: "Creative Minds",          icon: "🎨" },
];

export default function ViceChairpersonMessagePage() {
  const contentRef = useRef(null);
  const inView = useInView(contentRef, { once: true, margin: "-8%" });

  const cms = usePublicContent("vice-chairperson", "message", {
    name: "Mrs. Nidhi Bansal",
    role: "Pro-Vice Chairperson",
    image: "https://admin.pacificworldschool.com/storage/uploads/1738650923_t3.png",
    quote: "Tell me and I forget, Teach me and I remember, Involve me and I learn - Benjamin Franklin",
    paragraphs: [
      "At Pacific World School, every child is recognised, nurtured and treasured as we believe that each child is unique and special.",
      "It is our sincere effort to develop our students as Global Citizens with respect, patience and appreciation for diverse cultures and religions. Our focus is to provide holistic education where students evolve as individuals who are rational thinkers with creative minds.",
      "The school curriculum has been designed on scientific guidelines to provide students with intellectual stimulation, emotional independence and strong moral values.",
    ],
  });

  const paragraphs = cms.paragraphs || [];

  return (
    <PageLayout>
      <section className="relative overflow-hidden" style={{ background:"linear-gradient(135deg,#060F1E 0%,#0D2545 60%,#0a1e3d 100%)", minHeight:"60vh", display:"flex", alignItems:"center" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"linear-gradient(rgba(184,149,58,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.05) 1px,transparent 1px)", backgroundSize:"56px 56px" }} />
        <div aria-hidden className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background:"rgba(184,149,58,0.07)", filter:"blur(80px)" }} />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16 py-32">
          <motion.nav initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:.5 }}
            className="flex items-center gap-2 mb-8 text-[12px] font-sans">
            <Link href="/" className="text-white/40 hover:text-[#B8953A] transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link href="/about/school" className="text-white/40 hover:text-[#B8953A] transition-colors">About Us</Link>
            <span className="text-white/20">/</span>
            <span className="text-[#B8953A]">Pro-Vice Chairperson&apos;s Message</span>
          </motion.nav>
          <motion.div initial={{ opacity:0,x:-20 }} animate={{ opacity:1,x:0 }} transition={{ duration:.6 }} className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-[#B8953A]" />
            <span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">Leadership</span>
          </motion.div>
          <motion.h1 initial={{ opacity:0,y:40 }} animate={{ opacity:1,y:0 }} transition={{ delay:.1,duration:.9,ease:[.22,1,.36,1] }}
            className="font-display font-black text-white leading-[1.0]" style={{ fontSize:"clamp(2.4rem,5.5vw,4.8rem)" }}>
            Pro-Vice Chairperson&apos;s <em className="text-[#D4AF5A] not-italic">Message</em>
          </motion.h1>
          <motion.p initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:.25,duration:.8 }}
            className="text-white/50 text-[17px] leading-relaxed font-sans mt-4 max-w-2xl">
            A message from {cms.name}, {cms.role}, Pacific World School
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background:"linear-gradient(to right,transparent,#B8953A,transparent)" }} />
      </section>

      <section ref={contentRef} className="relative overflow-hidden py-24" style={{ background:"linear-gradient(180deg,#060F1E 0%,#0a1628 100%)" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"linear-gradient(rgba(184,149,58,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.03) 1px,transparent 1px)", backgroundSize:"56px 56px" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-[340px_1fr] gap-14 xl:gap-20 items-start">
            {/* Portrait */}
            <motion.div initial={{ opacity:0,x:-30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:.9,ease:[.22,1,.36,1] }}
              className="flex flex-col items-center lg:items-start">
              <div className="relative mb-6">
                <div className="absolute -inset-3 rounded-3xl pointer-events-none" style={{ background:"linear-gradient(135deg,rgba(26,58,110,0.4),transparent)", filter:"blur(12px)" }} />
                <div className="relative rounded-3xl overflow-hidden" style={{ width:280, height:340, border:"1px solid rgba(184,149,58,0.2)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cms.image} alt={cms.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(6,15,30,0.5) 0%,transparent 50%)" }} />
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background:"#1a3a6e", border:"1px solid rgba(184,149,58,0.3)", boxShadow:"0 8px 24px rgba(0,0,0,0.4)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <div className="text-center lg:text-left mt-6 px-2">
                <p className="font-display font-black text-white text-xl">{cms.name}</p>
                <p className="text-[#B8953A] text-[12px] font-semibold uppercase tracking-widest font-sans mt-1">{cms.role}</p>
                <p className="text-white/35 text-[12px] font-sans mt-1">Pacific World School</p>
              </div>
              <div className="mt-8 p-4 rounded-xl w-full" style={{ background:"rgba(184,149,58,0.06)", border:"1px solid rgba(184,149,58,0.18)" }}>
                <p className="text-[#D4AF5A] text-[11px] uppercase tracking-widest font-sans mb-2">Inspiration</p>
                <p className="text-white/60 text-[13px] italic leading-relaxed font-sans">&ldquo;{cms.quote}&rdquo;</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
                {values.map(v => (
                  <span key={v.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-sans font-medium"
                    style={{ background:"rgba(26,58,110,0.4)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.7)" }}>
                    <span>{v.icon}</span>{v.label}
                  </span>
                ))}
              </div>
            </motion.div>
            {/* Message */}
            <motion.div initial={{ opacity:0,x:30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.15,duration:.9,ease:[.22,1,.36,1] }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-[#B8953A]" />
                <span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">A Message from Our Pro-Vice Chairperson</span>
              </div>
              <div className="space-y-6">
                {paragraphs.map((p, i) => (
                  <motion.p key={i} initial={{ opacity:0,y:20 }} animate={inView?{opacity:1,y:0}:{}}
                    transition={{ delay:.2+i*.1,duration:.7 }}
                    className="font-sans leading-[1.95]" style={{ color:i===0?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.55)", fontSize:"16px" }}>
                    {i===0 ? <strong className="font-semibold text-white">{p}</strong> : p}
                  </motion.p>
                ))}
              </div>
              <motion.div initial={{ opacity:0,y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.55,duration:.7 }}
                className="mt-12 pt-8" style={{ borderTop:"1px solid rgba(255,255,255,0.08)" }}>
                <p className="font-display font-bold text-white text-lg">{cms.name}</p>
                <p className="text-[#B8953A] text-[12px] uppercase tracking-widest font-sans mt-0.5">{cms.role}, Pacific World School</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
