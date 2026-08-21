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
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, category, description, price, imageUrl, inStock } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    await dbConnect();

    const product = await Product.create({
      name,
      category: category || "other",
      description: description || "",
      price: price || 0,
      imageUrl: imageUrl || "",
      inStock: inStock !== undefined ? inStock : true,
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
