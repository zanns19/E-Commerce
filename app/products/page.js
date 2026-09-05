import { Suspense } from "react";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductsCatalog from "@/components/ProductsCatalog";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  await connectDB();

  const products = await Product.find({}).sort({ createdAt: -1 }).lean().exec();

  // Convert ObjectId to string and serialize date if needed.
  const formattedProducts = products.map((product) => ({
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt ? product.createdAt.toISOString() : null,
    updatedAt: product.updatedAt ? product.updatedAt.toISOString() : null,
    publishedAt: product.publishedAt ? product.publishedAt.toISOString() : null,
  }));

  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-16 text-center text-slate-500">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-sky-600 border-r-transparent align-[-0.125em]" />
          <p className="mt-3 text-sm font-medium">Loading catalog...</p>
        </div>
      }
    >
      <ProductsCatalog initialProducts={formattedProducts} />
    </Suspense>
  );
}

