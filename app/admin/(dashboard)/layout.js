import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/requireAdmin";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminDashboardLayout({ children }) {
  const session = await getAdminSession();

  // Middleware already guards /admin/*, but double-check server-side too —
  // this layout renders for every admin page.
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminShell admin={{ name: session.name, email: session.email }}>{children}</AdminShell>;
}
