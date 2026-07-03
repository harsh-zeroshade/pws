"use client";
import { CommitteePage } from "@/components/CommitteeLayout";

const members = [
  { name:"Mrs. Santosh Bansal",    role:"Chairperson",              isHead:true },
  { name:"Mrs. Nidhi Bansal",      role:"Pro-Vice Chairperson",     isHead:true },
  { name:"Mrs. Pooja Bose",        role:"Member Secretary" },
  { name:"Mr. P.K Roy",            role:"Principal, Navodaya Vidyalaya Ghaziabad" },
  { name:"Ms. Pallavi Upadhyaya",  role:"Principal, DPS R.N. Ext." },
  { name:"Ms. Anita Jain",         role:"Parent Representative" },
  { name:"Mr. Amit Mohan",         role:"Parent Representative" },
  { name:"Ms. Supriya Kumar",      role:"Teacher Representative" },
  { name:"Ms. Shruti Shikha",      role:"Teacher Representative" },
  { name:"Ms. Neerja Tyagi",       role:"Teacher, DPS R.N. Extn." },
  { name:"Mr. Aslam",              role:"Teacher, DPS Indirapuram" },
];

export default function ManagingCommitteePage() {
  return (
    <CommitteePage
      label="Governance"
      title="Managing Committee"
      titleGold="Members"
      subtitle="The governing body that steers Pacific World School's vision, policy, and institutional excellence."
      breadcrumb={[{ label:"Committees" }, { label:"Managing Committee Members" }]}
      members={members}
    />
  );
}
