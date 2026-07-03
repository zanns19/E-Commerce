import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

import clientPromise from "@/lib/mongodb";

import ProductImage from "@/components/ProductImage";
import ProductInfo from "@/components/ProductInfo";
import QuantitySelector from "@/components/QuantitySelector";
import WhatsAppButton from "@/components/WhatsAppButton";
import FacebookLike from "@/components/FacebookLike";
import FacebookComments from "@/components/FacebookComments";

export default async function ProductPage({ params }) {
  const client = await clientPromise;
  const db = client.db("AhmadElectroGas");

  const { id } = params;

  if (!ObjectId.isValid(id)) {
    notFound();
  }

  const product = await db.collection("products").findOne({
    _id: new ObjectId(id),
  });

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