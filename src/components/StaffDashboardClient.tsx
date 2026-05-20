"use client";

import { useState } from "react";

interface Project {
  id: string;
  title: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  description: string | null;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
}

interface StaffDashboardClientProps {
  initialProjects: Project[];
}

export default function StaffDashboardClient({ initialProjects }: StaffDashboardClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState({ text: "", type: "" }); // 'success' | 'error'

  // Fetch updated list from API
  const refreshProjects = async () => {
    try {
      const res = await fetch("/api/staff/projects");
      const data = await res.json();
      if (res.ok && data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error("Failed to refresh staff projects:", error);
    }
  };

  const showFeedback = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000);
  };

  // Update status of an assigned project
  const handleStatusChange = async (id: string, newStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED") => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/staff/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showFeedback("Status updated successfully!", "success");
        // Update local state instantly
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
        );
      } else {
        showFeedback(data.message || "Failed to update status", "error");
      }
    } catch {
      showFeedback("Server connection error when updating status", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  // Calculate Metrics from current projects state
  const totalAssigned = projects.length;
  const pendingCount = projects.filter((p) => p.status === "PENDING").length;
  const inProgressCount = projects.filter((p) => p.status === "IN_PROGRESS").length;
  const completedCount = projects.filter((p) => p.status === "COMPLETED").length;

  // Filter projects based on search term & selected status
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "ALL" ? true : p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Assigned */}
        <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                Assigned Projects
              </h3>
              <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {totalAssigned}
              </p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H-2" />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500 font-medium">
            Active pipeline items
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full translate-x-8 -translate-y-8" />
        </div>

        {/* Pending */}
        <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                Pending Starts
              </h3>
              <p className="text-3xl font-extrabold text-blue-600 tracking-tight">
                {pendingCount}
              </p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-500 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500 font-medium">
            Waiting for work to begin
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full translate-x-8 -translate-y-8" />
        </div>

        {/* In Progress */}
        <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                In Progress
              </h3>
              <p className="text-3xl font-extrabold text-amber-600 tracking-tight">
                {inProgressCount}
              </p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full inline-block animate-pulse"></span>
            Currently working on
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full translate-x-8 -translate-y-8" />
        </div>

        {/* Completed */}
        <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                Completed
              </h3>
              <p className="text-3xl font-extrabold text-green-600 tracking-tight">
                {completedCount}
              </p>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500 font-medium">
            Finished deliverables
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full translate-x-8 -translate-y-8" />
        </div>
      </div>

      {/* Main Board Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm">
        {/* Board Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-blue-600 rounded-full inline-block"></span>
              Your Assigned Tasks
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Review and update status on the specific projects assigned to you by administration.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search tasks, clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 w-full md:w-48 text-gray-800"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2 py-1.5 border border-gray-200 rounded-lg text-xs outline-none bg-white text-gray-700"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <button
              onClick={refreshProjects}
              className="p-1.5 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
              title="Refresh deliverables"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8.89M9 11l3 3L22 4" />
              </svg>
            </button>
          </div>
        </div>

        {message.text && (
          <div
            className={`p-3 mb-4 rounded-lg text-xs border text-center transition-all ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border-green-100"
                : "bg-red-50 text-red-700 border-red-100"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Deliverables List */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-xl">
            <svg
              className="w-12 h-12 text-gray-300 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-sm text-gray-500 font-medium">No assigned projects found</p>
            <p className="text-xs text-gray-400 mt-1">
              {searchTerm || statusFilter !== "ALL"
                ? "Try adjusting your filters or search terms."
                : "Projects assigned by the administrator will instantly appear here."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-blue-150 transition-all flex flex-col justify-between gap-4 relative"
              >
                {/* Loader Overlay */}
                {updatingId === project.id && (
                  <div className="absolute inset-0 bg-white/70 rounded-xl flex items-center justify-center z-10 animate-fade-in">
                    <span className="text-xs font-semibold text-blue-600 animate-pulse">
                      Updating...
                    </span>
                  </div>
                )}

                <div className="space-y-3">
                  {/* Status Badge & Header */}
                  <div className="flex justify-between items-start gap-2.5">
                    <h3 className="font-bold text-base text-gray-900 leading-tight">
                      {project.title}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider h-fit w-fit ${
                        project.status === "COMPLETED"
                          ? "bg-green-50 text-green-700 border border-green-100"
                          : project.status === "IN_PROGRESS"
                          ? "bg-amber-50 text-amber-700 border border-amber-100"
                          : "bg-blue-50 text-blue-700 border border-blue-100"
                      }`}
                    >
                      {project.status === "IN_PROGRESS" ? "IN PROGRESS" : project.status}
                    </span>
                  </div>

                  {project.description && (
                    <p className="text-xs text-gray-600 leading-relaxed font-normal whitespace-pre-line border-l-2 border-blue-200 pl-3">
                      {project.description}
                    </p>
                  )}

                  {/* Client Details Section */}
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 space-y-2 mt-2">
                    <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      Client Contact
                    </h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p className="font-semibold text-gray-800 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {project.clientName}
                      </p>
                      <p className="flex items-center gap-1.5 font-medium hover:text-blue-600">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href={`mailto:${project.clientEmail}`}>{project.clientEmail}</a>
                      </p>
                      <p className="flex items-center gap-1.5 font-medium hover:text-blue-600">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`tel:${project.clientPhone}`}>{project.clientPhone}</a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer status selection */}
                <div className="pt-3 border-t border-gray-100 flex justify-between items-center gap-2">
                  <span className="text-[10px] text-gray-400 font-semibold">
                    Assigned: {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium">Update Status:</span>
                    <select
                      value={project.status}
                      onChange={(e) => handleStatusChange(project.id, e.target.value as "PENDING" | "IN_PROGRESS" | "COMPLETED")}
                      className="text-xs px-2 py-1 border border-gray-200 rounded-lg outline-none bg-white font-semibold text-gray-700"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
