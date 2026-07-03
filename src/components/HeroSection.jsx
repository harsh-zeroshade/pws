"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePublicContent } from "@/hooks/useContent";

export const LOGO_LIGHT = "/pws-logo.png";
export const LOGO_DARK  = "/pws-logo.png";

const PILLARS = ["Excellence", "Empathy", "Empowerment", "Innovation", "Character"];

const STATS = [
  { value: "10+",  label: "Acre Campus",       icon: "🏫" },
  { value: "250+", label: "Expert Faculty",    icon: "👩‍🏫" },
  { value: "100%", label: "Board Pass Rate",   icon: "🏆" },
  { value: "2",    label: "Curricula (CBSE + Cambridge)", icon: "📚" },
];

export default function HeroSection() {
  const [pillarIdx, setPillarIdx] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const cms = usePublicContent("home", "hero", {
    title: "Shaping Remarkable Futures",
    subtitle: "Greater Noida West",
    cta1Text: "Apply for 2026–27",
    cta2Text: "Explore School",
    videoUrl: "/hero-video.mp4",
  });

  const statsCms = usePublicContent("home", "stats", { stats: STATS });

  useEffect(() => {
    const t = setInterval(() => setPillarIdx(p => (p + 1) % PILLARS.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative -mt-[70px]" style={{ background: "#060F1E" }}>
      {/* ── Full-screen video section ── */}
      <div className="relative h-screen min-h-[600px] overflow-hidden">

        {/* Video */}
        <video
          autoPlay loop muted playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transition: "opacity 1s", opacity: videoLoaded ? 1 : 0 }}
          src={cms.videoUrl || "/hero-video.mp4"}
        />

        {/* Poster fallback */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-[#060F1E]" />
        )}

        {/* Layered gradients */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,15,30,0.65) 0%, rgba(6,15,30,0.2) 45%, rgba(6,15,30,0.92) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 35%, rgba(6,15,30,0.6) 100%)" }} />

        {/* ── Main content ── */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 sm:mb-7"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(184,149,58,0.35)", backdropFilter: "blur(12px)" }}>
              <Image src={LOGO_DARK} alt="PWS" width={28} height={28} className="object-contain" priority />
              <span className="text-[#D4AF5A] text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase font-sans">
                {cms.subtitle || "Greater Noida West"}
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-white leading-[1.0] tracking-tight mb-4 sm:mb-5"
            style={{ fontSize: "clamp(2.4rem, 8vw, 7rem)", maxWidth: "16ch" }}
          >
            {(cms.title || "Shaping Remarkable Futures").split(" ").map((word, i, arr) => {
              const mid = Math.floor(arr.length / 2);
              return (
                <span key={i} style={{ display: "inline" }}>
                  {i === mid ? (
                    <em className="not-italic" style={{ background: "linear-gradient(135deg, #D4AF5A, #f0d080, #B8953A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      {word}
                    </em>
                  ) : word}
                  {i < arr.length - 1 ? " " : ""}
                </span>
              );
            })}
          </motion.h1>

          {/* Rotating pillars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-2 sm:gap-3 mb-7 sm:mb-9"
          >
            <span className="text-white/35 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-sans">Built on</span>
            <div className="relative h-5 overflow-hidden" style={{ minWidth: 110 }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={pillarIdx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 text-[#D4AF5A] text-[11px] sm:text-[12px] font-bold tracking-[0.25em] uppercase font-sans text-center"
                >
                  {PILLARS[pillarIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="flex flex-col xs:flex-row gap-3 justify-center items-center w-full max-w-sm sm:max-w-none"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full xs:w-auto">
              <Link href="/admission/brochure"
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-[14px] sm:text-[15px] font-sans w-full xs:w-auto"
                style={{ background: "linear-gradient(135deg, #B8953A, #D4AF5A)", color: "#fff", boxShadow: "0 8px 32px rgba(184,149,58,0.4)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                {cms.cta1Text || "Apply for 2026–27"}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full xs:w-auto">
              <Link href="/about/school"
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-semibold text-[14px] sm:text-[15px] font-sans w-full xs:w-auto transition-colors"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                {cms.cta2Text || "Explore School"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          >
            <span className="text-white/20 text-[8px] tracking-[0.45em] uppercase font-sans">Scroll</span>
            <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-px h-8 sm:h-10" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
          </motion.div>
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 z-20"
        >
          <div style={{ background: "rgba(6,15,30,0.82)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(184,149,58,0.15)" }}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 grid grid-cols-2 sm:grid-cols-4">
              {(statsCms.stats?.length ? statsCms.stats : STATS).map((s, i) => (
                <div key={s.label ?? i}
                  className="flex flex-col items-center justify-center text-center py-1 sm:py-0"
                  style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <span className="text-white font-display font-bold leading-tight"
                    style={{ fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)" }}>
                    {s.value}
                  </span>
                  <span className="text-white/35 text-[8px] sm:text-[9px] uppercase tracking-widest mt-0.5 font-sans leading-tight px-1">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Accolades strip — below the fold ── */}
      <div style={{ background: "linear-gradient(to bottom, #060F1E, #0D2545)" }} className="py-10 sm:py-14">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="text-center sm:text-left">
              <p className="text-[#B8953A] text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase font-sans mb-2">Recognised Excellence</p>
              <p className="font-display font-black text-white" style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)" }}>
                Greater Noida&apos;s Premier School
              </p>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6">
              {[
                { label: "CBSE", code: "2133246", tag: "Affiliation" },
                { label: "Cambridge", code: "IA380", tag: "Centre" },
                { label: "School Code", code: "61276", tag: "CBSE" },
              ].map(item => (
                <div key={item.label} className="flex flex-col items-center gap-0.5 px-4 sm:px-5 py-2.5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="text-[#D4AF5A] font-display font-black text-base sm:text-lg leading-none">{item.code}</span>
                  <span className="text-white/35 text-[9px] uppercase tracking-widest font-sans">{item.tag} · {item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
