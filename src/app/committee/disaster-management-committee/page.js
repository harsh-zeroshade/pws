"use client";
import { CommitteePage } from "@/components/CommitteeLayout";

const members = [
  { name:"Ms. Pooja Bose",      role:"Head", isHead:true },
  { name:"Mr. Navin Jain",      role:"Member" },
  { name:"Ms. Pooja Suri",      role:"Member" },
  { name:"Ms. Amandeep Kaur",   role:"Member" },
  { name:"Ms. Shikha Yadav",    role:"Member" },
  { name:"Mr. Rohit Thakur",    role:"Member" },
  { name:"Mr. Sahil",           role:"Member" },
  { name:"Ms. Suruchi Gupta",   role:"Member" },
  { name:"Ms. Manvi Bhandari",  role:"Member" },
  { name:"Mr. Arun Kumar",      role:"Member" },
  { name:"Mr. Ravi Singh",      role:"Member" },
  { name:"Mr. Rohit Prasad",    role:"Member" },
  { name:"Ms. Monika",          role:"Member" },
  { name:"Ms. Madhusha",        role:"Member" },
];

export default function DisasterManagementPage() {
  return (
    <CommitteePage
      label="Safety & Preparedness"
      title="Disaster Management"
      titleGold="Committee"
      subtitle="Dedicated to ensuring the safety, security, and resilience of our entire school community."
      breadcrumb={[{ label:"Committees" }, { label:"Disaster Management Committee" }]}
      members={members}
    />
  );
}
