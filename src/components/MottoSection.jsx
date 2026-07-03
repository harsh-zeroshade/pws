"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const MOTTOS = [
  {
    word: "Excellence",
    tag: "01 / 03",
    desc: "We strive for excellence, encouraging every student to achieve their personal best and uphold the highest standards in all endeavors — academic, sporting, and personal.",
    img: "https://admin.pacificworldschool.com/storage/uploads/1735645108_Excellence.png",
    accent: "#B8953A",
    bg: "#0D2545",
  },
  {
    word: "Empathy",
    tag: "02 / 03",
    desc: "At Pacific World School, we nurture young minds, fostering exploration, creativity, and knowledge to build confidence, compassion, and a bright future for every child.",
    img: "https://admin.pacificworldschool.com/storage/uploads/1744784665_EMPATHY.png",
    accent: "#D4AF5A",
    bg: "#0a1e3d",
  },
  {
    word: "Empowerment",
    tag: "03 / 03",
    desc: "We empower students to become confident leaders and independent thinkers, ready to shape their own future and contribute positively to society at large.",
    img: "https://admin.pacificworldschool.com/storage/uploads/1777546667_Empowerment.jpg",
    accent: "#B8953A",
    bg: "#071629",
  },
];

const textVariants = {
  enter:  { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0 },
  exit:   { opacity: 0, y: -30 },
};

const imgVariants = {
  enter:  { opacity: 0, scale: 1.06 },
  center: { opacity: 1, scale: 1 },
  exit:   { opacity: 0, scale: 0.96 },
};

const TRANSITION = { duration: 0.65, ease: [0.22, 1, 0.36, 1] };

export default function MottoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive(p => (p + 1) % MOTTOS.length), 4000);
    return () => clearInterval(id);
  }, [paused]);

  const m = MOTTOS[active];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* Animated bg */}
      <AnimatePresence initial={false}>
        <motion.div key={`bg-${active}`} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          transition={{ duration: 0.8 }} className="absolute inset-0" style={{ background: m.bg, zIndex: 0 }} />
      </AnimatePresence>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex:1,
        backgroundImage:"linear-gradient(rgba(184,149,58,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.05) 1px,transparent 1px)",
        backgroundSize:"64px 64px" }} />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16" style={{ zIndex:2 }}>
        {/* Mobile: stacked. Desktop: side by side */}
        <div className="flex flex-col lg:grid lg:grid-cols-2">

          {/* ── Image (top on mobile, right on desktop) ── */}
          <div className="order-1 lg:order-2 flex items-center justify-center py-10 lg:py-0 overflow-hidden relative" style={{ minHeight: "clamp(280px, 50vw, 520px)" }}>
            {/* Decorative rings — hidden on small screens for perf */}
            <div className="hidden sm:block absolute w-[400px] h-[400px] rounded-full border pointer-events-none" style={{ borderColor:`${m.accent}20` }} />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={`img-${active}`} variants={imgVariants} initial="enter" animate="center" exit="exit"
                transition={TRANSITION} className="relative z-10 w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto" style={{ aspectRatio:"1" }}>
                <div className="absolute inset-[-12px] rounded-full blur-2xl pointer-events-none" style={{ background:`${m.accent}15` }} />
                <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
                  style={{ boxShadow:`0 24px 60px rgba(0,0,0,.5), 0 0 0 1px ${m.accent}25` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.img} alt={m.word} className="w-full h-full object-cover" style={{ objectPosition:"center top" }} />
                  <div className="absolute inset-0" style={{ background:`linear-gradient(to top, ${m.bg}cc 0%, transparent 50%)` }} />
                  <div className="absolute bottom-4 left-4">
                    <p className="font-display font-black text-white/80 text-2xl sm:text-3xl leading-none" style={{ textShadow:"0 2px 16px rgba(0,0,0,.6)" }}>{m.word}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Text (bottom on mobile, left on desktop) ── */}
          <div className="order-2 lg:order-1 flex flex-col justify-center py-12 lg:py-20 lg:pr-16">

            <motion.div initial={{ opacity:0, x:-20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:.6 }}
              className="flex items-center gap-4 mb-8">
              <div className="h-px w-10 sm:w-12" style={{ background: m.accent }} />
              <span className="text-[11px] font-semibold tracking-[.3em] uppercase font-sans" style={{ color: m.accent }}>Our Motto</span>
            </motion.div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={`text-${active}`} variants={textVariants} initial="enter" animate="center" exit="exit" transition={TRANSITION}>
                <p className="font-sans text-[11px] font-bold uppercase tracking-[.25em] mb-3" style={{ color: m.accent }}>{m.tag}</p>
                <h2 className="font-display font-black text-white leading-[0.95] mb-5 sm:mb-8"
                  style={{ fontSize:"clamp(3rem, 10vw, 7rem)" }}>
                  {m.word}
                </h2>
                <p className="text-white/60 text-[15px] sm:text-[17px] leading-[1.8] sm:leading-[1.85] font-sans mb-8 sm:mb-10 max-w-lg">
                  {m.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Dot selectors */}
            <div className="flex items-center gap-3">
              {MOTTOS.map((item, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={item.word}
                  className="relative flex items-center justify-center transition-all duration-300"
                  style={{ width: active===i ? 40 : 10, height:10, borderRadius:5, background: active===i ? m.accent : "rgba(255,255,255,0.2)" }}>
                  {active===i && !paused && (
                    <motion.div key={`prog-${active}`} initial={{ scaleX:0 }} animate={{ scaleX:1 }}
                      transition={{ duration:4, ease:"linear" }}
                      className="absolute inset-0 rounded-full origin-left" style={{ background:"rgba(255,255,255,0.35)" }} />
                  )}
                </button>
              ))}
              <span className="ml-2 text-white/30 text-[11px] font-sans">
                {String(active+1).padStart(2,"0")} / {String(MOTTOS.length).padStart(2,"0")}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none" style={{ zIndex:3, background:"linear-gradient(to bottom, transparent, #FAFAF8)" }} />
    </section>
  );
}
