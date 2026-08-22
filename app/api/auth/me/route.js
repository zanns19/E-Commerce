import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ admin: null }, { status: 401 });
  }

  const payload = verifySessionToken(token);

  if (!payload) {
    return NextResponse.json({ admin: null }, { status: 401 });
  }

  return NextResponse.json({
    admin: { name: payload.name, email: payload.email },
  });
}
