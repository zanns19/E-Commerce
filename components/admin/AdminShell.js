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
  const menuRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const initials = (admin?.name || "A")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-mist-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-ink-600/10 bg-ink sm:flex">
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-md bg-ink-800">
            <Zap className="absolute h-4 w-4 text-electric" strokeWidth={2.5} style={{ transform: "translate(-3px,-2px)" }} />
            <Flame className="absolute h-4 w-4 text-gas" strokeWidth={2.5} style={{ transform: "translate(3px,2px)" }} />
          </span>
          <span className="font-mono text-sm font-semibold text-white">
            Ahmad<span className="text-electric">Electro</span>
            <span className="text-gas">Gas</span>
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          {NAV_ITEMS.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-mist-500 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4 font-mono text-[11px] text-mist-500">
          Admin Panel v1.0
        </div>
      </aside>

      {/* Main column */}
      <div className="sm:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-ink-600/10 bg-white px-6">
          <p className="text-sm font-medium text-ink-500">
            {NAV_ITEMS.find((item) =>
              item.exact ? pathname === item.href : pathname.startsWith(item.href)
            )?.label || "Admin"}
          </p>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2.5 rounded-md py-1.5 pl-1.5 pr-2.5 transition hover:bg-mist-100"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-mono text-xs font-semibold text-white">
                {initials}
              </span>
              <span className="text-sm font-medium text-ink">{admin?.name}</span>
              <ChevronDown className="h-4 w-4 text-ink-500" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-md border border-ink-600/10 bg-white shadow-panel">
                <div className="border-b border-ink-600/10 px-4 py-3">
                  <p className="text-sm font-medium text-ink">{admin?.name}</p>
                  <p className="truncate text-xs text-ink-500">{admin?.email}</p>
                </div>
                <Link
                  href="/admin/change-password"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink hover:bg-mist-100"
                >
                  <KeyRound className="h-4 w-4 text-ink-500" />
                  Change password
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-danger hover:bg-danger/5"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
