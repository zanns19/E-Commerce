import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }) {
  await dbConnect();
  const product = await Product.findById(params.id).lean();

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight text-ink">Edit product</h1>
      <p className="mt-1 text-sm text-ink-500">{product.name}</p>

      <div className="mt-6">
        <ProductForm
          productId={params.id}
          initialData={{
            name: product.name,
            category: product.category,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            inStock: product.inStock,
          }}
        />
      </div>
    </div>
  );
}
