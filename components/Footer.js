"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  ShieldCheck,
  Zap,
  Flame,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaGithub,
} from "react-icons/fa";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const pathname = usePathname();

  // Don't render storefront footer on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="relative border-t border-slate-800 bg-[#07131E] text-slate-300">
      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        {/* Quick WhatsApp Support Banner */}
        <div className="mb-12 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 p-6 sm:p-8 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sky-400">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Live Customer Assistance
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Need Help Choosing the Right Appliance?
              </h3>
              <p className="max-w-2xl text-xs sm:text-sm text-slate-400">
                Our technicians and sales team are available on WhatsApp to answer questions, confirm product availability, and guide your installation.
              </p>
            </div>

            <a
              href="https://wa.me/923356599132"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:bg-emerald-500 hover:shadow-emerald-600/30 active:scale-95 shrink-0"
            >
              <FaWhatsapp className="h-5 w-5" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 pb-12">
          
          {/* Column 1: Brand & About (5 cols) */}
          <div className="space-y-5 lg:col-span-4">
            <Link href="/" className="group flex items-center gap-3 w-fit">
              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-900 shadow-md">
                <Image
                  src="/nav.png"
                  alt="Ahmad ElectroGas Logo"
                  width={44}
                  height={44}
                  className="object-cover transition-transform duration-500 group-hover:rotate-180"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white leading-none">
                  Ahmad <span className="text-sky-400">Electro</span>
                  <span className="text-amber-400">Gas</span>
                </span>
                <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase mt-0.5">
                  Appliances &amp; Fittings
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-400 max-w-sm">
              Trusted supplier of premium gas appliances, instant geysers, kitchen stoves, valves, regulators, and high-quality electrical fittings in Faisalabad &amp; across Pakistan.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 transition-colors hover:border-blue-500/50 hover:bg-blue-600 hover:text-white"
                aria-label="Facebook"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 transition-colors hover:border-pink-500/50 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-500 hover:text-white"
                aria-label="Instagram"
              >
                <FaInstagram className="h-4 w-4" />
              </a>

              <a
                href="https://wa.me/923356599132"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 transition-colors hover:border-emerald-500/50 hover:bg-emerald-600 hover:text-white"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-4 w-4" />
              </a>

              <a
                href="https://github.com/zanns19"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 transition-colors hover:border-slate-600 hover:bg-white hover:text-slate-900"
                aria-label="GitHub"
              >
                <FaGithub className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Categories (3 cols) */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Product Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/products"
                  className="flex items-center gap-1.5 text-slate-400 transition hover:text-sky-400 hover:translate-x-0.5"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                  <span>Kitchen Appliances</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="flex items-center gap-1.5 text-slate-400 transition hover:text-sky-400 hover:translate-x-0.5"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                  <span>Instant Gas Geysers</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="flex items-center gap-1.5 text-slate-400 transition hover:text-sky-400 hover:translate-x-0.5"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                  <span>Gas Regulators &amp; Valves</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="flex items-center gap-1.5 text-slate-400 transition hover:text-sky-400 hover:translate-x-0.5"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                  <span>Fittings &amp; Accessories</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/discount"
                  className="flex items-center gap-1.5 text-amber-400 font-semibold transition hover:text-amber-300 hover:translate-x-0.5"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-amber-500" />
                  <span>Special Discount Deals</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links (2 cols) */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="text-slate-400 transition hover:text-sky-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-400 transition hover:text-sky-400">
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/discount" className="text-slate-400 transition hover:text-sky-400">
                  Deals &amp; Offers
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 transition hover:text-sky-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 transition hover:text-sky-400">
                  Contact Us
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Column 4: Contact & Showroom (3 cols) */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact &amp; Showroom
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                <a
                  href="tel:+923356599132"
                  className="transition hover:text-sky-400"
                >
                  +92 335 6599132
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                <a
                  href="mailto:ahmadhassanmufti@gmail.com"
                  className="transition hover:text-sky-400 break-all"
                >
                  ahmadhassanmufti@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Main Rajana Road, Muridwala, Faisalabad, Pakistan</span>
              </li>

              <li className="flex items-start gap-2.5 text-slate-500 text-xs">
                <Clock className="h-3.5 w-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>Mon – Sat: 9:00 AM – 9:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
          <p className="text-center sm:text-left">
            © {currentYear} <span className="font-semibold text-slate-300">Ahmad ElectroGas</span>. All rights reserved.
          </p>

          <p className="text-center sm:text-right">
            Developed with excellence by{" "}
            <a
              href="https://github.com/zanns19"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sky-400 transition hover:text-sky-300 underline underline-offset-2"
            >
              Zuhair Anns Anwar
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}