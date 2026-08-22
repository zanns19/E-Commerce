import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const payload = token ? verifySessionToken(token) : null;

    if (!payload) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters." },
        { status: 400 }
      );
    }

    await dbConnect();

    const admin = await Admin.findById(payload.id);

    if (!admin) {
      return NextResponse.json({ error: "Admin not found." }, { status: 404 });
    }

    const isValid = await bcrypt.compare(currentPassword, admin.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 401 }
      );
    }

    admin.passwordHash = await bcrypt.hash(newPassword, 10);
    await admin.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Change password error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
