"use client";

import { useEffect } from "react";
import StarRating from "./StarRating";

export default function FacebookComments({ product }) {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product._id}`;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-6">
        Customer Reviews
        <StarRating rating={product.rating} />
      </h2>

      <div
        className="fb-comments"
        data-href={pageUrl}
        data-width="100%"
        data-numposts="5"
      ></div>
    </div>
  );
} 