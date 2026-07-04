"use client";

import { useState } from "react";

export default function ProductInfo({ product }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-6">

      {/* Product Name */}
      <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2540]">
        {product.product_name}
      </h1>

      {/* Description */}
      <div>

        <p
          className={`text-gray-700 text-lg leading-8 transition-all duration-300 overflow-hidden ${
            expanded ? "" : "line-clamp-5"
          }`}
        >
          {product.desc}
        </p>

        {product.desc?.length > 300 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-blue-600 hover:text-blue-800 hover:underline font-medium"
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}

      </div>

      {/* Price */}
      {/* <div>
        <h2 className="text-4xl font-bold text-green-700">
          Rs. {product.price}
        </h2>
      </div> */}

    </div>
  );
}