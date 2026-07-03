"use client";

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M19.11 17.22c-.29-.15-1.69-.83-1.95-.92-.26-.1-.45-.15-.64.15-.18.29-.73.92-.89 1.11-.17.19-.33.22-.62.08-.29-.15-1.2-.44-2.29-1.4-.85-.76-1.42-1.69-1.59-1.98-.17-.29-.02-.45.13-.6.13-.13.29-.33.44-.49.15-.17.2-.29.29-.49.1-.19.05-.36-.02-.5-.08-.15-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.5.08-.76.36-.26.29-1 1-.99 2.44 0 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.11 4.92 4.36.69.3 1.23.47 1.65.6.69.22 1.31.19 1.81.12.55-.08 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.13-.26-.2-.55-.34z" />
        <path d="M16.02 3C8.84 3 3 8.83 3 16c0 2.57.75 5.07 2.17 7.22L3 29l5.93-2.13A12.9 12.9 0 0 0 16.02 29C23.2 29 29 23.17 29 16S23.2 3 16.02 3Zm0 23.63c-2.15 0-4.25-.58-6.09-1.69l-.44-.26-3.52 1.27 1.29-3.43-.29-.45A10.56 10.56 0 0 1 5.39 16c0-5.87 4.77-10.63 10.63-10.63S26.65 10.13 26.65 16 21.88 26.63 16.02 26.63Z" />
      </svg>

      Order via WhatsApp
    </button>
  );
}