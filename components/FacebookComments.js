"use client";

import { useEffect } from "react";
import { MessageSquare } from "lucide-react";
import StarRating from "./StarRating";

export default function FacebookComments({ product }) {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    // Re-parse on window resize / orientation change for responsive rendering
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.FB) {
          window.FB.XFBML.parse();
        }
      }, 300);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/products/${product._id}`;

  return (
    <section className="mt-8 sm:mt-12 rounded-xl sm:rounded-2xl border border-gray-200/80 bg-white p-4 sm:p-6 lg:p-8 shadow-xs">
      {/* Header */}
      <div className="flex flex-col gap-3.5 border-b border-gray-100 pb-4 sm:pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-sky-600 shrink-0" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900 leading-tight">
              Customer Reviews &amp; Questions
            </h2>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Ask a question or leave your feedback about this product.
          </p>
        </div>

        {/* Overall Rating Badge */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-1 sm:pt-0">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">
            Overall Rating:
          </span>
          <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 sm:px-3 sm:py-1.5 ring-1 ring-amber-500/20">
            <StarRating rating={product.rating} />
            <span className="text-xs font-bold text-amber-900">
              {Number(product.rating || 5).toFixed(1)} / 5.0
            </span>
          </div>
        </div>
      </div>

      {/* Fluid Comments Container */}
      <div className="mt-4 sm:mt-6 w-full max-w-full overflow-hidden [&>span]:!w-full [&_iframe]:!w-full [&>span]:!max-w-full [&_iframe]:!max-w-full">
        <div
          className="fb-comments w-full"
          data-href={pageUrl}
          data-width="100%"
          data-numposts="5"
          data-mobile="auto-detect"
        />
      </div>
    </section>
  );
}

 