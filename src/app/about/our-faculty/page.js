"use client";
import { useState, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { PageHeroDark } from "@/components/CommitteeLayout";

const ALL_FACULTY = [
  { s:1,  name:"Ms. Pooja Bose",             role:"Principal",                        exp:"30 Years",  qual:"B.Sc(H) B.Ed, MA (English), MA Education, CELTA Cambridge University" },
  { s:2,  name:"Ms. Pooja Suri",             role:"Headmistress",                     exp:"24 Years",  qual:"M.A. (English), B.Ed" },
  { s:3,  name:"Ms. Shikha Yadav",           role:"Senior Mistress (IX-XII)",         exp:"23 Years",  qual:"M.A (English), B.Ed" },
  { s:4,  name:"Ms. Amandeep Kaur",          role:"Senior Mistress (III-VIII)",        exp:"23 Years",  qual:"MA English, PGDBM, M. Ed." },
  { s:5,  name:"Ms. Sapna Shukla",           role:"PGT Computer Science",             exp:"20 Years",  qual:"B.Sc, M.Sc, M.Tech (CS), UGC NET-CS" },
  { s:6,  name:"Ms. Manik Sharma",           role:"TGT Mathematics",                  exp:"22 Years",  qual:"M.Sc, B.Ed" },
  { s:7,  name:"Ms. Nidhi Mittal",           role:"TGT Mathematics",                  exp:"6 Years",   qual:"MBA, B.Sc, B.Ed" },
  { s:8,  name:"Dr. Shweta Rai",             role:"PGT Biology",                      exp:"9 Years",   qual:"M.Sc, Ph.D, B.Ed" },
  { s:9,  name:"Ms. Sanchita Das Singha",    role:"PGT English",                      exp:"14 Years",  qual:"B.A, B.Ed, M.A, M.Ed" },
  { s:10, name:"Mr. Sahil",                  role:"PGT Accountancy",                  exp:"11 Years",  qual:"M.Com, MBA (Finance), B.Ed" },
  { s:11, name:"Mr. Nitin Kumar",            role:"PGT Economics",                    exp:"15 Years",  qual:"M.A., B.Ed" },
  { s:12, name:"Ms. Shreya Chopra",          role:"PGT Political Science",            exp:"10 Years",  qual:"M.A, B.Ed, CTET" },
  { s:13, name:"Ms. Prisha Chaudhary",       role:"PGT History",                      exp:"5 Years",   qual:"M.A. (History), B.A Hons (History), B.Ed" },
  { s:14, name:"Ms. Shweta Jain",            role:"PGT Entrepreneurship & Biz Studies",exp:"19 Years", qual:"MA (Economics), MBA (Finance)" },
  { s:15, name:"Mr. Pankaj Singh Bisht",     role:"PGT Math",                         exp:"14 Years",  qual:"M.Sc., B.Ed" },
  { s:16, name:"Mr. Shubham Tyagi",          role:"PGT Physics",                      exp:"10 Years",  qual:"B.Tech, B.Ed" },
  { s:17, name:"Ms. Sudhriti Dutta",         role:"TGT English",                      exp:"16 Years",  qual:"M.A, B.Ed, B.Mus" },
  { s:18, name:"Ms. Rashmi Gargya Dabral",   role:"TGT Hindi",                        exp:"14 Years",  qual:"M.A, B.Ed" },
  { s:19, name:"Ms. Monika Kumari Gupta",    role:"TGT Hindi",                        exp:"10 Years",  qual:"M.A Hindi, B.Ed, NET" },
  { s:20, name:"Ms. Sameera",                role:"TGT Hindi",                        exp:"18 Years",  qual:"MA, B.Ed" },
  { s:21, name:"Ms. Sakshi Seth",            role:"TGT Science",                      exp:"20 Years",  qual:"M.Sc, B.Ed" },
  { s:22, name:"Ms. Shuchi Smita",           role:"TGT English",                      exp:"9 Years",   qual:"M.A (English), M.A (Sociology), B.Ed, CTET" },
  { s:23, name:"Mr. Ved Prakash Sharma",     role:"PGT Mathematics",                  exp:"10 Years",  qual:"M.Sc, B.Sc, B.Ed" },
  { s:24, name:"Mr. Soumen Basu",            role:"PGT Art",                          exp:"15 Years",  qual:"BVA, MVA" },
  { s:25, name:"Ms. Sapna Gupta",            role:"TGT Mathematics",                  exp:"6 Years",   qual:"M.Sc., B.Ed" },
  { s:26, name:"Ms. Rekha Yadav",            role:"TGT Mathematics",                  exp:"10 Years",  qual:"M.Sc. (Math), B.Ed" },
  { s:27, name:"Ms. Pooja Saroha",           role:"TGT Mathematics",                  exp:"13 Years",  qual:"M.Sc, M.A, B.Sc, B.Ed" },
  { s:28, name:"Ms. Richa Garg",             role:"TGT Mathematics",                  exp:"5 Years",   qual:"B.Sc., B.Ed, NET" },
  { s:29, name:"Ms. Poonam Bhandari",        role:"TGT Mathematics",                  exp:"11 Years",  qual:"M.Sc, B.Sc, B.Ed, CTET" },
  { s:30, name:"Ms. Khilan Sawhney",         role:"TGT English",                      exp:"12 Years",  qual:"MA (English), B.A Hons, B.Ed, CTET" },
  { s:31, name:"Ms. Shivani Agarwal",        role:"TGT English",                      exp:"22 Years",  qual:"B.A., B.Ed" },
  { s:32, name:"Ms. Parul Papreja",          role:"TGT English",                      exp:"12 Years",  qual:"M.A.(English), M.Ed, B.Ed, CTET" },
  { s:33, name:"Ms. Nupur Binod",            role:"TGT English",                      exp:"13 Years",  qual:"M.A., MBA, B.A., B.Ed" },
  { s:34, name:"Ms. Ekta Pandey",            role:"TGT English",                      exp:"17 Years",  qual:"M.A., B.A., B.Ed" },
  { s:35, name:"Ms. Rhythm Khanna",          role:"TGT English",                      exp:"2 Years",   qual:"B.A., B.Ed" },
  { s:36, name:"Ms. Lalita Joshi",           role:"TGT Hindi",                        exp:"31 Years",  qual:"M.A., B.A., B.Ed" },
  { s:37, name:"Ms. Preeti Mishra",          role:"TGT Science",                      exp:"21 Years",  qual:"M.Sc., B.Ed" },
  { s:38, name:"Ms. Meenakshi Thapliyal",    role:"TGT Science",                      exp:"8 Years",   qual:"M.Sc, B.Ed, CTET" },
  { s:39, name:"Ms. Neha Takle",             role:"TGT Science",                      exp:"10 Years",  qual:"M. Sc, B. Ed" },
  { s:40, name:"Ms. Deepshikha Singh",       role:"TGT Science",                      exp:"11 Years",  qual:"M.Sc, B.Sc, B.Ed, CTET" },
  { s:41, name:"Ms. Divya Gupta",            role:"TGT Science",                      exp:"21 Years",  qual:"M.Sc, B.Sc, B.Ed, CTET" },
  { s:42, name:"Ms. Nilu Kumar",             role:"TGT Science",                      exp:"12 Years",  qual:"M.Sc, B.Sc, B.Ed" },
  { s:43, name:"Ms. Radhika Malhotra",       role:"TGT Social Science",               exp:"8 Years",   qual:"B.A, M.A, CTET" },
  { s:44, name:"Ms. Anubhuti Chaturvedi",    role:"TGT Social Science",               exp:"3.5 Years", qual:"M.A (History), B.ed" },
  { s:45, name:"Ms. Sandipa Ghosh",          role:"TGT Social Science",               exp:"12 Years",  qual:"B.Sc, B.Ed" },
  { s:46, name:"Ms. Varsha",                 role:"TGT Social Science",               exp:"7 Years",   qual:"M.Com, B.Com, B.Ed, CTET" },
  { s:47, name:"Ms. Ishika Awasthi",         role:"TGT Social Science",               exp:"3 Years",   qual:"M.A., B.A., B.Ed" },
  { s:48, name:"Ms. Sharmistha Gupta",       role:"TGT Social Science",               exp:"17 Years",  qual:"B.Com, B.Ed, PTTC" },
  { s:49, name:"Ms. Abha Gupta",             role:"TGT Computer Science",             exp:"6 Years",   qual:"MCA" },
  { s:50, name:"Ms. Vibha Choubey",          role:"TGT Computer Science",             exp:"6 Years",   qual:"B.Sc, B.Ed" },
  { s:51, name:"Ms. Rashmi Saxena",          role:"TGT Computer Science",             exp:"15 Years",  qual:"M.Sc, B.Sc" },
  { s:52, name:"Mr. Avinash Thakur",         role:"TGT Dance",                        exp:"11 Years",  qual:"B.A, Jazz, Kathak, Contemporary" },
  { s:53, name:"Ms. Vaishali Arora",         role:"TGT Dance",                        exp:"12 Years",  qual:"M.A, B.El.Ed" },
  { s:54, name:"Mr. Ajay Pal Singh Negi",    role:"TGT Music",                        exp:"12 Years",  qual:"M.A, B.A" },
  { s:55, name:"Mr. Umesh Kumar",            role:"TGT Art",                          exp:"12 Years",  qual:"MFA, BFA" },
  { s:56, name:"Ms. Sonia Saini",            role:"TGT German",                       exp:"7 Years",   qual:"M.Sc Zoology, German C1 Level" },
  { s:57, name:"Ms. Rachana Bhutia",         role:"TGT French",                       exp:"4 Years",   qual:"B.Sc, B.Ed, French Level B2" },
  { s:58, name:"Ms. Madhusha Srivastava",    role:"TGT PE",                           exp:"13 Years",  qual:"M.PED, B.PED" },
  { s:59, name:"Ms. Raji Nair",              role:"PRT English",                      exp:"21 Years",  qual:"M.A, B.Ed" },
  { s:60, name:"Ms. Farida Aara",            role:"PRT English",                      exp:"3 Years",   qual:"B.A, B.Ed" },
  { s:61, name:"Ms. Olivia Bhadra",          role:"PRT English",                      exp:"7 Years",   qual:"M.A., B.Ed" },
  { s:62, name:"Ms. Reena Goyal",            role:"PRT English",                      exp:"25 Years",  qual:"M.A., B.Sc., B.Ed" },
  { s:63, name:"Ms. Ridhima Sharma",         role:"PRT English",                      exp:"11 Years",  qual:"M.A., B.A., B.Ed" },
  { s:64, name:"Ms. Mona Sinha",             role:"PRT English",                      exp:"30 Years",  qual:"M.A., B.A., B.Ed" },
  { s:65, name:"Ms. Archita Sharma",         role:"PRT English",                      exp:"6 Years",   qual:"M.A., B.A., B.Ed, CTET" },
  { s:66, name:"Ms. Poonam",                 role:"PRT English",                      exp:"10 Years",  qual:"M.A., B.Ed, CTET" },
  { s:67, name:"Ms. Preeti Kaushik",         role:"PRT English & EVS",                exp:"8 Years",   qual:"M.A., MBA, B.Com, B.Ed" },
  { s:68, name:"Ms. Alka Pundir",            role:"PRT EVS & English",                exp:"6 Years",   qual:"M.A., B.A., B.Ed, CTET" },
  { s:69, name:"Ms. Sanchi Singhal",         role:"PRT EVS",                          exp:"14 Years",  qual:"B.A, M.A, B.Ed" },
  { s:70, name:"Ms. Nishtha Sharma",         role:"PRT EVS",                          exp:"8 Years",   qual:"B.Pharma, M.A, B.Ed, CTET" },
  { s:71, name:"Ms. Shruti Shikha",          role:"PRT Science",                      exp:"14 Years",  qual:"M.Sc, B.Ed, PhD" },
  { s:72, name:"Ms. Supriya Kumar",          role:"PRT Science",                      exp:"14 Years",  qual:"M.Sc, B.Ed" },
  { s:73, name:"Ms. Pooja Verma Sonar",      role:"PRT Science",                      exp:"6 Years",   qual:"B.Sc, B.Ed, CTET" },
  { s:74, name:"Ms. Rekha Sharma",           role:"PRT Hindi",                        exp:"15 Years",  qual:"M.A., B.Ed" },
  { s:75, name:"Ms. Pratima Pandey",         role:"PRT Hindi",                        exp:"8 Years",   qual:"M.A., B.Ed" },
  { s:76, name:"Ms. Anita Sharma",           role:"PRT Hindi",                        exp:"16 Years",  qual:"M.A, B.Ed" },
  { s:77, name:"Dr. Seema Rani",             role:"PRT Hindi",                        exp:"15 Years",  qual:"PhD (Hindi), M.Phil, M.A., B.Ed, CTET" },
  { s:78, name:"Ms. Sakshi Rastogi",         role:"PRT Mathematics",                  exp:"7 Years",   qual:"MCA, B.Ed, CTET" },
  { s:79, name:"Ms. Honey Abhishek Saraswat",role:"PRT Mathematics",                  exp:"14 Years",  qual:"B.Sc, M.Sc, B.Ed" },
  { s:80, name:"Ms. Richa Vats",             role:"PRT Computer Science",             exp:"14 Years",  qual:"B.Sc, MCA, B.Ed" },
  { s:81, name:"Ms. Yashi Gupta",            role:"PRT Computer Science",             exp:"6 Years",   qual:"MCA, BCA, B.Ed" },
  { s:82, name:"Ms. Divya Jha",              role:"PRT French",                       exp:"15 Years",  qual:"M.A., B.Sc, B.Ed, DELF A1 & A2, CTET" },
  { s:83, name:"Ms. Surbhi Jain",            role:"PRT German",                       exp:"9 Years",   qual:"M.Com, B2.1 Advance Diploma in German" },
  { s:84, name:"Ms. Monika Chaudhary",       role:"PRT PE",                           exp:"5 Years",   qual:"B.A., B.Ed, B.PED, M.PED" },
  { s:85, name:"Mr. Ravi Singh",             role:"PRT PE",                           exp:"9 Years",   qual:"B.Com, B.PEd, M.PEd" },
  { s:86, name:"Mr. Shuaeb Ahmad",           role:"PRT Music",                        exp:"14 Years",  qual:"B.A, Music Prabhakar" },
  { s:87, name:"Mr. Arush Gulati",           role:"PRT Dance",                        exp:"10 Years",  qual:"B.A" },
  { s:88, name:"Ms. Aayushi Tripathi",       role:"PRT Dance/Drama",                  exp:"6 Years",   qual:"M.A.(ODISSI), Diploma in NSD" },
  { s:89, name:"Ms. Manasvi Verma",          role:"Special Educator",                 exp:"7 Years",   qual:"B.A, Diploma Counselling, M.A (Psychology), B.Ed, CTET" },
  { s:90, name:"Ms. Suhani Chauhan",         role:"School Counselor",                 exp:"9 Years",   qual:"M.A.(Clinical Psychology), B.A." },
];

const categories = ["All", "PGT", "TGT", "PRT", "Leadership", "Special"];

function getCat(role) {
  if (/principal|headmistress|senior mistress/i.test(role)) return "Leadership";
  if (/special educator|counselor/i.test(role)) return "Special";
  if (/^pgt/i.test(role)) return "PGT";
  if (/^tgt/i.test(role)) return "TGT";
  if (/^prt/i.test(role)) return "PRT";
  return "Other";
}

const catColors = { Leadership:"#B8953A", PGT:"#1a3a6e", TGT:"#2a5a3e", PRT:"#7c3d8f", Special:"#b84a1a", Other:"#0D2545" };

export default function OurFacultyPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-5%" });

  const filtered = useMemo(() => ALL_FACULTY.filter(f => {
    const matchCat = cat === "All" || getCat(f.role) === cat;
    const q = search.toLowerCase();
    const matchSearch = !q || f.name.toLowerCase().includes(q) || f.role.toLowerCase().includes(q);
    return matchCat && matchSearch;
  }), [search, cat]);

  return (
    <PageLayout>
      <PageHeroDark
        label="Our Team"
        title="Our"
        titleGold="Faculty"
        subtitle="Over 200 passionate educators committed to nurturing every student's unique potential with empathy, dedication, and excellence."
        breadcrumb={[{ label:"About Us", href:"/about/school" }, { label:"Our Faculty" }]}
      />

      {/* Faculty values */}
      <div className="py-8" style={{ background:"rgba(184,149,58,0.06)", borderBottom:"1px solid rgba(184,149,58,0.12)" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="flex flex-wrap justify-center gap-6">
            {[{icon:"❤️",label:"Empathy"},{icon:"🔥",label:"Passion"},{icon:"🎯",label:"Dedication & Devotion"},{icon:"📚",label:"Ever-Learning Spirit"},{icon:"💛",label:"Boundless Love for Students"}].map(v => (
              <div key={v.label} className="flex items-center gap-2">
                <span className="text-lg">{v.icon}</span>
                <span className="text-white/60 text-[13px] font-sans font-medium">{v.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section ref={ref} className="relative overflow-hidden py-16" style={{ background:"linear-gradient(180deg,#060F1E 0%,#0a1628 100%)" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"linear-gradient(rgba(184,149,58,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,58,.025) 1px,transparent 1px)", backgroundSize:"56px 56px" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">

          {/* Search + Filter */}
          <motion.div initial={{ opacity:0,y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search by name or subject..."
                className="w-full pl-9 pr-4 py-3 rounded-xl text-[13px] font-sans text-white placeholder-white/30 outline-none"
                style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)" }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button key={c} onClick={()=>setCat(c)}
                  className="px-4 py-2 rounded-xl text-[12px] font-bold uppercase tracking-wider font-sans transition-all"
                  style={{ background:cat===c?(catColors[c]||"#B8953A"):"rgba(255,255,255,0.05)", color:cat===c?"#fff":"rgba(255,255,255,0.45)", border:cat===c?"1px solid transparent":"1px solid rgba(255,255,255,0.08)" }}>
                  {c}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Count */}
          <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:.2 }}
            className="text-white/30 text-[12px] font-sans mb-6">
            Showing {filtered.length} of {ALL_FACULTY.length} faculty members
          </motion.p>

          {/* Table */}
          <motion.div initial={{ opacity:0,y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.15,duration:.7 }}
            className="rounded-2xl overflow-hidden" style={{ border:"1px solid rgba(255,255,255,0.07)" }}>
            {/* Header */}
            <div className="grid grid-cols-[40px_1fr_1fr_100px] gap-4 px-5 py-3 text-[10px] font-bold uppercase tracking-widest font-sans"
              style={{ background:"rgba(184,149,58,0.1)", color:"rgba(255,255,255,0.4)", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
              <span>#</span><span>Name</span><span>Designation</span><span>Experience</span>
            </div>
            <div className="divide-y" style={{ divideColor:"rgba(255,255,255,0.05)" }}>
              {filtered.length === 0 ? (
                <div className="py-16 text-center text-white/30 font-sans">No faculty members found.</div>
              ) : filtered.map((f, i) => {
                const c = getCat(f.role);
                return (
                  <motion.div key={f.s}
                    initial={{ opacity:0 }} animate={{ opacity:1 }}
                    transition={{ delay:Math.min(i*.02,.5) }}
                    className="group grid grid-cols-[40px_1fr_1fr_100px] gap-4 px-5 py-3.5 items-center transition-colors"
                    style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(184,149,58,0.05)"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <span className="text-white/20 text-[11px] font-sans tabular-nums">{f.s}</span>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-[10px] font-bold"
                        style={{ background:`${catColors[c]}25`, color:catColors[c] }}>
                        {f.name.split(" ").map(w=>w[0]).slice(-2).join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-[13px] font-sans font-semibold truncate group-hover:text-[#D4AF5A] transition-colors">{f.name}</p>
                        <p className="text-white/30 text-[10px] font-sans truncate hidden sm:block">{f.qual}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 hidden sm:inline"
                        style={{ background:`${catColors[c]}20`, color:catColors[c] }}>{c}</span>
                      <span className="text-white/55 text-[12px] font-sans truncate">{f.role}</span>
                    </div>
                    <span className="text-white/40 text-[12px] font-sans">{f.exp}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
