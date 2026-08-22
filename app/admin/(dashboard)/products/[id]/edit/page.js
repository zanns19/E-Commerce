import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }) {
  await dbConnect();
  const { id } = await params;
  const product = await Product.findById(id).lean();

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight text-ink">Edit product</h1>
      <p className="mt-1 text-sm text-ink-500">{product.product_name}</p>

      <div className="mt-6">
        <ProductForm
          productId={id}
          initialData={{
            product_name: product.product_name,
            category: product.category,
            desc: product.desc,
            price: product.price,
            originalPrice: product.originalPrice,
            discount: product.discount,
            rating: product.rating,
            image: product.image,
            stock: product.stock,
            featured: product.featured,
          }}
        />
      </div>
    </div>
  );
}
