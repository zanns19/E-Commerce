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

  return (
    <button
  onClick={handleOrder}
  className={
    compact
      ? "inline-flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700 transition"
      : "flex w-full lg:w-auto items-center justify-center gap-3 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition"
  }
>
  <FaWhatsapp className={compact ? "h-4 w-4" : "h-6 w-6"} />

  {compact ? "Shop Now" : "Order via WhatsApp"}
</button>
  );
}