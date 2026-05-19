import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import StaffManagement from "@/components/StaffManagement";

export default async function AdminDashboard() {
  // 1. Simple session check - read the cookie
  const cookieStore = cookies();
  const sessionId = cookieStore.get("simple_admin_session")?.value;

  // 2. If no session, redirect to login
  if (!sessionId) {
    redirect("/login");
  }

  // 3. Look up the admin user
  const admin = await prisma.user.findUnique({
    where: { id: sessionId },
  });

  // 4. Verify user exists and is an ADMIN
  if (!admin || admin.role !== "ADMIN") {
    redirect("/login");
  }

  // 5. Fetch real-time metrics for stat cards from Supabase database
  const totalProjects = await prisma.project.count();
  const activeStaff = await prisma.user.count({ where: { role: "STAFF" } });
  const pendingAssignments = await prisma.project.count({ where: { assignedTo: null } });

  // 6. Render the Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Virtual CGO <span className="text-blue-600">Admin Panel</span></h1>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Welcome, <strong>{admin.name || admin.email}</strong>
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
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Statistics section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat Cards */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-150">
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Projects</h3>
            <p className="text-3xl font-bold text-gray-900">{totalProjects}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-150">
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Active Staff</h3>
            <p className="text-3xl font-bold text-gray-900">{activeStaff}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-150">
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Pending Assignments</h3>
            <p className="text-3xl font-bold text-blue-600">{pendingAssignments}</p>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Welcome to your Dashboard</h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage staff accounts, assign business projects, and monitor CGO operations in real-time.
            </p>
          </div>
          <div className="text-xs bg-blue-50 border border-blue-100 text-blue-800 px-3 py-1.5 rounded-lg font-medium h-fit w-fit">
            System status: Online
          </div>
        </div>

        {/* Staff Management section */}
        <div className="border-t border-gray-200 pt-8">
          <StaffManagement />
        </div>
      </main>
    </div>
  );
}
