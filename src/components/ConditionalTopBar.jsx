"use client";
import { usePathname } from "next/navigation";
import TopBar from "./TopBar";

export default function ConditionalTopBar() {
  const pathname = usePathname();
  // Don't show TopBar on any admin route
  if (pathname?.startsWith("/admin")) return null;
  return <TopBar />;
}
