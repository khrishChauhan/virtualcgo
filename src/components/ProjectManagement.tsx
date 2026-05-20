"use client";

import { useState, useEffect } from "react";

interface StaffUser {
  id: string;
  name: string | null;
  email: string;
}

interface Project {
  id: string;
  title: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  description: string | null;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  assignedToId: string | null;
  assignedTo: {
    id: string;
    name: string | null;
    email: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

interface ProjectManagementProps {
  onProjectsUpdated?: () => void;
}

export default function ProjectManagement({ onProjectsUpdated }: ProjectManagementProps) {
  // State variables
  const [projects, setProjects] = useState<Project[]>([]);
  const [staffList, setStaffList] = useState<StaffUser[]>([]);
  
  // Form variables
  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"PENDING" | "IN_PROGRESS" | "COMPLETED">("PENDING");
  const [assignedToId, setAssignedToId] = useState("");
  
  // UX State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" }); // 'success' | 'error'
  
  // Filter/Search variables
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      setFetching(true);
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (res.ok && data.success) {
        setProjects(data.projects);
      } else {
        showFeedback(data.message || "Failed to load projects list", "error");
      }
    } catch {
      showFeedback("Network error loading projects list", "error");
    } finally {
      setFetching(false);
    }
  };

  // Fetch active staff
  const fetchStaff = async () => {
    try {
      const res = await fetch("/api/admin/staff");
      const data = await res.json();
      if (res.ok && data.success) {
        setStaffList(data.staff);
      }
    } catch {
      console.error("Failed to fetch staff members for dropdown");
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showFeedback = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000);
  };

  // Reset form to blank state
  const resetForm = () => {
    setTitle("");
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setDescription("");
    setStatus("PENDING");
    setAssignedToId("");
    setEditingId(null);
  };

