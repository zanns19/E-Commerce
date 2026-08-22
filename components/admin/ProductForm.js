"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    rating: initialData?.rating ?? 0,
    image: initialData?.image || "",
    stock: initialData?.stock ?? 0,
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
      originalPrice: form.originalPrice === "" ? null : Number(form.originalPrice),
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
    } catch (err) {
      setError("Couldn't reach the server. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-5 rounded-lg bg-white p-6 shadow-panel ring-1 ring-ink-600/10"
    >
      <div>
        <label className="block text-sm font-medium text-ink">Product name</label>
        <input
          required
          type="text"
          value={form.product_name}
          onChange={(e) => update("product_name", e.target.value)}
          className="mt-1.5 w-full rounded-md border border-ink-600/20 px-3 py-2.5 text-sm text-ink outline-none focus:border-electric-dark focus:ring-2 focus:ring-electric/20"
          placeholder="e.g. Instant Gas Geyser 10L"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink">Category</label>
          <select
            required
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-ink-600/20 px-3 py-2.5 text-sm text-ink outline-none focus:border-electric-dark focus:ring-2 focus:ring-electric/20"
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Stock</label>
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => update("stock", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-ink-600/20 px-3 py-2.5 text-sm text-ink outline-none focus:border-electric-dark focus:ring-2 focus:ring-electric/20"
            placeholder="0"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-ink">Price (Rs.)</label>
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-ink-600/20 px-3 py-2.5 text-sm text-ink outline-none focus:border-electric-dark focus:ring-2 focus:ring-electric/20"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Original price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.originalPrice}
            onChange={(e) => update("originalPrice", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-ink-600/20 px-3 py-2.5 text-sm text-ink outline-none focus:border-electric-dark focus:ring-2 focus:ring-electric/20"
            placeholder="Optional — for showing a discount"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Discount %</label>
          <input
            type="number"
            min="0"
            max="100"
            value={form.discount}
            onChange={(e) => update("discount", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-ink-600/20 px-3 py-2.5 text-sm text-ink outline-none focus:border-electric-dark focus:ring-2 focus:ring-electric/20"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Description</label>
        <textarea
          required
          rows={4}
          value={form.desc}
          onChange={(e) => update("desc", e.target.value)}
          className="mt-1.5 w-full rounded-md border border-ink-600/20 px-3 py-2.5 text-sm text-ink outline-none focus:border-electric-dark focus:ring-2 focus:ring-electric/20"
          placeholder="Short description shown on the public catalog"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Image URL</label>
        <input
          required
          type="text"
          value={form.image}
          onChange={(e) => update("image", e.target.value)}
          className="mt-1.5 w-full rounded-md border border-ink-600/20 px-3 py-2.5 text-sm text-ink outline-none focus:border-electric-dark focus:ring-2 focus:ring-electric/20"
          placeholder="/images/product.jpg or https://..."
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink">Rating (0–5)</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={(e) => update("rating", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-ink-600/20 px-3 py-2.5 text-sm text-ink outline-none focus:border-electric-dark focus:ring-2 focus:ring-electric/20"
            placeholder="0"
          />
        </div>
        <label className="mt-6 flex items-center gap-2.5 text-sm text-ink sm:mt-8">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update("featured", e.target.checked)}
            className="h-4 w-4 rounded border-ink-600/30 text-electric-dark focus:ring-electric/30"
          />
          Featured product
        </label>
      </div>

      {error && (
        <p className="rounded-md bg-danger/10 px-3 py-2 text-sm text-danger">{error}</p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600 disabled:opacity-60"
        >
          {loading ? "Saving…" : isEdit ? "Save changes" : "Add product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="text-sm font-medium text-ink-500 hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
