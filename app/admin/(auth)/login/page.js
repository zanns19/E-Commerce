"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Flame, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("Couldn't reach the server. Check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="meter-ticks pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative w-full bg-amber-700 max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-ink-800">
            <Zap className="absolute h-5 w-5 text-electric" strokeWidth={2.5} style={{ transform: "translate(-4px,-3px)" }} />
            <Flame className="absolute h-5 w-5 text-gas" strokeWidth={2.5} style={{ transform: "translate(4px,3px)" }} />
          </span>
          <h1 className="font-mono text-lg font-semibold text-white">
            Ahmad<span className="text-electric">Electro</span>
            <span className="text-gas">Gas</span>
          </h1>
          <p className="mt-1 text-sm text-mist-500">Admin panel</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-white/10 bg-ink-800 p-6 shadow-panel"
        >
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-mist-500">
              Email
            </label>
            <input
              required
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-white/10 bg-ink px-3 py-2.5 text-sm text-white outline-none focus:border-electric focus:ring-2 focus:ring-electric/20"
              placeholder="admin@ahmadelectrogas.com"
            />
          </div>

          <div className="mt-4">
            <label className="block text-xs font-medium uppercase tracking-wide text-mist-500">
              Password
            </label>
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-white/10 bg-ink px-3 py-2.5 text-sm text-white outline-none focus:border-electric focus:ring-2 focus:ring-electric/20"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="mt-4 rounded-md bg-danger/10 px-3 py-2 text-sm text-danger">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-electric px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-electric-light disabled:opacity-60"
          >
            <Lock className="h-4 w-4" />
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-mist-500">
          Restricted access — administrators only.
        </p>
      </div>
    </div>
  );
}
