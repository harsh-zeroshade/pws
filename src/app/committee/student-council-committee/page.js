"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { PageHeroDark } from "@/components/CommitteeLayout";
import Link from "next/link";

const leadership = [
  { name:"Mhridul Mishra",         role:"Head Boy",               class:"XI", color:"#B8953A" },
  { name:"Navya Vats",             role:"Head Girl",              class:"XI", color:"#B8953A" },
  { name:"Punya Shukla",           role:"Vice Head Boy",          class:"X",  color:"#1a3a6e" },
  { name:"Aahana Shekhawat",       role:"Vice Head Girl",         class:"X",  color:"#1a3a6e" },
  { name:"Priyal Mishra",          role:"Student President",      class:"XI", color:"#2a5a3e" },
  { name:"Saathvik Gannavarapu",   role:"Student President",      class:"XI", color:"#2a5a3e" },
  { name:"Rishit Singh",           role:"Student Secretary",      class:"XI", color:"#0D2545" },
  { name:"Shalviya Gupta",         role:"Student Secretary",      class:"XI", color:"#0D2545" },
  { name:"Parinita Sharma",        role:"Cultural President",     class:"XI", color:"#7c3d8f" },
  { name:"Gaurav Seth",            role:"Cultural Secretary",     class:"XI", color:"#7c3d8f" },
  { name:"Jazveen Kaur",           role:"Sports Captain",         class:"XI", color:"#b84a1a" },
  { name:"Aishi Jain",             role:"Vice Sports Captain",    class:"X",  color:"#b84a1a" },
];

const houseCaptains = [
  { name:"Kunal Kumar",        role:"House Captain",       house:"Columbia", class:"XI" },
  { name:"Manya Jain",         role:"Vice House Captain",  house:"Columbia", class:"X"  },
  { name:"Aaradhya Chauhan",   role:"Sports Captain",      house:"Columbia", class:"X"  },
  { name:"Sriti Singh",        role:"House Captain",       house:"Fraser",   class:"XI" },
  { name:"Vidisha Tyagi",      role:"Vice House Captain",  house:"Fraser",   class:"X"  },
  { name:"Aanvi Garg",         role:"Sports Captain",      house:"Fraser",   class:"XI" },
  { name:"Akshara Jindal",     role:"House Captain",       house:"Daintree", class:"XI" },
  { name:"Carol M Antony",     role:"Vice House Captain",  house:"Daintree", class:"X"  },
  { name:"Ishaan Trehan",      role:"Sports Captain",      house:"Daintree", class:"XI" },
];

const specialRoles = [
  { name:"Atharv Shrivastava", role:"Technical Lead",     class:"XI" },
  { name:"Aarvi Goel",         role:"Happiness Lead",     class:"XI" },
  { name:"Prisha Garg",        role:"Creative Lead",      class:"XI" },
  { name:"Aadya Gupta",        role:"Literary Luminary",  class:"XI" },
  { name:"Tejas Jalan",        role:"Oratory Maestro",    class:"X"  },
];

const prefects = [
  { name:"Nitant Gupta", class:"X" },{ name:"Saanvi Yadav", class:"X" },{ name:"Arnav Mehra", class:"IX" },
  { name:"Dhruv Raj Singh", class:"IX" },{ name:"Naman Agarwal", class:"IX" },{ name:"Arnav Kansal", class:"IX" },
  { name:"Hridyansh Kapkoti", class:"IX" },{ name:"Varunika Budakoti", class:"IX" },
  { name:"Vidushi Khanna", class:"VIII" },{ name:"Chiranjeet Sahoo", class:"VIII" },{ name:"Pahal Walecha", class:"VIII" },
  { name:"Smayan Kakkar", class:"VIII" },{ name:"Anant Yadav", class:"VIII" },{ name:"Shreya Mishra", class:"VIII" },
  { name:"Priyanshi Saini", class:"VIII" },{ name:"Devika Nair", class:"VIII" },
];

const houseColors = { Columbia:"#B8953A", Fraser:"#1a3a6e", Daintree:"#2a5a3e" };

