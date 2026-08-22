import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import DiscountGrid from "@/components/discount/DiscountGrid";

export default async function DiscountPage() {
  await connectDB();

  const discountProducts = await Product.find({ category: "Discount" })
    .sort({ createdAt: -1 })
    .lean()
    .exec();

  // Map to the field names the discount components expect, and
  // convert ObjectId to string.
  const products = discountProducts.map((product) => ({
    ...product,
    _id: product._id.toString(),
    orgprice: product.originalPrice,
    dist: product.discount,
  }));

  return (
    <div className="md:max-w-[1480px] mx-auto px-2">
      <div className="flex items-center justify-center my-8">
        <div className="h-1 bg-blue-700 w-1/4"></div>

        <h1 className="text-2xl md:text-4xl font-bold text-green-600 uppercase px-5">
          Featured Products
        </h1>

        <div className="h-1 bg-blue-700 w-1/4"></div>
      </div>

      {products.length === 0 ? (
        <p className="py-16 text-center text-gray-500">
          No discounted products available right now.
        </p>
      ) : (
        <DiscountGrid products={products} />
      )}
    </div>
  );
}
