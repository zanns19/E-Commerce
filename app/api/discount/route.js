import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;

  const db = client.db();

  const products = await db
    .collection("discount")
    .find({})
    .toArray();

  return Response.json(products);
}