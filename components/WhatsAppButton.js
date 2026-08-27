"use client";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton({
  product,
  compact = false,
  label = "Shop Now",
  className = "",
}) {
  const handleOrder = (e) => {
    e?.stopPropagation?.();

    let quantity = 1;
    if (typeof window !== "undefined") {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || {};
        quantity = cart[product?._id] || 1;
      } catch {
        quantity = 1;
      }
    }

    if (quantity < 1) quantity = 1;

    const unitPrice = product?.price ? Number(product.price) : 0;
    const total = quantity * unitPrice;

    const message = `Assalam-o-Alaikum Ahmad ElectroGas!

I want to order the following appliance:

🛒 Product: ${product?.product_name || "Appliance"}
📦 Quantity: ${quantity}
💰 Unit Price: Rs. ${unitPrice.toLocaleString()}
💵 Total: Rs. ${total.toLocaleString()}

Please confirm availability and delivery dispatch details.

Thank you!`;

    const phone = "923356599132";
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleOrder}
        className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl bg-emerald-600 px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-white shadow-xs transition-all duration-200 hover:bg-emerald-500 hover:shadow-md hover:shadow-emerald-600/20 active:scale-95 shrink-0 min-h-[32px] sm:min-h-[36px] ${className}`}
        title="Order via WhatsApp"
      >
        <FaWhatsapp className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleOrder}
      className={`group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:from-emerald-500 hover:to-green-500 hover:shadow-xl hover:shadow-emerald-600/35 active:scale-[0.99] ${className}`}
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