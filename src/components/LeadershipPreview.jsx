"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

const leaders = [
  {
    name: "Mrs. Pooja Bose",
    role: "Principal",
    img: "https://admin.pacificworldschool.com/storage/uploads/1735626077_t1.png",
    color: "#0D2545",
    bio: "Mrs. Pooja Bose brings over two decades of educational leadership experience. As Principal of Pacific World School, she champions a holistic approach to education that balances academic rigour with character development, ensuring every student reaches their full potential in a nurturing environment.",
    education: "M.Ed., B.Ed., MA (English)",
    experience: "22+ years",
  },
  {
    name: "Mrs. Santosh Bansal",
    role: "Chairperson",
    img: "https://admin.pacificworldschool.com/storage/uploads/1738650887_t2.png",
    color: "#B8953A",
    bio: "Mrs. Santosh Bansal is the visionary Chairperson of Pacific World School. With her profound dedication to educational excellence, she has built an institution that seamlessly blends traditional values with modern pedagogy, creating a world-class learning environment for students.",
    education: "MA (Economics), B.Ed.",
    experience: "25+ years",
  },
  {
    name: "Mrs. Nidhi Bansal",
    role: "Pro Vice Chairperson",
    img: "https://admin.pacificworldschool.com/storage/uploads/1738650923_t3.png",
    color: "#1a3a6e",
    bio: "Mrs. Nidhi Bansal, as Pro Vice Chairperson, brings fresh perspectives and dynamic leadership to Pacific World School. Her commitment to innovation in education and student welfare has been instrumental in introducing contemporary programs and global collaborations.",
    education: "MBA, B.Com (Hons)",
    experience: "15+ years",
  },
];

export default function LeadershipPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [modalIdx, setModalIdx] = useState(null);

  return (
    <section ref={ref} className="bg-white py-28 relative">
      {/* Subtle background pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0D2545 1px,transparent 1px),linear-gradient(90deg,#0D2545 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="h-px w-12 bg-[#B8953A]" />
              <span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">
                Leadership
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black text-[#0D2545] leading-tight"
              style={{ fontSize: "clamp(2.2rem,4vw,3.5rem)" }}
            >
              Our <em className="text-[#B8953A] not-italic">Visionary</em> Team
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/about/leadership-team"
              className="inline-flex items-center gap-2 text-[#0D2545] font-semibold text-[14px] font-sans border-b-2 border-[#B8953A] pb-0.5 hover:text-[#B8953A] transition-colors"
            >
              View Our Team →
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {leaders.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.14, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              onClick={() => setModalIdx(i)}
              className="group rounded-3xl overflow-hidden border border-[#e8e4d9] hover:border-[#B8953A]/40 hover:shadow-xl hover:shadow-[#B8953A]/8 transition-all duration-400 cursor-pointer"
            >
              <div className="relative h-80 overflow-hidden bg-[#F5F0E8]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={l.img}
                  alt={l.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="h-[2px] w-10 mb-4" style={{ background: l.color }} />
                <h3 className="font-display font-bold text-[#0D2545] text-xl">{l.name}</h3>
                <p className="font-sans text-[13px] font-semibold uppercase tracking-wider mt-1" style={{ color: l.color }}>
                  {l.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
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
                {/* Image section — left */}
                <div
                  className="relative w-full md:w-[45%] flex-shrink-0 flex items-center justify-center"
                  style={{ minHeight: "300px", maxHeight: "60vh", background: "#F5F0E8" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={leaders[modalIdx].img}
                    alt={leaders[modalIdx].name}
                    className="w-full h-full object-contain p-4"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  {/* Close button */}
                  <button
                    onClick={() => setModalIdx(null)}
                    className="absolute top-4 right-4 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-105 z-10"
                    aria-label="Close"
                  >
                    <X className="w-4 h-5 md:w-5 md:h-5" />
                  </button>
                </div>

                {/* Content section — right */}
                <div className="flex-1 flex flex-col p-6 md:p-10 overflow-y-auto">
                  {/* Name and role */}
                  <div className="mb-6">
                    <div
                      style={{
                        height: 4,
                        width: 48,
                        borderRadius: 2,
                        background: leaders[modalIdx].color,
                        marginBottom: 20,
                      }}
                    />
                    <h2
                      className="font-display font-black"
                      style={{
                        color: "#0D2545",
                        fontSize: "clamp(1.5rem, 2.8vw, 2rem)",
                        lineHeight: 1.2,
                        marginBottom: 4,
                      }}
                    >
                      {leaders[modalIdx].name}
                    </h2>
                    <p
                      className="font-sans font-semibold uppercase tracking-wider text-sm"
                      style={{ color: leaders[modalIdx].color }}
                    >
                      {leaders[modalIdx].role}
                    </p>
                  </div>

                  {/* Info chips */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium font-sans"
                      style={{
                        background: `${leaders[modalIdx].color}12`,
                        color: leaders[modalIdx].color,
                      }}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1v4M8 5l2 2M8 5L6 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="8" cy="10" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                      {leaders[modalIdx].experience} experience
                    </div>
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium font-sans"
                      style={{
                        background: `${leaders[modalIdx].color}12`,
                        color: leaders[modalIdx].color,
                      }}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                        <path d="M2 12l4-4M6 8l4-4M6 8L2 4M6 8l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M10 4h4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {leaders[modalIdx].education}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="flex-1">
                    <p
                      style={{
                        color: "#4a4a3a",
                        fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
                        lineHeight: 1.85,
                        fontFamily: "var(--font-dm-sans),system-ui,sans-serif",
                      }}
                    >
                      {leaders[modalIdx].bio}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="flex items-center justify-end gap-4 mt-6 pt-6 border-t border-[#f0ece4]">
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