"use client";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

const initiatives = [
  { title:"Environment Drives", desc:"Tree plantation campaigns, waste management awareness, and sustainability projects aligned with UN SDGs.", icon:"🌱" },
  { title:"Old Age Home Visits", desc:"Regular visits to old age homes fostering empathy, respect for elders, and intergenerational connections.", icon:"❤️" },
  { title:"Cleanliness Campaigns", desc:"Students participate in Swachh Bharat initiatives, keeping their surroundings clean and inspiring their communities.", icon:"🧹" },
  { title:"Donation Drives", desc:"Collection of books, clothes, and essentials for underprivileged communities during festivals and special occasions.", icon:"🎁" },
  { title:"Awareness Campaigns", desc:"Student-led campaigns on important social issues including health, education, and child rights.", icon:"📣" },
  { title:"Partner NGO Programs", desc:"Structured partnerships with verified NGOs giving students meaningful, supervised community service experience.", icon:"🤝" },
];

export default function CommunityServicePage() {
  return (
    <PageLayout>
      <PageHero title="Community Service & Social Work" subtitle="Building compassionate citizens who contribute meaningfully to society."
        breadcrumb={[{ label:"Beyond Academics", href:"/beyond-academics/specialized-sports" }, { label:"Community Service" }]} />
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}
            className="text-[#5a5a4a] text-[17px] leading-[1.9] font-sans max-w-3xl mb-16">
            At Pacific World School, we believe education extends far beyond the classroom. Community service is an integral part of our curriculum, instilling in students a deep sense of social responsibility, empathy, and civic duty.
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((item,i) => (
              <motion.div key={item.title}
                initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:i*.08,duration:.7}}
                whileHover={{y:-6}}
                className="group p-8 rounded-3xl bg-[#FAFAF8] border border-[#e8e4d9] hover:border-[#B8953A]/40 hover:shadow-xl transition-all">
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="font-display font-black text-[#0D2545] text-xl mb-3 group-hover:text-[#B8953A] transition-colors">{item.title}</h3>
                <p className="text-[#6b6b5a] text-[14px] leading-relaxed font-sans">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
