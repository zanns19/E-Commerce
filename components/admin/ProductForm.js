"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductForm({ initialData, productId }) {
  const router = useRouter();
  const isEdit = Boolean(productId);

  const [form, setForm] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "electric",
    description: initialData?.description || "",
    price: initialData?.price ?? "",
    imageUrl: initialData?.imageUrl || "",
    inStock: initialData?.inStock ?? true,
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
        <label className="block text-sm font-medium text-ink">Name</label>
        <input
          required
          type="text"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="mt-1.5 w-full rounded-md border border-ink-600/20 px-3 py-2.5 text-sm text-ink outline-none focus:border-electric-dark focus:ring-2 focus:ring-electric/20"
          placeholder="e.g. Circuit breaker 32A"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink">Category</label>
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-ink-600/20 px-3 py-2.5 text-sm text-ink outline-none focus:border-electric-dark focus:ring-2 focus:ring-electric/20"
          >
            <option value="electric">Electric</option>
            <option value="gas">Gas</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Price (Rs.)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-ink-600/20 px-3 py-2.5 text-sm text-ink outline-none focus:border-electric-dark focus:ring-2 focus:ring-electric/20"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Description</label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="mt-1.5 w-full rounded-md border border-ink-600/20 px-3 py-2.5 text-sm text-ink outline-none focus:border-electric-dark focus:ring-2 focus:ring-electric/20"
          placeholder="Short description shown on the public catalog"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Image URL (optional)</label>
        <input
          type="text"
          value={form.imageUrl}
          onChange={(e) => update("imageUrl", e.target.value)}
          className="mt-1.5 w-full rounded-md border border-ink-600/20 px-3 py-2.5 text-sm text-ink outline-none focus:border-electric-dark focus:ring-2 focus:ring-electric/20"
          placeholder="https://..."
        />
      </div>

      <label className="flex items-center gap-2.5 text-sm text-ink">
        <input
          type="checkbox"
          checked={form.inStock}
          onChange={(e) => update("inStock", e.target.checked)}
          className="h-4 w-4 rounded border-ink-600/30 text-electric-dark focus:ring-electric/30"
        />
        In stock
      </label>

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
