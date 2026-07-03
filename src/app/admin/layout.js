import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import SessionProvider from "@/components/admin/SessionProvider";

export const metadata = {
  title: "PWS Admin Panel",
  robots: "noindex, nofollow",
};

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <SessionProvider session={session}>
      <div style={{ margin: 0, padding: 0, background: "#0f1623", minHeight: "100vh", fontFamily: "system-ui,-apple-system,sans-serif" }}>
        {children}
      </div>
    </SessionProvider>
  );
}
