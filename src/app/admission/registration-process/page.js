"use client";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

const steps = [
  {n:"01",title:"Submit Enquiry",desc:"Contact us at 8899117704 or fill the online enquiry form with your child's details and desired class."},
  {n:"02",title:"Campus Tour",desc:"Visit our 10-acre campus to experience our world-class facilities firsthand. Tours are available Monday–Saturday 9 AM–2 PM."},
  {n:"03",title:"Collect Application Form",desc:"Collect the official application form from the admissions office or download from our website."},
  {n:"04",title:"Submit Documents",desc:"Submit the completed form with: Birth Certificate, Previous School TC, Last 2 years marksheets, Aadhar Card, 4 passport photos."},
  {n:"05",title:"Interaction Session",desc:"Attend the parent–child interaction session with our Principal and faculty. This is a relaxed, friendly assessment."},
  {n:"06",title:"Admission Confirmation",desc:"Receive your admission offer letter and complete the fee payment to confirm your child's seat. Welcome to the Pacific family!"},
];

export default function RegistrationProcessPage() {
  return (
    <PageLayout>
      <PageHero title="Registration Process" subtitle="A simple, transparent six-step process to join Pacific World School."
        breadcrumb={[{ label:"Admission", href:"/admission/brochure" }, { label:"Registration Process" }]} />
      <section className="bg-white py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="space-y-0 border-t border-[#e8e4d9]">
            {steps.map((s,i) => (
              <motion.div key={s.n}
                initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:i*.1,duration:.7,ease:[.22,1,.36,1]}}
                className="flex gap-8 py-8 border-b border-[#e8e4d9] group">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0D2545] to-[#1a3a6e] text-white flex items-center justify-center font-bold font-sans flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">{s.n}</div>
                  {i<steps.length-1 && <div className="w-px flex-1 bg-gradient-to-b from-[#0D2545]/20 to-transparent mt-2 min-h-[24px]"/>}
                </div>
                <div className="pb-2">
                  <h3 className="font-display font-black text-[#0D2545] text-xl mb-2 group-hover:text-[#B8953A] transition-colors">{s.title}</h3>
                  <p className="text-[#6b6b5a] text-[15px] leading-[1.8] font-sans">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.8}} className="mt-12 text-center">
            <a href="tel:8899117704" className="inline-flex items-center gap-2 px-8 py-4 bg-[#B8953A] text-white font-bold rounded-2xl text-[15px] font-sans hover:bg-[#a07d2e] transition-colors shadow-xl shadow-[#B8953A]/25">
              📞 Call Us: 8899117704
            </a>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
