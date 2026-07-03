"use client";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

export default function TopperDetailsPage() {
  return (
    <PageLayout>
      <PageHero title="Topper Details" subtitle="Celebrating academic excellence — our star performers across all grades."
        breadcrumb={[{ label:"Academics", href:"/academics/cbse" }, { label:"Topper Details" }]} />
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:.9}}
            className="text-center py-20 rounded-3xl bg-[#F5F0E8] border border-[#e8e4d9]">
            <div className="text-6xl mb-6">🏆</div>
            <h2 className="font-display font-black text-[#0D2545] text-3xl mb-4">Topper Achievements</h2>
            <p className="text-[#6b6b5a] text-[16px] max-w-xl mx-auto font-sans leading-[1.8]">
              Pacific World School consistently achieves 100% results in CBSE Board examinations. Detailed topper information for the current academic session will be updated here after results are declared.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {[{val:"100%",label:"CBSE Pass Rate"},{val:"Top 5%",label:"National Ranking"},{val:"50+",label:"Distinctions"},{val:"15+",label:"State Toppers"}].map(s => (
                <div key={s.label} className="p-6 rounded-2xl bg-white border border-[#e8e4d9] min-w-[140px]">
                  <div className="font-display font-black text-[#0D2545] text-3xl">{s.val}</div>
                  <div className="text-[#9a9a8a] text-[11px] uppercase tracking-wider mt-1 font-sans">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
