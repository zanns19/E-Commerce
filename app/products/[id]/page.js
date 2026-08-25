import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home, ShieldCheck, Truck, Headphones, CheckCircle } from "lucide-react";

import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

import ProductImage from "@/components/ProductImage";
import ProductInfo from "@/components/ProductInfo";
import QuantitySelector from "@/components/QuantitySelector";
import WhatsAppButton from "@/components/WhatsAppButton";
import FacebookLike from "@/components/FacebookLike";
import FacebookComments from "@/components/FacebookComments";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }) {
  await connectDB();

  const { id } = await params;

  let product;

  try {
    product = await Product.findById(id).lean().exec();
  } catch {
    notFound();
  }

  if (!product) {
    notFound();
  }

  product = {
    ...product,
    _id: product._id.toString(),
  };

  const trustHighlights = [
    {
      icon: ShieldCheck,
      title: "100% Genuine Quality",
      desc: "Original factory-tested gas & electrical appliances",
    },
    {
      icon: Truck,
      title: "Fast Dispatch",
      desc: "Safe doorstep delivery across all cities in Pakistan",
    },
    {
      icon: Headphones,
      title: "Direct WhatsApp Support",
      desc: "Instant guidance & availability verification",
    },
    {
      icon: CheckCircle,
      title: "Tested & Certified",
      desc: "Quality checked before packaging and dispatch",
    },
  ];

  return (
    <div className="animate-fade-scale w-full min-h-screen bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30 py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 overflow-x-auto pb-1 text-xs text-gray-500">
          <ol className="flex items-center gap-1.5 whitespace-nowrap">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 text-gray-600 transition hover:text-sky-600"
              >
                <Home className="h-3.5 w-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <li className="text-gray-300">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <Link
                href="/products"
                className="text-gray-600 transition hover:text-sky-600"
              >
                Products
              </Link>
            </li>
            {product.category && (
              <>
                <li className="text-gray-300">
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-gray-600 transition hover:text-sky-600"
                  >
                    {product.category}
                  </Link>
                </li>
              </>
            )}
            <li className="text-gray-300">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="truncate font-semibold text-gray-900 max-w-[200px] sm:max-w-xs">
              {product.product_name}
            </li>
          </ol>
        </nav>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Image, Trust Badges, Social Like */}
          <div className="space-y-6 lg:col-span-6">
            <ProductImage product={product} />

            {/* Trust Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {trustHighlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-gray-200/70 bg-white p-3 shadow-xs transition hover:border-gray-300"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 leading-tight">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-gray-500 leading-tight">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Engagement */}
            <FacebookLike product={product} />
          </div>

          {/* Right Column: Information, Pricing, Quantity Selector, WhatsApp CTA */}
          <div className="space-y-6 lg:col-span-6">
            <ProductInfo product={product} />

            {/* Quantity Selector Card */}
            <div>
              <QuantitySelector product={product} />
            </div>

            {/* WhatsApp Order Action */}
            <div className="space-y-2">
              <WhatsAppButton product={product} />
              <p className="text-center text-[11px] text-gray-400">
                🔒 Safe order dispatch • Direct WhatsApp confirmation with Ahmad Electro Gas
              </p>
            </div>
          </div>
        </div>

        {/* Customer Reviews & Questions Section */}
        <FacebookComments product={product} />
      </div>
    </div>
  );
}