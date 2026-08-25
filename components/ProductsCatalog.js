"use client";

import { useState, useMemo } from "react";
import { Search, X, Filter, RotateCcw } from "lucide-react";
import CategorySection from "./CategorySection";

const CATEGORY_ORDER = [
  "Kitchen",
  "Instant Gyser",
  "Regulator",
  "Valves",
  "Accessories",
  "Discount",
];

export default function ProductsCatalog({ initialProducts = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Calculate product counts per category
  const categoryCounts = useMemo(() => {
    const counts = { all: initialProducts.length };
    CATEGORY_ORDER.forEach((cat) => {
      counts[cat] = initialProducts.filter((p) => p.category === cat).length;
    });
    return counts;
  }, [initialProducts]);

  // Filter products based on search query and category
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const nameMatch = product.product_name?.toLowerCase().includes(query);
      const descMatch = product.desc?.toLowerCase().includes(query);

      return matchesCategory && (nameMatch || descMatch);
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  // Group filtered products by category according to CATEGORY_ORDER
  const groupedProducts = useMemo(() => {
    const categoriesToGroup =
      selectedCategory === "all" ? CATEGORY_ORDER : [selectedCategory];

    return categoriesToGroup
      .map((category) => ({
        category,
        products: filteredProducts.filter((p) => p.category === category),
      }))
      .filter((group) => group.products.length > 0);
  }, [filteredProducts, selectedCategory]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  const isFiltering = searchQuery.trim() !== "" || selectedCategory !== "all";

  return (
    <div className="w-full pb-16">
      {/* Header & Filter Controls Section */}
      <div className="border-b border-gray-200 bg-gradient-to-b from-sky-50/50 to-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Products &amp; Services
            </h1>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
              Explore our wide range of kitchen appliances, gas geysers, regulators, valves, and premium accessories.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 mx-auto max-w-3xl space-y-4">
            {/* Search Input Box */}
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-4 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name or description (e.g. geyser, regulator, stove)..."
                className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-12 pr-10 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 sm:text-base"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                  title="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none sm:flex-wrap sm:justify-center">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                  selectedCategory === "all"
                    ? "bg-sky-600 text-white shadow-sm"
                    : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50"
                }`}
              >
                <span>All Products</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] sm:text-xs ${
                    selectedCategory === "all"
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {categoryCounts.all}
                </span>
              </button>

              {CATEGORY_ORDER.map((category) => {
                const count = categoryCounts[category] || 0;
                const isSelected = selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                      isSelected
                        ? "bg-sky-600 text-white shadow-sm"
                        : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] sm:text-xs ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results stats and Reset button */}
          <div className="mt-4 flex items-center justify-between text-xs sm:text-sm text-gray-500 max-w-3xl mx-auto px-1">
            <span>
              Showing <strong className="text-gray-900">{filteredProducts.length}</strong> of{" "}
              {initialProducts.length} product{initialProducts.length === 1 ? "" : "s"}
            </span>

            {isFiltering && (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 font-medium text-sky-600 hover:text-sky-700 transition"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Catalog View */}
      <div className="mt-6">
        {groupedProducts.length === 0 ? (
          <div className="mx-auto max-w-xl px-4 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <Filter className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No matching products found
            </h3>
            <p className="mt-1.5 text-sm text-gray-500">
              {searchQuery
                ? `We couldn't find any products matching "${searchQuery}"${
                    selectedCategory !== "all" ? ` in ${selectedCategory}` : ""
                  }.`
                : "No products currently available in this category."}
            </p>
            {isFiltering && (
              <button
                type="button"
                onClick={handleReset}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                <RotateCcw className="h-4 w-4" />
                Show all products
              </button>
            )}
          </div>
        ) : (
          groupedProducts.map((group) => (
            <CategorySection
              key={group.category}
              title={group.category}
              products={group.products}
            />
          ))
        )}
      </div>
    </div>
  );
}
