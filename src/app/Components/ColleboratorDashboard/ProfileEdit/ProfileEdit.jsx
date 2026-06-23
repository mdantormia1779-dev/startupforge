"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Upload, Save, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const ProfileEdit = () => {
  const { data: session, isPending } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect ছাড়াই সরাসরি useState-এ সেশনের ডেটা ব্যবহার করছি।
  // যদি সেশন লোড না হয়, তবে ডিফল্ট খালি স্ট্রিং থাকবে।
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    image: session?.user?.image || "",
    bio: session?.user?.bio || "",
    skills: session?.user?.skills || "",
  });

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
        setFormData((prev) => ({ ...prev, image: result.data.display_url }));
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await authClient.updateUser({
        name: formData.name,
        image: formData.image,
        additionalData: { bio: formData.bio, skills: formData.skills },
      });
      alert("Profile Updated Successfully!");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isPending)
    return <div className="p-10 text-center text-muted-foreground">Loading profile...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-card border border-border rounded-3xl shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-card-foreground">Edit Profile</h2>

      {/* Image Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-background bg-muted mb-4">
          {formData.image ? (
            <Image src={formData.image} alt="Profile" fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
              No Image
            </div>
          )}
        </div>

        <label className="cursor-pointer flex items-center gap-2 text-sm text-primary font-medium hover:underline">
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          Change Photo
          <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
        </label>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground ml-1">Full Name</label>
          <input
            className="w-full p-3 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground ml-1">Bio</label>
          <textarea
            rows="3"
            className="w-full p-3 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground ml-1">Skills</label>
          <input
            className="w-full p-3 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={isLoading}
        className="w-full mt-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:opacity-90 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
      >
        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default ProfileEdit;