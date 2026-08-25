"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";
import ProductDescription from "./ProductDescription";
import ProductRating from "./ProductRating";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductCard({
  product,
  badge,
  badgeColor,
  variant = "default",
}) {
  const isDiscount =
    variant === "discount" ||
    product.category === "Discount" ||
    Boolean(product.discount && Number(product.discount) > 0);

  // =========================
  // DISCOUNT CARD (NEW DESIGN)
  // =========================
  if (isDiscount) {
    const discountPercent = product.discount || product.dist || 0;
    const originalPrice = product.originalPrice || product.orgprice;
    const savings =
      originalPrice && product.price
        ? Number(originalPrice) - Number(product.price)
        : null;

    return (
      <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-500/10">
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
          {/* Discount Badge */}
          {discountPercent > 0 && (
            <span className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1 rounded-full bg-rose-600 px-2.5 py-1 text-xs font-extrabold text-white shadow-md shadow-rose-600/30">
              <Sparkles className="h-3 w-3" />
              {discountPercent}% OFF
            </span>
          )}

          <Link
            href={`/products/${product._id}`}
            className="block h-full w-full"
          >
            <Image
              src={product.image || "/logo.jpg"}
              alt={product.product_name || "Discounted Appliance"}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <ProductRating rating={product.rating || 5} />
                <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
                  {Number(product.rating || 5).toFixed(1)}
                </span>
              </div>
              {product.stock > 0 ? (
                <span className="text-[10px] font-semibold text-emerald-600">
                  In Stock
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-rose-500">
                  Low Stock
                </span>
              )}
            </div>

            <Link
              href={`/products/${product._id}`}
              className="block group-hover:text-sky-600 transition-colors"
            >
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 leading-snug">
                {product.product_name}
              </h3>
            </Link>

            <div className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 min-h-[32px]">
              <ProductDescription text={product.desc || ""} />
            </div>
          </div>

          {/* Price & Action Section */}
          <div className="mt-3 border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between gap-1 mb-2">
              <div>
                {originalPrice && (
                  <p className="text-[11px] sm:text-xs text-slate-400 line-through">
                    Rs. {Number(originalPrice).toLocaleString()}
                  </p>
                )}
                <p className="text-base sm:text-lg font-black text-rose-600 leading-tight">
                  Rs. {Number(product.price).toLocaleString()}
                </p>
              </div>

              {savings && savings > 0 && (
                <span className="hidden sm:inline-block rounded-md bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-700">
                  Save Rs. {savings.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/products/${product._id}`}
                className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 text-[11px] sm:text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <span>Details</span>
                <ArrowUpRight className="h-3 w-3 text-slate-400" />
              </Link>

              <WhatsAppButton product={product} compact />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // DEFAULT CARD (PRESERVED UNCHANGED)
  // =========================
  return (
    <div className="relative overflow-hidden rounded-xl group">
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl transition-transform duration-500 ease-in-out group-hover:-translate-y-12 dark:border-gray-700 dark:bg-gray-800">
        {/* Image */}
        <div className="flex items-center justify-center overflow-hidden rounded-t-xl sm:h-80">
          <Link
            href={`/products/${product._id}`}
            className="block h-full w-full"
          >
            <Image
              src={product.image}
              alt={product.product_name}
              width={500}
              height={500}
              className="h-full w-full object-cover transition duration-300 hover:scale-105"
            />
          </Link>
        </div>

        {/* Body */}
        <div className="px-2 pb-5 sm:px-4">
          {/* Product Name */}
          <h2 className="mt-2 mb-2 text-sm font-bold sm:text-xl">
            {product.product_name}
          </h2>

          {/* Description */}
          <div className="mb-3 h-14 overflow-hidden sm:h-18">
            <p className="pl-1 text-xs tracking-tight text-gray-700 dark:text-gray-200 sm:text-[10px] lg:text-[13px] xl:text-sm">
              <ProductDescription text={product.desc} />

              <Link
                href={`/products/${product._id}`}
                className="ml-1 text-blue-600 hover:underline"
              >
                See Details
              </Link>
            </p>
          </div>

          {/* Rating */}
          <div className="mb-5 mt-2 flex items-center">
            <ProductRating rating={product.rating} />

            <span className="ms-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
              {product.rating}
            </span>
          </div>

          {/* Price + Button */}
          <div className="flex items-center gap-x-3 sm:justify-between">
            <span
              className={`text-[15px] font-bold sm:text-[16px] lg:text-xl xl:text-[27px]
                ${
                  product.price > 2500
                    ? "text-red-900"
                    : "text-green-900"
                }`}
            >
              Rs. {product.price}
            </span>

            <div className="w-auto">
              <WhatsAppButton
                product={product}
                compact
              />
            </div>
          </div>

          {/* Badge */}
          {badge && (
            <span
              className={`mt-3 inline-block rounded-full px-2 py-1 text-xs font-semibold sm:text-sm ${badgeColor}`}
            >
              {badge}
            </span>
          )}
        </div>
      </div>

      {/* Hover Button */}
      <div className="absolute bottom-0 left-3 w-full translate-y-full p-4 opacity-0 transition-all duration-500 ease-in-out group-hover:-translate-y-[42px] group-hover:opacity-100">
        <Link
          href={`/products/${product._id}`}
          className="mx-auto block w-fit rounded-lg border-2 border-gray-800 bg-transparent px-3 py-3 text-center font-semibold text-gray-800 shadow-md transition-colors duration-300 hover:bg-gray-800 hover:text-white dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-900"
        >
          Show Details
        </Link>
      </div>
    </div>
  );
}