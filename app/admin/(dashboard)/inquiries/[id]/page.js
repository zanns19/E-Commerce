"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  CheckCircle2,
  Clock,
  Send,
  Loader2,
  User,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const STATUS_OPTIONS = [
  { value: "new", label: "New & Unread", color: "bg-rose-50 text-rose-700 ring-rose-200" },
  { value: "in_progress", label: "In Progress", color: "bg-sky-50 text-sky-700 ring-sky-200" },
  { value: "resolved", label: "Resolved", color: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
];

export default function InquiryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/inquiries/${id}`);
        if (res.ok) {
          const data = await res.json();
          setInquiry(data.inquiry);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function updateStatus(status) {
    setSaving(true);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        setInquiry(data.inquiry);
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-16 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-3 border-sky-600 border-t-transparent mb-3" />
        <p className="text-sm font-semibold text-slate-600">Loading inquiry details…</p>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="p-12 text-center rounded-3xl border border-slate-200 bg-white shadow-sm max-w-xl mx-auto">
        <p className="text-base font-bold text-slate-900">Inquiry not found</p>
        <p className="text-xs text-slate-500 mt-1">This message may have been deleted.</p>
        <Link
          href="/admin/inquiries"
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Inquiries</span>
        </Link>
      </div>
    );
  }

  const cleanPhone = inquiry.phone ? inquiry.phone.replace(/[^0-9]/g, "") : "";
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone.startsWith("0") ? "92" + cleanPhone.slice(1) : cleanPhone}?text=${encodeURIComponent(
        `Assalam-o-Alaikum ${inquiry.name}, thank you for contacting Ahmad ElectroGas regarding your inquiry.`
      )}`
    : null;

  return (
    <div className="max-w-3xl space-y-6 animate-fade-scale">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/inquiries"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Inquiries</span>
        </Link>

        <span className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          <span>Received on {new Date(inquiry.createdAt).toLocaleString()}</span>
        </span>
      </div>

      {/* Main Details Card */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        {/* Customer Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-600 font-black text-xl text-white shadow-md shadow-sky-600/20">
              {inquiry.name?.charAt(0)?.toUpperCase() || "C"}
            </div>

            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                {inquiry.name}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Customer Message Submission
              </p>
            </div>
          </div>

          {/* Quick Contact Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm shadow-emerald-600/20 transition hover:bg-emerald-500 active:scale-95"
              >
                <FaWhatsapp className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>
            )}

            {inquiry.email && (
              <a
                href={`mailto:${inquiry.email}?subject=${encodeURIComponent(
                  "Response from Ahmad ElectroGas"
                )}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span>Send Email</span>
              </a>
            )}
          </div>
        </div>

        {/* Contact Info Pills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <Mail className="h-4 w-4 text-sky-600 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Email Address</span>
              <a href={`mailto:${inquiry.email}`} className="font-semibold text-slate-900 hover:underline">
                {inquiry.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-700">
            <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone / WhatsApp</span>
              <span className="font-semibold text-slate-900">
                {inquiry.phone || "Not provided"}
              </span>
            </div>
          </div>
        </div>

        {/* Message Content Body */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Customer Message
          </label>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 text-sm leading-relaxed text-slate-800 shadow-inner">
            {inquiry.message}
          </div>
        </div>

        {/* Status Switcher Bar */}
        <div className="border-t border-slate-100 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Inquiry Status
              </span>
              <span className="text-[11px] text-slate-400">
                Click a status to update inquiry state
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {STATUS_OPTIONS.map((opt) => {
                const isCurrent = inquiry.status === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => updateStatus(opt.value)}
                    disabled={saving}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all disabled:opacity-50 ${
                      isCurrent
                        ? "bg-slate-900 text-white shadow-sm"
                        : "border border-slate-200 bg-slate-50/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {isCurrent && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

