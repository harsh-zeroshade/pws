"use client";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

const policies = [
  { class:"Class I – II", points:["Continuous and Comprehensive Evaluation (CCE)","No formal written exams — portfolio and project-based assessment","Monthly observational reports shared with parents","Focus on learning attitudes, participation, and creativity"] },
  { class:"Class III – VIII", points:["Two terms per academic year","Formative assessments throughout the term","Summative exams at term end","Subject-wise detailed report cards","Parent-teacher meetings post results"] },
  { class:"Class IX – X", points:["Follows CBSE Board Examination pattern","Regular pre-board examinations","Internal assessments contributing to final grades","Mock board exams for preparation","Career counselling integrated with result discussion"] },
  { class:"Class XI – XII", points:["CBSE Board pattern with half-yearly and annual exams","Practical examinations for science and arts subjects","Project submissions and viva voce","Pre-board mock exams","University application support and counselling"] },
];

export default function ExaminationPolicyPage() {
  return (
    <PageLayout>
      <PageHero title="Examination Policy" subtitle="A transparent, fair and comprehensive assessment framework for all students."
        breadcrumb={[{ label:"Academics", href:"/academics/cbse" }, { label:"Examination Policy" }]} />
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid md:grid-cols-2 gap-8">
            {policies.map((pol,i) => (
              <motion.div key={pol.class}
                initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:i*.1,duration:.8}}
                className="p-8 rounded-3xl bg-[#FAFAF8] border border-[#e8e4d9] hover:border-[#B8953A]/40 hover:shadow-lg transition-all">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2545] text-white text-[11px] font-bold uppercase tracking-wider mb-5 font-sans">
                  {pol.class}
                </div>
                <ul className="space-y-3">
                  {pol.points.map((pt,j) => (
                    <li key={j} className="flex items-start gap-3 text-[14px] text-[#5a5a4a] font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8953A] flex-shrink-0 mt-2" />{pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
