"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Trash2 } from "lucide-react";

const STATUS_STYLE = {
  new: "bg-danger/10 text-danger",
  in_progress: "bg-electric/10 text-electric-dark",
  resolved: "bg-ok/10 text-ok",
};

function InquiriesInner() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get("status") || "";

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const qs = statusFilter ? `?status=${statusFilter}` : "";
    const res = await fetch(`/api/inquiries${qs}`);
    const data = await res.json();
    setInquiries(data.inquiries || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  async function handleDelete(id) {
    if (!confirm("Delete this inquiry? This can't be undone.")) return;
    await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
    setInquiries((list) => list.filter((i) => i._id !== id));
  }

  const filters = [
    { value: "", label: "All" },
    { value: "new", label: "New" },
    { value: "in_progress", label: "In progress" },
    { value: "resolved", label: "Resolved" },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight text-ink">Inquiries</h1>
      <p className="mt-1 text-sm text-ink-500">
        Messages submitted through the public contact form.
      </p>

      <div className="mt-5 flex gap-2">
        {filters.map((f) => (
          <Link
            key={f.value}
            href={f.value ? `/admin/inquiries?status=${f.value}` : "/admin/inquiries"}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${
              statusFilter === f.value
                ? "bg-ink text-white"
                : "bg-white text-ink-500 ring-1 ring-ink-600/15 hover:text-ink"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-lg bg-white shadow-panel ring-1 ring-ink-600/10">
        {loading ? (
          <p className="px-5 py-10 text-center text-sm text-ink-500">Loading…</p>
        ) : inquiries.length === 0 ? (
          <p className="px-5 py-14 text-center text-sm text-ink-500">
            No inquiries here.
          </p>
        ) : (
          <ul className="divide-y divide-ink-600/10">
            {inquiries.map((inq) => (
              <li key={inq._id} className="flex items-center justify-between px-5 py-4 hover:bg-mist-100">
                <Link href={`/admin/inquiries/${inq._id}`} className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-medium text-ink">{inq.name}</p>
                    <span className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${STATUS_STYLE[inq.status]}`}>
                      {inq.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-ink-500">
                    {inq.email} · {inq.message}
                  </p>
                </Link>
                <div className="flex items-center gap-4 pl-4">
                  <span className="whitespace-nowrap font-mono text-xs text-ink-500">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(inq._id)}
                    className="text-ink-500 hover:text-danger"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function InquiriesPage() {
  return (
    <Suspense fallback={<p className="text-sm text-ink-500">Loading…</p>}>
      <InquiriesInner />
    </Suspense>
  );
}
