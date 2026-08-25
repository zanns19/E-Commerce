"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";
import Rating from "./Rating";
import ProductDescription from "./ProductDescription";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductCard({ product }) {
  const discountPercent = product.dist || product.discount || 0;
  const originalPrice = product.orgprice || product.originalPrice;
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
            <Rating rating={product.rating || 5} />
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

          <Link href={`/products/${product._id}`} className="block group-hover:text-sky-600 transition-colors">
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

            <WhatsAppButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}