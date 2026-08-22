import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();

  const products = await Product.find({ category: "Discount" })
    .sort({ createdAt: -1 })
    .lean()
    .exec();

  const formatted = products.map((product) => ({
    ...product,
    _id: product._id.toString(),
    orgprice: product.originalPrice,
    dist: product.discount,
  }));

  return NextResponse.json({ products: formatted });
}
