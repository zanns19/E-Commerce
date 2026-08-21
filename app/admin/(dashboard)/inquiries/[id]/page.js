"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Calendar } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "in_progress", label: "In progress" },
  { value: "resolved", label: "Resolved" },
];

export default function InquiryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/inquiries/${id}`);
      if (res.ok) {
        const data = await res.json();
        setInquiry(data.inquiry);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  async function updateStatus(status) {
    setSaving(true);
    const res = await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const data = await res.json();
      setInquiry(data.inquiry);
    }
    setSaving(false);
  }

  if (loading) {
    return <p className="text-sm text-ink-500">Loading…</p>;
  }

  if (!inquiry) {
    return (
      <div>
        <p className="text-sm text-ink-500">Inquiry not found.</p>
        <Link href="/admin/inquiries" className="mt-3 inline-block text-sm text-electric-dark hover:underline">
          Back to inquiries
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/inquiries"
        className="flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to inquiries
      </Link>

      <div className="mt-4 rounded-lg bg-white p-6 shadow-panel ring-1 ring-ink-600/10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-ink">{inquiry.name}</h1>
            <div className="mt-2 flex flex-col gap-1.5 text-sm text-ink-500">
              <span className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" /> {inquiry.email}
              </span>
              {inquiry.phone && (
                <span className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" /> {inquiry.phone}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(inquiry.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-md bg-mist-100 p-4 text-sm leading-relaxed text-ink">
          {inquiry.message}
        </div>

        <div className="mt-6">
          <label className="block text-xs font-medium uppercase tracking-wide text-ink-500">
            Status
          </label>
          <div className="mt-2 flex gap-2">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateStatus(opt.value)}
                disabled={saving}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition disabled:opacity-50 ${
                  inquiry.status === opt.value
                    ? "bg-ink text-white"
                    : "bg-mist-100 text-ink-500 hover:text-ink"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
