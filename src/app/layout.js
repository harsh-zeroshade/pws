import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import ConditionalTopBar from "@/components/ConditionalTopBar";
import ConditionalMain from "@/components/ConditionalMain";

// Premium display font for headings
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// Clean sans-serif for body
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Pacific World School — Excellence · Empathy · Empowerment",
  description:
    "Greater Noida's premier CBSE & Cambridge International school. World-class 10-acre campus, dual curriculum, 1:15 teacher-student ratio. Admissions open 2026–27.",
  keywords:
    "Pacific World School, best school Greater Noida West, CBSE Cambridge school Noida, international school Greater Noida",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <body className="antialiased bg-[#FAFAF8] text-[#1a1a1a] font-sans overflow-x-hidden">
        <ConditionalTopBar />
        <ConditionalMain>{children}</ConditionalMain>
      </body>
    </html>
  );
}
