import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import DiscountGrid from "@/components/discount/DiscountGrid";
import {
  Flame,
  Percent,
  Sparkles,
  ShieldCheck,
  Truck,
  Headphones,
  Tag,
  ArrowRight,
  ShoppingBag,
  PackageOpen,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Special Deals & Discounts | Ahmad ElectroGas",
  description:
    "Explore limited-time promotional deals and discounts on gas water heaters, kitchen hobs, regulators, and accessories from Ahmad ElectroGas Muridwala.",
};

const DEAL_HIGHLIGHTS = [
  {
    icon: Percent,
    title: "Direct Distributor Savings",
    desc: "Up to 40% off on selected seasonal appliances",
  },
  {
    icon: ShieldCheck,
    title: "100% Official Warranty",
    desc: "Standard manufacturer warranty on all sale units",
  },
  {
    icon: Truck,
    title: "Nationwide Safe Delivery",
    desc: "Tracked shipping across Pakistan with secure packaging",
  },
  {
    icon: Headphones,
    title: "Instant WhatsApp Booking",
    desc: "Lock your discounted price with our sales desk in 1 minute",
  },
];

export default async function DiscountPage() {
  await connectDB();

  const discountProducts = await Product.find({ category: "Discount" })
    .sort({ createdAt: -1 })
    .lean()
    .exec();

  // Map to the field names the discount components expect, and convert ObjectId to string.
  const products = discountProducts.map((product) => ({
    ...product,
    _id: product._id.toString(),
    orgprice: product.originalPrice,
    dist: product.discount,
  }));

  return (
    <main className="min-h-screen bg-slate-50/60 pb-20 pt-6 sm:pt-10">
      {/* Decorative Ambient Gradients */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-full -translate-x-1/2 max-w-7xl">
          <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-rose-500/15 blur-3xl" />
          <div className="absolute top-12 right-1/4 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          {/* 1. Hero Deals Banner */}
          <section className="text-center pt-2 sm:pt-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50/90 px-4 py-1.5 text-xs font-semibold text-rose-700 shadow-sm backdrop-blur-sm">
              <Flame className="h-3.5 w-3.5 text-rose-600 animate-pulse" />
              <span>Limited-Time Promotional Deals • Direct Distributor Savings</span>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
              Special Deals &{" "}
              <span className="bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                Discounts
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-base text-slate-600 leading-relaxed">
              Save big on premium gas water heaters, kitchen stoves, precision regulators, and brass fittings. Every discounted product is brand new and covered by our full manufacturer warranty.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/923356599132?text=Hello%20Ahmad%20ElectroGas,%20I%20am%20interested%20in%20your%20discounted%20deals"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-500 active:scale-95"
              >
                <FaWhatsapp className="h-4 w-4" />
                <span>Ask on WhatsApp for Custom Deal</span>
              </a>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-sky-600 active:scale-95"
              >
                <ShoppingBag className="h-4 w-4 text-slate-500" />
                <span>Browse Full Catalog</span>
              </Link>
            </div>
          </section>

          {/* 2. Deal Highlights & Assurance Bar */}
          <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 rounded-3xl border border-slate-200/80 bg-white/95 p-4 sm:p-6 shadow-xl shadow-slate-200/50 backdrop-blur-md">
            {DEAL_HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-center gap-3 rounded-2xl p-2.5 transition-all hover:bg-slate-50/80"
                >
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-100">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="hidden sm:block text-[11px] text-slate-500 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </section>

          {/* 3. Product Counter & Assurance Header */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                  <Tag className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Featured Discounted Products
                  </h2>
                  <p className="text-xs text-slate-500">
                    {products.length} {products.length === 1 ? "Deal" : "Deals"} currently active
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full w-fit">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span className="font-semibold">
                  100% Brand New & Factory Sealed
                </span>
              </div>
            </div>

            {/* 4. Products Grid or Illustrated Empty State */}
            {products.length === 0 ? (
              <div className="rounded-3xl border border-slate-200/80 bg-white p-10 sm:p-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 mb-4">
                  <PackageOpen className="h-8 w-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  No Discount Deals Active Right Now
                </h3>
                <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-slate-500">
                  Our promotional stock refreshes frequently. You can browse our regular product catalog or chat with our team on WhatsApp for custom bulk pricing.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-sky-600/20 transition-all hover:bg-sky-500 active:scale-95"
                  >
                    <span>View All Products</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <DiscountGrid products={products} />
            )}
          </section>

          {/* 5. Bottom Consultation Banner: Bulk / Project Deals */}
          <section className="relative overflow-hidden rounded-3xl border border-rose-900/20 bg-gradient-to-r from-slate-900 via-[#1f1622] to-slate-900 p-6 sm:p-10 text-white shadow-2xl">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-rose-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-amber-500/20 blur-3xl" />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 border border-rose-400/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Wholesale & Project Rates</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                  Need a Bulk Package or Commercial Quotation?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We supply commercial contractors, builders, and retailers with tiered distributor pricing on bulk orders of instant geysers, pipes, and gas fittings.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="https://wa.me/923356599132?text=Hello%20Ahmad%20ElectroGas,%20I%20am%20inquiring%20about%20bulk%20wholesale%20pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-500 active:scale-95"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  <span>Inquire for Bulk Rates</span>
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
                >
                  <span>Contact Sales Desk</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
