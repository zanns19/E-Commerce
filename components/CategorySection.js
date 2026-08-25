import Link from "next/link";
import ProductCard from "./ProductCard";
import {
  Flame,
  Utensils,
  Gauge,
  Sliders,
  Layers,
  Percent,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const CATEGORY_META = {
  Kitchen: {
    icon: Utensils,
    tagline: "High performance cooking stoves, hoods & kitchen appliances",
    color: "from-sky-500 to-blue-600",
    badgeBg: "bg-sky-50 text-sky-700 ring-sky-100",
  },
  "Instant Gyser": {
    icon: Flame,
    tagline: "Instant gas & electric water heaters with automated safety",
    color: "from-amber-500 to-orange-600",
    badgeBg: "bg-amber-50 text-amber-700 ring-amber-100",
  },
  Regulator: {
    icon: Gauge,
    tagline: "Precision gas regulators & pressure controllers",
    color: "from-teal-500 to-emerald-600",
    badgeBg: "bg-teal-50 text-teal-700 ring-teal-100",
  },
  Valves: {
    icon: Sliders,
    tagline: "Heavy-duty brass gas valves & fitting components",
    color: "from-indigo-500 to-violet-600",
    badgeBg: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  },
  Accessories: {
    icon: Layers,
    tagline: "Genuine spare parts, connectors, and mounting accessories",
    color: "from-slate-600 to-slate-800",
    badgeBg: "bg-slate-100 text-slate-700 ring-slate-200",
  },
  Discount: {
    icon: Percent,
    tagline: "Special discounted offers and limited-time appliance deals",
    color: "from-rose-500 to-red-600",
    badgeBg: "bg-rose-50 text-rose-700 ring-rose-100",
  },
};

export default function CategorySection({ title, products = [] }) {
  if (!products.length) return null;

  const meta = CATEGORY_META[title] || {
    icon: Sparkles,
    tagline: "Explore our collection of authentic appliances",
    color: "from-sky-500 to-blue-600",
    badgeBg: "bg-sky-50 text-sky-700 ring-sky-100",
  };

  const IconComponent = meta.icon;
  const sectionId = `category-${title.toLowerCase().replace(/\s+/g, "-")}`;
  const exploreHref =
    title === "Discount"
      ? "/discount"
      : `/products?category=${encodeURIComponent(title)}`;

  return (
    <section
      id={sectionId}
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 scroll-mt-24"
    >
      {/* Category Section Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
              <IconComponent className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
                {title}
              </h2>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${meta.badgeBg}`}
              >
                {products.length} {products.length === 1 ? "Item" : "Items"}
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">{meta.tagline}</p>
        </div>

        <Link
          href={exploreHref}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors shrink-0 group"
        >
          <span>Explore All {title}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Product Grid (Exact same ProductCard component & props) */}
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
