import { NextRequest, NextResponse } from "next/server";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value ?? null;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Not authenticated." },
      { status: 401 }
    );
  }

  const payload = verifyToken(token);

  if (!payload) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired session." },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, user }, { status: 200 });
}
