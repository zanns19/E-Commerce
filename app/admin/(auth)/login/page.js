"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Flame, Lock, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";

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
        setError(data.error || "Invalid email or password credentials.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError(
        "Couldn't reach the authentication server. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      {/* Ambient Lighting Gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      {/* Login Container */}
      <section className="relative z-10 w-full max-w-md animate-fade-scale">
        {/* Back to store link */}
        <div className="mb-6 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/80 px-3.5 py-1.5 text-xs font-semibold text-slate-400 backdrop-blur-md transition hover:border-slate-700 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Storefront</span>
          </Link>
        </div>

        {/* Brand Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 shadow-2xl shadow-sky-500/10">
            <div className="relative h-8 w-8">
              <Zap
                className="absolute left-0 top-0 h-6 w-6 text-sky-400 drop-shadow-md"
                strokeWidth={2.5}
              />
              <Flame
                className="absolute bottom-0 right-0 h-6 w-6 text-amber-400 drop-shadow-md"
                strokeWidth={2.5}
              />
            </div>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white">
            Ahmad<span className="text-sky-400">Electro</span>
            <span className="text-emerald-400">Gas</span>
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Store Administrator Control Center
          </p>
        </div>

        {/* Glassmorphic Login Card */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white">
              Administrator Sign In
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Enter your authorized email and password to access the panel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-slate-300"
              >
                Email Address
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
                className="mt-1.5 block w-full rounded-xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 disabled:opacity-50"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-slate-300"
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
                className="mt-1.5 block w-full rounded-xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 disabled:opacity-50"
              />
            </div>

            {/* Error Banner */}
            {error && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs font-semibold text-rose-300">
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-600/25 transition hover:from-sky-500 hover:to-blue-500 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Security Footer Notice */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 text-slate-400" />
          <span>Authorized personnel access only • Session secured</span>
        </div>
      </section>
    </main>
  );
}