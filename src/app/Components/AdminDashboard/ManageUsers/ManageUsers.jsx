"use client";
import React, { useState } from "react";
import { User, ShieldCheck, ShieldAlert, Trash2 } from "lucide-react";
import DeleteModal from "../../FounderDashboard/DeleteModal/DeleteModal";

const initialUsers = [
  { id: 1, name: "Sarah Jenkins", email: "sarah@example.com", status: "Active" },
  { id: 2, name: "David Chen", email: "david@example.com", status: "Blocked" },
  { id: 3, name: "Elena Rodriguez", email: "elena@example.com", status: "Active" },
];

const ManageUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleBlock = (id) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" } : u
    ));
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(u => u.id !== selectedUser.id));
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">User Management</h2>
        <p className="text-sm text-muted-foreground">Manage user access and account lifecycle</p>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-background rounded-2xl border border-border gap-4">
            
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
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                user.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
              }`}>
                {user.status}
              </span>

              <button 
                onClick={() => toggleBlock(user.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  user.status === "Active" 
                    ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100" 
                    : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                }`}
              >
                {user.status === "Active" ? <><ShieldAlert size={14} /> Block</> : <><ShieldCheck size={14} /> Unblock</>}
              </button>

              <button 
                onClick={() => openDeleteModal(user)}
                className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-100"
                title="Delete User"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      <DeleteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={confirmDelete}
        startupName={selectedUser?.name} // এখানে নাম পাঠাচ্ছি
      />
    </div>
  );
};

export default ManageUsers;