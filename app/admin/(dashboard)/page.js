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

  return {
    totalProducts,
    totalInquiries,
    newInquiries,
    recentInquiries,
  };
}

export default async function AdminDashboardPage() {
  const { totalProducts, totalInquiries, newInquiries, recentInquiries } =
    await getStats();

  const cards = [
    {
      label: "Products & Services",
      value: totalProducts,
      icon: Package,
      accent: "text-electric-dark",
      iconBg: "bg-electric/10",
      ring: "ring-electric/15",
      href: "/admin/products",
    },
    {
      label: "Total Inquiries",
      value: totalInquiries,
      icon: Inbox,
      accent: "text-gas-dark",
      iconBg: "bg-gas/10",
      ring: "ring-gas/15",
      href: "/admin/inquiries",
    },
    {
      label: "New / Unread",
      value: newInquiries,
      icon: AlertCircle,
      accent: "text-danger",
      iconBg: "bg-danger/10",
      ring: "ring-danger/15",
      href: "/admin/inquiries?status=new",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
          Overview
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink">
          Dashboard
        </h1>

        <p className="mt-1 max-w-xl text-sm text-ink-500">
          Monitor your products, services, and customer inquiries from one
          place.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.label}
              href={card.href}
              className={`group relative overflow-hidden rounded-xl bg-mist-50 p-5 shadow-sm ring-1 ${card.ring} transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md`}
            >
              {/* Decorative Circle */}
              <div
                className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${card.iconBg} opacity-50 transition-transform duration-300 group-hover:scale-125`}
              />

              <div className="relative">
                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.iconBg} ${card.accent}`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>

                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                      {card.label}
                    </span>
                  </div>

                  <ArrowRight
                    className={`h-4 w-4 ${card.accent} opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100`}
                  />
                </div>

                {/* Value */}
                <p className="mt-5 text-3xl font-bold tracking-tight text-ink">
                  {String(card.value).padStart(2, "0")}
                </p>

                {/* Bottom Indicator */}
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-ink-600/5">
                  <div
                    className={`h-full w-1/3 rounded-full ${card.iconBg}`}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Inquiries */}
      <section className="mt-8 overflow-hidden rounded-xl bg-mist-50 shadow-sm ring-1 ring-ink-600/10">
        {/* Section Header */}
        <div className="flex flex-col gap-3 border-b border-ink-600/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-ink">
              Recent Inquiries
            </h2>

            <p className="mt-0.5 text-xs text-ink-400">
              Latest customer requests received
            </p>
          </div>

          <Link
            href="/admin/inquiries"
            className="group flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-electric-dark transition-colors hover:bg-electric/5"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Empty State */}
        {recentInquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-ink-600/10">
              <Inbox className="h-5 w-5 text-ink-400" />
            </div>

            <p className="mt-4 text-sm font-medium text-ink">
              No inquiries yet
            </p>

            <p className="mt-1 text-xs text-ink-400">
              Customer inquiries will appear here once received.
            </p>
          </div>
        ) : (
          /* Inquiry List */
          <ul className="space-y-2 p-2">
            {recentInquiries.map((inq) => (
              <li key={inq._id}>
                <Link
                  href={`/admin/inquiries/${inq._id}`}
                  className="group flex items-center justify-between gap-4 rounded-lg bg-white px-4 py-3.5 ring-1 ring-ink-600/5 transition-all duration-200 hover:bg-mist-100 hover:ring-ink-600/10"
                >
                  {/* Customer Information */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/5 text-sm font-semibold uppercase text-ink-600">
                      {inq.name?.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {inq.name}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-ink-500">
                        {inq.email}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex shrink-0 items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                        inq.status === "new"
                          ? "bg-danger/10 text-danger"
                          : inq.status === "in_progress"
                          ? "bg-electric/10 text-electric-dark"
                          : "bg-ok/10 text-ok"
                      }`}
                    >
                      {inq.status.replace("_", " ")}
                    </span>

                    <ArrowRight className="hidden h-4 w-4 text-ink-300 transition-transform group-hover:translate-x-0.5 sm:block" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}