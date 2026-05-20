import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ProjectStatus } from "@prisma/client";

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

// 1. GET: Fetch all projects
export async function GET() {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized or not an admin" },
        { status: 401 }
      );
    }

    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("Fetch Projects Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// 2. POST: Create a new project
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
    const { title, clientName, clientEmail, clientPhone, description, status, assignedToId } = body;

    // Validation
    if (!title || !clientName || !clientEmail || !clientPhone) {
      return NextResponse.json(
        { success: false, message: "Title, client name, email, and phone are required" },
        { status: 400 }
      );
    }

    // Ensure valid status
    let projectStatus: ProjectStatus = ProjectStatus.PENDING;
    if (status === "IN_PROGRESS") projectStatus = ProjectStatus.IN_PROGRESS;
    if (status === "COMPLETED") projectStatus = ProjectStatus.COMPLETED;

    // Create the project
    const newProject = await prisma.project.create({
      data: {
        title,
        clientName,
        clientEmail,
        clientPhone,
        description: description || null,
        status: projectStatus,
        assignedToId: assignedToId || null,
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Create Project Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create project" },
      { status: 500 }
    );
  }
}

// 3. PUT: Update an existing project
export async function PUT(request: NextRequest) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized or not an admin" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, title, clientName, clientEmail, clientPhone, description, status, assignedToId } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: {
      title?: string;
      clientName?: string;
      clientEmail?: string;
      clientPhone?: string;
      description?: string | null;
      status?: ProjectStatus;
      assignedToId?: string | null;
    } = {};
    if (title !== undefined) updateData.title = title;
    if (clientName !== undefined) updateData.clientName = clientName;
    if (clientEmail !== undefined) updateData.clientEmail = clientEmail;
    if (clientPhone !== undefined) updateData.clientPhone = clientPhone;
    if (description !== undefined) updateData.description = description || null;
    if (status !== undefined) {
      let projectStatus: ProjectStatus = ProjectStatus.PENDING;
      if (status === "IN_PROGRESS") projectStatus = ProjectStatus.IN_PROGRESS;
      if (status === "COMPLETED") projectStatus = ProjectStatus.COMPLETED;
      updateData.status = projectStatus;
    }
    if (assignedToId !== undefined) {
      updateData.assignedToId = assignedToId || null;
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: updateData,
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Update Project Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update project" },
      { status: 500 }
    );
  }
}

// 4. DELETE: Delete a project
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
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete Project Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete project" },
      { status: 500 }
    );
  }
}
