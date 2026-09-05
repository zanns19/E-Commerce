"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, Tag, CheckCircle2, AlertCircle, X, Sparkles } from "lucide-react";

export default function ProductImage({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const inStock = (product?.stock ?? 0) > 0;
  const hasDiscount = Boolean(product?.discount && product.discount > 0);

  return (
    <div className="relative w-full">
      {/* Product Image Frame */}
      <div className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-gradient-to-b from-gray-50 to-white p-4 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md">

        {/* Floating Badges */}
        <div className="absolute left-4 top-4 z-10 flex flex-wrap items-center gap-2">
          {/* Stock Badge */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md shadow-xs ${
              inStock
                ? "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20"
                : "bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/20"
            }`}
          >
            {inStock ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>In Stock</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-3.5 w-3.5 text-rose-600" />
                <span>Out of Stock</span>
              </>
            )}
          </span>

          {/* Featured Badge */}
          {product.featured && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1 text-xs font-bold text-white shadow-sm shadow-amber-500/25 ring-1 ring-amber-400/40">
              <Sparkles className="h-3.5 w-3.5 text-amber-100" />
              <span>Featured</span>
            </span>
          )}
        </div>

        {/* Discount Badge on Right */}
        {hasDiscount && (
          <div className="absolute right-4 top-4 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
              <Tag className="h-3 w-3" />
              {product.discount}% OFF
            </span>
          </div>
        )}

        {/* Clickable Image (opens modal instead of new tab) */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative block h-[360px] sm:h-[420px] md:h-[460px] w-full overflow-hidden rounded-xl bg-white"
        >
          <Image
            src={product.image}
            alt={product.product_name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Subtle View Full Size Hint Overlay */}
          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/20 via-transparent to-transparent">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-gray-800 shadow-md backdrop-blur-sm transition hover:bg-white">
              <ZoomIn className="h-4 w-4 text-sky-600" />
              Click to view full image
            </span>
          </div>
        </button>
      </div>

            {/* Fullscreen Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/90 p-1 sm:p-2"
          onClick={() => setIsOpen(false)}
        >
          {/* Close (X) button — top right */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 rounded-full bg-white/90 p-2 text-gray-800 shadow-md transition hover:bg-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative h-[95vh] w-[98vw] sm:h-[95vh] sm:w-[95vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={product.image}
              alt={product.product_name}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}