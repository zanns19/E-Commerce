import clientPromise from "@/lib/mongodb";
import DiscountGrid from "@/components/discount/DiscountGrid";

export default async function DiscountPage() {
  const client = await clientPromise;

  const db = client.db();

  const discount = await db
    .collection("discount")
    .find({})
    .toArray();

  const products = JSON.parse(JSON.stringify(discount));

  return (
    <div className="md:max-w-[1480px] mx-auto px-2">
      <div className="flex items-center justify-center my-8">
        <div className="h-1 bg-blue-700 w-1/4"></div>

        <h1 className="text-2xl md:text-4xl font-bold text-green-600 uppercase px-5">
          Featured Products
        </h1>

        <div className="h-1 bg-blue-700 w-1/4"></div>
      </div>

      <DiscountGrid products={products} />
    </div>
  );
}