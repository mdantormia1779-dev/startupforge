"use client";
import React, { useEffect, useState } from "react";
import { User, ShieldCheck, ShieldAlert, Trash2, Loader2 } from "lucide-react";
import DeleteModal from "../../FounderDashboard/DeleteModal/DeleteModal";

const API = process.env.NEXT_PUBLIC_API_URL;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API}/users`);
      const data = await res.json();

      // Admin ফিল্টার করা এবং status ফরম্যাট করা
      const processedUsers = data
        .filter((user) => user.role !== "Admin")
        .map((user) => ({
          ...user,
          status: user.isBlocked ? "Blocked" : "Active",
        }));

      setUsers(processedUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // function effec er vitor likhun 
    const loadUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/users`);
        const data = await res.json();

        const processedUsers = data
          .filter((user) => user.role !== "Admin")
          .map((user) => ({
            ...user,
            status: user.isBlocked ? "Blocked" : "Active",
          }));

        setUsers(processedUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []); 

  // Block/Unblock toggle
  const toggleBlock = async (user) => {
    try {
      await fetch(`${API}/users/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBlocked: !user.isBlocked }),
      });
      fetchUsers();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // Delete User
  const confirmDelete = async () => {
    try {
      await fetch(`${API}/users/${selectedUser._id}`, { method: "DELETE" });
      setUsers(users.filter((u) => u._id !== selectedUser._id));
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );

  return (
    <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">User Management</h2>
        <p className="text-sm text-muted-foreground">
          Manage user access and account lifecycle
        </p>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-background rounded-2xl border border-border gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <User size={20} />
              </div>
              <div>
                <h3 className="font-bold">{user.name}</h3>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                  user.status === "Active"
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "bg-red-500/10 text-red-600"
                }`}
              >
                {user.status}
              </span>

              <button
                onClick={() => toggleBlock(user)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  user.status === "Active"
                    ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                    : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                }`}
              >
                {user.status === "Active" ? (
                  <>
                    <ShieldAlert size={14} /> Block
                  </>
                ) : (
                  <>
                    <ShieldCheck size={14} /> Unblock
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setSelectedUser(user);
                  setIsModalOpen(true);
                }}
                className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        startupName={selectedUser?.name}
      />
    </div>
  );
};

export default ManageUsers;
