"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Gulzar } from "next/font/google";
import {
  Building2,
  Factory,
  Store,
  MapPin,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Flame,
  Truck,
  HeartHandshake,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const gulzar = Gulzar({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-gulzar",
});

const TIMELINE = [
  {
    year: "1992",
    title: "The Inception & Vision",
    text: "Ahmad ElectroGas embarked on its journey in 1992, starting as a dedicated distribution business in Muridwala with an unyielding passion for delivering quality gas appliances and honest trade to the community.",
    badge: "Foundation",
  },
  {
    year: "2005",
    title: "Authorized Brand Dealerships",
    text: "Over the next decade, after 2005 we solidified our foundation and expanded our reach. A significant milestone came when we became the authorized dealer for two renowned national appliance brands.",
    badge: "Expansion",
  },
  {
    year: "2020",
    title: "Leading Distributor Status",
    text: "After three decades of unwavering customer trust, Ahmad ElectroGas evolved into a leading distributor of Home & Gas Appliances, partnering with multiple esteemed companies and manufacturing lines.",
    badge: "Milestone",
  },
  {
    year: "2025",
    title: "Digital Storefront & Nationwide Delivery",
    text: "Now continuing to innovate, we launched our official digital platform, enabling customers across Pakistan to browse authentic products and receive safe delivery straight to their doorstep.",
    badge: "Digital Era",
  },
];

const COMPANY_STATS = [
  {
    icon: Store,
    value: "3+",
    label: "Company Showrooms",
    desc: "Displaying full ranges of kitchen and gas appliances",
  },
  {
    icon: Factory,
    value: "1",
    label: "Manufacturing & Assembly Plant",
    desc: "Strict quality control & precision fitting testing",
  },
  {
    icon: Award,
    value: "100+",
    label: "Exhibitions & Trade Fairs",
    desc: "Demonstrating innovative kitchen & heating gear",
  },
  {
    icon: MapPin,
    value: "Muridwala",
    label: "Head Office & Main Hub",
    desc: "Main Rajana Road, District Faisalabad, Pakistan",
  },
];

const CORE_VALUES = [
  {
    icon: HeartHandshake,
    title: "Integrity & Fair Measurement",
    desc: "Operating strictly on the Islamic principle of honesty and full transparency in every transaction.",
  },
  {
    icon: ShieldCheck,
    title: "100% Genuine Appliances",
    desc: "Authorized partnerships ensuring genuine manufacturer warranty cards and original spare parts.",
  },
  {
    icon: Truck,
    title: "Nationwide Safe Delivery",
    desc: "Heavy-duty packaging and trusted transport networks delivering safely across all of Pakistan.",
  },
  {
    icon: Flame,
    title: "Safety & Efficiency First",
    desc: "Gas geysers, hobs, and fittings tested rigorously for pressure safety and maximum fuel efficiency.",
  },
];

export default function AboutPage() {
  const [activeYear, setActiveYear] = useState("1992");

  return (
    <main className="min-h-screen bg-slate-50/60 pb-20 pt-6 sm:pt-10">
      {/* Decorative Ambient Gradients */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-full -translate-x-1/2 max-w-7xl">
          <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl" />
          <div className="absolute top-12 right-1/4 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {/* 1. Hero Urdu Welcome Header */}
          <section className="text-center pt-4 sm:pt-8">
            {/* Heritage Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/90 px-4 py-1.5 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-sky-500 animate-pulse" />
              <span>Established in 1992 • Over 3 Decades of Excellence</span>
            </div>

            {/* Urdu Welcome Banner */}
            <div className="mt-6 mx-auto max-w-4xl rounded-3xl border border-sky-100 bg-gradient-to-b from-white via-sky-50/40 to-white p-6 sm:p-10 shadow-xl shadow-sky-900/5">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-relaxed text-sky-700 tracking-normal">
                <span className={`${gulzar.className} block py-2`}>
                  خُوش آمدید اَحمد الیکٹرو گیس مریدوالا
                </span>
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xs sm:text-base text-slate-600 font-medium">
                Distributors of Premium Home, Gas & Electrical Appliances across Pakistan
              </p>
            </div>
          </section>

          {/* 2. Quranic Ethical Foundation Card */}
          <section className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-[#061523] via-[#092237] to-[#061523] p-6 sm:p-10 text-white shadow-2xl shadow-black/30">
              <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-sky-500/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl" />

              <div className="relative text-center space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-300">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Our Guiding Islamic Principle</span>
                </div>

                <div className="py-3">
                  <p
                    dir="rtl"
                    className={`${gulzar.className} text-xl sm:text-3xl md:text-4xl text-amber-200/95 font-medium leading-relaxed`}
                  >
                    تباہی ہے اُن لوگوں کے لیے جو ناپ تول میں کمی کرتے ہیں
                  </p>
                  <p
                    dir="rtl"
                    className={`${gulzar.className} text-sm sm:text-lg text-sky-300 font-bold mt-3`}
                  >
                    (سورۃ المطففین 83:1)
                  </p>
                </div>

                <div className="mx-auto max-w-xl border-t border-slate-700/60 pt-4">
                  <p className="text-xs sm:text-sm text-slate-300 font-medium">
                    At Ahmad ElectroGas, fair trade, honesty in specification, and genuine customer trust form the cornerstone of every product we sell.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Company Story: The Clear Choice */}
          <section className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/40">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Facility Image */}
              <div className="lg:col-span-5">
                <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-lg transition-all duration-300 hover:shadow-2xl">
                  <img
                    src="/aboutlogo.png"
                    alt="Ahmad ElectroGas Facility"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block rounded-full bg-sky-600/90 px-3 py-1 text-xs font-bold text-white shadow-sm backdrop-blur-sm">
                      30+ Years Industry Experience
                    </span>
                    <p className="mt-1 text-xs text-slate-200">
                      Main Showroom & Distribution Center • Muridwala
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative & Stats */}
              <div className="space-y-6 lg:col-span-7">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>Who We Are</span>
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                    The Clear Choice for Modern Kitchens & Homes
                  </h2>
                </div>

                <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                  <p>
                    <strong className="text-slate-900 font-semibold">Ahmad ElectroGas</strong>, with its trusted presence in Pakistani households for more than three decades, has constantly endeavored to provide homemakers and builders with cutting-edge appliance technology, making cooking and home comfort a luxurious, hassle-free experience.
                  </p>
                  <p>
                    Our vast network of authorized dealers and dedicated service centers across the country ensures dependable after-sales support and utmost consumer satisfaction.
                  </p>
                  <p>
                    Every product we supply promises energy efficiency, durability, and safety—fulfilling our commitment as one of the most reliable household names in Punjab and nationwide.
                  </p>
                </div>

                {/* Company Assets Stats 2x2 Grid */}
                <div className="grid gap-3 sm:grid-cols-2 pt-2">
                  {COMPANY_STATS.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={stat.label}
                        className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition-all hover:bg-white hover:shadow-md hover:border-sky-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-lg font-extrabold text-slate-900 leading-none">
                              {stat.value}
                            </p>
                            <p className="text-xs font-bold text-slate-700 mt-0.5">
                              {stat.label}
                            </p>
                          </div>
                        </div>
                        <p className="mt-2 text-[11px] text-slate-500">{stat.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* 4. Interactive Timeline: History of Ahmad ElectroGas */}
          <section className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/40">
            <div className="mx-auto max-w-2xl text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3.5 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
                <Calendar className="h-3.5 w-3.5" />
                <span>Our Heritage & Evolution</span>
              </div>
              <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                History of Ahmad ElectroGas
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                Explore the key milestones that shaped our three decades of excellence and customer trust.
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Interactive Milestones */}
              <div className="space-y-3 lg:col-span-7">
                {TIMELINE.map((item) => {
                  const isActive = activeYear === item.year;
                  return (
                    <div
                      key={item.year}
                      className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                        isActive
                          ? "border-sky-400 bg-sky-50/50 shadow-md shadow-sky-500/5 ring-1 ring-sky-300"
                          : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                      }`}
                      onClick={() => setActiveYear(item.year)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold transition-colors ${
                              isActive
                                ? "bg-sky-600 text-white shadow-sm shadow-sky-600/30"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {item.year.slice(2)}
                          </span>
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900">
                              {item.year} — {item.title}
                            </h3>
                          </div>
                        </div>

                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            isActive
                              ? "bg-sky-100 text-sky-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {item.badge}
                        </span>
                      </div>

                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isActive
                            ? "max-h-40 pt-3 opacity-100"
                            : "max-h-0 pt-0 opacity-0"
                        }`}
                      >
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Heritage Image Frame */}
              <div className="lg:col-span-5">
                <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-lg">
                  <img
                    src="/logo.jpg"
                    alt="Ahmad ElectroGas Heritage"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block rounded-full bg-emerald-600/90 px-3 py-1 text-xs font-bold text-white shadow-sm backdrop-blur-sm">
                      Authentic Craftsmanship
                    </span>
                    <p className="mt-1 text-xs text-slate-200">
                      Muridwala Headquarters & Showroom
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Core Values Grid */}
          <section className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/40">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                What Sets Us Apart
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
                Our Core Pillars of Service
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {CORE_VALUES.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 transition-all hover:bg-white hover:border-sky-200 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1.5">
                      {val.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 6. Call to Action Banner */}
          <section className="relative overflow-hidden rounded-3xl border border-sky-900/20 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-8 sm:p-12 text-white shadow-2xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent" />

            <div className="relative flex flex-col items-center text-center max-w-3xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-sky-300 backdrop-blur-sm">
                <Store className="h-3.5 w-3.5" />
                <span>Visit Our Main Showroom</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Experience Our Appliances in Person
              </h2>

              <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
                Visit us at Main Rajana Road, Muridwala, District Faisalabad, or connect directly with our appliance advisors on WhatsApp for live video demonstrations and pricing.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href="https://wa.me/923356599132?text=Hello%20Ahmad%20ElectroGas,%20I%20would%20like%20to%20learn%20more%20about%20your%20products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-500 active:scale-95"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-slate-900 shadow-md transition-all hover:bg-slate-100 active:scale-95"
                >
                  <span>Contact & Showroom Info</span>
                  <ArrowRight className="h-4 w-4 text-sky-600" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
