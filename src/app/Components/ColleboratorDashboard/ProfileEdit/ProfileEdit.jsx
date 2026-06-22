"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Upload, Save, Loader2 } from "lucide-react";

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    name: "Alex Rivera",
    bio: "Passionate entrepreneur building the future of startups.",
    skills: "React, Node.js, Next.js, Tailwind CSS",
    image: "https://ui-avatars.com/api/?name=Alex+Rivera",
  });

  const [isLoading, setIsLoading] = useState(false);

  // ইমেজ আপলোড হ্যান্ডেলার (ImgBB)
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const data = new FormData();
    data.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=852d1dae776be32b40e694f48fea8d19`,
        { method: "POST", body: data }
      );
      const result = await response.json();
      if (result.success) {
        setFormData({ ...formData, image: result.data.display_url });
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    console.log("Saving Profile:", formData);
    alert("Profile Updated Successfully!");
  };

  const inputStyle = "w-full p-3 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all";

  return (
    <div className="max-w-xl mx-auto p-6 bg-card border border-border rounded-3xl">
      <h2 className="text-xl font-bold mb-6">Edit Profile</h2>

      {/* Image Upload */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-background mb-4">
          <Image src={formData.image} alt="Profile" fill className="object-cover" />
        </div>
        <label className="cursor-pointer flex items-center gap-2 text-sm text-primary font-medium">
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          Change Photo
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground ml-1">Full Name</label>
          <input className={inputStyle} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground ml-1">Bio</label>
          <textarea rows="3" className={inputStyle} value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground ml-1">Skills (comma separated)</label>
          <input className={inputStyle} value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} />
        </div>
      </div>

      <button 
        onClick={handleSave}
        className="w-full mt-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:opacity-90 flex items-center justify-center gap-2"
      >
        <Save size={18} /> Save Changes
      </button>
    </div>
  );
};

export default ProfileEdit;