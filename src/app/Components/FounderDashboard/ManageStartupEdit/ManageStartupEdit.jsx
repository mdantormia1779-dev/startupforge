"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

const ManageOpportunityEdit = ({ opportunity, onClose, onUpdate }) => {
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    roleTitle: opportunity?.roleTitle || "",
    requiredSkills: opportunity?.requiredSkills || "",
    workType: opportunity?.workType || "Remote",
    commitment: opportunity?.commitment || "Part-time",
    deadline: opportunity?.deadline || "",
    description: opportunity?.description || "",
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/opportunities/${opportunity._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      
      if (result.success || result.modifiedCount > 0) {
        onUpdate?.(); // লিস্ট রিফ্রেশ করার জন্য কলব্যাক
        onClose?.();  // মডাল বন্ধ করা
      }
    } catch (err) {
      console.error("Update error:", err);
    }
    setSaving(false);
  };

  const inputClass = "w-full p-2.5 rounded-xl border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none transition-all text-sm";

  return (
    <div className="space-y-4">
      {/* Role Title */}
      <div>
        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Role Title</label>
        <input className={inputClass} value={formData.roleTitle} onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })} />
      </div>

      {/* Required Skills */}
      <div>
        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Required Skills</label>
        <input className={inputClass} value={formData.requiredSkills} onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })} />
      </div>

      {/* Grid: Work Type & Commitment */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Work Type</label>
          <select value={formData.workType} onChange={(e) => setFormData({ ...formData, workType: e.target.value })} className={inputClass}>
            <option>Remote</option>
            <option>On-site</option>
            <option>Hybrid</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Commitment</label>
          <select value={formData.commitment} onChange={(e) => setFormData({ ...formData, commitment: e.target.value })} className={inputClass}>
            <option>Part-time</option>
            <option>Full-time</option>
            <option>Contract</option>
          </select>
        </div>
      </div>

      {/* Deadline */}
      <div>
        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Deadline</label>
        <input type="date" className={inputClass} value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} />
      </div>

      {/* Description */}
      <div>
        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Description</label>
        <textarea rows="3" className={inputClass} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-primary hover:opacity-90 text-primary-foreground p-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-2"
      >
        {saving ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" /> Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
};

export default ManageOpportunityEdit;