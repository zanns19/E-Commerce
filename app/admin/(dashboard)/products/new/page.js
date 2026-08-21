import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight text-ink">Add product</h1>
      <p className="mt-1 text-sm text-ink-500">
        This will appear on the public catalog immediately.
      </p>

      <div className="mt-6">
        <ProductForm />
      </div>
    </div>
  );
}
