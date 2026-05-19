import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

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

  // 5. Render the Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Virtual CGO <span className="text-blue-600">Admin</span></h1>
        
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stat Cards */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Projects</h3>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Active Staff</h3>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Pending Assignments</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to your Dashboard</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            This is a clean, secure admin dashboard. From here, you can manage staff, assign projects, and oversee operations.
          </p>
        </div>
      </main>
    </div>
  );
}
