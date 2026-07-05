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
      {/* Load Material Symbols font at layout level so it's always available */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0&family=Poppins:wght@400;500;600;700&display=swap"
      />
      <div style={{ margin: 0, padding: 0, background: "#0a0f1c", minHeight: "100vh", fontFamily: "system-ui,-apple-system,sans-serif" }}>
        {children}
      </div>
    </SessionProvider>
  );
}
