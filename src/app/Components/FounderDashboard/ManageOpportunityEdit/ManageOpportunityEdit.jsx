"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

const ManageOpportunityEdit = ({ opportunity, onClose, onUpdate }) => {
  const [saving, setSaving] = useState(false);

  // useEffect ছাড়াই সরাসরি opportunity থেকে ইনিশিয়াল স্টেট নিচ্ছি
  // key={selectedOp?._id} ব্যবহারের ফলে যখনই নতুন opportunity আসবে, 
  // এই কম্পোনেন্টটি নতুন করে রেন্ডার হবে এবং স্টেট সঠিক থাকবে।
  const [formData, setFormData] = useState({
    roleTitle: opportunity?.roleTitle || "",
    requiredSkills: opportunity?.requiredSkills || "",
    workType: opportunity?.workType || "Remote",
    commitment: opportunity?.commitment || "Part-time",
    deadline: opportunity?.deadline ? opportunity.deadline.split('T')[0] : "",
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

      const data = await res.json();
      if (data.success || data.modifiedCount >= 0) {
        onUpdate?.(); 
        onClose?.(); 
      }
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full p-2 border rounded-lg bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="space-y-4">
      <input className={inputClass} placeholder="Role Title" value={formData.roleTitle} onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })} />
      <input className={inputClass} placeholder="Required Skills" value={formData.requiredSkills} onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })} />
      <select className={inputClass} value={formData.workType} onChange={(e) => setFormData({ ...formData, workType: e.target.value })}>
        <option>Remote</option><option>On-site</option><option>Hybrid</option>
      </select>
      <select className={inputClass} value={formData.commitment} onChange={(e) => setFormData({ ...formData, commitment: e.target.value })}>
        <option>Part-time</option><option>Full-time</option><option>Contract</option>
      </select>
      <input type="date" className={inputClass} value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} />
      <textarea className={inputClass} rows={3} placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      
      <button onClick={handleSave} disabled={saving} className="w-full bg-primary text-primary-foreground p-3 rounded-lg flex justify-center items-center gap-2">
        {saving ? <Loader2 className="animate-spin" size={16} /> : "Save Changes"}
      </button>
    </div>
  );
};

export default ManageOpportunityEdit;