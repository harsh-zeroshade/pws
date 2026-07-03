import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// NAV_H must match the h-[70px] in Navbar.jsx
const NAV_H = 70;

export default function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      {/*
        Pull the first section (hero) up behind the fixed navbar using
        negative margin + equal padding-top — identical to how HeroSection
        works on the home page. Content starts visually right under the navbar
        with no white gap.
      */}
      <main
        style={{
          marginTop: -NAV_H,
          paddingTop: NAV_H,
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
