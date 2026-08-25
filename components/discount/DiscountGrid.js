import ProductCard from "./ProductCard";

export default function DiscountGrid({ products = [] }) {
  if (!products.length) return null;

  return (
    <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}