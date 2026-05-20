import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ProjectStatus } from "@prisma/client";

// Helper function to verify that the request is made by an authenticated STAFF member
async function verifyStaff() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("simple_admin_session")?.value;

  if (!sessionId) {
    return null;
  }

  const staff = await prisma.user.findUnique({
    where: { id: sessionId },
  });

  if (!staff || staff.role !== "STAFF") {
    return null;
  }

  return staff;
}

// 1. GET: Fetch all projects assigned to the logged-in staff member
export async function GET() {
  try {
    const staff = await verifyStaff();
    if (!staff) {
      return NextResponse.json(
        { success: false, message: "Unauthorized or not a staff member" },
        { status: 401 }
      );
    }

    const projects = await prisma.project.findMany({
      where: { assignedToId: staff.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("Fetch Staff Projects Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// 2. PUT: Update status of an assigned project
export async function PUT(request: NextRequest) {
  try {
    const staff = await verifyStaff();
    if (!staff) {
      return NextResponse.json(
        { success: false, message: "Unauthorized or not a staff member" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Project ID and Status are required" },
        { status: 400 }
      );
    }

    // Verify the project is assigned to this staff member
    const project = await prisma.project.findFirst({
      where: {
        id,
        assignedToId: staff.id,
      },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found or not assigned to you" },
        { status: 404 }
      );
    }

    // Map status string to ProjectStatus enum
    let projectStatus: ProjectStatus = ProjectStatus.PENDING;
    if (status === "IN_PROGRESS") projectStatus = ProjectStatus.IN_PROGRESS;
    if (status === "COMPLETED") projectStatus = ProjectStatus.COMPLETED;

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        status: projectStatus,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Project status updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Update Staff Project Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update project status" },
      { status: 500 }
    );
  }
}
