"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductImage({ product }) {
  const [preview, setPreview] = useState(false);

  return (
    <>
      {/* Product Image */}
      <div className="relative group max-w-[450px] mx-auto rounded-2xl overflow-hidden border border-gray-300 shadow-sm">

        <Image
          src={product.image}
          alt={product.product_name}
          width={450}
          height={450}
          priority
          className="w-full h-auto object-cover cursor-pointer"
          onClick={() => setPreview(true)}
        />

        {/* Hover Overlay */}
        <div
          className="
            absolute inset-0
            bg-red-600/60
            flex items-center justify-center
            translate-y-[-100%]
            group-hover:translate-y-0
            transition-transform
            duration-300
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-14 h-14 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7h3l2-3h8l2 3h3v13H3V7z"
            />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </div>
      </div>

      {/* Full Screen Preview */}
      {preview && (
        <div
          onClick={() => setPreview(false)}
          className="
            fixed inset-0
            bg-black/80
            flex justify-center
            items-center
            z-50
            p-5
            cursor-pointer
          "
        >
          <Image
            src={product.image}
            alt={product.product_name}
            width={900}
            height={900}
            className="max-h-[90vh] w-auto rounded-xl"
          />

          {/* Close Button */}
          <button
            onClick={() => setPreview(false)}
            className="
              absolute
              top-5
              right-5
              bg-white
              text-black
              rounded-full
              w-10
              h-10
              text-xl
              font-bold
            "
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}