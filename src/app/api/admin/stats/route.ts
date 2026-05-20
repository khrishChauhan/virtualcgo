import { NextResponse } from "next/server";
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

export async function GET() {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized or not an admin" },
        { status: 401 }
      );
    }

    const totalStaff = await prisma.user.count({ where: { role: "STAFF" } });
    const totalProjects = await prisma.project.count();
    const activeProjects = await prisma.project.count({ where: { status: "IN_PROGRESS" } });
    const completedProjects = await prisma.project.count({ where: { status: "COMPLETED" } });

    return NextResponse.json({
      success: true,
      stats: {
        totalStaff,
        totalProjects,
        activeProjects,
        completedProjects,
      },
    });
  } catch (error) {
    console.error("Fetch Stats Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
