import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // 2. Look up the user in the Prisma database
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    // 3. Verify user exists and has ADMIN role
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Invalid credentials or not an admin" },
        { status: 401 }
      );
    }

    // 4. Simple password check (Note: For beginners, comparing plain text or simple bcrypt)
    // Here we use bcrypt to compare the password with the stored hash
    const bcrypt = require("bcryptjs");
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 5. Create a simple, basic session cookie (No advanced JWT yet, just user ID)
    const response = NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );

    // Set a simple secure HTTP-only cookie indicating the user is logged in
    response.cookies.set({
      name: "simple_admin_session",
      value: user.id,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
