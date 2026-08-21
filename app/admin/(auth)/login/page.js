"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Flame, Lock, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid email or password.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);

      setError(
        "Couldn't reach the server. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-5 py-10">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_45%)]" />

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      {/* Login content */}
      <section className="relative z-10 w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 shadow-xl">
            <div className="relative h-8 w-8">
              <Zap
                className="absolute left-0 top-0 h-6 w-6 text-blue-400"
                strokeWidth={2.5}
              />

              <Flame
                className="absolute bottom-0 right-0 h-6 w-6 text-orange-400"
                strokeWidth={2.5}
              />
            </div>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-white">
            Ahmad
            <span className="text-blue-400">Electro</span>
            <span className="text-orange-400">Gas</span>
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Administrator portal
          </p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              Sign in to admin panel
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Enter your administrator credentials.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium uppercase tracking-wide text-slate-400"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="admin@ahmadelectrogas.com"
                className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Password */}
            <div className="mt-5">
              <label
                htmlFor="password"
                className="block text-xs font-medium uppercase tracking-wide text-slate-400"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="••••••••"
                className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Sign in
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Restricted access — administrators only.
        </p>
      </section>
    </main>
  );
}