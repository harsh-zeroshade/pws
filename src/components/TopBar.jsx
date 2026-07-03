"use client";

import Link from "next/link";
import styles from "./TopBar.module.css";
import { usePublicContent } from "@/hooks/useContent";

const DEFAULT_INFO = {
  cbseCode: "61276",
  cbseAffiliation: "2133246",
  cambridgeAffiliation: "IA380",
  phone1: "9643370000",
  phone2: "9643380000",
};

export default function TopBar() {
  const info     = usePublicContent("site", "school-info",    DEFAULT_INFO);
  const announce = usePublicContent("home", "announcements",  { items: [] });

  const items = [
    { label: `School Code: ${info.cbseCode || "61276"}`,                                              href: null },
    { label: `CBSE Affiliation: ${info.cbseAffiliation || "2133246"}`,                               href: "#" },
    { label: `Cambridge Affiliation: ${info.cambridgeAffiliation || "IA380"}`,                       href: null },
    { label: `Phone: ${info.phone1 || "9643370000"}, ${info.phone2 || "9643380000"}`,                href: `tel:${info.phone1 || "9643370000"}` },
    { label: "PACMUN", href: "https://drive.google.com/file/d/1Iw8SgFdpica_Ncpfrz2monBCDRPgQkpG/view?usp=sharing", external: true },
    ...(announce.items || []).map(a => ({ label: a, href: null })),
  ];

  return (
    <div className={`${styles.topBar} text-white`}>
      <div className={`${styles.topBarInner} mx-auto flex max-w-[1400px] flex-row flex-wrap items-center justify-between gap-3 px-5 py-2`}>
        <div className={`${styles.topBarMarquee} flex-1 overflow-hidden`}>
          <div className={styles.topBarTrack} aria-hidden="true">
            <div className={styles.topBarGroup}>
              {items.map((item, index) => (
                <BarItem key={index} item={item} />
              ))}
              {items.map((item, index) => (
                <BarItem key={`dup-${index}`} item={item} />
              ))}
            </div>
          </div>
        </div>
        <div className={`${styles.topBarActions} flex flex-wrap items-center justify-end gap-2 text-[13px] font-semibold`}>
          <Link href="https://www.pwscampuscare.in//Logon/TPLoginRegistrationEnq" className={`${styles.topBarButton} ${styles.altButton}`}>
            Admission Enquiry
          </Link>
          <Link href="https://www.pwscampuscare.in/" className={`${styles.topBarButton} ${styles.secondaryButton}`}>
            ERP Login
          </Link>
          <Link href="https://www.pwscampuscare.in/Logon/TPLoginRegistration" className={`${styles.topBarButton} ${styles.primaryButton}`}>
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}

function BarItem({ item }) {
  if (item.href) {
    return (
      <Link
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
        className={styles.topBarItem}
      >
        {item.label}
      </Link>
    );
  }
  return <span className={styles.topBarItem}>{item.label}</span>;
}
