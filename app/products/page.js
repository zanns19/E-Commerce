import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

import ProductSection from "@/components/ProductSection";

export default async function ProductsPage() {
  await connectDB();

  const products = await Product.find({
    category: "Valves",
  })
    .lean()
    .exec();

  // Convert ObjectId to string
  const formattedProducts = products.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));

  return (
    <ProductSection
      products={formattedProducts}
    />
  );
}