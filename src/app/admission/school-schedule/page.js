"use client";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

const schedules = [
  { class:"Pre-Primary (Nursery–UKG)", time:"8:00 AM – 12:30 PM", days:"Monday – Saturday" },
  { class:"Primary (Class I–V)", time:"7:40 AM – 2:20 PM", days:"Monday – Saturday" },
  { class:"Middle School (Class VI–VIII)", time:"7:30 AM – 2:30 PM", days:"Monday – Saturday" },
  { class:"Secondary (Class IX–X)", time:"7:30 AM – 3:00 PM", days:"Monday – Saturday" },
  { class:"Senior Secondary (Class XI–XII)", time:"7:30 AM – 3:00 PM", days:"Monday – Saturday" },
];

export default function SchoolSchedulePage() {
  return (
    <PageLayout>
      <PageHero title="School Schedule" subtitle="Daily school timings for all classes — structure built for optimal learning."
        breadcrumb={[{ label:"Admission", href:"/admission/brochure" }, { label:"School Schedule" }]} />
      <section className="bg-white py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="space-y-4">
            {schedules.map((s,i) => (
              <motion.div key={s.class}
                initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:i*.1,duration:.7}}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-7 rounded-3xl bg-[#FAFAF8] border border-[#e8e4d9] hover:border-[#B8953A]/40 hover:shadow-lg transition-all">
                <div>
                  <h3 className="font-display font-black text-[#0D2545] text-lg">{s.class}</h3>
                  <p className="text-[#9a9a8a] text-[12px] font-sans">{s.days}</p>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D2545] text-white rounded-xl text-[14px] font-semibold font-sans">
                  🕒 {s.time}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.7}} className="mt-10 p-6 rounded-2xl bg-[#F5F0E8] border border-[#e8e4d9]">
            <p className="text-[#6b6b5a] text-[14px] font-sans leading-relaxed">
              <strong className="text-[#0D2545]">Note:</strong> School timings may be subject to change during examination periods, special events, or due to administrative requirements. Updated schedules are communicated via the CampusCare app.
            </p>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
