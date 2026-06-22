"use client";
import React, { useState } from "react";
import { UploadCloud, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const RegisterNewStartup = () => {
  const [formData, setFormData] = useState({
    name: "",
    industry: "FinTech",
    description: "",
    fundingStage: "Pre-Seed",
    email: "",
    logoUrl: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.logoUrl) {
      setError("Please upload a startup logo.");
      return;
    }
    console.log("Registered:", formData);
  };

  return (
    // এখানে p-6 কে p-4 করে কমানো হয়েছে
    <div className="p-4 bg-white dark:bg-card border border-gray-200 dark:border-border rounded-2xl shadow-sm transition-colors">
      <h1 className="text-xl font-bold mb-1 text-foreground">Register Startup</h1>
      <p className="text-gray-500 dark:text-muted-foreground mb-4 text-sm">
        Fill out the details to add to pipeline.
      </p>

      {error && (
        <div className="flex items-center gap-2 text-destructive bg-destructive/10 border p-2 rounded-lg mb-4 text-xs">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">Startup Name</label>
            {/* p-3 কে p-2 করা হয়েছে যাতে হাইট কমে */}
            <input required type="text" className="w-full p-2 bg-white dark:bg-background border rounded-lg text-sm" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">Industry</label>
            <select className="w-full p-2 bg-white dark:bg-background border rounded-lg text-sm" onChange={(e) => setFormData({...formData, industry: e.target.value})}>
              <option>FinTech</option>
              <option>EdTech</option>
              <option>HealthTech</option>
            </select>
          </div>
        </div>

        {/* Logo Section */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-foreground">Startup Logo</label>
          <input type="file" onChange={handleImageUpload} className="hidden" id="logo-upload" />
          <label htmlFor="logo-upload" className={`flex items-center gap-3 border-2 border-dashed p-3 rounded-lg cursor-pointer text-sm ${formData.logoUrl ? "border-green-500" : "border-gray-300"}`}>
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : formData.logoUrl ? <CheckCircle2 className="text-green-500" size={20} /> : <UploadCloud size={20} />}
            {isLoading ? "Uploading..." : formData.logoUrl ? "Uploaded" : "Click to upload"}
          </label>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-foreground">Description</label>
          <textarea required rows="2" className="w-full p-2 bg-white dark:bg-background border rounded-lg text-sm" onChange={(e) => setFormData({...formData, description: e.target.value})} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">Funding Stage</label>
            <select className="w-full p-2 bg-white dark:bg-background border rounded-lg text-sm" onChange={(e) => setFormData({...formData, fundingStage: e.target.value})}>
              <option>Pre-Seed</option>
              <option>Seed</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">Email</label>
            <input required type="email" className="w-full p-2 bg-white dark:bg-background border rounded-lg text-sm" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
        </div>

        <button type="submit" className="w-full bg-black dark:bg-primary text-white py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
          Launch Profile
        </button>
      </form>
    </div>
  );
};

export default RegisterNewStartup;