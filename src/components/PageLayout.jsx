import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Must match NAV_H in Navbar.jsx
const NAV_H = 64;

export default function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ marginTop: -NAV_H, paddingTop: NAV_H }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
