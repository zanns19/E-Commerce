"use client";

import { useEffect } from "react";
import { ThumbsUp } from "lucide-react";

export default function FacebookLike({ product }) {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/products/${product._id}`;

  return (
    <div className="rounded-xl border border-gray-200/80 bg-white p-4 shadow-xs">
      <div className="flex items-center gap-2 mb-3">
        <ThumbsUp className="h-4 w-4 text-sky-600" />
        <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
          Share or Like on Facebook
        </span>
      </div>
      <div
        className="fb-like"
        data-href={pageUrl}
        data-width=""
        data-layout="standard"
        data-action="like"
        data-size="large"
        data-share="true"
      />
    </div>
  );
}