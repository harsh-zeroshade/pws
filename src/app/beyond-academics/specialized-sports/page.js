"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

const sports = [
  { icon:"🏏", name:"Cricket", desc:"Professional cricket coaching on a full-size cricket ground with certified BCCI coaches." },
  { icon:"⚽", name:"Football", desc:"FIFA-standard coaching for all age groups, regular inter-school tournaments and fixtures." },
  { icon:"🏊", name:"Swimming", desc:"Olympic-size swimming pool with certified swimming coaches for all levels." },
  { icon:"🏸", name:"Badminton", desc:"Indoor badminton courts with national-level coaching and competitive play." },
  { icon:"🏀", name:"Basketball", desc:"Full-size courts with professional coaching, inter-house and inter-school competitions." },
  { icon:"🎾", name:"Table Tennis", desc:"Professional tables with certified coaching program for all age groups." },
  { icon:"🤸", name:"Gymnastics", desc:"Professional gymnastics training with certified instructors and competition exposure." },
  { icon:"🏃", name:"Athletics", desc:"400m athletic track with professional coaching in sprints, hurdles, and field events." },
];

export default function SpecializedSportsPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-5%" });
  return (
    <PageLayout>
      <PageHero title="Specialized Sports" subtitle="World-class sports facilities and professional coaching for every student."
        breadcrumb={[{ label:"Beyond Academics", href:"/beyond-academics/specialized-sports" }, { label:"Specialized Sports" }]} />
      <section ref={ref} className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sports.map((s,i) => (
              <motion.div key={s.name}
                initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}}
                transition={{delay:i*.07,duration:.7,ease:[.22,1,.36,1]}}
                whileHover={{y:-8,scale:1.02}}
                className="group p-8 rounded-3xl bg-[#FAFAF8] border border-[#e8e4d9] hover:border-[#B8953A]/40 hover:shadow-xl transition-all text-center">
                <div className="text-5xl mb-5">{s.icon}</div>
                <h3 className="font-display font-black text-[#0D2545] text-xl mb-3 group-hover:text-[#B8953A] transition-colors">{s.name}</h3>
                <p className="text-[#6b6b5a] text-[13px] leading-relaxed font-sans">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
