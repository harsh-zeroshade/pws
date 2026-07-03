"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

// ─── Reusable animate-on-scroll wrapper ───
function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const vars =
    direction === "up"
      ? { y: 50, opacity: 0 }
      : direction === "left"
      ? { x: -50, opacity: 0 }
      : direction === "right"
      ? { x: 50, opacity: 0 }
      : { scale: 0.95, opacity: 0 };
  return (
    <motion.div
      ref={ref}
      initial={vars}
      animate={inView ? { x: 0, y: 0, scale: 1, opacity: 1 } : {}}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Counter animation ───
function Counter({ to, suffix = "", label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useRef(0);
  const displayVal = useRef("0");
  // We'll use a simple approach with motion
  return (
    <div ref={ref} className="flex flex-col items-center">
      <motion.span
        className="font-display font-black text-white text-4xl md:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.01 }}
          onAnimationComplete={() => {
            if (!inView) return;
            let start = 0;
            const dur = 2000;
            const startTime = Date.now();
            const tick = () => {
              const p = Math.min((Date.now() - startTime) / dur, 1);
              const ease = 1 - Math.pow(1 - p, 3);
              const val = Math.round(ease * to);
              displayVal.current = val + suffix;
              ref.current && (ref.current.textContent = displayVal.current);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }}
        />
        <span ref={ref}>0{suffix}</span>
      </motion.span>
      <span className="text-white/40 text-[11px] uppercase tracking-widest mt-2 font-sans">{label}</span>
    </div>
  );
}

// ─── Hero Section ───
function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden" style={{ background: "#060F1E" }}>
      {/* Video/Image background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://admin.pacificworldschool.com/storage/about_us/About-1735900537.png"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060F1E]/90 via-[#060F1E]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E] via-transparent to-[#060F1E]/30" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#B8953A]/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16 w-full">
        <nav className="flex items-center gap-2 mb-6 text-[12px] font-sans">
          <Link href="/" className="text-white/40 hover:text-[#B8953A] transition-colors">Home</Link>
          <span className="text-white/20">/</span>
          <Link href="/about/school" className="text-white/40 hover:text-[#B8953A] transition-colors">About Us</Link>
          <span className="text-white/20">/</span>
          <span className="text-[#B8953A]">About School</span>
        </nav>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-white leading-[1.0] mb-6"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
        >
          About{" "}
          <em className="text-[#D4AF5A] not-italic">Pacific World</em>
          <br />
          School
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-white/60 text-[17px] leading-relaxed font-sans max-w-xl mb-8"
        >
          A state-of-the-art institution nestled in 10 acres of lush green environs in Greater Noida West, where academic excellence meets holistic development.
        </motion.p>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap gap-8"
        >
          {[
            { val: "10", suf: "+", label: "Acres Campus" },
            { val: "2003", suf: "", label: "Legacy Since" },
            { val: "1:16", suf: "", label: "Student Ratio" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="h-8 w-px bg-[#B8953A]/40" />
              <div>
                <span className="font-display font-bold text-white text-xl">{s.val}<span className="text-[#B8953A]">{s.suf}</span></span>
                <span className="block text-white/30 text-[10px] uppercase tracking-widest font-sans">{s.label}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-6 lg:left-12 xl:left-16 flex flex-col items-center gap-2"
        >
          <span className="text-white/20 text-[8px] tracking-[0.3em] uppercase font-sans">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Stats bar ───
function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const stats = [
    {
      to: 10, suffix: "+", label: "Acre Campus",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
        </svg>
      ),
    },
    {
      to: 250, suffix: "+", label: "Expert Faculty",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      to: 15, suffix: "+", label: "Sports Programs",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8l4 4-4 4-4-4 4-4z"/>
        </svg>
      ),
    },
    {
      to: 100, suffix: "%", label: "Board Pass Rate",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={ref}
      className="relative overflow-hidden py-20"
      style={{ background: "linear-gradient(135deg, #060F1E 0%, #0D2545 50%, #0a1e3d 100%)" }}
    >
      {/* Grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(184,149,58,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.07) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Glow orbs */}
      <div aria-hidden className="absolute -top-20 left-1/4 w-72 h-72 rounded-full pointer-events-none" style={{ background: "rgba(184,149,58,0.06)", filter: "blur(60px)" }} />
      <div aria-hidden className="absolute -bottom-20 right-1/4 w-72 h-72 rounded-full pointer-events-none" style={{ background: "rgba(13,37,69,0.6)", filter: "blur(60px)" }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="h-px w-12 bg-[#B8953A]" />
          <span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">
            Pacific World School at a Glance
          </span>
          <div className="h-px w-12 bg-[#B8953A]" />
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl p-7 flex flex-col items-center text-center overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "border-color 0.3s, background 0.3s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(184,149,58,0.4)";
                e.currentTarget.style.background = "rgba(184,149,58,0.06)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at top right, rgba(184,149,58,0.15), transparent 70%)",
                }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-[#D4AF5A]"
                style={{
                  background: "rgba(184,149,58,0.12)",
                  border: "1px solid rgba(184,149,58,0.2)",
                }}
              >
                {s.icon}
              </div>

              {/* Number */}
              <div className="font-display font-black text-white leading-none mb-3" style={{ fontSize: "clamp(2.4rem,4vw,3.2rem)" }}>
                <CounterInline to={s.to} suffix={s.suffix} inView={inView} delay={i * 0.12} />
              </div>

              {/* Divider */}
              <div className="w-8 h-0.5 rounded-full bg-[#B8953A]/40 mb-3 group-hover:w-14 transition-all duration-300" />

              {/* Label */}
              <span className="text-white/50 text-[12px] uppercase tracking-widest font-sans group-hover:text-white/70 transition-colors">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Inline counter that takes inView + delay as props (avoids nested ref issues)
function CounterInline({ to, suffix, inView, delay }) {
  const spanRef = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;
    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const dur = 1800;
      const tick = () => {
        const p = Math.min((Date.now() - startTime) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = Math.round(ease * to);
        if (spanRef.current) spanRef.current.textContent = val + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, to, suffix, delay]);

  return <span ref={spanRef}>0{suffix}</span>;
}

// ─── Mission & Vision section ───
function MissionVision() {
  return (
    <div className="bg-[#FAFAF8] py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              label: "Our Mission",
              text: "Pacific World School is set to emerge as a center of excellence in Education with focus on continuous development of mind, body and soul, nurturing compassionate and creative global citizens.",
              color: "#0D2545",
              icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3v12m0 0l-3-3m3 3l3-3M5 18h14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
            },
            {
              label: "Our Vision",
              text: "We are committed to providing high-quality education that delivers a transformative learning experience to all our students — a safe and happy space where students develop into principled, compassionate, and balanced individuals.",
              color: "#B8953A",
              icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
            },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.15} direction="up">
              <motion.div
                whileHover={{ y: -6 }}
                className="group p-8 md:p-10 rounded-3xl bg-white border border-[#e8e4d9] hover:border-[#B8953A]/30 hover:shadow-xl hover:shadow-[#B8953A]/5 transition-all duration-400 h-full"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white group-hover:scale-105 transition-transform"
                    style={{ background: item.color }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-display font-black text-[#0D2545] text-2xl">{item.label}</h3>
                </div>
                <p className="text-[#5a5a4a] text-[15px] leading-[1.9] font-sans">{item.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── History timeline section ───
function HistorySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  const milestones = [
    { year: "2003", text: "Pacific Group establishes Delhi Public School, Indirapuram — laying the foundation of educational excellence.", active: false },
    { year: "2015", text: "Delhi Public School, Raj Nagar Extension is established, expanding the group's footprint in quality education.", active: false },
    { year: "2026", text: "Pacific World School opens its doors in Greater Noida West — a 10-acre state-of-the-art campus under the group's own banner.", active: true },
  ];

  return (
    <section ref={ref} className="bg-white py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
        <Reveal>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#B8953A]" />
            <span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">Our Journey</span>
          </div>
          <h2 className="font-display font-black text-[#0D2545] mb-16" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            A Legacy of <em className="text-[#B8953A] not-italic">Excellence</em>
          </h2>
        </Reveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-[#e8e4d9] -translate-x-1/2" />

          <div className="space-y-16">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.2}>
                <div className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Dot */}
                  <div className="absolute left-[15px] md:left-1/2 w-8 h-8 rounded-full bg-white border-4 -translate-x-1/2 z-10 flex items-center justify-center" style={{ borderColor: m.active ? "#B8953A" : "#d0c8b8" }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: m.active ? "#B8953A" : "#d0c8b8" }} />
                  </div>

                  {/* Content */}
                  <div className={`pl-12 md:pl-0 md:w-[calc(50%-40px)] ${i % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"}`}>
                    <span
                      className="font-display font-black text-5xl md:text-6xl leading-none"
                      style={{ color: m.active ? "#B8953A" : "#d0c8b8" }}
                    >
                      {m.year}
                    </span>
                    <p className="text-[#5a5a4a] text-[15px] leading-[1.8] font-sans mt-3">{m.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Campus features section ───
function CampusFeatures() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-8%" });

  const features = [
    {
      img: "https://admin.pacificworldschool.com/storage/uploads/1748690409_com.png",
      title: "Smart Classrooms",
      desc: "Air-conditioned digital classrooms equipped with interactive technology for immersive, future-ready learning.",
      tag: "Technology",
      accent: "#B8953A",
    },
    {
      img: "https://admin.pacificworldschool.com/storage/uploads/1735625860_4.png",
      title: "Sports Facilities",
      desc: "International-standard sports facilities across multiple disciplines, fostering teamwork and physical excellence.",
      tag: "Athletics",
      accent: "#1a3a6e",
    },
    {
      img: "https://admin.pacificworldschool.com/storage/uploads/1744786759_3.png",
      title: "Advanced Labs",
      desc: "Well-equipped science, computer, and language laboratories built for hands-on experiential learning.",
      tag: "Science",
      accent: "#2a5a3e",
    },
    {
      img: "https://admin.pacificworldschool.com/storage/uploads/1747199303_1746677839_1740831281_Inspirational-Principal-of-the-Year-Award-2024.jpg",
      title: "Vibrant Campus Life",
      desc: "A thriving community with cultural events, clubs, and activities that nurture holistic personal growth.",
      tag: "Community",
      accent: "#7c3d8f",
    },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-28" style={{ background: "#060F1E" }}>
      {/* Subtle grid */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(184,149,58,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.05) 1px,transparent 1px)",
        backgroundSize: "64px 64px",
      }} />
      <div aria-hidden className="absolute top-0 left-1/3 w-96 h-96 rounded-full pointer-events-none" style={{ background: "rgba(184,149,58,0.05)", filter: "blur(80px)" }} />
      <div aria-hidden className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "rgba(26,58,110,0.4)", filter: "blur(80px)" }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div initial={{ opacity:0,x:-20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:.6 }}
              className="flex items-center gap-4 mb-5">
              <div className="h-px w-12 bg-[#B8953A]" />
              <span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">Our Campus</span>
            </motion.div>
            <motion.h2 initial={{ opacity:0,y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.1,duration:.9,ease:[.22,1,.36,1] }}
              className="font-display font-black text-white leading-[1.05]" style={{ fontSize:"clamp(2.2rem,4vw,3.2rem)" }}>
              World-Class <em className="text-[#D4AF5A] not-italic">Infrastructure</em>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity:0,y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.25,duration:.7 }}
            className="text-white/40 text-[15px] leading-relaxed font-sans max-w-md lg:text-right">
            A 10-acre campus meticulously designed to inspire learning, creativity, and growth at every turn.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ gridAutoRows: "280px" }}>
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity:0,y:40 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ delay:i*.1,duration:.8,ease:[.22,1,.36,1] }}
              className={`group relative overflow-hidden rounded-2xl${i===0?" lg:row-span-2":""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.img} alt={f.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background:`linear-gradient(to top, ${f.accent}99, transparent)` }} />
              {/* Tag */}
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full font-sans text-white"
                  style={{ background:`${f.accent}cc`, backdropFilter:"blur(8px)" }}>{f.tag}</span>
              </div>
              {/* Hover arrow */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 11L11 3M11 3H5M11 3v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="h-0.5 w-8 rounded-full mb-4 bg-[#D4AF5A] transition-all duration-300 group-hover:w-16" />
                <h3 className="font-display font-black text-white mb-2 group-hover:text-[#D4AF5A] transition-colors duration-300"
                  style={{ fontSize: i===0 ? "clamp(1.3rem,2vw,1.7rem)" : "1.15rem" }}>{f.title}</h3>
                <p className="text-white/60 font-sans text-[13px] leading-relaxed group-hover:text-white/80 transition-colors duration-300">{f.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div initial={{ opacity:0,y:40 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.45,duration:.8,ease:[.22,1,.36,1] }}
            className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-center"
            style={{ background:"linear-gradient(135deg,rgba(184,149,58,0.12),rgba(13,37,69,0.4))", border:"1px solid rgba(184,149,58,0.25)" }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{ background:"rgba(184,149,58,0.15)", border:"1px solid rgba(184,149,58,0.3)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <h3 className="font-display font-black text-white text-xl mb-3">10-Acre Campus</h3>
            <p className="text-white/45 text-[13px] leading-relaxed font-sans mb-6">Every corner of our campus is crafted to fuel curiosity and inspire excellence.</p>
            <a href="/about/school" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold font-sans transition-all hover:gap-3"
              style={{ background:"#B8953A", color:"#fff" }}>
              Explore More
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Emblem section ───
function EmblemSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-8%" });

  const values = [
    { label: "Indian Culture", desc: "The tilak form symbolises the school's commitment to imbibing core Indian cultural values in every student." },
    { label: "Steady Growth", desc: "Like a blooming sapling, the emblem reflects the school's tireless effort to achieve milestones in a steady manner." },
    { label: "Pluralistic Society", desc: "The vibrant colours embody the belief in a peaceful, harmonious, and inclusive community where everyone co-exists." },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-28"
      style={{ background: "linear-gradient(160deg,#060F1E 0%,#0D2545 60%,#0a1e3d 100%)" }}>
      {/* Grid */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(184,149,58,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.04) 1px,transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      <div aria-hidden className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background:"rgba(184,149,58,0.06)", filter:"blur(90px)" }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left: text */}
          <div>
            <motion.div initial={{ opacity:0,x:-20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:.6 }}
              className="flex items-center gap-4 mb-5">
              <div className="h-px w-12 bg-[#B8953A]" />
              <span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">Our Identity</span>
            </motion.div>

            <motion.h2 initial={{ opacity:0,y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.1,duration:.9,ease:[.22,1,.36,1] }}
              className="font-display font-black text-white leading-[1.05] mb-6" style={{ fontSize:"clamp(2.2rem,3.8vw,3rem)" }}>
              The Emblem &{" "}<em className="text-[#D4AF5A] not-italic">Its Meaning</em>
            </motion.h2>

            <motion.p initial={{ opacity:0,y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.2,duration:.8 }}
              className="text-white/55 text-[15px] leading-[1.9] font-sans mb-10">
              The logo states volumes about the vision of the school. It is in the form of a holy smear
              that we put on our forehead — indicating the school's belief in imbibing the values and
              principles of Indian culture in every student. It also suggests a blooming sapling,
              showing the school will achieve milestones in a steady manner. The colours used affirm
              the belief in a peaceful, pluralistic society.
            </motion.p>

            {/* Values */}
            <div className="space-y-3">
              {values.map((v, i) => (
                <motion.div key={v.label}
                  initial={{ opacity:0,x:-20 }} animate={inView?{opacity:1,x:0}:{}}
                  transition={{ delay:.3+i*.12,duration:.7 }}
                  className="flex gap-4 p-5 rounded-xl"
                  style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                    style={{ background:"rgba(184,149,58,0.15)", border:"1px solid rgba(184,149,58,0.25)" }}>
                    <div className="w-2 h-2 rounded-full bg-[#D4AF5A]" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-[15px] mb-1">{v.label}</h4>
                    <p className="text-white/45 text-[13px] leading-relaxed font-sans">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: logo display */}
          <motion.div initial={{ opacity:0,scale:.9 }} animate={inView?{opacity:1,scale:1}:{}}
            transition={{ delay:.2,duration:1,ease:[.22,1,.36,1] }}
            className="flex items-center justify-center">
            <div className="relative w-[360px] h-[360px] flex items-center justify-center">
              {/* Outer slow ring */}
              <motion.div animate={{ rotate:360 }} transition={{ duration:40,repeat:Infinity,ease:"linear" }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ border:"1px dashed rgba(184,149,58,0.12)" }} />
              {/* Counter-rotating ring with dots */}
              <motion.div animate={{ rotate:-360 }} transition={{ duration:25,repeat:Infinity,ease:"linear" }}
                className="absolute rounded-full pointer-events-none"
                style={{ inset:30, border:"1px dashed rgba(184,149,58,0.22)" }} />
              {[0,72,144,216,288].map((deg) => (
                <motion.div key={deg} animate={{ rotate:-360 }} transition={{ duration:25,repeat:Infinity,ease:"linear" }}
                  className="absolute pointer-events-none" style={{ inset:30, transform:`rotate(${deg}deg)` }}>
                  <div className="absolute w-2 h-2 rounded-full bg-[#B8953A]"
                    style={{ top:-4, left:"50%", transform:"translateX(-50%)", opacity:.6 }} />
                </motion.div>
              ))}
              {/* Inner glow ring */}
              <div className="absolute rounded-full pointer-events-none"
                style={{ inset:60, border:"1px solid rgba(184,149,58,0.1)",
                  background:"radial-gradient(circle,rgba(184,149,58,0.05) 0%,transparent 70%)" }} />
              {/* Gold glow */}
              <div className="absolute z-0 rounded-full pointer-events-none"
                style={{ width:180,height:180,background:"rgba(184,149,58,0.12)",filter:"blur(32px)" }} />
              {/* Floating logo card */}
              <motion.div animate={{ y:[0,-10,0] }} transition={{ duration:5,repeat:Infinity,ease:"easeInOut" }}
                className="relative z-10 flex items-center justify-center rounded-2xl p-8"
                style={{ width:220,height:220,
                  background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.14)",
                  backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
                  boxShadow:"0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/pws-logo-dark.png" alt="Pacific World School Logo"
                  style={{ width:160,height:"auto",objectFit:"contain" }} />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default function AboutSchoolPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <HeroSection />

      {/* Mission & Vision */}
      <MissionVision />

      {/* Stats bar */}
      <StatsBar />

      {/* History timeline */}
      <HistorySection />

      {/* Campus features */}
      <CampusFeatures />

      {/* Emblem */}
      <EmblemSection />
    </PageLayout>
  );
}