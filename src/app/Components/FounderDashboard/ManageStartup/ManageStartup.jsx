"use client";
import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import DeleteModal from "../DeleteModal/DeleteModal";
import ManageStartupEdit from "../ManageStartupEdit/ManageStartupEdit";

const ManageStartup = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const startup = {
    name: "Nexus Pay",
    industry: "FinTech",
    description: "Nexus Pay is building the next generation of cross-border payment infrastructure for emerging markets. Our platform reduces transaction friction by 60% using proprietary ledger technology and AI-driven compliance checks.",
    fundingStage: "Seed Round",
    founded: "March 2023",
    email: "sarah@nexuspay.io",
    website: "https://nexuspay.io",
    stats: [
      { label: "Active Users", val: "12.4k" },
      { label: "Burn Rate", val: "$42k/mo" },
      { label: "Runway", val: "14 Mos" },
    ],
  };

  const handleDelete = () => {
    // এখানে আপনার API Call বা ডিলিট লজিক হবে
    console.log("Startup deleted successfully!");
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Manage Startup</h1>

      {/* Main Startup Card */}
      <div className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-2xl p-8 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 dark:bg-background rounded-2xl flex items-center justify-center font-bold text-2xl text-black dark:text-white">N</div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{startup.name}</h2>
              <span className="text-xs bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full">{startup.industry}</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={() => setIsUpdateModalOpen(true)}
              className="p-2 bg-gray-100 dark:bg-background hover:bg-gray-200 dark:hover:bg-border rounded-xl transition-colors"
            >
              <Edit2 size={18} className="text-foreground" />
            </button>
            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              className="p-2 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
            >
              <Trash2 size={18} className="text-red-500" />
            </button>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{startup.description}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {startup.stats.map((s, i) => (
            <div key={i} className="bg-gray-50 dark:bg-background p-4 rounded-xl border border-gray-100 dark:border-border">
              <p className="text-xs text-gray-400 dark:text-muted-foreground">{s.label}</p>
              <h4 className="text-lg font-bold text-foreground">{s.val}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <DeleteModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleDelete} 
        startupName={startup.name} 
      />

      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-card p-6 rounded-2xl w-full max-w-lg border dark:border-border shadow-2xl">
            {/* এডিট কম্পোনেন্টটি এখানে লোড হবে */}
            <ManageStartupEdit />
            
            <button 
              onClick={() => setIsUpdateModalOpen(false)} 
              className="mt-4 w-full p-3 border dark:border-border rounded-xl font-bold text-foreground hover:bg-gray-50 dark:hover:bg-background transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStartup;