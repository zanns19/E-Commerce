"use client";

import Image from "next/image";
import Link from "next/link";

import Rating from "./Rating";
import ProductDescription from "./ProductDescription";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl border shadow">

      <div className="relative h-60 sm:h-80 overflow-hidden rounded-t-xl">

        <span className="absolute top-2 right-2 bg-green-200 text-green-700 px-2 rounded-full font-bold z-10">
          {product.dist}% OFF
        </span>

        <Image
          src={product.image}
          alt={product.product_name}
          fill
          className="object-cover hover:opacity-80"
        />

      </div>

      <div className="p-3">

        <h2 className="font-bold text-lg">
          {product.product_name}
        </h2>

        <ProductDescription
          text={product.desc}
        />

        <Link
          href={`/products/discount/${product._id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          See Details
        </Link>

        <Rating
          rating={product.rating}
        />

        <div className="mt-3">

          <p className="line-through text-red-700">
            Rs.{product.orgprice}
          </p>

          <div className="flex justify-between items-center">

            <span className="text-2xl font-bold text-green-700">
              Rs.{product.price}
            </span>

            <WhatsAppButton
              product={product}
            />

          </div>

        </div>

      </div>
    </div>
  );
}