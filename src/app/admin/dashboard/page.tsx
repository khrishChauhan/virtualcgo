import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "@/components/AdminDashboardClient";

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

  // 5. Fetch real-time metrics for initial stat cards from Supabase database
  const totalStaff = await prisma.user.count({ where: { role: "STAFF" } });
  const totalProjects = await prisma.project.count();
  const activeProjects = await prisma.project.count({ where: { status: "IN_PROGRESS" } });
  const completedProjects = await prisma.project.count({ where: { status: "COMPLETED" } });

  const initialStats = {
    totalStaff,
    totalProjects,
    activeProjects,
    completedProjects,
  };

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
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AdminDashboardClient initialStats={initialStats} />
      </main>
    </div>
  );
}
