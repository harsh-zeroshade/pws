"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { HoverExpand_001 } from "@/components/ui/skiper-ui/skiper52";

const galleryImages = [
  { src:"https://admin.pacificworldschool.com/storage/uploads/1735625871_5.png",  alt:"Campus Building", code:"01" },
  { src:"https://admin.pacificworldschool.com/storage/uploads/1735625881_6.png",  alt:"School Grounds",  code:"02" },
  { src:"https://admin.pacificworldschool.com/storage/uploads/1744786870_1.png",  alt:"Student Events",  code:"03" },
  { src:"https://admin.pacificworldschool.com/storage/uploads/1748690409_com.png",alt:"Community",       code:"04" },
  { src:"https://admin.pacificworldschool.com/storage/uploads/1735625840_2.png",  alt:"Sports",          code:"05" },
  { src:"https://admin.pacificworldschool.com/storage/uploads/1744786759_3.png",  alt:"Activities",      code:"06" },
  { src:"https://admin.pacificworldschool.com/storage/uploads/1735625860_4.png",  alt:"Classrooms",      code:"07" },
];

const achievementImages = [
  "https://admin.pacificworldschool.com/storage/uploads/1778214560_4.jpg",
  "https://admin.pacificworldschool.com/storage/uploads/1778214377_3.jpg",
  "https://admin.pacificworldschool.com/storage/uploads/1778214112_2jpg.jpg",
  "https://admin.pacificworldschool.com/storage/uploads/1777113662_Aggregate.jpeg",
  "https://admin.pacificworldschool.com/storage/uploads/1761294287_4.jpeg",
  "https://admin.pacificworldschool.com/storage/uploads/1761294034_6.jpeg",
  "https://admin.pacificworldschool.com/storage/uploads/1747199303_1746677839_1740831281_Inspirational-Principal-of-the-Year-Award-2024.jpg",
];

export default function GalleryPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-5%" });
  return (
    <PageLayout>
      <PageHero title="Gallery" subtitle="A visual journey through life at Pacific World School."
        breadcrumb={[{ label:"Gallery" }]} />

      {/* Campus gallery — HoverExpand */}
      <section className="bg-[#F5F0E8] py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-10">
          <div className="flex items-center gap-4 mb-2"><div className="h-px w-12 bg-[#B8953A]"/>
            <span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">Campus Gallery</span>
          </div>
          <h2 className="font-display font-black text-[#0D2545] text-3xl">Hover to Explore</h2>
        </div>
        <HoverExpand_001 images={galleryImages} />
      </section>

      {/* Achievements grid */}
      <section ref={ref} className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="flex items-center gap-4 mb-10"><div className="h-px w-12 bg-[#B8953A]"/>
            <span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">Achievements Gallery</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {achievementImages.map((src,i) => (
              <motion.div key={i}
                initial={{opacity:0,scale:.9}} animate={inView?{opacity:1,scale:1}:{}}
                transition={{delay:i*.07,duration:.6}} whileHover={{scale:1.04}}
                className="rounded-2xl overflow-hidden border border-[#e8e4d9] hover:shadow-xl transition-all">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Achievement ${i+1}`} className="w-full h-48 object-cover" />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="https://www.youtube.com/@PacificWorldSchool" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0D2545] text-white font-bold rounded-2xl text-[15px] font-sans hover:bg-[#1a3a6e] transition-colors">
              ▶ Explore Video Gallery on YouTube
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
