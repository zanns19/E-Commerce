"use client";

import Image from "next/image";
import Link from "next/link";
import ProductDescription from "./ProductDescription";
import ProductRating from "./ProductRating";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductCard({
  product,
  badge,
  badgeColor,
  variant = "default",
}) {
  const isDiscount = variant === "discount";

  // =========================
  // DISCOUNT CARD
  // =========================
  if (isDiscount) {
    return (
      <div className="relative overflow-hidden rounded-xl group">

        {/* Card */}
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl transition-transform duration-500 ease-in-out group-hover:-translate-y-12 dark:border-gray-700 dark:bg-gray-800">

          {/* Image */}
          <div className="relative flex h-53 items-center justify-center overflow-hidden rounded-t-xl sm:h-80">

            {/* Discount Badge */}
            <span className="absolute right-1 top-1.5 z-10 rounded-full bg-green-200 px-2 text-sm font-bold text-green-700 sm:right-[18px]">
              {product.discount}% OFF
            </span>

            <Link
              href={`/products/${product._id}`}
              className="block h-full w-full"
            >
              <Image
                src={product.image}
                alt={product.product_name}
                width={500}
                height={500}
                className="h-full w-full object-cover transition duration-300 hover:opacity-75"
              />
            </Link>
          </div>

          {/* Body */}
          <div className="px-1 pb-5 sm:px-3.5">

            {/* Product Name */}
            <h2 className="mt-1 mb-1 px-0.5 text-sm font-bold sm:text-xl">
              {product.product_name}
            </h2>

            {/* Description */}
            <div className="mb-3 h-14 overflow-hidden sm:h-18">
              <p className="text-xs tracking-tight text-gray-900 dark:text-white sm:text-[16px]">
                <ProductDescription text={product.desc} />

                <Link
                  href={`/products/${product._id}`}
                  className="ml-1 text-blue-600 hover:underline"
                >
                  See details
                </Link>
              </p>
            </div>

            {/* Rating */}
            <div className="mb-5 mt-2 flex items-center">
              <ProductRating rating={product.rating} />

              <span className="ms-3 rounded-sm bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                {product.rating}
              </span>
            </div>

            {/* Original Price */}
            <div className="relative mt-3">
              <span
                className="relative inline-block px-2 text-[14px] font-bold text-red-900 sm:text-xl"
              >
                Rs.{product.originalPrice}

                {/* Strike line */}
                <span className="absolute left-0 top-1/2 h-[1px] w-full bg-current sm:h-[2px]" />
              </span>
            </div>

            {/* Discounted Price + Shop Now */}
            <div className="flex items-center justify-between">

              {/* Final Price */}
              <span className="text-lg font-bold text-green-900 sm:text-[20px] md:text-[22px] lg:text-[24px]">
                Rs.{product.price}
              </span>

              {/* WhatsApp / Shop Now */}
              <div className="w-auto">
                <WhatsAppButton
                  product={product}
                  compact
                />
              </div>
            </div>

            {/* Badge */}
            {badge && (
              <span
                className={`mt-3 inline-block rounded-full px-2 py-1 text-xs font-semibold sm:text-sm ${badgeColor}`}
              >
                {badge}
              </span>
            )}
          </div>
        </div>

        {/* Hover Button */}
        <div className="absolute bottom-0 left-3 w-full translate-y-full p-4 opacity-0 transition-all duration-500 ease-in-out group-hover:-translate-y-[42px] group-hover:opacity-100">
          <Link
            href={`/products/${product._id}`}
            className="mx-auto block w-fit rounded-lg border-2 border-gray-800 bg-transparent px-5 py-3 text-center font-semibold text-gray-800 shadow-md transition-colors duration-300 hover:bg-gray-800 hover:text-white dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-900"
          >
            Show Details
          </Link>
        </div>
      </div>
    );
  }

  // =========================
  // DEFAULT CARD
  // =========================
  return (
    <div className="relative overflow-hidden rounded-xl group">

      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl transition-transform duration-500 ease-in-out group-hover:-translate-y-12 dark:border-gray-700 dark:bg-gray-800">

        {/* Image */}
        <div className="flex items-center justify-center overflow-hidden rounded-t-xl sm:h-80">
          <Link
            href={`/products/${product._id}`}
            className="block h-full w-full"
          >
            <Image
              src={product.image}
              alt={product.product_name}
              width={500}
              height={500}
              className="h-full w-full object-cover transition duration-300 hover:scale-105"
            />
          </Link>
        </div>

        {/* Body */}
        <div className="px-2 pb-5 sm:px-4">

          {/* Product Name */}
          <h2 className="mt-2 mb-2 text-sm font-bold sm:text-xl">
            {product.product_name}
          </h2>

          {/* Description */}
          <div className="mb-3 h-14 overflow-hidden sm:h-18">
            <p className="pl-1 text-xs tracking-tight text-gray-700 dark:text-gray-200 sm:text-[10px] lg:text-[13px] xl:text-sm">
              <ProductDescription text={product.desc} />

              <Link
                href={`/products/${product._id}`}
                className="ml-1 text-blue-600 hover:underline"
              >
                See Details
              </Link>
            </p>
          </div>

          {/* Rating */}
          <div className="mb-5 mt-2 flex items-center">
            <ProductRating rating={product.rating} />

            <span className="ms-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
              {product.rating}
            </span>
          </div>

          {/* Price + Button */}
          <div className="flex items-center gap-x-3 sm:justify-between">
            <span
              className={`text-[15px] font-bold sm:text-[16px] lg:text-xl xl:text-[27px]
                ${
                  product.price > 2500
                    ? "text-red-900"
                    : "text-green-900"
                }`}
            >
              Rs. {product.price}
            </span>

            <div className="w-auto">
              <WhatsAppButton
                product={product}
                compact
              />
            </div>
          </div>

          {/* Badge */}
          {badge && (
            <span
              className={`mt-3 inline-block rounded-full px-2 py-1 text-xs font-semibold sm:text-sm ${badgeColor}`}
            >
              {badge}
            </span>
          )}
        </div>
      </div>

      {/* Hover Button */}
      <div className="absolute bottom-0 left-3 w-full translate-y-full p-4 opacity-0 transition-all duration-500 ease-in-out group-hover:-translate-y-[42px] group-hover:opacity-100">
        <Link
          href={`/products/${product._id}`}
          className="mx-auto block w-fit rounded-lg border-2 border-gray-800 bg-transparent px-5 py-3 text-center font-semibold text-gray-800 shadow-md transition-colors duration-300 hover:bg-gray-800 hover:text-white dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-900"
        >
          Show Details
        </Link>
      </div>
    </div>
  );
}