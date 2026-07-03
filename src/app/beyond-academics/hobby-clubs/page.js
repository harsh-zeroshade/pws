"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

const clubs = [
  {icon:"🎨",name:"Art Club",desc:"Exploring painting, sketching, sculpture, and mixed media arts with professional art teachers."},
  {icon:"🎭",name:"Drama Club",desc:"Stage productions, improvisation, script writing, and public speaking development."},
  {icon:"🎵",name:"Music Club",desc:"Vocal and instrumental training in classical and contemporary music forms."},
  {icon:"🤖",name:"Robotics Club",desc:"Coding, electronics, and robotics with participation in national competitions."},
  {icon:"📸",name:"Photography Club",desc:"Visual storytelling, digital photography techniques, and photo exhibitions."},
  {icon:"💬",name:"Debate Club",desc:"Public speaking, argumentation skills, MUN preparation, and inter-school competitions."},
  {icon:"🌱",name:"Eco Club",desc:"Environmental awareness projects, sustainability initiatives, and green campus activities."},
  {icon:"📰",name:"Literary Club",desc:"Creative writing, school magazine, poetry, and literary appreciation activities."},
  {icon:"🧪",name:"Science Club",desc:"Hands-on experiments, science fairs, and participation in CBSE science exhibitions."},
  {icon:"🎬",name:"Film Club",desc:"Short film making, video editing, script writing and film appreciation."},
];

export default function HobbyClubsPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-5%" });
  return (
    <PageLayout>
      <PageHero title="Hobby Clubs" subtitle="Discover your passion — 10+ clubs that nurture creativity and talent beyond the classroom."
        breadcrumb={[{ label:"Beyond Academics", href:"/beyond-academics/specialized-sports" }, { label:"Hobby Clubs" }]} />
      <section ref={ref} className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {clubs.map((c,i) => (
              <motion.div key={c.name}
                initial={{opacity:0,scale:.9}} animate={inView?{opacity:1,scale:1}:{}}
                transition={{delay:i*.05,duration:.6,ease:[.22,1,.36,1]}}
                whileHover={{y:-8,scale:1.03}}
                className="group p-6 rounded-3xl bg-[#FAFAF8] border border-[#e8e4d9] hover:border-[#B8953A]/40 hover:shadow-xl transition-all text-center">
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className="font-display font-bold text-[#0D2545] text-base mb-2 group-hover:text-[#B8953A] transition-colors">{c.name}</h3>
                <p className="text-[#9a9a8a] text-[12px] leading-relaxed font-sans">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
