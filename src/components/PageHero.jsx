"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PageHero({ title, subtitle, breadcrumb = [], bg = "#0D2545" }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: bg, paddingTop: "clamp(80px, 15vw, 144px)", paddingBottom: "clamp(40px, 8vw, 80px)" }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage:"radial-gradient(circle, #B8953A 1px, transparent 1px)", backgroundSize:"40px 40px" }} />
      {/* Gold line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B8953A] to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <motion.nav initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:.5 }}
            className="flex items-center flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6 text-[11px] sm:text-[12px] font-sans">
            <Link href="/" className="text-white/40 hover:text-[#B8953A] transition-colors">Home</Link>
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-white/20">/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="text-white/40 hover:text-[#B8953A] transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-[#B8953A]">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Title */}
        <motion.h1 initial={{ opacity:0,y:40 }} animate={{ opacity:1,y:0 }} transition={{ delay:.1,duration:.9,ease:[.22,1,.36,1] }}
          className="font-display font-black text-white leading-[1.05]"
          style={{ fontSize:"clamp(1.9rem,6vw,5rem)" }}>
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:.25,duration:.8 }}
            className="text-white/55 text-[14px] sm:text-[17px] leading-relaxed font-sans mt-3 sm:mt-4 max-w-2xl">
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
