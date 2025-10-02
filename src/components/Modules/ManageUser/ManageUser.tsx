/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "@/components/Services/User";
import { toast } from "sonner";

export default function ManageUser() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const toastId = "fetching-users";
      try {
        setLoading(true);
        const data = await getAllUsers();
        setUsers(data?.data || []);
        toast.success("Users fetched successfully", { id: toastId });
      } catch (err: any) {
        const message = err?.response?.data?.message || err?.message || "Failed to fetch users";
        toast.error(message, { id: toastId });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 space-y-6 font-[Sansita]">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-amber-600">Manage Users</h2>
        <p className="text-sm text-gray-500">View all registered users in the system</p>
      </div>

      {/* Users Table */}
      <div className="border-2 border-amber-300 rounded-xl shadow-md bg-amber-50/30 p-6">
        {loading ? (
          <p className="text-sm text-gray-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-sm text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-amber-100">
                  <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">Phone</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-amber-600 border-b border-amber-300">Address</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-amber-50 transition"
                  >
                    <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">{user.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">{user.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">{user.phone || "N/A"}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 border-b border-amber-200">{user.address || "N/A"}</td>
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