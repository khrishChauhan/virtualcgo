import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

// Helper function to verify that the request is made by an authenticated ADMIN
async function verifyAdmin() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("simple_admin_session")?.value;

  if (!sessionId) {
    return null;
  }

  const admin = await prisma.user.findUnique({
    where: { id: sessionId },
  });

  if (!admin || admin.role !== "ADMIN") {
    return null;
  }

  return admin;
}

// 1. GET: Fetch all staff accounts
export async function GET() {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized or not an admin" },
        { status: 401 }
      );
    }

    const staffList = await prisma.user.findMany({
      where: { role: "STAFF" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, staff: staffList });
  } catch (error) {
    console.error("Fetch Staff Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch staff" },
      { status: 500 }
    );
  }
}

// 2. POST: Create a new staff account
export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized or not an admin" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, email, password } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email and password are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email is already registered" },
        { status: 400 }
      );
    }

    // Create the staff user (using plain text passwords for dev/testing consistency)
    const newStaff = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: "STAFF",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Staff account created successfully",
      staff: newStaff,
    });
  } catch (error) {
    console.error("Create Staff Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create staff account" },
      { status: 500 }
    );
  }
}

// 3. DELETE: Delete a staff account
export async function DELETE(request: NextRequest) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized or not an admin" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Staff ID is required" },
        { status: 400 }
      );
    }

    // Make sure we are deleting a user who is actually STAFF (prevent admins from deleting admins)
    const userToDelete = await prisma.user.findUnique({
      where: { id },
    });

    if (!userToDelete) {
      return NextResponse.json(
        { success: false, message: "Staff member not found" },
        { status: 404 }
      );
    }

    if (userToDelete.role !== "STAFF") {
      return NextResponse.json(
        { success: false, message: "Cannot delete non-staff accounts" },
        { status: 403 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Staff account deleted successfully",
    });
  } catch (error) {
    console.error("Delete Staff Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete staff account" },
      { status: 500 }
    );
  }
}
