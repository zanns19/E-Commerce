"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Image as ImageIcon,
  Save,
  Loader2,
  Package,
  Layers,
  DollarSign,
  Star,
  CheckCircle2,
} from "lucide-react";

const CATEGORY_OPTIONS = [
  "Kitchen",
  "Instant Gyser",
  "Regulator",
  "Valves",
  "Accessories",
  "Discount",
];

export default function ProductForm({ initialData, productId }) {
  const router = useRouter();
  const isEdit = Boolean(productId);

  const [form, setForm] = useState({
    product_name: initialData?.product_name || "",
    category: initialData?.category || CATEGORY_OPTIONS[0],
    desc: initialData?.desc || "",
    price: initialData?.price ?? "",
    originalPrice: initialData?.originalPrice ?? "",
    discount: initialData?.discount ?? 0,
    rating: initialData?.rating ?? 5,
    image: initialData?.image || "",
    stock: initialData?.stock ?? 10,
    featured: initialData?.featured ?? false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      price: form.price === "" ? 0 : Number(form.price),
      originalPrice:
        form.originalPrice === "" ? null : Number(form.originalPrice),
      discount: Number(form.discount) || 0,
      rating: Number(form.rating) || 0,
      stock: Number(form.stock) || 0,
    };

    try {
      const res = await fetch(
        isEdit ? `/api/products/${productId}` : "/api/products",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Please check your network and try again.");
      setLoading(false);
    }
  }

  const numPrice = Number(form.price) || 0;
  const numOriginalPrice = form.originalPrice ? Number(form.originalPrice) : null;
  const savings =
    numOriginalPrice && numOriginalPrice > numPrice
      ? numOriginalPrice - numPrice
      : null;

  return (
    <div className="space-y-6 max-w-5xl animate-fade-scale">
      {/* Back button & Page Title */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/products"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 shadow-xs"
          title="Back to products list"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h1>
          <p className="text-xs text-slate-500">
            {isEdit
              ? "Update details, price, or inventory for this catalog item."
              : "Fill out the information below to publish a new appliance to the store."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Form Controls (7 cols) */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm lg:col-span-7"
        >
          {/* Section: Basic Info */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-sky-600 flex items-center gap-1.5">
              <Package className="h-4 w-4" />
              <span>General Information</span>
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Product Title *
              </label>
              <input
                required
                type="text"
                value={form.product_name}
                onChange={(e) => update("product_name", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
                placeholder="e.g. NasGas Instant Gas Geyser 12L Digital"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Category *
                </label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 font-semibold"
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Available Stock (Units) *
                </label>
                <input
                  required
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(e) => update("stock", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
                  placeholder="10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Short Description *
              </label>
              <textarea
                required
                rows={3}
                value={form.desc}
                onChange={(e) => update("desc", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 leading-relaxed"
                placeholder="High performance automatic gas water heater with overheat protection and official warranty..."
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Pricing */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-sky-600 flex items-center gap-1.5">
              <DollarSign className="h-4 w-4" />
              <span>Pricing &amp; Discounts</span>
            </h2>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Selling Price (Rs.) *
                </label>
                <input
                  required
                  type="number"
                  min="0"
                  step="1"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-black text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
                  placeholder="18500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Original Price
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.originalPrice}
                  onChange={(e) => update("originalPrice", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
                  placeholder="22000"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Optional (for discount strike)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Discount %
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.discount}
                  onChange={(e) => update("discount", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
                  placeholder="15"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Percentage badge
                </span>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Image & Settings */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-sky-600 flex items-center gap-1.5">
              <ImageIcon className="h-4 w-4" />
              <span>Media &amp; Options</span>
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Image URL *
              </label>
              <input
                required
                type="text"
                value={form.image}
                onChange={(e) => update("image", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 font-mono text-xs"
                placeholder="/images/geyser.jpg or https://images.unsplash.com/..."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 items-center">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Customer Star Rating (0–5)
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={(e) => update("rating", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
                  placeholder="5.0"
                />
              </div>

              <div className="pt-4">
                <label className="flex items-center gap-3 cursor-pointer select-none rounded-xl border border-slate-200 p-3 bg-slate-50/50 hover:bg-slate-50 transition">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => update("featured", e.target.checked)}
                    className="h-4 w-4 rounded text-sky-600 focus:ring-sky-500"
                  />
                  <div>
                    <span className="block text-xs font-bold text-slate-900">
                      Feature on Homepage
                    </span>
                    <span className="block text-[10px] text-slate-500">
                      Display under featured showcase
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700">
              {error}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-sky-600/20 transition-all hover:bg-sky-500 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving Product...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>{isEdit ? "Update Product" : "Publish Product"}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/products")}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Right Column: Live Product Card Preview (5 cols) */}
        <div className="space-y-3 lg:col-span-5 sticky top-24">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Live Card Preview</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400">
              Matches public store look
            </span>
          </div>

          {/* Simulated Product Card */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
            {/* Top Media */}
            <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/70 border-b border-slate-100">
              {/* Badges */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="inline-flex items-center rounded-lg bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold text-slate-700 shadow-xs backdrop-blur-md border border-slate-200/60">
                  {form.category || "Appliance"}
                </span>
              </div>

              {Number(form.discount) > 0 ? (
                <span className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-rose-600 to-red-500 px-2 py-0.5 text-[10px] font-extrabold text-white shadow-md shadow-rose-600/30">
                  <Sparkles className="h-3 w-3" />
                  {form.discount}% OFF
                </span>
              ) : form.featured ? (
                <span className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1 rounded-lg bg-amber-500 px-2 py-0.5 text-[10px] font-extrabold text-white shadow-md shadow-amber-500/30">
                  <Sparkles className="h-3 w-3" />
                  Featured
                </span>
              ) : null}

              {/* Image */}
              <div className="relative h-full w-full p-4 flex items-center justify-center">
                {form.image ? (
                  <Image
                    src={form.image}
                    alt="Preview"
                    fill
                    sizes="300px"
                    className="object-contain p-4"
                    onError={(e) => {
                      e.currentTarget.src = "/logo.jpg";
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-300">
                    <ImageIcon className="h-12 w-12 stroke-[1.5]" />
                    <span className="text-[11px] mt-1">Image preview</span>
                  </div>
                )}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  ★ {Number(form.rating || 5).toFixed(1)}
                </div>
                <span className="text-emerald-600 font-semibold">
                  In Stock ({form.stock || 0})
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                {form.product_name || "Product Title Preview"}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {form.desc || "Product description preview will show here on the card..."}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  {numOriginalPrice && numOriginalPrice > numPrice && (
                    <span className="text-[11px] text-slate-400 line-through block leading-none">
                      Rs. {numOriginalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-base font-black text-slate-900">
                    Rs. {numPrice.toLocaleString()}
                  </span>
                </div>

                {savings && savings > 0 && (
                  <span className="rounded bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700 ring-1 ring-rose-200">
                    Save Rs. {savings.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

