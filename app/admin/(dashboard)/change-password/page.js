"use client";

import { useState } from "react";
import { KeyRound, CheckCircle2, ShieldCheck, Lock, AlertCircle, Loader2 } from "lucide-react";

export default function ChangePasswordPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    if (form.newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      setError("Couldn't reach the server. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl space-y-6 animate-fade-scale">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-sky-700 border border-sky-100 mb-2">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Security Settings</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
          Change Password
        </h1>

        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Update the administrator password used to log in to this control panel.
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6"
      >
        {/* Form Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100 shadow-xs">
            <KeyRound className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Password Credentials
            </h2>
            <p className="text-xs text-slate-500">
              Ensure your new password contains a minimum of 8 characters.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Current Password *
            </label>
            <input
              required
              type="password"
              autoComplete="current-password"
              value={form.currentPassword}
              onChange={(e) => update("currentPassword", e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
              placeholder="••••••••"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              New Password (Min 8 Characters) *
            </label>
            <input
              required
              type="password"
              minLength={8}
              autoComplete="new-password"
              value={form.newPassword}
              onChange={(e) => update("newPassword", e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Confirm New Password *
            </label>
            <input
              required
              type="password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Your administrator password was updated successfully.</span>
          </div>
        )}

        {/* Action Button */}
        <div className="border-t border-slate-100 pt-5 flex items-center justify-between">
          <p className="text-[11px] text-slate-400 hidden sm:block">
            You will use this new password on your next login.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-slate-900/20 transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                <span>Update Password</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}