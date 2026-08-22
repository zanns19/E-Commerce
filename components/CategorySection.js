import ProductCard from "./ProductCard";

export default function CategorySection({ title, products = [] }) {
  if (!products.length) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <h2 className="mb-6 border-b-8 border-cyan-400 py-2 text-center text-3xl font-bold uppercase tracking-wide text-cyan-600 sm:text-4xl">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            badge={product.stock > 0 ? "In Stock" : "Out of Stock"}
            badgeColor={
              product.stock > 0
                ? "bg-green-200 text-green-700"
                : "bg-red-200 text-red-700"
            }
            variant={product.category === "Discount" ? "discount" : "default"}
          />

    


        ))}
      </div>
    </section>
  );
}
