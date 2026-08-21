import Link from "next/link";
import { Zap, Flame } from "lucide-react";

export default function SiteNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-600/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-md bg-ink">
            <Zap className="absolute h-4 w-4 text-electric" strokeWidth={2.5} style={{ transform: "translate(-3px,-2px)" }} />
            <Flame className="absolute h-4 w-4 text-gas" strokeWidth={2.5} style={{ transform: "translate(3px,2px)" }} />
          </span>
          <span className="font-mono text-[15px] font-semibold tracking-tight">
            Ahmad<span className="text-electric-dark">Electro</span>
            <span className="text-gas-dark">Gas</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-500 sm:flex">
          <Link href="/" className="hover:text-ink">Home</Link>
          <Link href="/services" className="hover:text-ink">Services</Link>
          <Link href="/contact" className="hover:text-ink">Contact</Link>
        </nav>

        <Link
          href="/contact"
          className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink-700"
        >
          Get a quote
        </Link>
      </div>
    </header>
  );
}
