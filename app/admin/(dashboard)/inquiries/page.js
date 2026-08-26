"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Trash2,
  Inbox,
  Clock,
  Mail,
  Phone,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

const STATUS_STYLE = {
  new: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
  in_progress: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
  resolved: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
};

function InquiriesInner() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get("status") || "";

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const qs = statusFilter ? `?status=${statusFilter}` : "";
      const res = await fetch(`/api/inquiries${qs}`);
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } catch {
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  async function handleDelete(e, id) {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this inquiry? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((list) => list.filter((i) => i._id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  }

  const filters = [
    { value: "", label: "All Messages" },
    { value: "new", label: "New & Unread" },
    { value: "in_progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
  ];

  return (
    <div className="space-y-6 animate-fade-scale">
      {/* Page Header */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Customer Inquiries
          </h1>
          <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-sky-700 border border-sky-100">
            {inquiries.length}
          </span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Messages, pricing requests, and quotes received from the public website contact form.
        </p>

        {/* Filter Navigation Chips */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
          {filters.map((f) => {
            const active = statusFilter === f.value;
            return (
              <Link
                key={f.value}
                href={
                  f.value ? `/admin/inquiries?status=${f.value}` : "/admin/inquiries"
                }
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  active
                    ? "bg-slate-900 text-white shadow-sm"
                    : "border border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {f.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Inquiries Content List */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
        {loading ? (
          <div className="p-16 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-3 border-sky-600 border-t-transparent mb-3" />
            <p className="text-sm font-semibold text-slate-600">Loading messages…</p>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="p-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
              <Inbox className="h-7 w-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              No customer inquiries found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-1">
              {statusFilter
                ? `There are currently no inquiries in the "${statusFilter.replace("_", " ")}" status.`
                : "When customers submit contact requests, they will appear in this list."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {inquiries.map((inq) => {
              const status = inq.status || "new";
              const isNew = status === "new";
              const isProgress = status === "in_progress";

              return (
                <div
                  key={inq._id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 transition-colors hover:bg-slate-50/80"
                >
                  <Link
                    href={`/admin/inquiries/${inq._id}`}
                    className="flex items-start gap-4 min-w-0 flex-1"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-600 font-black text-sm text-white shadow-xs">
                      {inq.name?.charAt(0)?.toUpperCase() || "C"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 group-hover:text-sky-600 transition-colors">
                          {inq.name}
                        </span>
                        <span
                          className={`rounded-md px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${STATUS_STYLE[status]}`}
                        >
                          {status.replace("_", " ")}
                        </span>
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-slate-400" />
                          {inq.email}
                        </span>
                        {inq.phone && (
                          <span className="flex items-center gap-1 text-slate-600 font-medium">
                            <Phone className="h-3 w-3 text-slate-400" />
                            {inq.phone}
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        {inq.message}
                      </p>
                    </div>
                  </Link>

                  {/* Actions & Timestamp */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 pl-15 sm:pl-0 shrink-0 border-t border-slate-100 sm:border-t-0 pt-3 sm:pt-0">
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/inquiries/${inq._id}`}
                        className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-sky-50 hover:text-sky-600"
                      >
                        <span>Open</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      <button
                        onClick={(e) => handleDelete(e, inq._id)}
                        disabled={deletingId === inq._id}
                        className="rounded-xl p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition disabled:opacity-50"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function InquiriesPage() {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-3 border-sky-600 border-t-transparent mb-3" />
          <p className="text-sm font-semibold text-slate-600">Loading…</p>
        </div>
      }
    >
      <InquiriesInner />
    </Suspense>
  );
}

