"use client";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

const trips = [
  { type:"Educational Tours", icon:"🏛️", desc:"Visits to historical monuments, science museums, and cultural sites that bring classroom learning to life." },
  { type:"Nature Camps", icon:"🌿", desc:"Immersive experiences in nature reserves and eco-parks, fostering environmental awareness and outdoor skills." },
  { type:"International Exchange", icon:"✈️", desc:"Exchange programs with international partner schools, broadening global perspectives and cultural understanding." },
  { type:"Adventure Trips", icon:"🏔️", desc:"Trekking, camping, and adventure activities that build resilience, teamwork, and leadership skills." },
  { type:"Heritage Walks", icon:"🗺️", desc:"Curated walks through historical areas connecting students with India's rich cultural and architectural heritage." },
  { type:"Industry Visits", icon:"🏭", desc:"Visits to leading industries and organisations giving students real-world exposure to various career paths." },
];

export default function TripsPage() {
  return (
    <PageLayout>
      <PageHero title="Trips & Excursions" subtitle="Learning beyond the classroom — enriching experiences that shape global citizens."
        breadcrumb={[{ label:"Beyond Academics", href:"/beyond-academics/specialized-sports" }, { label:"Trips & Excursions" }]} />
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((t,i) => (
              <motion.div key={t.type}
                initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:i*.08,duration:.7}}
                whileHover={{y:-6}}
                className="group p-8 rounded-3xl bg-[#FAFAF8] border border-[#e8e4d9] hover:border-[#B8953A]/40 hover:shadow-xl transition-all">
                <div className="text-4xl mb-5">{t.icon}</div>
                <h3 className="font-display font-black text-[#0D2545] text-xl mb-3 group-hover:text-[#B8953A] transition-colors">{t.type}</h3>
                <p className="text-[#6b6b5a] text-[14px] leading-relaxed font-sans">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
