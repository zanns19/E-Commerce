import ProductCard from "./ProductCard";

export default function ProductSection({ products = [] }) {
  if (!products.length) return null;

  // Only show first and last product (same as Django logic)
  const displayProducts = [products[0], products[products.length - 1]].filter(
    Boolean
  );

  return (
    <div className="w-full lg:w-1/2">
      <h2 className="mb-4 border-b-8 border-cyan-400 py-2 text-center text-3xl font-bold uppercase tracking-wide text-cyan-600 sm:text-4xl">
        CAMPING STOVES
      </h2>

      <div className="mt-1 grid grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-2 sm:gap-x-2 sm:gap-y-10 xl:gap-x-14">
        {displayProducts.map((product, index) => (
          <ProductCard
            key={product._id}
            product={product}
            badge={index === 0 ? "In Stock" : "New"}
            badgeColor={
              index === 0
                ? "bg-green-200 text-green-700"
                : "bg-blue-200 text-blue-700"
            }
          />
        ))}
      </div>
    </div>
  );
}