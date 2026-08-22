import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { getAdminSession } from "@/lib/requireAdmin";

// GET is admin-only — this is the inbox of customer inquiries.
export async function GET(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const query = status ? { status } : {};
  const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });

  return NextResponse.json({ inquiries });
}

// POST is public — anyone can submit the contact/inquiry form.
export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    await dbConnect();

    const inquiry = await Inquiry.create({
      name,
      email,
      phone: phone || "",
      message,
    });

    return NextResponse.json({ inquiry }, { status: 201 });
  } catch (err) {
    console.error("Create inquiry error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
