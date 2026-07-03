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

// Text slide variants
const textVariants = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

// Image slide variants
const imgVariants = {
  enter: { opacity: 0, scale: 1.08, x: 30 },
  center: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 0.96, x: -30 },
};

const TRANSITION = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

export default function MottoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance every 4 s
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((p) => (p + 1) % MOTTOS.length);
    }, 4000);
    return () => clearInterval(id);
  }, [paused]);

  const m = MOTTOS[active];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: "600px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Animated background colour ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`bg-${active}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
          style={{ background: m.bg, zIndex: 0 }}
        />
      </AnimatePresence>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage:
            "linear-gradient(rgba(184,149,58,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.06) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Content ── */}
      <div
        className="relative max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16"
        style={{ zIndex: 2 }}
      >
        <div className="grid lg:grid-cols-2 min-h-[600px]">

          {/* ── LEFT: Text ── */}
          <div className="flex flex-col justify-center py-20 pr-0 lg:pr-20">

            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="h-px w-12" style={{ background: m.accent }} />
              <span
                className="text-[11px] font-semibold tracking-[.3em] uppercase font-sans"
                style={{ color: m.accent }}
              >
                Our Motto
              </span>
            </motion.div>

            {/* Animated text block */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`text-${active}`}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={TRANSITION}
              >
                {/* Tag */}
                <p
                  className="font-sans text-[12px] font-bold uppercase tracking-[.25em] mb-4"
                  style={{ color: m.accent }}
                >
                  {m.tag}
                </p>

                {/* Word */}
                <h2
                  className="font-display font-black text-white leading-[0.95] mb-8"
                  style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
                >
                  {m.word}
                </h2>

                {/* Desc */}
                <p className="text-white/65 text-[17px] leading-[1.85] font-sans max-w-lg mb-10">
                  {m.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Dot selectors */}
            <div className="flex items-center gap-3">
              {MOTTOS.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={item.word}
                  className="relative flex items-center justify-center transition-all duration-300"
                  style={{
                    width: active === i ? 44 : 10,
                    height: 10,
                    borderRadius: 5,
                    background: active === i ? m.accent : "rgba(255,255,255,0.2)",
                  }}
                >
                  {/* Progress bar inside active dot */}
                  {active === i && !paused && (
                    <motion.div
                      key={`prog-${active}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 4, ease: "linear" }}
                      className="absolute inset-0 rounded-full origin-left"
                      style={{ background: "rgba(255,255,255,0.35)" }}
                    />
                  )}
                </button>
              ))}
              <span className="ml-3 text-white/30 text-[12px] font-sans">
                {String(active + 1).padStart(2, "0")} / {String(MOTTOS.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* ── RIGHT: Image ── */}
          <div className="relative flex items-center justify-center py-12 lg:py-0 overflow-hidden">
            {/* Decorative ring */}
            <div
              className="absolute w-[500px] h-[500px] rounded-full border pointer-events-none"
              style={{ borderColor: `${m.accent}20` }}
            />
            <div
              className="absolute w-[380px] h-[380px] rounded-full border pointer-events-none"
              style={{ borderColor: `${m.accent}15` }}
            />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`img-${active}`}
                variants={imgVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={TRANSITION}
                className="relative z-10"
                style={{ width: "min(420px, 90vw)", aspectRatio: "1" }}
              >
                {/* Glow behind image */}
                <div
                  className="absolute inset-[-20px] rounded-full blur-3xl pointer-events-none"
                  style={{ background: `${m.accent}18` }}
                />
                {/* Image */}
                <div
                  className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl"
                  style={{ boxShadow: `0 40px 80px rgba(0,0,0,.5), 0 0 0 1px ${m.accent}25` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.img}
                    alt={m.word}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center top" }}
                  />
                  {/* Gradient overlay at bottom */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, ${m.bg}cc 0%, transparent 50%)`,
                    }}
                  />
                  {/* Word watermark on image */}
                  <div className="absolute bottom-6 left-6">
                    <p
                      className="font-display font-black text-white/90 text-4xl leading-none"
                      style={{ textShadow: "0 2px 20px rgba(0,0,0,.6)" }}
                    >
                      {m.word}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ zIndex: 3, background: "linear-gradient(to bottom, transparent, #FAFAF8)" }}
      />
    </section>
  );
}
