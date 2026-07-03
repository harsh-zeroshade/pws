"use client";
import { useRef, useState } from "react";
import { useAnimationFrame } from "framer-motion";
import { usePublicContent } from "@/hooks/useContent";

const DEFAULT_LOGOS = [
  "https://admin.pacificworldschool.com/storage/uploads/1735625840_2.png",
  "https://admin.pacificworldschool.com/storage/uploads/1744786759_3.png",
  "https://admin.pacificworldschool.com/storage/uploads/1735625860_4.png",
  "https://admin.pacificworldschool.com/storage/uploads/1735625871_5.png",
  "https://admin.pacificworldschool.com/storage/uploads/1735625881_6.png",
  "https://admin.pacificworldschool.com/storage/uploads/1744786870_1.png",
  "https://admin.pacificworldschool.com/storage/uploads/1748690409_com.png",
];

const CARD_W = 200;
const GAP = 32;
const STEP = CARD_W + GAP;

export default function PartnersMarquee() {
  const data = usePublicContent("home", "partners", { logos: DEFAULT_LOGOS });
  const images = data.logos && data.logos.length > 0 ? data.logos : DEFAULT_LOGOS;
  const loopW = images.length * STEP;
  const all = [...images, ...images, ...images];

  return (
    <section className="py-10 bg-white border-t border-b border-[#e8e4d9] overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      <Track all={all} loopW={loopW} images={images} />
    </section>
  );
}

function Track({ all, loopW, images }) {
  const [offset, setOffset] = useState(0);
  const paused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (paused.current) return;
    setOffset((prev) => {
      const next = prev - (delta / 1000) * 55;
      return next <= -loopW ? next + loopW : next;
    });
  });

  return (
    <div onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)} className="overflow-hidden">
      <div className="flex items-center will-change-transform" style={{ transform: `translateX(${offset}px)`, width: "max-content", gap: `${GAP}px` }}>
        {all.map((src, i) => (
          <div key={i} className="flex-shrink-0 flex items-center justify-center bg-white border border-[#e8e4d9] rounded-2xl hover:border-[#B8953A]/50 hover:shadow-md transition-all duration-300" style={{ width: `${CARD_W}px`, height: "90px", padding: "12px 16px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`Partner ${(i % images.length) + 1}`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
