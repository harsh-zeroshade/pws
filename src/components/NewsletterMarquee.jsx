"use client";
import { useRef, useState } from "react";
import { useAnimationFrame } from "framer-motion";

const ITEMS = [
  "'Monde Du Pacifique' Newsletter Term-2 2025-26",
  "Newsletter Term II edition of L'ÉCHO DE PACIFIC (2025–26) Class CP2 to LS1",
];

const ALL = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

export default function NewsletterMarquee() {
  const [offset, setOffset] = useState(0);
  const paused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (paused.current) return;
    setOffset(prev => {
      const next = prev - (delta / 1000) * 40;
      const total = ITEMS.length * 600;
      return next <= -total ? 0 : next;
    });
  });

  return (
    <section className="bg-[#0D2545] py-4 overflow-hidden relative border-y border-[#B8953A]/20">
      {/* left/right fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0D2545] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0D2545] to-transparent z-10 pointer-events-none" />

      <div
        onMouseEnter={() => paused.current = true}
        onMouseLeave={() => paused.current = false}
        className="overflow-hidden"
      >
        <div
          className="flex items-center gap-0 will-change-transform"
          style={{ transform: `translateX(${offset}px)`, width: "max-content" }}
        >
          {ALL.map((text, i) => (
            <a
              key={i}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-2 text-white/90 hover:text-[#D4AF5A] transition-colors duration-300 font-sans text-sm md:text-base tracking-wide whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF5A] flex-shrink-0" />
              <span>{text}</span>
              <svg className="w-4 h-4 text-[#D4AF5A] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}