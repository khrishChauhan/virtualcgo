"use client";

import { useState } from "react";
import StaffManagement from "./StaffManagement";
import ProjectManagement from "./ProjectManagement";

interface DashboardStats {
  totalStaff: number;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
}

interface AdminDashboardClientProps {
  initialStats: DashboardStats;
}

export default function AdminDashboardClient({ initialStats }: AdminDashboardClientProps) {
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [activeTab, setActiveTab] = useState<"projects" | "staff">("projects");
  const [refreshing, setRefreshing] = useState(false);

  // Refresh statistics dynamically
  const refreshStats = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (res.ok && data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Failed to refresh dashboard stats:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Staff */}
        <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                Total Staff
              </h3>
              <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {stats.totalStaff}
              </p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-blue-600 font-semibold cursor-pointer" onClick={() => setActiveTab("staff")}>
            <span>View directory →</span>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full translate-x-8 -translate-y-8" />
        </div>

        {/* Total Projects */}
        <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                Total Projects
              </h3>
              <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {stats.totalProjects}
              </p>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-purple-600 font-semibold cursor-pointer" onClick={() => setActiveTab("projects")}>
            <span>Manage projects →</span>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full translate-x-8 -translate-y-8" />
        </div>

        {/* Active Projects */}
        <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                Active Projects
              </h3>
              <p className="text-3xl font-extrabold text-amber-600 tracking-tight">
                {stats.activeProjects}
              </p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full inline-block animate-pulse"></span>
            In Progress status
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full translate-x-8 -translate-y-8" />
        </div>

        {/* Completed Projects */}
        <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                Completed Projects
              </h3>
              <p className="text-3xl font-extrabold text-green-600 tracking-tight">
                {stats.completedProjects}
              </p>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
            100% finished
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full translate-x-8 -translate-y-8" />
        </div>
      </div>

      {/* Tabs Switcher and Refresh Indicator */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-3 rounded-xl border border-gray-150 shadow-sm">
        <div className="flex bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center justify-center gap-2 text-sm font-semibold px-5 py-2 rounded-md transition-all duration-200 w-full sm:w-auto ${
              activeTab === "projects"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800 bg-transparent"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Overview & Projects
          </button>
          <button
            onClick={() => setActiveTab("staff")}
            className={`flex items-center justify-center gap-2 text-sm font-semibold px-5 py-2 rounded-md transition-all duration-200 w-full sm:w-auto ${
              activeTab === "staff"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800 bg-transparent"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Staff Directory
          </button>
        </div>

        <button
          onClick={refreshStats}
          disabled={refreshing}
          className="flex items-center gap-2 text-xs bg-gray-50 hover:bg-gray-100 disabled:opacity-50 text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-200 rounded-lg transition-colors font-medium w-full sm:w-auto justify-center"
        >
          <svg
            className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-blue-500" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8.89M9 11l3 3L22 4"
            />
          </svg>
          {refreshing ? "Syncing..." : "Sync Metrics"}
        </button>
      </div>

      {/* Selected Workspace Component */}
      <div className="transition-all duration-300">
        {activeTab === "projects" ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">CGO Projects Workspace</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Create client records, construct project deliverables, assign active personnel, and manage pipeline operational status.
                </p>
              </div>
              <div className="text-xs bg-blue-50 border border-blue-100 text-blue-800 px-3 py-1.5 rounded-lg font-semibold h-fit w-fit">
                System Status: Online
              </div>
            </div>
            <ProjectManagement onProjectsUpdated={refreshStats} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Staff Accounts Workspace</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Provision new credentials, manage roles, and audit security accounts for corporate staff members.
                </p>
              </div>
              <div className="text-xs bg-purple-50 border border-purple-100 text-purple-800 px-3 py-1.5 rounded-lg font-semibold h-fit w-fit">
                Directory Status: Active
              </div>
            </div>
            <StaffManagement onStaffUpdated={refreshStats} />
          </div>
        )}
      </div>
    </div>
  );
}
