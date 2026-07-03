"use client";
import { useRef } from "react";
import { motion, useInView, useScroll } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { StickyCard_001 } from "@/components/ui/skiper-ui/skiper16";

const stages = [
  {
    title:"The Foundational Stage",
    sub:"Beginning Bright",
    src:"https://admin.pacificworldschool.com/storage/uploads/1751193620_SCHOOL%20CURRICULUM.jpg",
    points:[
      "Joyful learning experiences for our youngest Pacificans",
      "Supportive environment that nurtures self-confidence and resilience",
      "Real-world applications to make education relevant and exciting",
      "Fosters critical thinking, creativity, and problem-solving skills",
      "Celebrating diversity and fostering an inclusive culture",
      "Holistic development: intellectual, cognitive, social, physical, emotional",
    ],
  },
  {
    title:"The Preparatory Stage",
    sub:"Prep for Progress",
    src:"https://admin.pacificworldschool.com/storage/uploads/1735625871_5.png",
    points:[
      "Develops 21st-century skills to thrive in the dynamic ecosystem",
      "Promotes scientific thinking, critical capacity and creativity",
      "Raises awareness of Sustainable Development Goals",
      "Inclusivity — encouraging students of diverse abilities to work together",
      "Immerses students in India's rich heritage and culture",
    ],
  },
  {
    title:"The Middle School Curriculum",
    sub:"Exploring Growth",
    src:"https://admin.pacificworldschool.com/storage/uploads/1735625881_6.png",
    points:[
      "In-depth research and inquiry-based learning",
      "Experiential learning for better understanding of concepts",
      "Engaging workshops, class discussions, counselling sessions",
      "Active participation in inter-school events and CBSE competitions",
      "Creating happy individuals and good human beings",
    ],
  },
  {
    title:"The Secondary Stage",
    sub:"Breaking Barriers",
    src:"https://admin.pacificworldschool.com/storage/uploads/1744786870_1.png",
    points:[
      "Anchored in research, collaboration, and inquiry-driven learning",
      "Arts-based and sports-based integrated activities",
      "Teaches adaptability, emotional management, and resilience",
      "Focuses on public speaking and conflict resolution",
      "Develops global citizenship and essential life skills",
      "Participation in CBSE competitions, inter-school events, exchange programs",
    ],
  },
];

function StagesScroll() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset:["start start","end end"] });
  return (
    <div ref={containerRef} style={{ height:`${stages.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <main className="relative flex w-full flex-col items-center justify-center pb-[100vh] pt-[50vh]">
          {stages.map((s, i) => {
            const targetScale = Math.max(0.8, 1 - (stages.length - i - 1) * 0.05);
            return (
              <StickyCard_001 key={i} i={i} title={s.title} src={s.src}
                progress={scrollYProgress} range={[i*0.25,1]} targetScale={targetScale} />
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default function CBSEPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-5%" });

  return (
    <PageLayout>
      <PageHero title="CBSE Curriculum Catalyst" subtitle="Igniting Passion for Learning at Pacific World School"
        breadcrumb={[{ label:"Academics", href:"/academics/cbse" }, { label:"CBSE Curriculum" }]} />

      {/* Intro */}
      <section className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-center">
            <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:.9,ease:[.22,1,.36,1]}}>
              <div className="flex items-center gap-4 mb-6"><div className="h-px w-12 bg-[#B8953A]"/><span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">Our Approach</span></div>
              <h2 className="font-display font-black text-[#0D2545] text-4xl leading-tight mb-6">Curriculum Catalysts</h2>
              {["Pacific World School is dedicated to developing a curriculum that transforms our students into well-rounded individuals ready to thrive in the evolving educational landscape.",
                "Our curriculum is meticulously designed following the guidelines of the National Curriculum Framework (NCF 2023) and the recommendations of the National Education Policy 2020 (NEP 2020).",
                "Our curriculum includes a variety of hands-on activities, digital skill integration, and out-of-the-box experiential learning, blending arts and sports with academic disciplines to promote interdisciplinary and multidisciplinary learning."
              ].map((p,i) => <p key={i} className="text-[#5a5a4a] text-[16px] leading-[1.9] font-sans mb-4">{p}</p>)}
            </motion.div>
            <motion.div initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{delay:.3,duration:.9}}>
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-[#0D2545]/15">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://admin.pacificworldschool.com/storage/uploads/1751193620_SCHOOL%20CURRICULUM.jpg" alt="CBSE Curriculum" className="w-full h-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stages grid */}
      <section ref={ref} className="bg-[#F5F0E8] py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-16">
            <motion.h2 initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.8}}
              className="font-display font-black text-[#0D2545] text-4xl">Curriculum Stages</motion.h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {stages.map((s,i) => (
              <motion.div key={s.title}
                initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}}
                transition={{delay:i*.1,duration:.8,ease:[.22,1,.36,1]}}
                className="bg-white rounded-3xl overflow-hidden border border-[#e8e4d9] hover:shadow-xl transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={s.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8">
                  <p className="text-[#B8953A] text-[11px] font-bold uppercase tracking-widest font-sans mb-2">{s.sub}</p>
                  <h3 className="font-display font-black text-[#0D2545] text-xl mb-5">{s.title}</h3>
                  <ul className="space-y-2">
                    {s.points.map((pt,j) => (
                      <li key={j} className="flex items-start gap-3 text-[14px] text-[#5a5a4a] font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8953A] flex-shrink-0 mt-2" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
