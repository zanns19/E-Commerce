"use client";

export default function WhatsAppButton({ product }) {
  const handleClick = () => {
    const message = `Asslam-o-Alaikum! I want to buy this product:

Name: ${product.product_name}

Price: Rs. ${product.price}

Please confirm availability.`;

    window.open(
      `https://wa.me/923323550131?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClick}
      className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-lg text-sm"
    >
      Shop Now
    </button>
  );
}