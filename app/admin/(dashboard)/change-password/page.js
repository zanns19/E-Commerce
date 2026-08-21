"use client";

import { useState } from "react";
import { KeyRound, CheckCircle2, ShieldCheck } from "lucide-react";

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
      setError("New password and confirmation don't match.");
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
    } catch (err) {
      setError("Couldn't reach the server. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-xl">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
          <ShieldCheck className="h-4 w-4" />
          Account security
        </div>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink">
          Change password
        </h1>

        <p className="mt-1.5 text-sm leading-6 text-ink-500">
          Update the password used to sign in to this admin panel.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-7 rounded-xl bg-mist-50 p-6 shadow-sm ring-1 ring-ink-600/10 sm:p-7"
      >
        {/* Form Header */}
        <div className="mb-6 flex items-start gap-3 border-b border-ink-600/10 pb-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-ink shadow-sm ring-1 ring-ink-600/10">
            <KeyRound className="h-4.5 w-4.5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-ink">
              Password credentials
            </h2>

            <p className="mt-0.5 text-xs leading-5 text-ink-400">
              Choose a strong password with at least 8 characters.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-semibold text-ink">
              Current password
            </label>

            <input
              required
              type="password"
              autoComplete="current-password"
              value={form.currentPassword}
              onChange={(e) => update("currentPassword", e.target.value)}
              className="mt-2 w-full rounded-lg border border-ink-600/15 bg-white px-3.5 py-2.75 text-sm text-ink shadow-sm outline-none transition placeholder:text-ink-300 focus:border-electric-dark focus:ring-3 focus:ring-electric/10"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold text-ink">
              New password
            </label>

            <input
              required
              type="password"
              minLength={8}
              autoComplete="new-password"
              value={form.newPassword}
              onChange={(e) => update("newPassword", e.target.value)}
              className="mt-2 w-full rounded-lg border border-ink-600/15 bg-white px-3.5 py-2.75 text-sm text-ink shadow-sm outline-none transition placeholder:text-ink-300 focus:border-electric-dark focus:ring-3 focus:ring-electric/10"
              placeholder="At least 8 characters"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-ink">
              Confirm new password
            </label>

            <input
              required
              type="password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              className="mt-2 w-full rounded-lg border border-ink-600/15 bg-white px-3.5 py-2.75 text-sm text-ink shadow-sm outline-none transition placeholder:text-ink-300 focus:border-electric-dark focus:ring-3 focus:ring-electric/10"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 flex items-start gap-2 rounded-lg bg-danger/10 px-3.5 py-3 text-sm text-danger ring-1 ring-danger/10">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger" />
            <p>{error}</p>
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mt-5 flex items-center gap-2 rounded-lg bg-ok/10 px-3.5 py-3 text-sm text-ok ring-1 ring-ok/10">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <p>Password updated.</p>
          </div>
        )}

        {/* Submit */}
        <div className="mt-6 flex items-center justify-between border-t border-ink-600/10 pt-5">
          <p className="hidden text-xs text-ink-400 sm:block">
            Your new password will be used for future sign-ins.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-black shadow-sm transition-all hover:bg-ink-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            <KeyRound className="h-4 w-4" />
            {loading ? "Updating…" : "Update password"}
          </button>
        </div>
      </form>
    </div>
  );
}