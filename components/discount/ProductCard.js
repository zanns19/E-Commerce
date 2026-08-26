"use client";

import ProductCard from "../ProductCard";

export default function DiscountProductCard({ product }) {
  return <ProductCard product={product} variant="discount" />;
}