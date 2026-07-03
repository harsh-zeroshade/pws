"use client";
import { CommitteePage } from "@/components/CommitteeLayout";

const members = [
  { name:"Ms. Pooja Bose",      role:"Head", isHead:true },
  { name:"Mr. Navin Jain",      role:"Member" },
  { name:"Ms. Pooja Suri",      role:"Member" },
  { name:"Ms. Amandeep Kaur",   role:"Member" },
  { name:"Ms. Shikha Yadav",    role:"Member" },
  { name:"Ms. Shuchi Mahatta",  role:"Member" },
  { name:"Ms. Suhani Chauhan",  role:"School Counselor" },
  { name:"Coordinator",         role:"Member" },
];

export default function POCSOMCommitteePage() {
  return (
    <CommitteePage
      label="Child Protection"
      title="POCSO"
      titleGold="Committee"
      subtitle="Committed to creating a safe, respectful environment and upholding child protection rights across our campus."
      breadcrumb={[{ label:"Committees" }, { label:"POCSO Committee" }]}
      members={members}
    />
  );
}
