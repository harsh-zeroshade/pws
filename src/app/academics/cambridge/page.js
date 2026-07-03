"use client";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

const features = [
  { title:"Cambridge Primary", desc:"Builds strong foundations in English, Mathematics and Science for learners aged 5-11." },
  { title:"Cambridge Lower Secondary", desc:"Continuing the journey for ages 11-14, broadening knowledge and developing skills across subjects." },
  { title:"Cambridge IGCSE", desc:"The world's most popular international qualification for 14-16 year olds, recognised by universities worldwide." },
  { title:"Cambridge AS & A Level", desc:"Advanced qualifications that open doors to top universities globally and develop independent thinking." },
  { title:"Global Recognition", desc:"Cambridge qualifications are recognised by leading universities and employers worldwide." },
  { title:"Critical Thinking Focus", desc:"Emphasis on analysis, evaluation and original thinking prepares students for higher education and beyond." },
];

export default function CambridgePage() {
  return (
    <PageLayout>
      <PageHero title="Cambridge International Education" subtitle="Globally recognised qualifications that open doors to the world's best universities."
        breadcrumb={[{ label:"Academics", href:"/academics/cbse" }, { label:"Cambridge International" }]} />
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:.9,ease:[.22,1,.36,1]}}>
              <div className="flex items-center gap-4 mb-6"><div className="h-px w-12 bg-[#B8953A]"/><span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">Cambridge International</span></div>
              <h2 className="font-display font-black text-[#0D2545] text-4xl leading-tight mb-6">World-Class International Education</h2>
              {["Cambridge International Education provides students with internationally recognized qualifications that open doors to universities worldwide.",
                "Our students develop independent thinking, intellectual curiosity, and global perspectives through an inquiry-based curriculum designed to challenge and inspire.",
                "Pacific World School is proud to be a Cambridge International School, offering the complete Cambridge Pathway from Primary through A-Level."
              ].map((p,i) => <p key={i} className="text-[#5a5a4a] text-[16px] leading-[1.9] font-sans mb-4">{p}</p>)}
            </motion.div>
            <motion.div initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{delay:.3,duration:.9}}
              className="grid grid-cols-2 gap-4">
              {features.map((f,i) => (
                <motion.div key={f.title}
                  initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.4+i*.08,duration:.6}}
                  className="p-6 rounded-2xl bg-[#F5F0E8] border border-[#e8e4d9] hover:border-[#B8953A]/40 transition-colors">
                  <h3 className="font-display font-bold text-[#0D2545] text-base mb-2">{f.title}</h3>
                  <p className="text-[#6b6b5a] text-[13px] leading-relaxed font-sans">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
