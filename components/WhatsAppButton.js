"use client";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton({ product, compact = false }) {
  const handleOrder = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};

    const quantity = cart[product._id] || 1;

    if (quantity < 1) {
      alert("Please select at least one quantity.");
      return;
    }

    const total = quantity * product.price;

    const message = `Assalam-o-Alaikum!
    
I want to order the following product:

🛒 Product: ${product.product_name}
📦 Quantity: ${quantity}
💰 Price: Rs. ${product.price}
💵 Total: Rs. ${total}

Please confirm its availability.

Thank you.`;

    const phone = "923356599132";

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  if (compact) {
    return (
      <button
        onClick={handleOrder}
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-all duration-200 hover:bg-emerald-700 hover:shadow-md active:scale-95"
      >
        <FaWhatsapp className="h-4 w-4" />
        <span>Shop Now</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleOrder}
      className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:from-emerald-500 hover:to-green-500 hover:shadow-xl hover:shadow-emerald-600/35 active:scale-[0.99]"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:scale-110">
        <FaWhatsapp className="h-5 w-5 text-white" />
      </div>

      <div className="text-left">
        <span className="block text-base sm:text-lg font-bold leading-tight">
          Order via WhatsApp
        </span>
        <span className="block text-[11px] font-normal text-emerald-100/90">
          Chat directly with us • Instant order confirmation
        </span>
      </div>
    </button>
  );
}