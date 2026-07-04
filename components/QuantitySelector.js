"use client";

import { useEffect, useState } from "react";

export default function QuantitySelector({ product }) {
  const [qty, setQty] = useState(1);

  // Load quantity from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};

    if (cart[product._id]) {
      setQty(cart[product._id]);
    } else {
      cart[product._id] = 1;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [product._id]);

  // Save quantity whenever it changes
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};

    cart[product._id] = qty;

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [qty, product._id]);

  const increaseQty = () => {
    setQty((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  const totalPrice = product.price * qty;

  return (
    <div className="space-y-6">

      {/* Total Price */}
      <div className="md:text-left text-center">
        <h2 className="text-4xl font-bold text-green-700">
          Rs. {totalPrice.toLocaleString()}
        </h2>

        {/* <p className="text-gray-500 mt-2">
          Rs. {product.price.toLocaleString()} × {qty}
        </p> */}
      </div>

      {/* Quantity Buttons */}
      <div className="flex justify-center items-center gap-5">

        <button
          onClick={decreaseQty}
          className="w-12 h-12 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-2xl"
        >
          −
        </button>

        <span className="text-3xl font-bold w-12 text-center">
          {qty}
        </span>

        <button
          onClick={increaseQty}
          className="w-12 h-12 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-2xl"
        >
          +
        </button>

      </div>

    </div>
  );
}