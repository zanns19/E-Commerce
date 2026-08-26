"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Inbox,
  Zap,
  Flame,
  ChevronDown,
  KeyRound,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
];

export default function AdminShell({ admin, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuRef = useRef(null);

  // Close profile menu on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const initials = (admin?.name || "Admin")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const currentNavLabel =
    NAV_ITEMS.find((item) =>
      item.exact ? pathname === item.href : pathname.startsWith(item.href)
    )?.label || "Admin";

  const renderSidebarContent = () => (
    <div className="flex h-full flex-col justify-between bg-slate-900 text-slate-300">
      <div>
        {/* Brand Logo Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-emerald-500 text-white shadow-md shadow-sky-500/20">
              <div className="relative h-5 w-5">
                <Zap
                  className="absolute left-0 top-0 h-3.5 w-3.5 text-white"
                  strokeWidth={2.5}
                />
                <Flame
                  className="absolute bottom-0 right-0 h-3.5 w-3.5 text-amber-300"
                  strokeWidth={2.5}
                />
              </div>
            </div>
            <div>
              <span className="block text-sm font-extrabold tracking-tight text-white leading-none">
                Ahmad<span className="text-sky-400">Electro</span>
                <span className="text-emerald-400">Gas</span>
              </span>
              <span className="block text-[10px] font-semibold tracking-wider text-slate-400 uppercase mt-0.5">
                Admin Portal
              </span>
            </div>
          </Link>

          {/* Close button on mobile drawer */}
          <button
            onClick={() => setMobileNavOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white sm:hidden"
            title="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="px-3 py-6">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <div className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/25"
                      : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"
                  }`}
                >
                  <Icon
                    className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                      active
                        ? "text-white"
                        : "text-slate-400 group-hover:text-slate-100"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-slate-800 p-4 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-xl bg-slate-800/60 px-3.5 py-2.5 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5 text-sky-400" />
            <span>Visit Public Store</span>
          </span>
          <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[10px] text-sky-300 font-bold">
            Live
          </span>
        </Link>

        <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
          <span>Ahmad ElectroGas</span>
          <span>v2.0</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100/70">
      {/* Desktop Fixed Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-800 shadow-xl sm:block">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl">
            {renderSidebarContent()}
          </div>
        </div>
      )}

      {/* Main Content Column */}
      <div className="sm:pl-64 flex min-h-screen flex-col">
        {/* Topbar Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-8 backdrop-blur-md">
          {/* Left: Mobile hamburger & breadcrumb title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 sm:hidden"
              title="Open Navigation"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 hidden sm:inline-block">
                Admin
              </span>
              <span className="text-slate-300 hidden sm:inline-block">/</span>
              <h1 className="text-sm sm:text-base font-bold text-slate-900">
                {currentNavLabel}
              </h1>
            </div>
          </div>

          {/* Right: Quick actions & User profile */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
              <span>Public Store</span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white py-1.5 pl-1.5 pr-2.5 transition-all hover:bg-slate-50 hover:border-slate-300 shadow-xs"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-sky-600 to-emerald-500 font-bold text-xs text-white shadow-xs">
                  {initials}
                </span>
                <span className="hidden text-xs font-bold text-slate-800 sm:inline-block">
                  {admin?.name || "Admin"}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl ring-1 ring-slate-900/5 animate-fade-scale">
                  <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-3">
                    <p className="text-xs font-bold text-slate-900">
                      {admin?.name || "Administrator"}
                    </p>
                    <p className="truncate text-[11px] text-slate-500 mt-0.5">
                      {admin?.email}
                    </p>
                  </div>

                  <div className="p-1.5 space-y-0.5">
                    <Link
                      href="/admin/change-password"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      <KeyRound className="h-4 w-4 text-slate-400" />
                      <span>Change Password</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold text-rose-600 transition hover:bg-rose-50 hover:text-rose-700"
                    >
                      <LogOut className="h-4 w-4 text-rose-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

