"use client";
import { usePathname } from "next/navigation";

export default function ConditionalMain({ children }) {
  const pathname = usePathname();
  // Admin pages manage their own layout — don't wrap in <main>
  if (pathname?.startsWith("/admin")) return <>{children}</>;
  return <main>{children}</main>;
}
