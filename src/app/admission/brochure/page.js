"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

const admissionLinks = [
  { label:"Registration Process",         href:"/admission/registration-process", icon:"📝" },
  { label:"Fee Structure Nursery to XII",  href:"/admission/fee-structure",         icon:"💰" },
  { label:"Admission Policy",             href:"/admission/admission-policy",      icon:"📋" },
  { label:"School Schedule",              href:"/admission/school-schedule",       icon:"🗓️" },
];

export default function BrochurePage() {
  return (
    <PageLayout>
      <PageHero title="Admissions 2026–27" subtitle="Begin your child's journey towards excellence at Pacific World School."
        breadcrumb={[{ label:"Admission" }, { label:"Brochure" }]} />
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-[1fr_400px] gap-16">
            {/* Left */}
            <div>
              <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:.7}}
                className="flex items-center gap-4 mb-8"><div className="h-px w-12 bg-[#B8953A]"/>
                <span className="text-[#B8953A] text-[11px] font-semibold tracking-[.3em] uppercase font-sans">Admissions Open</span>
              </motion.div>
              <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:.1,duration:.8}}
                className="text-[#5a5a4a] text-[17px] leading-[1.9] font-sans mb-8">
                Pacific World School warmly invites applications for admission to classes Nursery through XII for the 2026–27 academic session. We offer both CBSE and Cambridge International pathways in a world-class learning environment.
              </motion.p>
              <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.2,duration:.7}}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-xl text-[13px] font-semibold font-sans mb-10">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Admissions Currently Open — Limited Seats
              </motion.div>

              {/* Steps */}
              <div className="space-y-6">
                {[
                  {n:"01", title:"Online Enquiry", desc:"Fill the enquiry form or call 8899117704 to speak with our admissions team."},
                  {n:"02", title:"Campus Visit", desc:"Schedule a campus tour to experience our world-class facilities and meet our faculty."},
                  {n:"03", title:"Application Form", desc:"Complete the official application form with academic records and supporting documents."},
                  {n:"04", title:"Interaction Session", desc:"Age-appropriate interaction with faculty to understand your child's strengths."},
                  {n:"05", title:"Admission Offer", desc:"Receive your offer letter and complete fee payment to secure your child's seat."},
                ].map((step,i) => (
                  <motion.div key={step.n}
                    initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:.3+i*.08,duration:.6}}
                    className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-2xl bg-[#0D2545] text-white flex items-center justify-center font-bold text-sm font-sans flex-shrink-0">{step.n}</div>
                      {i<4 && <div className="w-px flex-1 bg-gradient-to-b from-[#0D2545]/20 to-transparent mt-1 min-h-[24px]"/>}
                    </div>
                    <div className="pb-6">
                      <h4 className="font-display font-bold text-[#0D2545] text-lg mb-1">{step.title}</h4>
                      <p className="text-[#6b6b5a] text-[14px] font-sans">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right */}
            <motion.div initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{delay:.3,duration:.9}} className="space-y-5">
              {/* Download brochure */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0D2545] to-[#1a3a6e] text-white">
                <h3 className="font-display font-black text-2xl mb-3">Download Brochure</h3>
                <p className="text-white/60 text-[14px] font-sans mb-6">Get the complete school brochure with all details about programs, facilities, and fees.</p>
                <a href="https://admin.pacificworldschool.com/storage/pdf/1774951400_PWS_almanac_2026-2027.pdf" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[#B8953A] text-white font-bold rounded-xl text-[14px] font-sans hover:bg-[#a07d2e] transition-colors w-full justify-center">
                  📥 Download PDF Brochure
                </a>
              </div>

              {/* Quick links */}
              <div className="p-8 rounded-3xl bg-[#F5F0E8] border border-[#e8e4d9]">
                <h3 className="font-display font-bold text-[#0D2545] text-xl mb-5">Admission Info</h3>
                <div className="space-y-3">
                  {admissionLinks.map(l => (
                    <Link key={l.href} href={l.href}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#e8e4d9] hover:border-[#B8953A]/40 hover:shadow-sm transition-all group">
                      <span className="text-xl">{l.icon}</span>
                      <span className="font-sans font-medium text-[14px] text-[#3a3a2e] group-hover:text-[#0D2545] transition-colors">{l.label}</span>
                      <span className="ml-auto text-[#e8e4d9] group-hover:text-[#B8953A] transition-colors">→</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="p-8 rounded-3xl bg-white border border-[#e8e4d9]">
                <h3 className="font-display font-bold text-[#0D2545] text-xl mb-5">Contact Admissions</h3>
                <div className="space-y-3">
                  {[
                    {icon:"📞", label:"Phone", val:"8899117704", href:"tel:8899117704"},
                    {icon:"✉️", label:"Email", val:"info@pacificworldschool.com", href:"mailto:info@pacificworldschool.com"},
                  ].map(c => (
                    <a key={c.label} href={c.href} className="flex items-center gap-3 group">
                      <div className="w-9 h-9 rounded-xl bg-[#F5F0E8] flex items-center justify-center text-sm">{c.icon}</div>
                      <div>
                        <p className="text-[10px] text-[#9a9a8a] uppercase tracking-wider font-sans">{c.label}</p>
                        <p className="text-[#0D2545] font-semibold text-[13px] font-sans group-hover:text-[#B8953A] transition-colors">{c.val}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
