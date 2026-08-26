import Link from "next/link";
import {
  Package,
  Inbox,
  AlertCircle,
  ArrowRight,
  Plus,
  ExternalLink,
  Clock,
  Sparkles,
  TrendingUp,
} from "lucide-react";
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
      label: "Products in Catalog",
      value: totalProducts,
      icon: Package,
      gradient: "from-sky-500 to-blue-600",
      bgLight: "bg-sky-50 text-sky-600 border-sky-100",
      href: "/admin/products",
      subtitle: "Active appliances & fittings",
    },
    {
      label: "Total Customer Inquiries",
      value: totalInquiries,
      icon: Inbox,
      gradient: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 text-emerald-600 border-emerald-100",
      href: "/admin/inquiries",
      subtitle: "All-time contact messages",
    },
    {
      label: "New / Action Required",
      value: newInquiries,
      icon: AlertCircle,
      gradient: "from-rose-500 to-red-600",
      bgLight: "bg-rose-50 text-rose-600 border-rose-100",
      href: "/admin/inquiries?status=new",
      subtitle: "Unread customer requests",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-scale">
      {/* Welcome Banner & Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-sky-700 border border-sky-100 mb-2">
            <Sparkles className="h-3 w-3" />
            <span>Store Control Center</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitor appliances, track catalog items, and respond to incoming customer inquiries.
          </p>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-sky-600/20 transition-all hover:bg-sky-500 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Link>

          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 active:scale-95"
          >
            <Inbox className="h-4 w-4 text-slate-500" />
            <span>Inquiries</span>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 active:scale-95"
          >
            <ExternalLink className="h-4 w-4 text-slate-400" />
            <span className="hidden sm:inline">Storefront</span>
          </Link>
        </div>
      </div>

      {/* Modern Metric Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.label}
              href={card.href}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10"
            >
              {/* Background ambient glow */}
              <div
                className={`pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 blur-xl transition-all duration-300 group-hover:scale-125 group-hover:opacity-20`}
              />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${card.bgLight} shadow-xs transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-sky-600 transition-colors">
                    <span>Manage</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {String(card.value).padStart(2, "0")}
                  </p>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                    {card.label}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Inquiries List Card */}
      <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
        {/* Card Header */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:p-6 sm:flex-row sm:items-center sm:justify-between bg-slate-50/40">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Recent Customer Inquiries
              </h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                {recentInquiries.length}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Messages and quotes requested via public website contact forms
            </p>
          </div>

          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-sky-600"
          >
            <span>View All Inquiries</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Inquiries Content */}
        {recentInquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 sm:p-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
              <Inbox className="h-7 w-7" />
            </div>
            <p className="text-base font-bold text-slate-800">
              No customer inquiries yet
            </p>
            <p className="text-xs text-slate-500 max-w-sm mt-1">
              When customers fill out the contact form or request assistance, their messages will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentInquiries.map((inq) => {
              const status = inq.status || "new";
              const isNew = status === "new";
              const isProgress = status === "in_progress";

              return (
                <Link
                  key={inq._id}
                  href={`/admin/inquiries/${inq._id}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 transition-colors hover:bg-slate-50/80"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-blue-600 font-bold text-sm text-white shadow-xs">
                      {inq.name?.charAt(0)?.toUpperCase() || "C"}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                          {inq.name}
                        </p>
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                            isNew
                              ? "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
                              : isProgress
                              ? "bg-sky-50 text-sky-700 ring-1 ring-sky-200"
                              : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                          }`}
                        >
                          {status.replace("_", " ")}
                        </span>
                      </div>

                      <p className="truncate text-xs text-slate-500 mt-0.5">
                        {inq.email} • <span className="text-slate-700">{inq.message}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pl-13 sm:pl-0 shrink-0">
                    <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                      <Clock className="h-3 w-3" />
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-sky-600 transition-colors">
                      <span className="hidden sm:inline">Review</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}