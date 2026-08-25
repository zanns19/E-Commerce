"use client";

import { useState } from "react";
import {
  Send,
  RotateCcw,
  User,
  Mail,
  HelpCircle,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";

const INQUIRY_TOPICS = [
  "Product & Pricing",
  "Order & Delivery Status",
  "Warranty & Service",
  "Showroom Visit",
  "Bulk / Wholesale Deal",
  "General Inquiry",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTopicSelect = (topic) => {
    setForm((prev) => ({
      ...prev,
      subject: topic,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been received. Our team will get back to you shortly.",
        });

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to send message. Please check the fields and try again.",
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "Network error. Please check your connection or contact us via WhatsApp.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setStatus({ type: null, message: "" });
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-200/50">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Direct Contact Form</span>
        </div>
        <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Send Us a Message
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Have questions regarding appliances, spare parts, or custom orders? Fill out the details below and we will respond promptly.
        </p>
      </div>

      {/* Quick Topic Selection Pills */}
      <div className="mb-6">
        <label className="mb-2.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
          Select Inquiry Topic (Optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {INQUIRY_TOPICS.map((topic) => {
            const isSelected = form.subject === topic;
            return (
              <button
                key={topic}
                type="button"
                onClick={() => handleTopicSelect(topic)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  isSelected
                    ? "bg-sky-600 text-white shadow-sm shadow-sky-600/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </div>

      {/* Inline Feedback Banner */}
      {status.type && (
        <div
          className={`mb-6 flex items-start gap-3 rounded-2xl p-4 text-sm animate-fade-scale ${
            status.type === "success"
              ? "border border-emerald-200 bg-emerald-50/80 text-emerald-800"
              : "border border-rose-200 bg-rose-50/80 text-rose-800"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="font-semibold">
              {status.type === "success" ? "Message Sent!" : "Unable to send"}
            </p>
            <p className="mt-0.5 text-xs sm:text-sm opacity-90">{status.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name and Email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="contact-name"
              className="text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <User className="h-4 w-4" />
              </div>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Muhammad Ahmad"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pr-4 pl-10 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="contact-email"
              className="text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pr-4 pl-10 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10"
              />
            </div>
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-1.5">
          <label
            htmlFor="contact-subject"
            className="text-xs font-bold uppercase tracking-wider text-slate-700"
          >
            Subject / Inquiry Purpose <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <HelpCircle className="h-4 w-4" />
            </div>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              placeholder="e.g. Price inquiry for Gas Water Heater"
              required
              value={form.subject}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pr-4 pl-10 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10"
            />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="contact-message"
              className="text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              Your Message <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">
              {form.message.length} characters
            </span>
          </div>
          <div className="relative">
            <textarea
              id="contact-message"
              rows={5}
              name="message"
              placeholder="Please provide details regarding the product model, inquiry, or delivery address..."
              required
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-900 placeholder:text-slate-400 transition-all resize-y min-h-[120px] focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-600/25 transition-all hover:bg-sky-500 hover:shadow-sky-600/35 active:scale-95 disabled:pointer-events-none disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95 disabled:opacity-50"
          >
            <RotateCcw className="h-4 w-4 text-slate-500" />
            <span>Reset</span>
          </button>
        </div>

        {/* Trust & Privacy Notice */}
        <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>
            Your information is encrypted, strictly private, and only used to answer your inquiry.
          </span>
        </div>
      </form>
    </div>
  );
}