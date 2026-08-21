"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Zap, Flame, Package } from "lucide-react";

const CATEGORY_META = {
  electric: { label: "Electric", icon: Zap, color: "text-electric-dark" },
  gas: { label: "Gas", icon: Flame, color: "text-gas-dark" },
  other: { label: "Other", icon: Package, color: "text-ink-500" },
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.products || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this product? This can't be undone.")) return;
    setDeletingId(id);
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts((p) => p.filter((item) => item._id !== id));
    setDeletingId(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-ink">Products &amp; services</h1>
          <p className="mt-1 text-sm text-ink-500">
            {loading ? "Loading…" : `${products.length} item${products.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-700"
        >
          <Plus className="h-4 w-4" />
          Add product
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg bg-white shadow-panel ring-1 ring-ink-600/10">
        {loading ? (
          <p className="px-5 py-10 text-center text-sm text-ink-500">Loading…</p>
        ) : products.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <p className="text-sm text-ink-500">No products yet.</p>
            <Link
              href="/admin/products/new"
              className="mt-3 inline-block text-sm font-medium text-electric-dark hover:underline"
            >
              Add your first product
            </Link>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-600/10 bg-mist-100 font-mono text-xs uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-600/10">
              {products.map((p) => {
                const meta = CATEGORY_META[p.category] || CATEGORY_META.other;
                const Icon = meta.icon;
                return (
                  <tr key={p._id} className="hover:bg-mist-100">
                    <td className="px-5 py-3.5 font-medium text-ink">{p.name}</td>
                    <td className="px-5 py-3.5">
                      <span className={`flex items-center gap-1.5 ${meta.color}`}>
                        <Icon className="h-3.5 w-3.5" />
                        {meta.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-ink">
                      {p.price > 0 ? `Rs. ${p.price.toLocaleString()}` : "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-1 font-mono text-[11px] uppercase ${
                          p.inStock ? "bg-ok/10 text-ok" : "bg-danger/10 text-danger"
                        }`}
                      >
                        {p.inStock ? "In stock" : "Out of stock"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/products/${p._id}/edit`}
                          className="text-ink-500 hover:text-ink"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p._id)}
                          disabled={deletingId === p._id}
                          className="text-ink-500 hover:text-danger disabled:opacity-50"
                          title="Delete"
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
        )}
      </div>
    </div>
  );
}
