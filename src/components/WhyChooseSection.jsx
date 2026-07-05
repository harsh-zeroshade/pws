"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

const REASONS = [
  {
    img: "https://admin.pacificworldschool.com/storage/uploads/1745812527_PTM final.png",
    title: "Parent Teacher Communication",
    desc: "An ERP system facilitates transparent communication, complemented by regular Parent-Teacher Meetings and available staff for discussions.",
    href: "/about/differentiating-factors",
    color: "#0D2545",
    icon: "💬",
  },
  {
    img: "https://admin.pacificworldschool.com/storage/uploads/1741256782_Container (1).png",
    title: "Excellence in Academics",
    desc: "Pacific World School maintains robust academic standards evidenced by exceptional board results, with experiential and enquiry-based learning promoting critical thinking.",
    href: "/academics/cbse",
    color: "#B8953A",
    icon: "🏆",
  },
  {
    img: "https://admin.pacificworldschool.com/storage/uploads/1741256836_container-6.png",
    title: "World Class Infrastructure",
    desc: "A state-of-the-art 10-acre campus with AC smart classrooms, two auditoria, amphitheater, libraries, cafeteria, exceptional sports facilities and specialized labs.",
    href: "/about/school",
    color: "#1a3a6e",
    icon: "🏛️",
  },
  {
    img: "https://admin.pacificworldschool.com/storage/uploads/1744788969_personal atten.png",
    title: "Personal Attention",
    desc: "With a 1:16 teacher-student ratio, each child's uniqueness is nurtured, ensuring they thrive in a supportive and caring environment.",
    href: "/about/differentiating-factors",
    color: "#2a5a3e",
    icon: "🎯",
  },
  {
    img: "https://admin.pacificworldschool.com/storage/uploads/1741257300_container-3.png",
    title: "Entrepreneurial Development",
    desc: "Debates, workshops, and presentations help students develop leadership qualities and confidence from a young age.",
    href: "/about/differentiating-factors",
    color: "#5c3d8f",
    icon: "💡",
  },
  {
    img: "https://admin.pacificworldschool.com/storage/uploads/1741257423_container-5.png",
    title: "Safety Measures",
    desc: "ID cards, CCTV, verified staff, GPS-enabled buses, a clinic, ambulance, emergency drills, and female staff in academic areas.",
    href: "/about/differentiating-factors",
    color: "#b83232",
    icon: "🛡️",
  },
  {
    img: "https://admin.pacificworldschool.com/storage/uploads/1744788028_Global.png",
    title: "Cultural & Global Awareness",
    desc: "The curriculum integrates Indian cultural values with global awareness, promoting peace, harmony, and compassion across communities.",
    href: "/about/differentiating-factors",
    color: "#0D2545",
    icon: "🌍",
  },
  {
    img: "https://admin.pacificworldschool.com/storage/uploads/1741257708_container-8.png",
    title: "International Collaborations",
    desc: "Partnerships with Microsoft, AFS, IAYP and Scholastic provide global exposure and transformative learning opportunities.",
    href: "/about/differentiating-factors",
    color: "#B8953A",
    icon: "🤝",
  },
  {
    img: "https://admin.pacificworldschool.com/storage/uploads/1741325472_0P7A9459-293.jpg",
    title: "Sports Coaching",
    desc: "Mandatory sports participation with specialized coaching ensures students learn teamwork, discipline, and resilience.",
    href: "/beyond-academics/specialized-sports",
    color: "#1a3a6e",
    icon: "⚽",
  },
  {
    img: "https://admin.pacificworldschool.com/storage/uploads/1741258446_h.png",
    title: "Dual Curriculum",
    desc: "We offer CBSE and Cambridge — CBSE for a robust national framework, Cambridge for an international approach emphasising analytical and global perspectives.",
    href: "/academics/cambridge",
    color: "#2a5a3e",
    icon: "📚",
  },
];

const VISIBLE = 4;
// On mobile show 1 card, on tablet show 2, on desktop show 4
function getVisible() {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 4;
}

