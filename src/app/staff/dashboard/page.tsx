import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

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
    // If not a staff but admin, they should go back to login (which handles admin)
    // Or we can redirect to login to be clean
    redirect("/login");
  }

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
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            {(staff.name || "S")[0].toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to your Portal</h2>
          <p className="text-gray-600 mb-6">
            You are logged in as a registered Staff member ({staff.email}). Your assigned projects and daily task queue will appear here as soon as the Admin allocates them to you.
          </p>

          <div className="border-t border-gray-100 pt-6">
            <div className="text-left bg-gray-50 p-4 rounded-lg border border-gray-150">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Quick Stats:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>Assigned Projects:</span>
                  <span className="font-bold text-blue-600">0</span>
                </li>
                <li className="flex justify-between">
                  <span>Completed Tasks:</span>
                  <span className="font-bold text-green-600">0</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
