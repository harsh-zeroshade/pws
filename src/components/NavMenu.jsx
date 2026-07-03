"use client";
import FlowingMenu from "./FlowingMenu";

const NAV = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "#",
    sub: [
      { label: "About School",                href: "/about/school" },
      { label: "Chairperson's Message",       href: "/about/chairperson-message" },
      { label: "Pro-Vice Chairperson's Message", href: "/about/vice-chairperson-message" },
      { label: "Principal's Message",         href: "/about/principal-message" },
      { label: "Differentiating Factors",     href: "/about/differentiating-factors" },
      { label: "Core Team",                   href: "/about/leadership-team" },
      { label: "Our Faculty",                 href: "/about/our-faculty" },
      { label: "Amenities",                   href: "/about/ameneties" },
    ],
  },
  {
    label: "Committees",
    href: "#",
    sub: [
      { label: "Managing Committee Members",  href: "/committee/managing-committee-members" },
      { label: "Disaster Management Committee", href: "/committee/disaster-management-committee" },
      { label: "POCSO Committee",             href: "/committee/pocso-committee" },
      { label: "School Curriculum Committee", href: "/committee/school-curriculum-committee" },
      { label: "Discipline Committee",        href: "/committee/discipline-committee-members" },
      { label: "Student Council Committee",   href: "/committee/student-council-committee" },
    ],
  },
  {
    label: "Academics",
    href: "#",
    sub: [
      { label: "CBSE Curriculum",             href: "/academics/cbse" },
      { label: "Cambridge International",     href: "/academics/cambridge" },
      { label: "Teacher Engagement Program",  href: "/academics/teacher-engagement-program" },
      { label: "Examination Policy (III–XI)", href: "/academics/examination-policy" },
      { label: "Examination Policy (I–II)",   href: "/academics/examination-policy-2" },
      { label: "Topper Details",              href: "/academics/topper-details" },
    ],
  },
  {
    label: "Beyond Academics",
    href: "#",
    sub: [
      { label: "Specialized Sports",          href: "/beyond-academics/specialized-sports" },
      { label: "Trips & Excursions",          href: "/beyond-academics/trips" },
      { label: "Community Service & Social Work", href: "/beyond-academics/community-service-and-social-work" },
      { label: "Partner Program",             href: "/beyond-academics/partner-program" },
      { label: "Hobby Clubs",                 href: "/beyond-academics/hobby-clubs" },
      { label: "Houses",                      href: "/beyond-academics/houses" },
    ],
  },
  {
    label: "Admission",
    href: "#",
    sub: [
      { label: "Brochure",                    href: "/admission/brochure" },
      { label: "Admission Policy",            href: "/admission/admission-policy" },
      { label: "Registration Process",        href: "/admission/registration-process" },
      { label: "Fee Structure (Nursery–XII)", href: "/admission/fee-structure" },
      { label: "Class XI Admission & Curriculum", href: "/admission/admission-procedure-curriculum" },
      { label: "Cambridge Fee Structure",     href: "/admission/cambridge-fee-structure" },
      { label: "School Schedule",             href: "/admission/school-schedule" },
    ],
  },
  { label: "Awards & Achievements", href: "/achievements" },
  {
    label: "PACMUN",
    href: "#",
    sub: [
      { label: "Pacific MUN", href: "/pacmun/pacific-mun" },
    ],
  },
  {
    label: "Mandatory Disclosure",
    href: "#",
    sub: [
      { label: "Transfer Certificate Sample", href: "/mandatory-disclosure/transfer-certificate-sample" },
      { label: "Transfer Certificate",        href: "/mandatory-disclosure/transfer-certificate-field" },
      { label: "School Self Affidavit",       href: "/mandatory-disclosure/self-affidavit" },
      { label: "Booklist",                    href: "/mandatory-disclosure/booklist" },
      { label: "Declaration",                 href: "/mandatory-disclosure/cbse-declaration" },
      { label: "Mandatory Public Disclosure", href: "/mandatory-disclosure/mandatory-public-disclosure" },
      { label: "Annual Report",               href: "/mandatory-disclosure/annual-school-report" },
      { label: "Annual Calendar",             href: "/mandatory-disclosure/annual-calendar" },
    ],
  },
  { label: "Gallery",      href: "/gallery" },
  { label: "Blog",         href: "/blogs" },
  { label: "Alumni",       href: "/school-alumni/school-alumni" },
  { label: "Career",       href: "/career/career" },
  { label: "Contact Us",   href: "/contact" },
  {
    label: "Parent Corner",
    href: "#",
    sub: [
      { label: "Rule Book", href: "https://admin.pacificworldschool.com/storage/pdf/1774951400_PWS_almanac_2026-2027.pdf", external: true },
    ],
  },
];

// Map nav items to FlowingMenu items format, preserving sub arrays
const flowingItems = NAV.map((item) => ({
  link: item.href,
  text: item.label,
  image: `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 100)}`,
  sub: item.sub || [],
}));

export default function NavMenu() {
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <FlowingMenu
        items={flowingItems}
        speed={15}
        textColor="#ffffff"
        bgColor="#120F17"
        marqueeBgColor="#ffffff"
        marqueeTextColor="#120F17"
        borderColor="#ffffff"
      />
    </div>
  );
}