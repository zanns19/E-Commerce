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
  Tent,
} from "lucide-react";

const CATEGORY_META = {
  Kitchen: {
    icon: Utensils,
    tagline: "High performance cooking stoves, hoods & kitchen appliances",
    color: "from-sky-500 to-blue-600",
    badgeBg: "bg-sky-50 text-sky-700 ring-sky-100",
  },
  "Camping Stoves": {
    icon: Tent,
    tagline: "Portable outdoor camping stoves, burners & gas cylinders",
    color: "from-orange-500 to-amber-600",
    badgeBg: "bg-orange-50 text-orange-700 ring-orange-100",
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

export default function CategorySection({
  title,
  products = [],
  isHalfWidth = false,
}) {
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

  if (isHalfWidth) {
    return (
      <section id={sectionId} className="w-full scroll-mt-24">
        {/* Category Section Header */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 border-b border-slate-200/80 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-sky-100 text-sky-600 shrink-0">
                <IconComponent className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl lg:text-2xl font-extrabold tracking-tight text-slate-900">
                  {title}
                </h2>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-semibold ring-1 ${meta.badgeBg}`}
                >
                  {products.length} {products.length === 1 ? "Item" : "Items"}
                </span>
              </div>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1">{meta.tagline}</p>
          </div>

          <Link
            href={exploreHref}
            className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors shrink-0 group"
          >
            <span>Explore All</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Grid (2 columns) */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 xl:gap-5">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              variant={product.category === "Discount" ? "discount" : "default"}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id={sectionId}
      className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8 py-6 sm:py-8 scroll-mt-24"
    >
      {/* Category Section Header */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-slate-200/80 pb-3.5 sm:pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-sky-100 text-sky-600 shrink-0">
              <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
                {title}
              </h2>
              <span
                className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold ring-1 ${meta.badgeBg}`}
              >
                {products.length} {products.length === 1 ? "Item" : "Items"}
              </span>
            </div>
          </div>
          <p className="text-[11px] sm:text-sm text-slate-500">{meta.tagline}</p>
        </div>

        <Link
          href={exploreHref}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors shrink-0 group"
        >
          <span>Explore All {title}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            variant={product.category === "Discount" ? "discount" : "default"}
          />
        ))}
      </div>
    </section>
  );
}
