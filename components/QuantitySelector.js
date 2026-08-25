"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Minus, Calculator } from "lucide-react";

export default function QuantitySelector({ product }) {
  const [qty, setQty] = useState(1);
  const isInitialMount = useRef(true);

  // Load initial quantity on mount
  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || {};
      if (cart[product._id] && typeof cart[product._id] === "number") {
        setQty(cart[product._id]);
      } else {
        cart[product._id] = 1;
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } catch {
      // ignore localStorage parse error
    }
  }, [product._id]);

  // Sync to localStorage on quantity change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || {};
      cart[product._id] = qty;
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [qty, product._id]);

  const increaseQty = () => {
    setQty((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  const unitPrice = Number(product?.price || 0);
  const totalPrice = unitPrice * qty;

  return (
    <div className="rounded-xl border border-gray-200/80 bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Quantity Controls */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
            Quantity
          </label>
          <div className="mt-2 flex items-center gap-3">
            <div className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 p-1 shadow-inner">
              <button
                type="button"
                onClick={decreaseQty}
                disabled={qty <= 1}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-gray-700 shadow-xs transition hover:bg-gray-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="w-12 text-center font-mono text-base font-bold text-gray-900">
                {qty}
              </span>

              <button
                type="button"
                onClick={increaseQty}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-gray-700 shadow-xs transition hover:bg-gray-100 active:scale-95"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <span className="text-xs text-gray-500 font-medium">
              {qty} {qty === 1 ? "unit" : "units"}
            </span>
          </div>
        </div>

        {/* Calculated Total Box */}
        <div className="sm:text-right border-t border-gray-100 pt-3 sm:border-t-0 sm:pt-0">
          <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-500 sm:justify-end">
            <Calculator className="h-3.5 w-3.5 text-sky-600" />
            Total Amount
          </span>
          <p className="mt-1 text-2xl sm:text-3xl font-extrabold text-emerald-700">
            Rs. {totalPrice.toLocaleString()}
          </p>
          <p className="text-[11px] text-gray-400">
            (Rs. {unitPrice.toLocaleString()} × {qty})
          </p>
        </div>

      </div>
    </div>
  );
}