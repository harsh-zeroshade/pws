import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NewsletterMarquee from "@/components/NewsletterMarquee";
import AchievementsMarquee from "@/components/AchievementsMarquee";
import MottoSection from "@/components/MottoSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LeadershipPreview from "@/components/LeadershipPreview";
import PartnersMarquee from "@/components/PartnersMarquee";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pacific World School — Greater Noida West | CBSE & Cambridge",
  description:
    "One of the best CBSE & Cambridge international schools in Greater Noida West. Excellence · Empathy · Empowerment. Admissions open 2026–27.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <NewsletterMarquee />
        <AchievementsMarquee />
        <MottoSection />
        <WhyChooseSection />
        <TestimonialsSection />
        <LeadershipPreview />
        <PartnersMarquee />
      </main>
      <Footer />
    </>
  );
}
