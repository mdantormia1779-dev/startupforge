"use client";
import React, { useState } from "react";
import { Edit2, Trash2, Briefcase, Clock, PlusCircle } from "lucide-react";
import DeleteModal from "../DeleteModal/DeleteModal";
import AddOpportunity from "../AddOpportunity/AddOpportunity"; // আপনার আগে তৈরি করা কম্পোনেন্ট
import ManageOpportunityEdit from "../ManageStartupEdit/ManageStartupEdit";

const ManageOpportunities = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOp, setSelectedOp] = useState(null);
  const [modalMode, setModalMode] = useState("add"); // 'add' অথবা 'edit'

  const [opportunities, setOpportunities] = useState([
    { id: 1, role: "Senior Frontend Dev", skills: "React, TS", type: "Remote", deadline: "2026-07-15" },
    { id: 2, role: "Product Designer", skills: "Figma, UX", type: "Hybrid", deadline: "2026-07-20" },
  ]);

  const openModal = (mode, op = null) => {
    setModalMode(mode);
    setSelectedOp(op);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (op) => {
    setSelectedOp(op);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setOpportunities(opportunities.filter((op) => op.id !== selectedOp.id));
    setIsDeleteModalOpen(false);
    setSelectedOp(null);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Opportunities</h1>
          <p className="text-gray-500">View and manage your posted roles.</p>
        </div>
        <button 
          onClick={() => openModal("add")}
          className="bg-black dark:bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90"
        >
          <PlusCircle size={16} /> Add New Role
        </button>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map((op) => (
          <div key={op.id} className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-200 dark:border-border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-gray-100 dark:bg-background p-3 rounded-xl"><Briefcase size={20} /></div>
              <div className="flex gap-2">
                <button onClick={() => openModal("edit", op)} className="p-2 hover:bg-gray-100 dark:hover:bg-background rounded-lg"><Edit2 size={16} /></button>
                <button onClick={() => handleDeleteClick(op)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg"><Trash2 size={16} /></button>
              </div>
            </div>
            <h3 className="font-bold text-lg">{op.role}</h3>
            <p className="text-sm text-gray-500 mb-4">{op.skills}</p>
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-400">
              <span className="bg-gray-50 dark:bg-background px-2 py-1 rounded">{op.type}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {op.deadline}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      <DeleteModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={confirmDelete}
        startupName={selectedOp?.role || ""} 
      />

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-card p-6 rounded-2xl w-full max-w-lg relative">
            <h2 className="text-xl font-bold mb-4">{modalMode === "add" ? "Add Opportunity" : "Edit Opportunity"}</h2>
            <ManageOpportunityEdit></ManageOpportunityEdit> {/* এখানে আগের তৈরি করা ফর্মটি বসবে */}
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="w-full p-3 border dark:border-border rounded-xl font-bold mt-4 hover:bg-gray-50 dark:hover:bg-background"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOpportunities;