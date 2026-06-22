"use client";
import React, { useState } from "react";
import { PlusCircle, Crown, Lock, Briefcase, Calendar, FileText } from "lucide-react";
import Link from "next/link";

const AddOpportunity = () => {
  // ড্যাশবোর্ড থেকে প্রপস হিসেবে এই ভ্যালুগুলো আসবে (বর্তমানে উদাহরণ দেওয়া হলো)
  const [opportunityCount, setOpportunityCount] = useState(4); 
  const [isPremium, setIsPremium] = useState(false); 
  
  const canPost = isPremium || opportunityCount < 4;

  const [formData, setFormData] = useState({
    roleTitle: "",
    requiredSkills: "",
    workType: "Remote",
    commitment: "Part-time",
    deadline: "",
    description: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canPost) return;
    
    console.log("Opportunity Added:", formData);
    alert("Opportunity Added Successfully!");
  };

  const inputStyle = "w-full p-3 bg-white dark:bg-background border border-gray-300 dark:border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-colors text-sm";

  return (
    <div className="max-w-xl mx-auto space-y-6 p-4">
      
      {/* Premium Founder Feature Card */}
      {!canPost && (
        <div className="bg-linear-to-r from-indigo-600 to-purple-700 p-6 rounded-2xl text-white shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <Crown className="text-yellow-400" size={28} />
            <h3 className="font-bold text-lg">Premium Founder Feature</h3>
          </div>
          <p className="text-indigo-100 text-sm mb-4">
            Founders must purchase a premium package before posting more than 3 opportunities. Upgrade now to unlock unlimited postings.
          </p>
          <Link 
            href="/checkout" 
            className="inline-block bg-white text-indigo-700 px-5 py-2 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-colors"
          >
            Upgrade to Premium
          </Link>
        </div>
      )}

      {/* Main Form */}
      <div className={`bg-white dark:bg-card p-8 rounded-2xl border border-gray-200 dark:border-border shadow-sm transition-opacity ${!canPost ? "opacity-60 pointer-events-none" : ""}`}>
        <h2 className="text-2xl font-bold mb-2 text-foreground flex items-center gap-2">
          <Briefcase className="text-primary" /> Add Opportunity
        </h2>
        <p className="text-gray-500 dark:text-muted-foreground mb-6 text-sm">
          Post a new role to find the right talent for your startup.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Title */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-foreground">Role Title</label>
            <input required type="text" placeholder="e.g. Senior Frontend Developer" className={inputStyle} onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })} />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-foreground">Job Description</label>
            <textarea required rows="3" placeholder="Briefly describe the role..." className={inputStyle} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>

          {/* Required Skills */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-foreground">Required Skills</label>
            <input required type="text" placeholder="e.g. React, Node.js, Tailwind" className={inputStyle} onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })} />
          </div>

          {/* Work Type & Commitment */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground">Work Type</label>
              <select className={inputStyle} onChange={(e) => setFormData({ ...formData, workType: e.target.value })}>
                <option>Remote</option>
                <option>On-site</option>
                <option>Hybrid</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground">Commitment</label>
              <select className={inputStyle} onChange={(e) => setFormData({ ...formData, commitment: e.target.value })}>
                <option>Part-time</option>
                <option>Full-time</option>
                <option>Contract</option>
              </select>
            </div>
          </div>

          {/* Deadline */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-foreground flex items-center gap-1">
              <Calendar size={14} /> Deadline
            </label>
            <input required type="date" className={inputStyle} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} />
          </div>

          <button
            disabled={!canPost}
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all mt-4"
          >
            {canPost ? <><PlusCircle size={18} /> Post Opportunity</> : <><Lock size={18} /> Locked</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOpportunity;