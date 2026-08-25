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

export const dynamic = "force-dynamic";

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
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-0 py-8">
  <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-lg ring-1 ring-black/10 aspect-video">
    <iframe
      className="absolute inset-0 h-full w-full"
      src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1269131610914058%2F&show_text=false&width=560&t=0"
      title="Ahmad Electro Gas Video"
      scrolling="no"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      allowFullScreen
    />
  </div>
</div>
    </>
  );
}
