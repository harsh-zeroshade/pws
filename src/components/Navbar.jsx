"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavMenu from "./NavMenu";

const LOGO_LIGHT = "/pws-logo.png";

// TopBar height: 44px desktop, 36px mobile (<640px)
function getTopBarH() {
  if (typeof window === "undefined") return 44;
  return window.innerWidth < 640 ? 36 : 44;
}

const NAV_H = 64;

function HamburgerIcon({ open }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <motion.line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { x1:4, y1:4, x2:18, y2:18 } : { x1:3, y1:6, x2:19, y2:6 }}
        transition={{ duration:0.25, ease:"easeInOut" }} />
      <motion.line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { opacity:0 } : { opacity:1 }} transition={{ duration:0.2 }} />
      <motion.line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { x1:4, y1:18, x2:18, y2:4 } : { x1:3, y1:16, x2:19, y2:16 }}
        transition={{ duration:0.25, ease:"easeInOut" }} />
    </svg>
  );
}

export default function Navbar() {
  const [scrollY, setScrollY]   = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [topBarH, setTopBarH]   = useState(44);
  const pathname = usePathname();
  const isHome   = pathname === "/";

  useEffect(() => {
    // Set initial topbar height based on screen
    setTopBarH(getTopBarH());

    const onResize = () => setTopBarH(getTopBarH());
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (y / h) * 100 : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const pastTopBar    = scrollY >= topBarH;
  const isTransparent = isHome && !pastTopBar;
  const translateY    = pastTopBar ? 0 : topBarH;

  const headerStyle = isTransparent
    ? { backgroundColor:"transparent", backdropFilter:"none", WebkitBackdropFilter:"none", borderBottom:"none", boxShadow:"none" }
    : pastTopBar && isHome
    ? { backgroundColor:"rgba(13,37,69,0.6)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.1)", boxShadow:"0 4px 24px rgba(0,0,0,0.15)" }
    : { backgroundColor:"rgba(13,37,69,0.97)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.08)", boxShadow:"0 2px 16px rgba(0,0,0,0.2)" };

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 h-[2px] z-[70] transition-all duration-75"
        style={{ width:`${progress}%`, background:"linear-gradient(to right,#0D2545,#B8953A)" }} />

      <motion.header
        initial={{ y: -80 }}
        animate={{ y: translateY }}
        transition={scrollY === 0 ? { duration:0.7, ease:[0.22,1,0.36,1] } : { duration:0.25, ease:"easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={headerStyle}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10">
          <div className="flex items-center justify-between" style={{ height: NAV_H }}>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image src={LOGO_LIGHT} alt="Pacific World School"
                width={100} height={30} className="object-contain w-[90px] sm:w-[110px] lg:w-[118px]" priority />
            </Link>

            {/* Right: Apply + Menu */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
                <Link href="/admission/brochure"
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#B8953A] text-white text-[11px] sm:text-[12px] font-semibold rounded-xl font-sans hover:bg-[#a07d2e] transition-colors shadow-md whitespace-nowrap">
                  Apply 2026–27
                </Link>
              </motion.div>

              <motion.button
                onClick={() => setMenuOpen(o => !o)}
                whileHover={{ scale:1.08 }} whileTap={{ scale:0.94 }}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-white transition-colors hover:bg-white/10"
                aria-label={menuOpen ? "Close menu" : "Open menu"}>
                <HamburgerIcon open={menuOpen} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>

      {/* Sidebar drawer — full width on mobile, capped on desktop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x:"100%" }} animate={{ x:0 }} exit={{ x:"100%" }}
            transition={{ type:"spring", stiffness:300, damping:30 }}
            className="fixed top-0 right-0 bottom-0 z-[110]"
            style={{ width: "min(100vw, 420px)" }}
          >
            <NavMenu onClose={() => setMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
