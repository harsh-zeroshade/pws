"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePublicContent } from "@/hooks/useContent";

const LOGO_LIGHT = "/pws-logo.png";
const LOGO_DARK  = "/pws-logo.png";

const words = ["Excellence", "Curiosity", "Leadership", "Innovation", "Character"];

function AnimatedWord({ words, idx }) {
  return (
    <div className="relative h-6 overflow-hidden inline-block w-32">
      {words.map((word, i) => (
        <motion.span
          key={word}
          initial={{ y: 28, opacity: 0 }}
          animate={
            i === idx
              ? { y: 0, opacity: 1 }
              : i === (idx - 1 + words.length) % words.length
              ? { y: -28, opacity: 0 }
              : { y: 28, opacity: 0 }
          }
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 text-[#D4AF5A] text-[11px] font-bold tracking-[0.3em] uppercase font-sans whitespace-nowrap"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const containerRef = useRef(null);
  const [wordIdx, setWordIdx] = useState(0);

  // Dynamic content from CMS
  const cms = usePublicContent("home", "hero", {
    title: "Shaping\nRemarkable\nFutures",
    subtitle: "Greater Noida West",
    cta1Text: "Apply for 2026–27",
    cta2Text: "Explore School",
    videoUrl: "/hero-video.mp4",
  });

  // Dynamic stats
  const statsCms = usePublicContent("home", "stats", {
    stats: [
      { value: "10+",    label: "Acre Campus" },
      { value: "250+",   label: "Faculty" },
      { value: "15 yrs", label: "Excellence" },
      { value: "100%",   label: "CBSE Results" },
    ],
  });

  useEffect(() => {
    const t = setInterval(() => setWordIdx(p => (p + 1) % words.length), 2500);
    return () => clearInterval(t);
  }, []);

  // Static hero presentation without scroll-based animation
  const videoScale = 1;
  const overlayOp = 0.55;
  const textY = "0%";
  const textOpacity = 1;

  return (
    <div ref={containerRef} className="relative -mt-[70px] pt-[70px]" style={{ height: "280vh", background: "#060F1E" }}>
      <div
        className="sticky top-0 h-screen"
        /*
         * KEY FIX: do NOT use overflow-hidden here — that clips the scaled video
         * and causes the white edges. Instead use a solid bg-[#060F1E] that
         * fills any gap if the video slightly underflows.
         */
        style={{ background: "#060F1E" }}
      >
        {/* ── Looping video (no overflow-hidden = no white fog) ── */}
        <motion.div
          style={{ scale: videoScale }}
          className="absolute inset-0 origin-center"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src={cms.videoUrl || "/hero-video.mp4"}
          />
        </motion.div>

        {/* ── Gradient overlay ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: overlayOp,
            background:
              "linear-gradient(to bottom, rgba(6,15,30,0.55) 0%, rgba(13,37,69,0.25) 40%, rgba(6,15,30,0.88) 100%)",
          }}
        />

        {/* ── Radial vignette ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(6,15,30,0.7) 100%)",
          }}
        />

        {/* ── Content ── */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
        >
          {/* Logo — use white/dark version on dark background */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            {/* Dark logo: 278×120 → ratio 2.317 : 1, display at 52px tall = 120px wide */}
            <Image
              src={LOGO_DARK}
              alt="Pacific World School"
              width={120}
              height={52}
              className="object-contain mx-auto mb-5"
              priority
            />
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-[#B8953A]/50" />
              <span className="text-[#D4AF5A] text-[10px] tracking-[0.45em] uppercase font-sans">
                {cms.subtitle || "Greater Noida West"}
              </span>
              <div className="h-px w-10 bg-[#B8953A]/50" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-white leading-[0.92] tracking-tight mb-6"
            style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
          >
            {(cms.title || "Shaping\nRemarkable\nFutures").split("\n").map((line, i, arr) => (
              <span key={i}>
                {i === 1 ? (
                  <em className="bg-gradient-to-r from-[#D4AF5A] via-[#f0d080] to-[#B8953A] bg-clip-text text-transparent not-italic">
                    {line}
                  </em>
                ) : line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </motion.h1>

          {/* Rotating word */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="text-white/40 text-[10px] tracking-[0.25em] uppercase font-sans">
              Built on
            </span>
            <AnimatedWord words={words} idx={wordIdx} />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          >
            <motion.a
              href="#admissions"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(184,149,58,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-[#B8953A] text-white font-semibold rounded-2xl text-[15px] shadow-xl shadow-[#B8953A]/30 font-sans"
            >
              {cms.cta1Text || "Apply for 2026–27"}
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-2xl text-[15px] border border-white/25 hover:bg-white/20 transition-colors font-sans"
            >
              {cms.cta2Text || "Explore School"}
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/25 text-[9px] tracking-[0.4em] uppercase font-sans">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
            />
          </motion.div>
        </motion.div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9 }}
          className="absolute bottom-0 left-0 right-0 z-20"
        >
          <div
            className="border-t border-white/10"
            style={{ background: "rgba(6,15,30,0.75)", backdropFilter: "blur(12px)" }}
          >
            <div className="max-w-5xl mx-auto px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 divide-x divide-white/10">
              {(statsCms.stats || []).map((s) => (
                <div key={s.label} className="flex flex-col items-center text-center px-2">
                  <span className="text-white font-display font-bold text-xl sm:text-2xl">{s.value}</span>
                  <span className="text-white/35 text-[9px] uppercase tracking-widest mt-1 font-sans">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Export logos for use in Navbar / Footer
export { LOGO_LIGHT, LOGO_DARK };
