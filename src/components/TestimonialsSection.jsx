"use client";

import { useRef, useState } from "react";
import { motion, useInView, useAnimationFrame } from "framer-motion";

const testimonials = [
  { name: "Rabab Mehdi", child: "Class I-H", text: "Our experience at Pacific World School has been exceptional. Teachers are truly invested in each child's growth — it is simply the best school in the region.", rating: 5, initials: "RM", color: "#0D2545" },
  { name: "Rashmi Vidyarthi", child: "Parent · Grade 1A", text: "Enrolling our child at PWS has been one of the most rewarding decisions we made as parents. The values, academics, and atmosphere are simply unmatched.", rating: 5, initials: "RV", color: "#B8953A" },
  { name: "Vinay Chawla", child: "Parent · LKG Dove", text: "Pacific World School has truly exceeded my expectations in every way. The school embraces the latest teaching methods and the teachers are deeply passionate.", rating: 5, initials: "VC", color: "#1a3a6e" },
  { name: "Arush Anand", child: "LKG Parrot", text: "I am incredibly satisfied with the quality of education and the nurturing environment here. My child has blossomed beautifully in every possible way.", rating: 5, initials: "AA", color: "#3d2a6e" },
  { name: "Tiirth Sharma", child: "LKG Dove", text: "We express our heartfelt gratitude to the entire Pacific World School Team for their dedication in shaping young minds through truly meaningful learning.", rating: 5, initials: "TS", color: "#2a4a3e" },
  { name: "Ersheen Walia", child: "Class VII-C", text: "My child has gained so much confidence and growth over the past year. The school's focus on academics and character development has been truly transformative.", rating: 5, initials: "EW", color: "#5a2a3e" },
];

const all = [...testimonials, ...testimonials];

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [offset, setOffset] = useState(0);
  const paused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (paused.current) return;
    setOffset((prev) => {
      const next = prev - (delta / 1000) * 38;
      const cardW = 360 + 24;
      const totalW = testimonials.length * cardW;
      return Math.abs(next) >= totalW ? 0 : next;
    });
  });

  return (
    <section ref={sectionRef} className="relative bg-[#FAFAF8] py-32 overflow-hidden">
      {/* Fade masks — need relative on parent to work */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FAFAF8] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FAFAF8] to-transparent z-10 pointer-events-none" />

      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16 mb-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="inline-flex items-center gap-4 mb-8"
          >
            <div className="h-px w-14 bg-[#B8953A]" />
            <span className="text-[#B8953A] text-[11px] font-semibold tracking-[0.3em] uppercase font-sans">
              Parent Voices
            </span>
            <div className="h-px w-14 bg-[#B8953A]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-[#0D2545] leading-[1.05]"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 4rem)" }}
          >
            What Families{" "}
            <em className="text-[#B8953A] not-italic font-black">Are Saying</em>
          </motion.h2>
        </div>
      </div>

      {/* Marquee */}
      <div
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        className="overflow-hidden"
      >
        <div
          className="flex gap-6 will-change-transform"
          style={{ transform: `translateX(${offset}px)`, width: "max-content" }}
        >
          {all.map((t, i) => (
            <div
              key={i}
              className="w-80 flex-shrink-0 p-8 rounded-3xl bg-white border border-[#e8e4d9] hover:border-[#B8953A]/30 hover:shadow-lg hover:shadow-[#B8953A]/6 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <span key={s} className="text-[#B8953A] text-sm">★</span>
                ))}
              </div>

              <p className="text-[#5a5a4a] text-[14px] leading-[1.8] mb-6 font-sans italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-display font-bold text-sm shadow-sm flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-display font-bold text-[#0D2545] text-sm">{t.name}</p>
                  <p className="text-[#9a9a8a] text-[11px] font-sans">{t.child}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
