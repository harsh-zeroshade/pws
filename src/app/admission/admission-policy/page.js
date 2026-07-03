"use client";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

const policies = [
  { title:"Age Criteria", desc:"Nursery: 3+ years, LKG: 4+ years, UKG: 5+ years, Class I: 6+ years as on 31st March of the academic year." },
  { title:"Documentation Required", desc:"Birth certificate, previous school transfer certificate, last two years mark sheets, passport-size photographs, Aadhar card of student and parents." },
  { title:"Admission Process", desc:"Admission is based on merit and availability of seats. An interaction session is conducted for the child and parents to ensure the right fit." },
  { title:"Reservation Policy", desc:"Admissions follow applicable government guidelines and school policies for reservation categories." },
  { title:"Mid-Session Admission", desc:"Mid-session admission may be considered subject to seat availability and submission of required documents including TC from previous school." },
  { title:"Fee Payment", desc:"Fee is payable quarterly in advance. The fee structure is available on the school website. Admission is confirmed only after fee payment." },
];

export default function AdmissionPolicyPage() {
  return (
    <PageLayout>
      <PageHero title="Admission Policy" subtitle="Transparent, fair and straightforward admission guidelines for all families."
        breadcrumb={[{ label:"Admission", href:"/admission/brochure" }, { label:"Admission Policy" }]} />
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid md:grid-cols-2 gap-8">
            {policies.map((p,i) => (
              <motion.div key={p.title}
                initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:i*.08,duration:.7}}
                className="p-8 rounded-3xl bg-[#FAFAF8] border border-[#e8e4d9] hover:border-[#B8953A]/30 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-[#0D2545] text-white flex items-center justify-center text-[12px] font-bold font-sans">{i+1}</div>
                  <h3 className="font-display font-black text-[#0D2545] text-xl">{p.title}</h3>
                </div>
                <p className="text-[#6b6b5a] text-[15px] leading-[1.8] font-sans">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
