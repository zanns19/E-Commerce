import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { getAdminSession } from "@/lib/requireAdmin";

export async function GET(request, { params }) {
  await dbConnect();
  const { id } = await params;
  const product = await Product.findById(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ product });
}

export async function PUT(request, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    const body = await request.json();
    await dbConnect();
    const { id } = await params;

    const product = await Product.findByIdAndUpdate(
      id,
      {
        product_name: body.product_name,
        category: body.category,
        subCategory: body.subCategory !== undefined ? body.subCategory : "",
        desc: body.desc,
        price: body.price,
        originalPrice: body.originalPrice,
        discount: body.discount,
        rating: body.rating,
        image: body.image,
        stock: body.stock,
        featured: body.featured,
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (err) {
    console.error("Update product error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  await dbConnect();
  const { id } = await params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
