"use client";
import { CommitteePage } from "@/components/CommitteeLayout";

const members = [
  { name:"Ms. Pooja Bose",           role:"Pedagogical Leader", isHead:true },
  { name:"Ms. Pooja Suri",           role:"Member" },
  { name:"Ms. Shikha Yadav",         role:"Member" },
  { name:"Ms. Amandeep Kaur",        role:"Member" },
  { name:"Ms. Sakshi Seth",          role:"Member" },
  { name:"Ms. Supriya Kumar",        role:"Member" },
  { name:"Ms. Snigdha Pathak",       role:"Member" },
  { name:"Ms. Kiran Aggarwal",       role:"Member" },
  { name:"Ms. Suruchi Gupta",        role:"Member" },
  { name:"Ms. Karishma Srivastava",  role:"Member" },
  { name:"Ms. Sanchita Das Singha",  role:"Member" },
  { name:"Ms. Swati Chhabra",        role:"Member" },
  { name:"Ms. Sameera",              role:"Member" },
  { name:"Mr. Pankaj Bisht",         role:"Member" },
  { name:"Mr. Nitin Kumar",          role:"Member" },
  { name:"Mr. Sahil",                role:"Member" },
  { name:"Ms. Sapna Shukla",         role:"Member" },
  { name:"Ms. Vaishali Arora",       role:"Member" },
  { name:"Ms. Manvi Bhandari",       role:"Member" },
];

export default function SchoolCurriculumPage() {
  return (
    <CommitteePage
      label="Academic Governance"
      title="School Curriculum"
      titleGold="Committee"
      subtitle="Shaping a rigorous, relevant, and future-ready curriculum for every Pacific World School student."
      breadcrumb={[{ label:"Committees" }, { label:"School Curriculum Committee" }]}
      members={members}
    />
  );
}
