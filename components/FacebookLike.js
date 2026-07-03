"use client";

import { useEffect } from "react";

export default function FacebookLike({ product }) {
  useEffect(() => {
    // Re-render Facebook Like button
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  // Change this to your production domain
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product._id}`;

  return (
    <div
      className="fb-like"
      data-href={pageUrl}
      data-width=""
      data-layout="standard"
      data-action="like"
      data-size="large"
      data-share="true"
    />
  );
}