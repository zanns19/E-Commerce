"use client";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton({ product }) {
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
      className="w-full lg:w-auto flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
      >
      {/* WhatsApp Icon */}
      <FaWhatsapp className="w-6 h-6 text-white" />
     
      Order via WhatsApp
    </button>
  );
}