function Section({ title, children, delay = 0, inView }) {
  return (
    <motion.div initial={{ opacity:0,y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay, duration:.7, ease:[.22,1,.36,1] }}
      className="mb-14">
      <div className="flex items-center gap-4 mb-7">
        <div className="h-px w-10 bg-[#B8953A]" />
        <h2 className="font-display font-black text-white text-xl">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

export default function StudentCouncilPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-5%" });

  return (
    <PageLayout>
      <PageHeroDark
        label="Student Leadership"
        title="Student Council"
        titleGold="Committee"
        subtitle="The elected voice of Pacific World School students — leaders, ambassadors, and change-makers."
        breadcrumb={[{ label:"Committees" }, { label:"Student Council Committee" }]}
      />

      <section ref={ref} className="relative overflow-hidden py-20" style={{ background:"linear-gradient(180deg,#060F1E 0%,#0a1628 100%)" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"linear-gradient(rgba(184,149,58,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.025) 1px,transparent 1px)", backgroundSize:"56px 56px" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">

          {/* Leadership */}
          <Section title="School Leadership" delay={0} inView={inView}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {leadership.map((m, i) => (
                <motion.div key={i} initial={{ opacity:0,y:20 }} animate={inView?{opacity:1,y:0}:{}}
                  transition={{ delay:i*.04,duration:.6 }}
                  className="group relative p-5 rounded-2xl overflow-hidden"
                  style={{ background:`${m.color}12`, border:`1px solid ${m.color}35`, transition:"border-color .3s,transform .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=`${m.color}70`; e.currentTarget.style.transform="translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=`${m.color}35`; e.currentTarget.style.transform="translateY(0)"; }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-sm mb-3"
                    style={{ background:`${m.color}25`, color:m.color, border:`1px solid ${m.color}45` }}>
                    {m.name.split(" ").map(w=>w[0]).slice(0,2).join("")}
                  </div>
                  <p className="font-display font-bold text-white text-[14px] leading-tight mb-1 group-hover:text-[#D4AF5A] transition-colors">{m.name}</p>
                  <p className="text-[11px] font-sans uppercase tracking-wider" style={{ color:m.color }}>{m.role}</p>
                  <span className="absolute top-3 right-3 text-[10px] font-bold font-sans px-2 py-0.5 rounded-full"
                    style={{ background:`${m.color}20`, color:`${m.color}` }}>Class {m.class}</span>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* House Captains */}
          <Section title="House Captains" delay={0.1} inView={inView}>
            {["Columbia","Fraser","Daintree"].map(house => (
              <div key={house} className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ background:houseColors[house] }} />
                  <span className="text-white/60 text-[12px] font-bold uppercase tracking-widest font-sans">{house} House</span>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {houseCaptains.filter(m=>m.house===house).map((m,i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl"
                      style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)" }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{ background:`${houseColors[house]}20`, color:houseColors[house] }}>
                        {m.name.split(" ").map(w=>w[0]).slice(0,2).join("")}
                      </div>
                      <div>
                        <p className="text-white text-[13px] font-sans font-semibold leading-tight">{m.name}</p>
                        <p className="text-white/40 text-[10px] uppercase tracking-wide font-sans">{m.role} · Cl. {m.class}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Section>

          {/* Special Roles */}
          <Section title="Special Roles" delay={0.2} inView={inView}>
            <div className="flex flex-wrap gap-3">
              {specialRoles.map((m,i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background:"rgba(184,149,58,0.07)", border:"1px solid rgba(184,149,58,0.2)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold"
                    style={{ background:"rgba(184,149,58,0.2)", color:"#D4AF5A" }}>
                    {m.name.split(" ").map(w=>w[0]).slice(0,2).join("")}
                  </div>
                  <div>
                    <p className="text-white text-[13px] font-sans font-semibold">{m.name}</p>
                    <p className="text-[#B8953A] text-[10px] uppercase tracking-wide font-sans">{m.role} · Cl. {m.class}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Prefects */}
          <Section title="Prefects" delay={0.3} inView={inView}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {prefects.map((m,i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl"
                  style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                    style={{ background:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.5)" }}>
                    {m.name.split(" ").map(w=>w[0]).slice(0,2).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-[12px] font-sans font-medium truncate">{m.name}</p>
                    <p className="text-white/35 text-[10px] font-sans">Class {m.class}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

        </div>
      </section>
    </PageLayout>
  );
}
