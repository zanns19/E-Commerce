import Link from "next/link";
import { Package, Inbox, AlertCircle, ArrowRight } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Inquiry from "@/models/Inquiry";

export const dynamic = "force-dynamic";

async function getStats() {
  await dbConnect();
  const [totalProducts, totalInquiries, newInquiries, recentInquiries] =
    await Promise.all([
      Product.countDocuments(),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: "new" }),
      Inquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

  return { totalProducts, totalInquiries, newInquiries, recentInquiries };
}

export default async function AdminDashboardPage() {
  const { totalProducts, totalInquiries, newInquiries, recentInquiries } =
    await getStats();

  const cards = [
    {
      label: "Products & services",
      value: totalProducts,
      icon: Package,
      accent: "text-electric-dark",
      ring: "ring-electric/20",
      href: "/admin/products",
    },
    {
      label: "Total inquiries",
      value: totalInquiries,
      icon: Inbox,
      accent: "text-gas-dark",
      ring: "ring-gas/20",
      href: "/admin/inquiries",
    },
    {
      label: "New / unread",
      value: newInquiries,
      icon: AlertCircle,
      accent: "text-danger",
      ring: "ring-danger/20",
      href: "/admin/inquiries?status=new",
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-500">
        A quick read on what&apos;s happening across the site.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className={`rounded-lg bg-white p-5 shadow-panel ring-1 ${c.ring} transition hover:-translate-y-0.5`}
            >
              <div className={`flex items-center gap-2 ${c.accent}`}>
                <Icon className="h-4 w-4" />
                <span className="font-mono text-xs uppercase tracking-widest">
                  {c.label}
                </span>
              </div>
              <p className="mt-4 font-mono text-4xl font-semibold text-ink">
                {String(c.value).padStart(2, "0")}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 rounded-lg bg-white shadow-panel ring-1 ring-ink-600/10">
        <div className="flex items-center justify-between border-b border-ink-600/10 px-5 py-4">
          <h2 className="font-semibold text-ink">Recent inquiries</h2>
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-1 text-sm font-medium text-electric-dark hover:underline"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-ink-500">
            No inquiries yet.
          </p>
        ) : (
          <ul className="divide-y divide-ink-600/10">
            {recentInquiries.map((inq) => (
              <li key={inq._id}>
                <Link
                  href={`/admin/inquiries/${inq._id}`}
                  className="flex items-center justify-between px-5 py-4 text-sm hover:bg-mist-100"
                >
                  <div>
                    <p className="font-medium text-ink">{inq.name}</p>
                    <p className="text-ink-500">{inq.email}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide ${
                      inq.status === "new"
                        ? "bg-danger/10 text-danger"
                        : inq.status === "in_progress"
                        ? "bg-electric/10 text-electric-dark"
                        : "bg-ok/10 text-ok"
                    }`}
                  >
                    {inq.status.replace("_", " ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
