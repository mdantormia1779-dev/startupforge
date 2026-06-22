"use client";
import React, { useState } from "react";
import { UploadCloud, Loader2, CheckCircle2, Save } from "lucide-react";

const ManageStartupEdit = () => {
  const [formData, setFormData] = useState({
    name: "Nexus Pay",
    logoUrl: "https://via.placeholder.com/150",
    industry: "FinTech",
    description: "Building next-gen cross-border payments.",
    fundingStage: "Seed",
    email: "sarah@nexuspay.io",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // ইমেজ আপলোড হ্যান্ডেলার
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError("");
    const data = new FormData();
    data.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=852d1dae776be32b40e694f48fea8d19`,
        { method: "POST", body: data }
      );
      const result = await response.json();
      if (result.success) {
        setFormData({ ...formData, logoUrl: result.data.display_url });
      } else {
        setError("Image upload failed.");
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setIsLoading(false);
    }
  };

  // ডাটা সেভ হ্যান্ডেলার
  const handleSave = async () => {
    setIsSaving(true);
    // এখানে আপনার API Call বা Backend-এ ডাটা পাঠানোর লজিক বসবে
    setTimeout(() => {
      console.log("Saved Data:", formData);
      setIsSaving(false);
      alert("Startup updated successfully!");
    }, 1500);
  };

  const inputStyle = "w-full p-2 bg-white dark:bg-background border border-gray-300 dark:border-border rounded-lg text-sm";

  return (
    <div className="space-y-4">
      {/* Startup Name */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">Startup Name</label>
        <input value={formData.name} className={inputStyle} onChange={(e) => setFormData({...formData, name: e.target.value})} />
      </div>

      {/* Logo Upload */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">Startup Logo</label>
        <input type="file" onChange={handleImageUpload} className="hidden" id="logo-upload" />
        <label htmlFor="logo-upload" className={`flex items-center gap-3 border-2 border-dashed p-3 rounded-lg cursor-pointer text-sm ${formData.logoUrl ? "border-green-500" : "border-gray-300"}`}>
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 className="text-green-500" size={20} />}
          {isLoading ? "Uploading..." : "Change Logo"}
        </label>
      </div>

      {/* Industry */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">Industry</label>
        <select className={inputStyle} value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})}>
          <option>FinTech</option>
          <option>EdTech</option>
          <option>HealthTech</option>
        </select>
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">Description</label>
        <textarea rows="2" className={inputStyle} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
      </div>

      {/* Funding Stage */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">Funding Stage</label>
        <select className={inputStyle} value={formData.fundingStage} onChange={(e) => setFormData({...formData, fundingStage: e.target.value})}>
          <option>Pre-Seed</option>
          <option>Seed</option>
          <option>Series A</option>
        </select>
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">Founder Email</label>
        <input type="email" value={formData.email} className={inputStyle} onChange={(e) => setFormData({...formData, email: e.target.value})} />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Save Button */}
      <button 
        onClick={handleSave}
        disabled={isSaving || isLoading}
        className="w-full flex items-center justify-center gap-2 bg-black dark:bg-primary text-white py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isSaving ? (
          <><Loader2 className="animate-spin" size={16} /> Saving...</>
        ) : (
          <><Save size={16} /> Save Changes</>
        )}
      </button>
    </div>
  );
};

export default ManageStartupEdit;