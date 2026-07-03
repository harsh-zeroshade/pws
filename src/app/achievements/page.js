"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

const awards = [
  { img:"https://admin.pacificworldschool.com/storage/uploads/1747199303_1746677839_1740831281_Inspirational-Principal-of-the-Year-Award-2024.jpg", title:"Inspirational Principal of the Year Award 2024" },
  { img:"https://admin.pacificworldschool.com/storage/uploads/1778214560_4.jpg",  title:"National Achievement Award" },
  { img:"https://admin.pacificworldschool.com/storage/uploads/1778214377_3.jpg",  title:"Excellence in Education" },
  { img:"https://admin.pacificworldschool.com/storage/uploads/1778214112_2jpg.jpg", title:"Best School Award" },
  { img:"https://admin.pacificworldschool.com/storage/uploads/1777113662_Aggregate.jpeg", title:"Academic Excellence" },
  { img:"https://admin.pacificworldschool.com/storage/uploads/1777113267_ww.jpeg", title:"Outstanding Achievement" },
  { img:"https://admin.pacificworldschool.com/storage/uploads/1761294287_4.jpeg",  title:"Student Achievement Award" },
  { img:"https://admin.pacificworldschool.com/storage/uploads/1761294034_6.jpeg",  title:"Sports Excellence" },
  { img:"https://admin.pacificworldschool.com/storage/uploads/1761294020_5.jpeg",  title:"Cultural Award" },
  { img:"https://admin.pacificworldschool.com/storage/uploads/1761293990_3.jpeg",  title:"Community Service Award" },
  { img:"https://admin.pacificworldschool.com/storage/uploads/1747199406_1745826333_4%20final.png", title:"Innovation Award" },
  { img:"https://admin.pacificworldschool.com/storage/uploads/1747199385_1745826363_5%20final.png", title:"Science Olympiad Winners" },
];

const stats = [
  { val:"50+",  label:"Awards Won" },
  { val:"100%", label:"Board Results" },
  { val:"15+",  label:"Years of Excellence" },
  { val:"3500+",label:"Happy Students" },
];

export default function AchievementsPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <PageLayout>
      <PageHero
        title="Awards & Achievements"
        subtitle="Celebrating excellence — a legacy of recognition across academics, sports, and the arts."
        breadcrumb={[{ label: "Achievements" }]}
      />

      {/* Stats */}
      <section className="bg-[#0D2545] py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="text-center p-8 rounded-3xl border border-white/10 hover:border-[#B8953A]/40 transition-colors"
              >
                <div className="font-display font-black text-[#D4AF5A] text-4xl mb-2">{s.val}</div>
                <div className="text-white/40 text-[11px] uppercase tracking-widest font-sans">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section ref={ref} className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px w-12 bg-[#B8953A]" />
            <span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">Our Trophy Cabinet</span>
          </div>
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            {awards.map((a, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
                className="break-inside-avoid rounded-2xl overflow-hidden border border-[#e8e4d9] hover:shadow-xl hover:border-[#B8953A]/30 transition-all group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.img} alt={a.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="px-4 py-3 bg-white">
                  <p className="text-[#0D2545] text-[12px] font-semibold font-sans leading-snug">{a.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
