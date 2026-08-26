"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";
import ProductRating from "./ProductRating";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductCard({
  product,
  badge,
  badgeColor,
  variant = "default",
}) {
  if (!product) return null;

  const discountPercent =
    product.discount || product.dist || (variant === "discount" ? 10 : 0);
  const originalPrice = product.originalPrice || product.orgprice;
  const price = Number(product.price) || 0;
  const numOriginalPrice = originalPrice ? Number(originalPrice) : null;
  const savings =
    numOriginalPrice && numOriginalPrice > price
      ? numOriginalPrice - price
      : null;

  const categoryName = product.category || "Appliance";

  return (
    <div className="group relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10 dark:border-slate-800 dark:bg-slate-900">
      {/* Top Media Section */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-slate-50/80 via-slate-50 to-slate-100/70 border-b border-slate-100 dark:from-slate-800/80 dark:via-slate-800 dark:to-slate-900/80 dark:border-slate-800">
        {/* Top-Left Badge (Category or Custom Badge) */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
          {badge ? (
            <span
              className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold shadow-xs backdrop-blur-md ${
                badgeColor || "bg-sky-600 text-white"
              }`}
            >
              {badge}
            </span>
          ) : (
            <span className="inline-flex items-center rounded-lg bg-white/90 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-slate-700 shadow-xs backdrop-blur-md border border-slate-200/60 dark:bg-slate-800/90 dark:text-slate-200 dark:border-slate-700/60">
              {categoryName}
            </span>
          )}
        </div>

        {/* Top-Right Badge (Discount or Featured) */}
        {discountPercent > 0 ? (
          <span className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-rose-600 to-red-500 px-2 py-0.5 text-[10px] sm:text-[11px] font-extrabold text-white shadow-md shadow-rose-600/30">
            <Sparkles className="h-3 w-3" />
            {discountPercent}% OFF
          </span>
        ) : product.featured ? (
          <span className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1 rounded-lg bg-amber-500 px-2 py-0.5 text-[10px] sm:text-[11px] font-extrabold text-white shadow-md shadow-amber-500/30">
            <Sparkles className="h-3 w-3" />
            Featured
          </span>
        ) : null}

        {/* Product Image Link */}
        <Link
          href={`/products/${product._id}`}
          className="relative block h-full w-full"
        >
          <Image
            src={product.image || "/logo.jpg"}
            alt={product.product_name || "Appliance"}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="h-full w-full object-contain p-3.5 sm:p-4 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
        <div className="space-y-1.5">
          {/* Rating & Stock Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <ProductRating rating={product.rating || 5} />
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                {Number(product.rating || 5).toFixed(1)}
              </span>
            </div>

            {product.stock > 0 ? (
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                In Stock
              </span>
            ) : (
              <span className="text-[10px] sm:text-[11px] font-semibold text-rose-500">
                Low Stock
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link
            href={`/products/${product._id}`}
            className="block group/title transition-colors"
          >
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug transition-colors group-hover/title:text-sky-600 dark:text-white dark:group-hover/title:text-sky-400 min-h-[2.4rem]">
              {product.product_name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed dark:text-slate-400 min-h-[2rem]">
            {product.desc ||
              "High quality genuine appliance with official manufacturer warranty."}
          </p>
        </div>

        {/* Price & Action Section */}
        <div className="mt-3.5 border-t border-slate-100 pt-3 dark:border-slate-800">
          <div className="flex items-center justify-between gap-1 mb-2.5">
            <div className="flex flex-col">
              {numOriginalPrice && numOriginalPrice > price && (
                <span className="text-[11px] text-slate-400 line-through leading-none mb-0.5">
                  Rs. {numOriginalPrice.toLocaleString()}
                </span>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Rs.
                </span>
                <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                  {price.toLocaleString()}
                </span>
              </div>
            </div>

            {savings && savings > 0 ? (
              <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-0.5 text-[10px] font-extrabold text-rose-700 ring-1 ring-rose-200/60 dark:bg-rose-950/50 dark:text-rose-300 dark:ring-rose-800/60 shrink-0">
                Save Rs. {savings.toLocaleString()}
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/products/${product._id}`}
              className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50/80 px-2.5 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
            >
              <span>Details</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </Link>

            <WhatsAppButton product={product} compact label="Order" />
          </div>
        </div>
      </div>
    </div>
  );
}