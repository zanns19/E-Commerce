import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { getAdminSession } from "@/lib/requireAdmin";

// GET is public so the storefront pages can list products/services.
export async function GET(request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const query = category ? { category } : {};
  const products = await Product.find(query).sort({ createdAt: -1 });

  return NextResponse.json({ products });
}

// POST is admin-only.
export async function POST(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      product_name,
      category,
      desc,
      price,
      originalPrice,
      discount,
      rating,
      image,
      stock,
      featured,
    } = body;

    if (!product_name) {
      return NextResponse.json(
        { error: "Product name is required." },
        { status: 400 }
      );
    }
    if (!desc) {
      return NextResponse.json(
        { error: "Description is required." },
        { status: 400 }
      );
    }
    if (!image) {
      return NextResponse.json(
        { error: "Image is required." },
        { status: 400 }
      );
    }
    if (!category) {
      return NextResponse.json(
        { error: "Category is required." },
        { status: 400 }
      );
    }

    await dbConnect();

    const product = await Product.create({
      product_name,
      category,
      desc,
      price: price || 0,
      originalPrice: originalPrice || null,
      discount: discount || 0,
      rating: rating || 0,
      image,
      stock: stock || 0,
      featured: featured !== undefined ? featured : false,
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    console.error("Create product error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
