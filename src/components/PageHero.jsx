"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PageHero({ title, subtitle, breadcrumb = [], bg = "#0D2545" }) {
  return (
    <section
      className="relative pt-36 pb-20 overflow-hidden"
      style={{ background: bg }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #B8953A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Gold line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B8953A] to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6 text-[12px] font-sans"
          >
            <Link href="/" className="text-white/40 hover:text-[#B8953A] transition-colors">Home</Link>
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-white/20">/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="text-white/40 hover:text-[#B8953A] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#B8953A]">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-white leading-[1.0]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="text-white/55 text-[17px] leading-relaxed font-sans mt-4 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
