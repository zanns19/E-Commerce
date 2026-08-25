"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";

export default function ProductInfo({ product }) {
  const [expanded, setExpanded] = useState(false);

  const price = Number(product?.price || 0);
  const originalPrice = product?.originalPrice ? Number(product.originalPrice) : null;
  const hasDiscount = Boolean(originalPrice && originalPrice > price);
  const savings = hasDiscount ? originalPrice - price : 0;
  const rating = Number(product?.rating || 0);

  return (
    <div className="space-y-6">
      {/* Category & Rating Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {product.category && (
          <Link
            href={`/products`}
            className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3.5 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-600/20 transition hover:bg-sky-100"
          >
            <span>Category:</span>
            <span className="font-bold text-sky-800">{product.category}</span>
          </Link>
        )}

        {/* Rating Stars */}
        <div className="flex items-center gap-2">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "fill-amber-400 text-amber-400"
                    : i < rating
                    ? "fill-amber-300 text-amber-400"
                    : "fill-gray-100 text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="rounded bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-800 ring-1 ring-amber-500/20">
            {rating > 0 ? rating.toFixed(1) : "5.0"}
          </span>
        </div>
      </div>

      {/* Product Title */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
          {product.product_name}
        </h1>
        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          Verified Ahmad Electro Gas genuine appliance
        </p>
      </div>

      {/* Pricing Card */}
      <div className="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 via-white to-sky-50/40 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-3xl font-extrabold tracking-tight text-emerald-700 sm:text-4xl">
            Rs. {price.toLocaleString()}
          </span>

          {hasDiscount && (
            <span className="text-lg font-medium text-gray-400 line-through">
              Rs. {originalPrice.toLocaleString()}
            </span>
          )}

          {hasDiscount && (
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
              Save Rs. {savings.toLocaleString()} ({product.discount}% OFF)
            </span>
          )}
        </div>

        <p className="mt-2 text-xs text-gray-500">
          ✓ All prices in Pakistani Rupees (PKR) • Direct order via official WhatsApp
        </p>
      </div>

      {/* Description Section */}
      <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">
          Product Details &amp; Specifications
        </h2>

        <div className="mt-3">
          <p
            className={`whitespace-pre-line text-sm leading-relaxed text-gray-700 transition-all duration-300 ${
              expanded ? "" : "line-clamp-4"
            }`}
          >
            {product.desc}
          </p>

          {product.desc?.length > 220 && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 transition"
            >
              {expanded ? (
                <>
                  <span>Show less</span>
                  <ChevronUp className="h-3.5 w-3.5" />
                </>
              ) : (
                <>
                  <span>Read full description</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}