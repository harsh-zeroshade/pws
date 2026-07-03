"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminShell from "./AdminShell";

export default function AdminGuard({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/admin/login");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#0f1623" }}>
        <div style={{ color:"rgba(255,255,255,0.4)", fontSize:14 }}>Authenticating…</div>
      </div>
    );
  }

  if (!session) return null;

  return <AdminShell>{children}</AdminShell>;
}
