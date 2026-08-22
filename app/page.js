import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import HeroCarousel from "@/components/HeroCarousel";
import CategorySection from "@/components/CategorySection";

const CATEGORY_ORDER = [
  "Kitchen",
  "Instant Gyser",
  "Regulator",
  "Valves",
  "Accessories",
  "Discount",
];

export default async function Home() {
  await connectDB();

  const products = await Product.find({ featured: true }).sort({ createdAt: -1 }).lean();

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

  return (
    <>
      <HeroCarousel />

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