  // Create or Update a project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !clientName || !clientEmail || !clientPhone) {
      showFeedback("Please fill out all required fields.", "error");
      return;
    }

    setLoading(true);
    try {
      const url = "/api/admin/projects";
      const method = editingId ? "PUT" : "POST";
      const bodyPayload = {
        id: editingId,
        title,
        clientName,
        clientEmail,
        clientPhone,
        description,
        status,
        assignedToId: assignedToId || null,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showFeedback(
          editingId
            ? "Project updated successfully!"
            : "Project created and assigned successfully!",
          "success"
        );
        resetForm();
        fetchProjects();
        if (onProjectsUpdated) {
          onProjectsUpdated();
        }
      } else {
        showFeedback(data.message || "Operation failed", "error");
      }
    } catch {
      showFeedback("Server connection error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Trigger Edit Mode (load project info into form)
  const handleStartEdit = (project: Project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setClientName(project.clientName);
    setClientEmail(project.clientEmail);
    setClientPhone(project.clientPhone);
    setDescription(project.description || "");
    setStatus(project.status);
    setAssignedToId(project.assignedToId || "");
    
    // Scroll to form smoothly on mobile
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  // Delete a project
  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showFeedback("Project deleted successfully", "success");
        setProjects((prev) => prev.filter((item) => item.id !== id));
        if (onProjectsUpdated) {
          onProjectsUpdated();
        }
      } else {
        showFeedback(data.message || "Failed to delete project", "error");
      }
    } catch {
      showFeedback("Server connection error when deleting project", "error");
    }
  };

  // Quick Inline Status Update
  const handleStatusChange = async (id: string, newStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED") => {
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showFeedback("Project status updated successfully!", "success");
        // Update local state
        setProjects((prev) =>
          prev.map((proj) =>
            proj.id === id ? { ...proj, status: newStatus } : proj
          )
        );
        if (onProjectsUpdated) {
          onProjectsUpdated();
        }
      } else {
        showFeedback(data.message || "Failed to update status", "error");
      }
    } catch {
      showFeedback("Server connection error when updating status", "error");
    }
  };

  // Quick Inline Assignment Update
  const handleAssigneeChange = async (id: string, newAssigneeId: string) => {
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, assignedToId: newAssigneeId || null }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showFeedback("Project assignee updated successfully!", "success");
        // Reload list to get proper nested assignedTo object
        fetchProjects();
        if (onProjectsUpdated) {
          onProjectsUpdated();
        }
      } else {
        showFeedback(data.message || "Failed to update assignee", "error");
      }
    } catch {
      showFeedback("Server connection error when updating assignee", "error");
    }
  };

  // Filter & Search Logic
  const filteredProjects = projects.filter((proj) => {
    const matchesSearch =
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (proj.description && proj.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "ALL" ? true : proj.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* 1. Create/Edit Project Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-150 h-fit">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full inline-block"></span>
            {editingId ? "Edit Project" : "Create Business Project"}
          </h2>
          {editingId && (
            <button
              onClick={resetForm}
              className="text-xs text-gray-500 hover:text-gray-700 bg-gray-100 px-2 py-1 rounded"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800 placeholder-gray-400"
              placeholder="e.g. Q3 Sales & Performance Auditing"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
              Client Name *
            </label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800 placeholder-gray-400"
              placeholder="e.g. Arthur Pendragon"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                Client Email *
              </label>
              <input
                type="email"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800 placeholder-gray-400"
                placeholder="client@company.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                Client Phone *
              </label>
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800 placeholder-gray-400"
                placeholder="+1 (555) 019-2834"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
              Project Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800 placeholder-gray-400"
              placeholder="Outline the scopes, milestones, goals or notes..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                Project Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "PENDING" | "IN_PROGRESS" | "COMPLETED")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white text-gray-800"
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                Assign Staff Member
              </label>
              <select
                value={assignedToId}
                onChange={(e) => setAssignedToId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white text-gray-800"
              >
                <option value="">Unassigned (Pending)</option>
                {staffList.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.name || staff.email}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {message.text && (
            <div
              className={`p-3 rounded-lg text-xs border text-center transition-all ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border-green-100"
                  : "bg-red-50 text-red-700 border-red-100"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium text-sm py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2 shadow-sm"
          >
            {loading ? (
              <span>Saving...</span>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                <span>{editingId ? "Update Project" : "Add & Assign Project"}</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* 2. Projects Grid/Directory */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-150 lg:col-span-2">
        {/* Controls & Filter Panel */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mr-auto">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full inline-block"></span>
            Agency Projects
            <span className="text-xs bg-gray-100 text-gray-500 font-semibold px-2 py-0.5 rounded-full ml-1.5">
              {filteredProjects.length}
            </span>
          </h2>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search project, client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 w-full md:w-44 text-gray-800"
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
          </div>
        </div>

        {fetching ? (
          <div className="space-y-3 py-6">
            <div className="animate-pulse bg-gray-100 h-16 rounded-lg"></div>
            <div className="animate-pulse bg-gray-100 h-16 rounded-lg"></div>
            <div className="animate-pulse bg-gray-100 h-16 rounded-lg"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-xl">
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
            <p className="text-sm text-gray-500 font-medium">No projects match criteria</p>
            <p className="text-xs text-gray-400 mt-1">Create a new project using the form on the left.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="p-5 rounded-xl border border-gray-200 hover:border-blue-100 hover:shadow-sm bg-white transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left side: Project primary details */}
                <div className="space-y-2 max-w-md">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-bold text-sm text-gray-900 hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    
                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
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
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  )}

                  {/* Client Info Grid */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {project.clientName}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {project.clientEmail}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {project.clientPhone}
                    </span>
                  </div>
                </div>

                {/* Right side: Quick actions & Assignment select */}
                <div className="flex flex-row md:flex-col items-start md:items-end justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t border-gray-100 md:border-t-0">
                  {/* Status quick select */}
                  <div className="flex flex-col gap-1 w-28 md:w-36">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Status</label>
                    <select
                      value={project.status}
                      onChange={(e) => handleStatusChange(project.id, e.target.value as "PENDING" | "IN_PROGRESS" | "COMPLETED")}
                      className="text-xs px-2 py-1.5 border border-gray-200 rounded-lg outline-none bg-white font-medium text-gray-700 w-full"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>

                  {/* Staff Assign select */}
                  <div className="flex flex-col gap-1 w-32 md:w-44">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Assigned Staff</label>
                    <select
                      value={project.assignedToId || ""}
                      onChange={(e) => handleAssigneeChange(project.id, e.target.value)}
                      className="text-xs px-2 py-1.5 border border-gray-200 rounded-lg outline-none bg-white font-medium text-gray-700 w-full"
                    >
                      <option value="">Unassigned</option>
                      {staffList.map((staff) => (
                        <option key={staff.id} value={staff.id}>
                          {staff.name || staff.email}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-1 items-center self-end mt-1">
                    <button
                      onClick={() => handleStartEdit(project)}
                      className="text-blue-500 hover:text-blue-700 bg-transparent hover:bg-blue-50 p-1.5 rounded-lg transition-colors inline-flex items-center justify-center"
                      title="Edit project"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-red-500 hover:text-red-700 bg-transparent hover:bg-red-50 p-1.5 rounded-lg transition-colors inline-flex items-center justify-center"
                      title="Delete project"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
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
