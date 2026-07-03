"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const IMAGES = [
  "https://admin.pacificworldschool.com/storage/uploads/1778214560_4.jpg",
  "https://admin.pacificworldschool.com/storage/uploads/1778214377_3.jpg",
  "https://admin.pacificworldschool.com/storage/uploads/1778214112_2jpg.jpg",
  "https://admin.pacificworldschool.com/storage/uploads/1778213829_Untitled-1%20copy.jpg",
  "https://admin.pacificworldschool.com/storage/uploads/1777113690_Untitled-1%20copy.jpg",
  "https://admin.pacificworldschool.com/storage/uploads/1777113662_Aggregate.jpeg",
  "https://admin.pacificworldschool.com/storage/uploads/1777113267_ww.jpeg",
  "https://admin.pacificworldschool.com/storage/uploads/1761294287_4.jpeg",
  "https://admin.pacificworldschool.com/storage/uploads/1761294034_6.jpeg",
  "https://admin.pacificworldschool.com/storage/uploads/1761294020_5.jpeg",
  "https://admin.pacificworldschool.com/storage/uploads/1761293990_3.jpeg",
  "https://admin.pacificworldschool.com/storage/uploads/1761293824_1.jpeg",
  "https://admin.pacificworldschool.com/storage/uploads/1761293614_2.jpeg",
  "https://admin.pacificworldschool.com/storage/uploads/1747199303_1746677839_1740831281_Inspirational-Principal-of-the-Year-Award-2024.jpg",
  "https://admin.pacificworldschool.com/storage/uploads/1747199406_1745826333_4%20final.png",
  "https://admin.pacificworldschool.com/storage/uploads/1747199385_1745826363_5%20final.png",
];

const VISIBLE = 4;

export default function AchievementsMarquee() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = IMAGES.length;

  const next = useCallback(() => {
    setDir(1);
    setCurrent((p) => (p + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDir(-1);
    setCurrent((p) => (p - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [paused, next]);

  // 4 visible indices (circular)
  const visibleIdx = Array.from({ length: VISIBLE }, (_, k) => (current + k) % total);

  return (
    <section className="bg-[#FAFAF8] py-20" style={{ position: "relative" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">

        {/* ── Header ── */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-[#B8953A]" />
              <span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">
                Our Recognition
              </span>
            </div>
            <h2 className="font-display font-black text-[#0D2545] leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
              Our <em className="text-[#B8953A] not-italic">Achievements</em>
            </h2>
          </div>
          <Link href="/achievements"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#0D2545] text-white rounded-xl text-[13px] font-semibold font-sans hover:bg-[#1a3a6e] transition-colors">
            View All →
          </Link>
        </div>

        {/* ── Slider wrapper with side arrows ── */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* LEFT arrow — same style as screenshot */}
          <button
            onClick={() => { prev(); setPaused(true); setTimeout(() => setPaused(false), 4000); }}
            aria-label="Previous"
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-[#e8e4d9] flex items-center justify-center text-[#0D2545] hover:bg-[#0D2545] hover:text-white hover:border-[#0D2545] transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* RIGHT arrow */}
          <button
            onClick={() => { next(); setPaused(true); setTimeout(() => setPaused(false), 4000); }}
            aria-label="Next"
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-[#e8e4d9] flex items-center justify-center text-[#0D2545] hover:bg-[#0D2545] hover:text-white hover:border-[#0D2545] transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Images */}
          <div style={{ overflow: "hidden" }}>
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                variants={{
                  enter:  (d) => ({ opacity: 0, x: d > 0 ?  48 : -48 }),
                  center: ()  => ({ opacity: 1, x: 0 }),
                  exit:   (d) => ({ opacity: 0, x: d > 0 ? -48 :  48 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {visibleIdx.map((idx, pos) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: pos * 0.05, duration: 0.4 }}
                    className="group relative overflow-hidden rounded-2xl"
                    style={{
                      aspectRatio: "3/4",   /* portrait — matches achievement cards in screenshot */
                      background: "#f0ece4",
                      boxShadow: "0 4px 20px rgba(0,0,0,.10)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={IMAGES[idx]}
                      alt={`Achievement ${idx + 1}`}
                      loading="lazy"
                      className="group-hover:scale-105 transition-transform duration-700"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",       /* fills card like the screenshot */
                        objectPosition: "top",
                        display: "block",
                      }}
                    />
                    {/* Gold border glow on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ boxShadow: "inset 0 0 0 2px #B8953A" }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Dots ── */}
        <div className="flex justify-center gap-2 mt-7">
          {Array.from({ length: Math.ceil(total / VISIBLE) }).map((_, i) => {
            const groupStart = i * VISIBLE;
            const isActive = current >= groupStart && current < groupStart + VISIBLE;
            return (
              <button
                key={i}
                onClick={() => { setCurrent(groupStart); setPaused(true); setTimeout(() => setPaused(false), 4000); }}
                aria-label={`Group ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: isActive ? 24 : 8,
                  height: 8,
                  background: isActive ? "#B8953A" : "rgba(13,37,69,.18)",
                }}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
