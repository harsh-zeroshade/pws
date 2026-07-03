"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { PageHeroDark } from "@/components/CommitteeLayout";

const amenities = [
  { title:"Lush Green Campus", tag:"Environment", color:"#2a5a3e",
    img:"https://admin.pacificworldschool.com/storage/amenety/LushGreen-1741676147.png",
    desc:"An expansive 10-acre campus with serene, green surroundings that enhance well-being and provide ample space for outdoor activities, sports, and recreation." },
  { title:"Separate Academic Blocks", tag:"Infrastructure", color:"#0D2545",
    img:"https://admin.pacificworldschool.com/storage/amenety/CulturalBlock-1741676271.png",
    desc:"Distinct primary, secondary, and cultural blocks ensure age-appropriate facilities and dedicated spaces for each stage of a student's learning journey." },
  { title:"Centrally Air-Conditioned", tag:"Comfort", color:"#1a3a6e",
    img:"https://admin.pacificworldschool.com/storage/amenety/CentrallyAir-1741676271.png",
    desc:"The entire building is centrally air-conditioned, providing a comfortable, climate-controlled environment that maximises focus and productivity year-round." },
  { title:"Spacious Classrooms", tag:"Learning", color:"#B8953A",
    img:"https://admin.pacificworldschool.com/storage/amenety/SpaciousClassroom-1741676425.png",
    desc:"Generously sized classrooms reduce overcrowding, promote teacher-student interaction, and create an environment conducive to collaborative learning." },
  { title:"Well-Equipped Labs", tag:"Science & Tech", color:"#7c3d8f",
    img:"https://admin.pacificworldschool.com/storage/amenety/WellEquippedLab-1741676425.png",
    desc:"Specialised labs for Physics, Chemistry, Biology, Mathematics, Computer Science, and Foreign Languages, all furnished with modern equipment for hands-on learning." },
  { title:"Well-Stocked Libraries", tag:"Knowledge", color:"#b84a1a",
    img:"https://admin.pacificworldschool.com/storage/amenety/WellStockedLib-1741676425.png",
    desc:"Two libraries stocked with books, journals, and digital resources across all subjects, plus quiet study areas that nurture a culture of reading and lifelong learning." },
  { title:"Music Rooms", tag:"Arts", color:"#2a5a3e",
    img:"https://admin.pacificworldschool.com/storage/amenety/MusicRoom-1741676692.png",
    desc:"Dedicated music rooms with instruments and audio equipment for individual practice, group rehearsals, and music classes that nurture creativity." },
  { title:"Dance Rooms", tag:"Arts", color:"#0D2545",
    img:"https://admin.pacificworldschool.com/storage/amenety/DanceRoom-1741676692.png",
    desc:"Spacious dance rooms with mirrors and sound systems, providing an ideal environment for various dance forms, physical fitness, and self-expression." },
  { title:"Theatre & Amphitheatre", tag:"Performance", color:"#1a3a6e",
    img:"https://admin.pacificworldschool.com/storage/amenety/TheatreStyle-1741676692.png",
    desc:"A professional theatre-style auditorium for indoor events and an open-air amphitheatre for cultural performances, supporting a vibrant extracurricular life." },
  { title:"Computer Labs", tag:"Technology", color:"#B8953A",
    img:"https://admin.pacificworldschool.com/storage/amenety/ComputerLab-1741676692.png",
    desc:"Three fully equipped computer labs with modern hardware and software to build digital literacy, coding skills, and prepare students for a technology-driven future." },
  { title:"Art & Pottery Room", tag:"Creativity", color:"#7c3d8f",
    img:"https://admin.pacificworldschool.com/storage/amenety/ArtRoom-1741677018.png",
    desc:"A vibrant art room stocked with supplies for painting, drawing, sculpture, and pottery that inspires students to express themselves through visual media." },
  { title:"Language Lab", tag:"Languages", color:"#b84a1a",
    img:"https://admin.pacificworldschool.com/storage/amenety/LanguageLab-1741677018.png",
    desc:"Interactive audio-visual language lab supporting immersive foreign language learning to develop speaking, listening, reading, and writing proficiency." },
];

const highlights = [
  { val:"10+", label:"Acres Campus" },
  { val:"3",   label:"Computer Labs" },
  { val:"2",   label:"Libraries" },
  { val:"6+",  label:"Specialised Labs" },
];

export default function AmenitiesPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-5%" });

  return (
    <PageLayout>
      <PageHeroDark
        label="Campus Life"
        title="School"
        titleGold="Amenities"
        subtitle="A world-class 10-acre campus designed to inspire learning, creativity, and growth at every turn."
        breadcrumb={[{ label:"About Us", href:"/about/school" }, { label:"Amenities" }]}
      />

      {/* Stats bar */}
      <div className="py-10" style={{ background:"rgba(184,149,58,0.07)", borderBottom:"1px solid rgba(184,149,58,0.15)" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((h,i) => (
              <motion.div key={h.label} initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*.08,duration:.6 }}
                className="text-center">
                <p className="font-display font-black text-[#D4AF5A]" style={{ fontSize:"clamp(2rem,4vw,3rem)" }}>{h.val}</p>
                <p className="text-white/45 text-[11px] uppercase tracking-widest font-sans mt-1">{h.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Amenities bento grid */}
      <section ref={ref} className="relative overflow-hidden py-20" style={{ background:"linear-gradient(180deg,#060F1E 0%,#0a1628 100%)" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"linear-gradient(rgba(184,149,58,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.03) 1px,transparent 1px)", backgroundSize:"56px 56px" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {amenities.map((a, i) => (
              <motion.div key={a.title}
                initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}}
                transition={{ delay:i*.06, duration:.7, ease:[.22,1,.36,1] }}
                className="group relative rounded-2xl overflow-hidden flex flex-col"
                style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", transition:"border-color .3s,transform .3s,box-shadow .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=`${a.color}50`; e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow=`0 20px 40px rgba(0,0,0,0.35)`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>

                {/* Image */}
                <div className="relative overflow-hidden" style={{ height:200 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.img} alt={a.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(6,15,30,0.7) 0%,transparent 60%)" }} />
                  {/* Tag */}
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full font-sans text-white"
                    style={{ background:`${a.color}cc`, backdropFilter:"blur(8px)" }}>{a.tag}</span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="h-0.5 w-8 rounded-full mb-4 transition-all duration-300 group-hover:w-16"
                    style={{ background:`linear-gradient(to right,${a.color},transparent)` }} />
                  <h3 className="font-display font-black text-white text-lg mb-3 group-hover:text-[#D4AF5A] transition-colors duration-300">{a.title}</h3>
                  <p className="text-white/45 text-[13px] leading-[1.8] font-sans group-hover:text-white/65 transition-colors duration-300">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
