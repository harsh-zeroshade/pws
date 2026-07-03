"use client";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

const houses = [
  { name:"Agni House", color:"#DC2626", icon:"🔥", value:"Courage", desc:"Agni — the fire that ignites courage, passion, and the determination to achieve greatness." },
  { name:"Vayu House", color:"#2563EB", icon:"💨", value:"Freedom", desc:"Vayu — the wind that symbolises freedom of thought, adaptability, and boundless potential." },
  { name:"Jal House", color:"#0891B2", icon:"💧", value:"Wisdom", desc:"Jal — water that represents wisdom, flow, resilience, and the ability to overcome every obstacle." },
  { name:"Prithvi House", color:"#16A34A", icon:"🌍", value:"Strength", desc:"Prithvi — the earth representing strength, stability, nurturing, and grounded determination." },
];

export default function HousesPage() {
  return (
    <PageLayout>
      <PageHero title="House System" subtitle="Four houses, one school — fostering team spirit, leadership, and friendly competition."
        breadcrumb={[{ label:"Beyond Academics", href:"/beyond-academics/specialized-sports" }, { label:"Houses" }]} />
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}
            className="text-[#5a5a4a] text-[17px] leading-[1.9] font-sans max-w-3xl mb-16">
            The House System at Pacific World School is designed to foster a sense of belonging, healthy competition, and team spirit. Every student is assigned to a house upon joining, creating a school-within-a-school community across all age groups.
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {houses.map((h,i) => (
              <motion.div key={h.name}
                initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:i*.12,duration:.8,ease:[.22,1,.36,1]}}
                whileHover={{y:-8}}
                className="group rounded-3xl overflow-hidden border-2 transition-all hover:shadow-2xl"
                style={{ borderColor:`${h.color}30` }}
              >
                <div className="h-32 flex items-center justify-center text-7xl" style={{ background:`${h.color}15` }}>
                  {h.icon}
                </div>
                <div className="p-6">
                  <div className="w-8 h-1 rounded-full mb-4" style={{ background: h.color }} />
                  <h3 className="font-display font-black text-[#0D2545] text-2xl mb-1">{h.name}</h3>
                  <p className="text-[12px] font-semibold uppercase tracking-wider mb-3 font-sans" style={{ color: h.color }}>{h.value}</p>
                  <p className="text-[#6b6b5a] text-[14px] leading-relaxed font-sans">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
