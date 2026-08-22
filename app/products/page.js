import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import CategorySection from "@/components/CategorySection";

const CATEGORY_ORDER = [
  "Kitchen",
  "Instant Gyser",
  "Regulator",
  "Valves",
  "Accessories",
  "Discount",
];

export default async function ProductsPage() {
  await connectDB();

  const products = await Product.find({}).sort({ createdAt: -1 }).lean().exec();

  // Convert ObjectId to string.
  const formattedProducts = products.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));

  // Group products by category, keeping the schema's category order.
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    products: formattedProducts.filter((p) => p.category === category),
  })).filter((group) => group.products.length > 0);

  if (!grouped.length) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-500">
        No products available yet.
      </div>
    );
  }

  return (
    <>
      {grouped.map((group) => (
        <CategorySection
          key={group.category}
          title={group.category}
          products={group.products}
        />
      ))}
    </>
  );
}