export default function WhyChooseSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-8%" });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [modalIdx, setModalIdx] = useState(null);
  const [visible, setVisible] = useState(4);
  const total = REASONS.length;

  useEffect(() => {
    const update = () => setVisible(getVisible());
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [paused, next]);

  const visibleIdx = Array.from({ length: visible }, (_, k) => (current + k) % total);

  return (
    <section
      ref={sectionRef}
      className="bg-[#060F1E] py-16 sm:py-20 lg:py-28"
      style={{ position: "relative", isolation: "isolate" }}
    >
      {/* background pattern */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(184,149,58,.18) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.18) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div aria-hidden style={{ position:"absolute", top:0, left:"25%", width:"24rem", height:"24rem", background:"rgba(184,149,58,.07)", borderRadius:"50%", filter:"blur(80px)", zIndex:0, pointerEvents:"none" }} />
      <div aria-hidden style={{ position:"absolute", bottom:0, right:"20%", width:"28rem", height:"28rem", background:"rgba(13,37,69,.5)", borderRadius:"50%", filter:"blur(80px)", zIndex:0, pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:1 }} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-8 mb-10 sm:mb-14">
          <div>
            <motion.div initial={{ opacity:0,x:-20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:.6 }}
              className="flex items-center gap-4 mb-5">
              <div className="h-px w-12 bg-[#B8953A]" />
              <span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">Why Choose Us</span>
            </motion.div>
            <motion.h2 initial={{ opacity:0,y:40 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.1,duration:.9,ease:[.22,1,.36,1] }}
              className="font-display font-black text-white leading-[1.05]"
              style={{ fontSize:"clamp(2.4rem,4.5vw,4rem)" }}>
              Why Choose{" "}
              <em className="text-[#D4AF5A] not-italic">Pacific World?</em>
            </motion.h2>
          </div>

          {/* Nav */}
          <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:.4 }}
            className="flex items-center gap-3">
            <button onClick={() => { prev(); setPaused(true); setTimeout(()=>setPaused(false),4000); }}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#B8953A] hover:border-[#B8953A] transition-all"
              aria-label="Previous">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <span className="text-white/40 text-[13px] font-sans tabular-nums w-16 text-center">
              <span className="text-white font-semibold">{String(current+1).padStart(2,"0")}</span> / {String(total).padStart(2,"0")}
            </span>
            <button onClick={() => { next(); setPaused(true); setTimeout(()=>setPaused(false),4000); }}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#B8953A] hover:border-[#B8953A] transition-all"
              aria-label="Next">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <Link href="/about/differentiating-factors"
              className="hidden sm:block ml-2 px-5 py-2.5 border border-white/20 text-white/60 hover:text-white hover:border-[#B8953A] rounded-xl text-[13px] font-sans transition-all">
              View All
            </Link>
          </motion.div>
        </div>

        {/* Slider cards */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ position:"relative", overflow:"hidden" }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={current}
              initial={{ opacity:0, x:60 }}
              animate={{ opacity:1, x:0 }}
              exit={{ opacity:0, x:-60 }}
              transition={{ duration:.45, ease:[.22,1,.36,1] }}
              className={`grid gap-4 sm:gap-5 ${visible === 1 ? "grid-cols-1" : visible === 2 ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-4"}`}
            >
              {visibleIdx.map((idx, pos) => {
                const item = REASONS[idx];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity:0, y:30 }}
                    animate={{ opacity:1, y:0 }}
                    transition={{ delay:pos*.07, duration:.5 }}
                    onClick={() => setModalIdx(idx)}
                    className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer"
                    style={{
                      background: "linear-gradient(160deg, #0f1e36 0%, #0a1628 100%)",
                      border: "1px solid rgba(184,149,58,0.15)",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
                      transition: "transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease, border-color 0.35s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(184,149,58,0.35)";
                      e.currentTarget.style.borderColor = "rgba(184,149,58,0.4)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)";
                      e.currentTarget.style.borderColor = "rgba(184,149,58,0.15)";
                    }}
                  >
                    {/* Image */}
                    <div style={{ height: visible === 1 ? 240 : 200, position: "relative", overflow: "hidden", background: "#060f1e" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        className="group-hover:scale-110 transition-transform duration-700"
                        style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center" }}
                      />
                      {/* dark gradient overlay on image */}
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(6,15,30,0.85) 0%, rgba(6,15,30,0.1) 60%)" }} />
                      {/* number badge */}
                      <div style={{
                        position:"absolute", top:12, right:12,
                        width:32, height:32, borderRadius:"50%",
                        background:"rgba(184,149,58,0.15)",
                        border:"1px solid rgba(184,149,58,0.4)",
                        backdropFilter:"blur(8px)",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        color:"#D4AF5A", fontSize:11, fontWeight:700, letterSpacing:"0.05em",
                        fontFamily:"var(--font-dm-sans),system-ui,sans-serif",
                      }}>
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      {/* icon + color accent at bottom of image */}
                      <div style={{ position:"absolute", bottom:12, left:14, display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{
                          width:32, height:32, borderRadius:10,
                          background: item.color,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:15, boxShadow:"0 4px 12px rgba(0,0,0,0.35)",
                          flexShrink:0,
                        }}>
                          {item.icon}
                        </div>
                      </div>
                    </div>

                    {/* Text area */}
                    <div style={{ padding:"18px 18px 20px", flex:1, display:"flex", flexDirection:"column", background:"transparent" }}>
                      {/* animated accent bar */}
                      <div style={{ height:2, width:24, borderRadius:2, background:`linear-gradient(to right, ${item.color}, #D4AF5A)`, marginBottom:12, transition:"width 0.35s ease" }} className="group-hover:!w-14" />
                      <h3 style={{
                        fontFamily:"var(--font-playfair),Georgia,serif",
                        fontWeight:900, color:"#ffffff",
                        fontSize:15, lineHeight:1.35, marginBottom:8,
                        transition:"color 0.2s",
                      }} className="group-hover:!text-[#D4AF5A]">
                        {item.title}
                      </h3>
                      <p style={{
                        color:"rgba(255,255,255,0.45)",
                        fontSize:12.5, lineHeight:1.75,
                        fontFamily:"var(--font-dm-sans),system-ui,sans-serif",
                        display:"-webkit-box", WebkitLineClamp:2,
                        WebkitBoxOrient:"vertical", overflow:"hidden",
                        transition:"color 0.2s",
                      }} className="group-hover:!text-white/65">
                        {item.desc}
                      </p>
                      {/* Read more hint */}
                      <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:"auto", paddingTop:12 }}>
                        <span style={{ color:"rgba(184,149,58,0.5)", fontSize:10.5, fontFamily:"var(--font-dm-sans),system-ui,sans-serif", textTransform:"uppercase", letterSpacing:"0.1em", transition:"color 0.2s" }} className="group-hover:!text-[#B8953A]">
                          Learn more
                        </span>
                        <svg className="group-hover:translate-x-1 transition-transform" style={{ color:"rgba(184,149,58,0.5)" }} width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {REASONS.map((_, i) => (
            <button key={i} onClick={() => { setCurrent(i); setPaused(true); setTimeout(()=>setPaused(false),4000); }}
              className="rounded-full transition-all duration-300"
              style={{ width:current===i?28:8, height:8, background:current===i?"#B8953A":"rgba(255,255,255,.18)" }}
              aria-label={`Slide ${i+1}`}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.5 }}
          className="mt-10 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 border-t border-white/10 pt-8 sm:pt-10">
          {[
            { val:"10",   suf:" Acres",  label:"Campus Size" },
            { val:"1:16", suf:"",        label:"Teacher–Student Ratio" },
            { val:"100",  suf:"%",       label:"Board Pass Rate" },
            { val:"2",    suf:" Boards", label:"CBSE + Cambridge" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center p-5 rounded-2xl border border-white/8 hover:border-[#B8953A]/40 transition-all" style={{ background:"rgba(255,255,255,.04)" }}>
              <span className="font-display font-black text-white text-3xl leading-none">
                {s.val}<span style={{ color:"#D4AF5A", fontSize:"1.2rem" }}>{s.suf}</span>
              </span>
              <span className="text-white/35 text-[10px] uppercase tracking-widest mt-2 font-sans">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalIdx !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md"
              onClick={() => setModalIdx(null)}
            />
            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[210] flex items-center justify-center p-4 md:p-8 pointer-events-none"
            >
              <div
                className="pointer-events-auto w-full max-w-4xl rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl md:shadow-[0_40px_80px_rgba(0,0,0,0.5)] flex flex-col md:flex-row"
                style={{ background: "#ffffff", maxHeight: "90vh" }}
              >
                {/* Image section — left/top */}
                <div className="relative w-full md:w-[45%] flex-shrink-0" style={{ minHeight: "250px", maxHeight: "50vh", background: "#f8f6f2" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={REASONS[modalIdx].img}
                    alt={REASONS[modalIdx].title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay at bottom of image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {/* Icon badge */}
                  <div
                    className="absolute bottom-4 left-4 flex items-center gap-3"
                  >
                    <div
                      style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: REASONS[modalIdx].color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 22, boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                      }}
                    >
                      {REASONS[modalIdx].icon}
                    </div>
                  </div>
                  {/* Close button — top right over image */}
                  <button
                    onClick={() => setModalIdx(null)}
                    className="absolute top-4 right-4 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-105"
                    aria-label="Close"
                  >
                    <X className="w-4 h-5 md:w-5 md:h-5" />
                  </button>
                </div>

                {/* Content section — right/bottom */}
                <div className="flex-1 flex flex-col p-6 md:p-10 overflow-y-auto">
                  {/* Top accent line */}
                  <div
                    style={{
                      height: 4, width: 48, borderRadius: 2,
                      background: REASONS[modalIdx].color,
                      marginBottom: 20,
                    }}
                  />

                  {/* Title */}
                  <h2
                    className="font-display font-black"
                    style={{ color: "#0D2545", fontSize: "clamp(1.4rem, 2.8vw, 2rem)", lineHeight: 1.2, marginBottom: 16 }}
                  >
                    {REASONS[modalIdx].title}
                  </h2>

                  {/* Description with better reading experience */}
                  <div className="flex-1">
                    <p
                      style={{
                        color: "#4a4a3a",
                        fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
                        lineHeight: 1.85,
                        fontFamily: "var(--font-dm-sans),system-ui,sans-serif",
                      }}
                    >
                      {REASONS[modalIdx].desc}
                    </p>
                  </div>

                  {/* Bottom actions */}
                  <div className="flex items-center justify-between gap-4 mt-6 pt-6 border-t border-[#f0ece4]">
                    <Link
                      href={REASONS[modalIdx].href}
                      onClick={() => setModalIdx(null)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-[14px] font-bold font-sans transition-all hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
                      style={{ background: REASONS[modalIdx].color }}
                    >
                      Learn More
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => setModalIdx(null)}
                      className="text-[13px] font-medium font-sans text-[#b0a898] hover:text-[#0D2545] transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}