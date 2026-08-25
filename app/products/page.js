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

  return <ProductsCatalog initialProducts={formattedProducts} />;
}

