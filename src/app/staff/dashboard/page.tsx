import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import StaffDashboardClient from "@/components/StaffDashboardClient";

export default async function StaffDashboard() {
  // 1. Read the session cookie
  const cookieStore = cookies();
  const sessionId = cookieStore.get("simple_admin_session")?.value;

  // 2. If no session, redirect to login
  if (!sessionId) {
    redirect("/login");
  }

  // 3. Look up the staff user
  const staff = await prisma.user.findUnique({
    where: { id: sessionId },
  });

  // 4. Verify user exists and is a STAFF member
  if (!staff || staff.role !== "STAFF") {
    redirect("/login");
  }

  // 5. Query all projects assigned to this specific staff member
  const projects = await prisma.project.findMany({
    where: { assignedToId: staff.id },
    orderBy: { createdAt: "desc" },
  });

  // 6. Serialize dates safely before passing to the client component
  const serializedProjects = projects.map((p) => ({
    id: p.id,
    title: p.title,
    clientName: p.clientName,
    clientEmail: p.clientEmail,
    clientPhone: p.clientPhone,
    description: p.description,
    status: p.status as "PENDING" | "IN_PROGRESS" | "COMPLETED",
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">
          Virtual CGO <span className="text-blue-600">Staff Portal</span>
        </h1>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Welcome, <strong>{staff.name || staff.email}</strong>
          </span>
          <form action="/api/simple-logout" method="POST">
            <button 
              type="submit" 
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Welcome back, {staff.name || "Staff Member"}</h2>
            <p className="text-gray-500 text-sm mt-1">
              You are signed in as a CGO Delivery Specialist. Track assignments, update task states, and manage deliverables.
            </p>
          </div>
          <div className="text-xs bg-green-50 border border-green-100 text-green-800 px-3 py-1.5 rounded-lg font-semibold h-fit w-fit">
            Account Role: STAFF
          </div>
        </div>

        {/* Dynamic client workspace */}
        <StaffDashboardClient initialProjects={serializedProjects} />
      </main>
    </div>
  );
}
