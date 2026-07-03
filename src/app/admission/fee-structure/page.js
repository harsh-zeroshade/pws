"use client";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

export default function FeeStructurePage() {
  return (
    <PageLayout>
      <PageHero title="Fee Structure" subtitle="Transparent fee structure for Nursery to Class XII — CBSE & Cambridge streams."
        breadcrumb={[{ label:"Admission", href:"/admission/brochure" }, { label:"Fee Structure" }]} />
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:.9}}
            className="text-center py-20 rounded-3xl bg-[#F5F0E8] border border-[#e8e4d9] mb-12">
            <div className="text-5xl mb-6">💰</div>
            <h2 className="font-display font-black text-[#0D2545] text-3xl mb-4">Fee Structure 2026–27</h2>
            <p className="text-[#6b6b5a] text-[16px] max-w-xl mx-auto font-sans leading-[1.8] mb-8">
              Detailed fee structure is available upon request from our admissions office. Please contact us directly for the most current fee information including any applicable concessions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:8899117704" className="px-6 py-3 bg-[#0D2545] text-white font-bold rounded-xl text-[14px] font-sans hover:bg-[#1a3a6e] transition-colors">
                📞 Call 8899117704
              </a>
              <a href="mailto:info@pacificworldschool.com" className="px-6 py-3 bg-[#B8953A] text-white font-bold rounded-xl text-[14px] font-sans hover:bg-[#a07d2e] transition-colors">
                ✉️ Email Us
              </a>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { label:"CBSE Stream", streams:["Nursery – KG","Class I – V","Class VI – X","Class XI – XII"] },
              { label:"Cambridge Stream", streams:["Cambridge Primary","Cambridge Lower Secondary","Cambridge IGCSE","Cambridge A Level"] },
              { label:"Payment Modes", streams:["Quarterly in advance","Online payment available","Bank transfer accepted","Demand draft / Cheque"] },
            ].map((col,i) => (
              <motion.div key={col.label} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:i*.1,duration:.7}}
                className="p-8 rounded-3xl bg-[#FAFAF8] border border-[#e8e4d9]">
                <h3 className="font-display font-bold text-[#0D2545] text-xl mb-5">{col.label}</h3>
                <ul className="space-y-3">
                  {col.streams.map(s => (
                    <li key={s} className="flex items-center gap-3 text-[14px] text-[#5a5a4a] font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8953A] flex-shrink-0"/>{s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
