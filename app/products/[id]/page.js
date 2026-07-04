import { notFound } from "next/navigation";


import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

import ProductImage from "@/components/ProductImage";
import ProductInfo from "@/components/ProductInfo";
import QuantitySelector from "@/components/QuantitySelector";
import WhatsAppButton from "@/components/WhatsAppButton";
import FacebookLike from "@/components/FacebookLike";
import FacebookComments from "@/components/FacebookComments";

export default async function ProductPage({ params }) {
  
  await connectDB();

  const { id } = await params;

  let product;

  try {
    product = await Product.findById(id).lean();
  } catch {
    notFound();
  }

  if (!product) {
    notFound();
  }

  product._id = product._id.toString();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <ProductImage product={product} />
          <div className="mt-6">
            <FacebookLike product={product} />
          </div>
        </div>

        <div>
          <ProductInfo product={product} />
          <div className="mt-8">
            <QuantitySelector product={product} />
          </div>
          <div className="mt-6">
            <WhatsAppButton product={product} />
          </div>
          <div className="mt-10">
            <FacebookComments product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}