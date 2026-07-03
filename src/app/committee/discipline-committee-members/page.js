"use client";
import { CommitteePage } from "@/components/CommitteeLayout";

const members = [
  { name:"Ms. Pooja Bose",          role:"Head", isHead:true },
  { name:"Mr. Navin Jain",          role:"Member" },
  { name:"Ms. Pooja Suri",          role:"Member" },
  { name:"Ms. Amandeep Kaur",       role:"Member" },
  { name:"Ms. Shikha Yadav",        role:"Member" },
  { name:"Ms. Suhani Chauhan",      role:"School Counselor" },
  { name:"Dr. Aditi",               role:"Member (Medical Cases)" },
  { name:"Ms. Manvi Bhandari",      role:"Member" },
  { name:"Coordinator",             role:"Member" },
];

export default function DisciplineCommitteePage() {
  return (
    <CommitteePage
      label="Student Welfare"
      title="Discipline"
      titleGold="Committee"
      subtitle="Fostering a culture of respect, responsibility, and integrity in every member of our school community."
      breadcrumb={[{ label:"Committees" }, { label:"Discipline Committee" }]}
      members={members}
    />
  );
}
