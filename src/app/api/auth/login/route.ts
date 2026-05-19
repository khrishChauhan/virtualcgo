import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  comparePassword,
  signToken,
  buildAuthCookie,
} from "@/lib/auth";

// ─── POST /api/auth/login ─────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // ── Parse + validate body ─────────────────────────────────────────────────
    const body = await request.json().catch(() => null);

    if (!body || typeof body.email !== "string" || typeof body.password !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const { email, password } = body as { email: string; password: string };

    if (!email.trim() || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    // ── Lookup user ───────────────────────────────────────────────────────────
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        createdAt: true,
      },
    });

    // Use a consistent error to prevent user enumeration
    const INVALID_CREDENTIALS = "Invalid email or password.";

    if (!user) {
      return NextResponse.json(
        { success: false, message: INVALID_CREDENTIALS },
        { status: 401 }
      );
    }

    // ── Verify password ───────────────────────────────────────────────────────
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: INVALID_CREDENTIALS },
        { status: 401 }
      );
    }

    // ── Sign JWT ──────────────────────────────────────────────────────────────
    const token = signToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    // ── Set HTTP-only cookie ──────────────────────────────────────────────────
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
      { status: 200 }
    );

    response.headers.set("Set-Cookie", buildAuthCookie(token));

    return response;
  } catch (error) {
    console.error("[POST /api/auth/login]", error);
    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
