"use client";

import { useState } from "react";
import { KeyRound, CheckCircle2 } from "lucide-react";

export default function ChangePasswordPage() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
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
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError("Couldn't reach the server. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md">
      <h1 className="text-xl font-bold tracking-tight text-ink">Change password</h1>
      <p className="mt-1 text-sm text-ink-500">
        Update the password used to sign in to this admin panel.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5 rounded-lg bg-white p-6 shadow-panel ring-1 ring-ink-600/10"
      >
        <div>
          <label className="block text-sm font-medium text-ink">Current password</label>
          <input
            required
            type="password"
            autoComplete="current-password"
            value={form.currentPassword}
            onChange={(e) => update("currentPassword", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-ink-600/20 px-3 py-2.5 text-sm text-ink outline-none focus:border-electric-dark focus:ring-2 focus:ring-electric/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink">New password</label>
          <input
            required
            type="password"
            minLength={8}
            autoComplete="new-password"
            value={form.newPassword}
            onChange={(e) => update("newPassword", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-ink-600/20 px-3 py-2.5 text-sm text-ink outline-none focus:border-electric-dark focus:ring-2 focus:ring-electric/20"
            placeholder="At least 8 characters"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink">Confirm new password</label>
          <input
            required
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={(e) => update("confirmPassword", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-ink-600/20 px-3 py-2.5 text-sm text-ink outline-none focus:border-electric-dark focus:ring-2 focus:ring-electric/20"
          />
        </div>

        {error && (
          <p className="rounded-md bg-danger/10 px-3 py-2 text-sm text-danger">{error}</p>
        )}
        {success && (
          <p className="flex items-center gap-2 rounded-md bg-ok/10 px-3 py-2 text-sm text-ok">
            <CheckCircle2 className="h-4 w-4" />
            Password updated.
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-700 disabled:opacity-60"
        >
          <KeyRound className="h-4 w-4" />
          {loading ? "Updating…" : "Update password"}
        </button>
      </form>
    </div>
  );
}
