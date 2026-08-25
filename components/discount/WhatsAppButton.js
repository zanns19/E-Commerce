"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton({ product }) {
  const handleClick = () => {
    const message = `Asslam-o-Alaikum! I want to claim the discount on this product:

Product: ${product.product_name}
Discounted Price: Rs. ${product.price}
(Original: Rs. ${product.orgprice || product.originalPrice || ""})

Please confirm availability and delivery details.`;

    window.open(
      `https://wa.me/923356599132?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white shadow-sm shadow-emerald-600/20 transition-all hover:bg-emerald-500 hover:shadow-md active:scale-95 shrink-0"
    >
      <FaWhatsapp className="h-3.5 w-3.5" />
      <span>Order</span>
    </button>
  );
}