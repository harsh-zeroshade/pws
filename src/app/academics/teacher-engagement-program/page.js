"use client";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

const programs = [
  { title:"Regular Training Workshops", desc:"Faculty attend curated workshops on the latest pedagogical techniques, technology integration, and subject-specific methodologies." },
  { title:"Cambridge Teacher Training", desc:"Certified training for our Cambridge faculty ensuring world-class delivery of the international curriculum." },
  { title:"NEP 2020 Alignment", desc:"Ongoing professional development aligning teachers with the vision and competency requirements of the National Education Policy 2020." },
  { title:"Peer Learning Sessions", desc:"Collaborative sessions where teachers share best practices, observe each other's classes, and provide constructive feedback." },
  { title:"Digital Skills Enhancement", desc:"Training in EdTech tools, smart classroom technology, and digital pedagogy to enhance the learning experience." },
  { title:"Mentorship Programs", desc:"Senior educators mentor newer faculty, creating a culture of continuous growth and institutional knowledge sharing." },
];

export default function TeacherEngagementPage() {
  return (
    <PageLayout>
      <PageHero title="Teacher Engagement Program" subtitle="Investing in our educators to deliver world-class learning experiences every day."
        breadcrumb={[{ label:"Academics", href:"/academics/cbse" }, { label:"Teacher Engagement Program" }]} />
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="max-w-3xl mb-16">
            <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}
              className="text-[#5a5a4a] text-[17px] leading-[1.9] font-sans">
              At Pacific World School, we believe that exceptional teaching is the cornerstone of exceptional learning. Our Teacher Engagement Program is a comprehensive, year-round initiative designed to attract, develop, and retain the finest educators — ensuring every student receives the highest quality instruction.
            </motion.p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p,i) => (
              <motion.div key={p.title}
                initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:i*.07,duration:.7}}
                whileHover={{y:-6}}
                className="p-8 rounded-3xl bg-[#FAFAF8] border border-[#e8e4d9] hover:border-[#B8953A]/40 hover:shadow-xl transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#0D2545] flex items-center justify-center text-white font-bold text-sm mb-5 font-sans">
                  {String(i+1).padStart(2,"0")}
                </div>
                <h3 className="font-display font-black text-[#0D2545] text-lg mb-3">{p.title}</h3>
                <p className="text-[#6b6b5a] text-[14px] leading-relaxed font-sans">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
