"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  Tag,
  Search,
  Filter,
  Sparkles,
  Package,
  Layers,
  ArrowUpDown,
  ExternalLink,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Kitchen",
  "Instant Gyser",
  "Regulator",
  "Valves",
  "Accessories",
  "Discount",
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((p) => p.filter((item) => item._id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  }

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const nameMatch = p.product_name?.toLowerCase().includes(query);
      const descMatch = p.desc?.toLowerCase().includes(query);
      return matchesCategory && (nameMatch || descMatch);
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-scale">
      {/* Top Header & Add Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Products &amp; Inventory
            </h1>
            <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-sky-700 border border-sky-100">
              {products.length} Total
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Manage your appliance catalog, prices, stocks, and featured items.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-sky-600/25 transition-all hover:bg-sky-500 active:scale-95 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name or description..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
          />
        </div>

        {/* Category Selector Chips / Dropdown */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {(searchQuery || selectedCategory !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 whitespace-nowrap px-2"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Modern Products Table Card */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
        {loading ? (
          <div className="p-16 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-3 border-sky-600 border-t-transparent mb-3" />
            <p className="text-sm font-semibold text-slate-600">Loading catalog items…</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
              <Package className="h-7 w-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {searchQuery || selectedCategory !== "All"
                ? "No matching products found"
                : "No products in your catalog yet"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-1">
              {searchQuery || selectedCategory !== "All"
                ? "Try searching for a different keyword or select another category filter."
                : "Click the button below to add your first gas geyser, stove, or regulator appliance."}
            </p>
            <div className="mt-5">
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-md shadow-sky-600/20 transition hover:bg-sky-500"
              >
                <Plus className="h-4 w-4" />
                <span>Add Product</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">Product</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Price</th>
                  <th className="px-5 py-3.5">Stock Status</th>
                  <th className="px-5 py-3.5">Rating</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => {
                  const inStock = (p.stock ?? 0) > 0;
                  const price = Number(p.price) || 0;
                  const originalPrice = p.originalPrice ? Number(p.originalPrice) : null;

                  return (
                    <tr
                      key={p._id}
                      className="transition-colors hover:bg-slate-50/70"
                    >
                      {/* Product Thumbnail & Title */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3.5">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-1">
                            <Image
                              src={p.image || "/logo.jpg"}
                              alt={p.product_name || "Product"}
                              fill
                              sizes="48px"
                              className="object-contain"
                            />
                          </div>

                          <div className="min-w-0 max-w-xs">
                            <div className="flex items-center gap-1.5">
                              <p className="truncate font-bold text-slate-900">
                                {p.product_name}
                              </p>
                              {p.featured && (
                                <span
                                  className="inline-flex items-center rounded bg-amber-50 px-1 py-0.5 text-[9px] font-extrabold text-amber-700 ring-1 ring-amber-200 shrink-0"
                                  title="Featured product on homepage"
                                >
                                  <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="truncate text-[11px] text-slate-400 mt-0.5">
                              {p.desc || "No description"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category Tag */}
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                          <Tag className="h-3 w-3 text-slate-400" />
                          {p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-3.5">
                        <div>
                          <p className="font-extrabold text-slate-900">
                            Rs. {price.toLocaleString()}
                          </p>
                          {originalPrice && originalPrice > price && (
                            <p className="text-[10px] text-slate-400 line-through">
                              Rs. {originalPrice.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Stock Status */}
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                            inStock
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                              : "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              inStock ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                            }`}
                          />
                          {inStock ? `In Stock (${p.stock})` : "Out of Stock"}
                        </span>
                      </td>

                      {/* Rating */}
                      <td className="px-5 py-3.5 font-bold text-amber-700">
                        ★ {Number(p.rating || 5).toFixed(1)}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/products/${p._id}`}
                            target="_blank"
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                            title="View on store"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>

                          <Link
                            href={`/admin/products/${p._id}/edit`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-sky-50 hover:text-sky-600 transition"
                            title="Edit Product"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>

                          <button
                            onClick={() => handleDelete(p._id)}
                            disabled={deletingId === p._id}
                            className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition disabled:opacity-40"
                            title="Delete Product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

