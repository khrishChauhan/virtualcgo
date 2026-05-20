"use client";

import { useState, useEffect } from "react";

interface StaffUser {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
}

interface StaffManagementProps {
  onStaffUpdated?: () => void;
}

export default function StaffManagement({ onStaffUpdated }: StaffManagementProps) {
  const [staffList, setStaffList] = useState<StaffUser[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" }); // type: 'success' | 'error'

  // Fetch all staff members on component mount
  const fetchStaff = async () => {
    try {
      setFetching(true);
      const res = await fetch("/api/admin/staff");
      const data = await res.json();
      if (res.ok && data.success) {
        setStaffList(data.staff);
      } else {
        showFeedback(data.message || "Failed to load staff list", "error");
      }
    } catch {
      showFeedback("Network error loading staff list", "error");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showFeedback = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000);
  };

  // Create a new staff account
  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showFeedback("Staff account created successfully!", "success");
        setName("");
        setEmail("");
        setPassword("");
        // Reload list
        fetchStaff();
        if (onStaffUpdated) {
          onStaffUpdated();
        }
      } else {
        showFeedback(data.message || "Failed to create staff account", "error");
      }
    } catch {
      showFeedback("Server connection error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete a staff account
  const handleDeleteStaff = async (id: string) => {
    if (!confirm("Are you sure you want to delete this staff member? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/staff?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showFeedback("Staff account deleted successfully", "success");
        // Optimistically remove from state
        setStaffList((prev) => prev.filter((item) => item.id !== id));
        if (onStaffUpdated) {
          onStaffUpdated();
        }
      } else {
        showFeedback(data.message || "Failed to delete staff account", "error");
      }
    } catch {
      showFeedback("Server connection error when deleting staff", "error");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* 1. Create Staff Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-150 h-fit">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-blue-600 rounded-full inline-block"></span>
          Create Staff Member
        </h2>

        <form onSubmit={handleCreateStaff} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800 placeholder-gray-400"
              placeholder="e.g. Sarah Jenkins"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800 placeholder-gray-400"
              placeholder="e.g. sarah@virtualcgo.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800 placeholder-gray-400"
              placeholder="••••••••"
            />
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
              <span>Creating...</span>
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                <span>Add Staff User</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* 2. Staff Accounts Directory */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-150 lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full inline-block"></span>
            Staff Directory
          </h2>
          <span className="text-xs bg-gray-100 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full font-medium">
            {staffList.length} Active Staff
          </span>
        </div>

        {fetching ? (
          <div className="space-y-3 py-6">
            <div className="animate-pulse bg-gray-100 h-12 rounded-lg"></div>
            <div className="animate-pulse bg-gray-100 h-12 rounded-lg"></div>
            <div className="animate-pulse bg-gray-100 h-12 rounded-lg"></div>
          </div>
        ) : staffList.length === 0 ? (
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-sm text-gray-500 font-medium">No staff members created yet</p>
            <p className="text-xs text-gray-400 mt-1">Use the form on the left to add your first staff account.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 pl-2">Staff Member</th>
                  <th className="pb-3">Email Address</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3 text-right pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {staffList.map((staff) => (
                  <tr key={staff.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 pl-2 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-xs">
                        {(staff.name || staff.email)[0].toUpperCase()}
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-gray-900 block">
                          {staff.name || "Unnamed"}
                        </span>
                        <span className="text-xs text-gray-400">
                          Added {new Date(staff.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-600 font-medium">
                      {staff.email}
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-800 border border-blue-100">
                        Staff
                      </span>
                    </td>
                    <td className="py-3 text-right pr-2">
                      <button
                        onClick={() => handleDeleteStaff(staff.id)}
                        className="text-red-500 hover:text-red-700 bg-transparent hover:bg-red-50 p-1.5 rounded-lg transition-colors inline-flex items-center justify-center"
                        title="Delete staff account"
                      >
                        <svg
                          className="w-4.5 h-4.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.75"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
