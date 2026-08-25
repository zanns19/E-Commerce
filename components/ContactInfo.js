"use client";

import {
  MapPin,
  Phone,
  Clock3,
  Mail,
  ArrowUpRight,
} from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Main Showroom & Office */}
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10">
        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-sky-500/5 transition-all duration-300 group-hover:scale-150 group-hover:bg-sky-500/10" />

        <div className="relative">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100 transition-colors group-hover:bg-sky-600 group-hover:text-white">
            <MapPin className="h-6 w-6" />
          </div>

          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Main Showroom</h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
              Head Office
            </span>
          </div>

          <p className="text-sm font-medium text-slate-700">Main Rajana Road, Muridwala</p>
          <p className="text-xs text-slate-500 mt-0.5">District Faisalabad, Punjab, Pakistan</p>

          <a
            href="https://maps.google.com/?q=Ahmad+Gas+Center+Muridwala"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
          >
            Get Directions
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* 2. Direct Phone / Helpline */}
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10">
        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-emerald-500/5 transition-all duration-300 group-hover:scale-150 group-hover:bg-emerald-500/10" />

        <div className="relative">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
            <Phone className="h-6 w-6" />
          </div>

          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Phone Support</h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Quick Call
            </span>
          </div>

          <div className="space-y-1.5 text-sm">
            <a
              href="tel:+923350729306"
              className="flex items-center justify-between font-medium text-slate-700 hover:text-emerald-600 transition-colors"
            >
              <span>+92 335 0729306</span>
              <span className="text-xs text-slate-400">Sales</span>
            </a>
            <a
              href="tel:+923356599132"
              className="flex items-center justify-between font-medium text-slate-700 hover:text-emerald-600 transition-colors"
            >
              <span>+92 335 6599132</span>
              <span className="text-xs text-slate-400">Support</span>
            </a>
          </div>

          <a
            href="tel:+923356599132"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Call Directly Now
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* 3. Official Email Addresses */}
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10">
        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-violet-500/5 transition-all duration-300 group-hover:scale-150 group-hover:bg-violet-500/10" />

        <div className="relative">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100 transition-colors group-hover:bg-violet-600 group-hover:text-white">
            <Mail className="h-6 w-6" />
          </div>

          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Email Inquiries</h3>
            <span className="inline-flex items-center rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-700">
              24h Reply
            </span>
          </div>

          <div className="space-y-1 text-xs">
            <a
              href="mailto:ahmadhassanmufti@gmail.com"
              className="block truncate font-medium text-slate-700 hover:text-violet-600 transition-colors"
              title="ahmadhassanmufti@gmail.com"
            >
              ahmadhassanmufti@gmail.com
            </a>
            <a
              href="mailto:ahmadhassanmufti015@gmail.com"
              className="block truncate font-medium text-slate-700 hover:text-violet-600 transition-colors"
              title="ahmadhassanmufti015@gmail.com"
            >
              ahmadhassanmufti015@gmail.com
            </a>
          </div>

          <a
            href="mailto:ahmadhassanmufti@gmail.com?subject=Appliance%20Inquiry%20-%20Ahmad%20ElectroGas"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors"
          >
            Compose Email
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* 4. Showroom & Support Hours */}
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-500/10">
        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-amber-500/5 transition-all duration-300 group-hover:scale-150 group-hover:bg-amber-500/10" />

        <div className="relative">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100 transition-colors group-hover:bg-amber-600 group-hover:text-white">
            <Clock3 className="h-6 w-6" />
          </div>

          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Working Hours</h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
              Open 7 Days
            </span>
          </div>

          <div className="space-y-1 text-xs text-slate-600">
            <div className="flex items-center justify-between font-medium">
              <span className="text-slate-800">Mon - Sun</span>
              <span className="text-slate-600">8:00 AM - 6:00 PM</span>
            </div>
            <div className="flex items-center justify-between font-medium">
              <span className="text-slate-800">Friday</span>
              <span className="text-slate-600">8:00 AM - 12:00 PM</span>
            </div>
          </div>

          <p className="mt-4 text-[11px] font-medium text-slate-400">
            Showroom open for direct product inspection & instant pickup
          </p>
        </div>
      </div>
    </div>
  );
}