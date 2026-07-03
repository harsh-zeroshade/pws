"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

const skills = [
  { icon: "🎤", title: "Public Speaking", desc: "Delegates develop confident oratory skills through structured debate and formal committee sessions." },
  { icon: "🌍", title: "Global Awareness", desc: "Research into real-world international issues builds deep awareness of geopolitics and diplomacy." },
  { icon: "🤝", title: "Diplomacy & Negotiation", desc: "Students learn the art of consensus-building, compromise, and multilateral negotiation." },
  { icon: "📝", title: "Research & Writing", desc: "Intensive position paper writing develops analytical thinking and structured academic writing." },
  { icon: "🧠", title: "Critical Thinking", desc: "Evaluating multiple perspectives on complex global issues sharpens analytical reasoning skills." },
  { icon: "👔", title: "Leadership", desc: "Committee leadership roles — chairs, co-chairs, and rapporteurs — build executive presence." },
];

export default function PacMUNPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <PageLayout>
      <PageHero
        title="Pacific MUN"
        subtitle="PACMUN — Pacific World School's flagship Model United Nations conference."
        breadcrumb={[{ label: "PACMUN" }]}
      />

      {/* Intro */}
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-[#B8953A]" />
                <span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">About PACMUN</span>
              </div>
              <h2 className="font-display font-black text-[#0D2545] text-4xl leading-tight mb-6">
                Shaping Tomorrow's <em className="text-[#B8953A] not-italic">Global Leaders</em>
              </h2>
              {[
                "PACMUN is Pacific World School's prestigious annual Model United Nations conference — one of the most anticipated events in the academic calendar of Greater Noida.",
                "Bringing together students from schools across the region, PACMUN provides a platform for young minds to debate real-world global issues, practice diplomacy, and develop the skills of tomorrow's leaders.",
                "Delegates represent countries in multiple committees, draft resolutions, deliver speeches, and work together to find solutions to pressing international challenges — all in the authentic format of the United Nations.",
              ].map((p, i) => (
                <p key={i} className="text-[#5a5a4a] text-[16px] leading-[1.9] font-sans mb-4">{p}</p>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.9 }}
              className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#0D2545] to-[#1a3a6e] p-12 text-center text-white">
              <div className="text-8xl mb-6">🌐</div>
              <h3 className="font-display font-black text-3xl mb-3">PACMUN</h3>
              <p className="text-white/60 font-sans text-[15px] mb-8">Pacific Model United Nations</p>
              <div className="grid grid-cols-2 gap-4 text-left">
                {[
                  { label: "Format", val: "Multi-committee MUN" },
                  { label: "Participants", val: "200+ delegates" },
                  { label: "Schools", val: "30+ institutions" },
                  { label: "Duration", val: "2–3 days" },
                ].map(item => (
                  <div key={item.label} className="p-4 rounded-2xl bg-white/10">
                    <p className="text-white/40 text-[10px] uppercase tracking-wider font-sans">{item.label}</p>
                    <p className="text-white font-semibold text-[14px] font-sans mt-0.5">{item.val}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section ref={ref} className="bg-[#F5F0E8] py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-14">
            <h2 className="font-display font-black text-[#0D2545] text-3xl">Skills Developed at PACMUN</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((s, i) => (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group p-8 rounded-3xl bg-white border border-[#e8e4d9] hover:border-[#B8953A]/40 hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-5">{s.icon}</div>
                <h3 className="font-display font-black text-[#0D2545] text-xl mb-3 group-hover:text-[#B8953A] transition-colors">{s.title}</h3>
                <p className="text-[#6b6b5a] text-[14px] leading-relaxed font-sans">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
