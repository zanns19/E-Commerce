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

      <div className="mt-1 grid grid-cols-2 gap-3.5 sm:gap-4 xl:gap-6">
        {displayProducts.map((product, index) => (
          <ProductCard
            key={product._id || index}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}