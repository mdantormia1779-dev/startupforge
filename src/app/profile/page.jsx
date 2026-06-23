"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Loader2, Edit2, Save, X, Upload } from "lucide-react";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    bio: session?.user?.bio || "",
    skills: session?.user?.skills || "",
    image: session?.user?.image || "/default-avatar.png",
    newPassword: "",
  });

  if (isPending) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;
  if (!session) return <div className="p-10 text-center">Please login to view profile.</div>;

  // ইমেজ আপলোড (ImgBB)
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("image", file);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=852d1dae776be32b40e694f48fea8d19`, { method: "POST", body: data });
      const result = await res.json();
      if (result.success) setFormData({ ...formData, image: result.data.display_url });
    } catch (err) { alert("Upload failed"); } finally { setUploading(false); }
  };

  // সব পরিবর্তনের সেভ ফাংশন
  const handleSave = async () => {
    try {
      // ১. নাম এবং ইমেজ আপডেট
      await authClient.user.update({
        name: formData.name,
        image: formData.image,
      });

      // ২. ইমেইল পরিবর্তন (যদি পরিবর্তিত হয়)
      if (formData.email !== session.user.email) {
        await authClient.email.changeEmail({ newEmail: formData.email });
      }

      // ৩. পাসওয়ার্ড পরিবর্তন (যদি নতুন পাসওয়ার্ড দেওয়া হয়)
      if (formData.newPassword) {
        await authClient.password.update({ newPassword: formData.newPassword });
      }

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Update failed: " + (error.message || "Unknown error"));
    }
  };

  return (
    <div key={session.user.id} className="max-w-xl mx-auto p-6 pt-12">
      <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24">
              <Image src={formData.image} fill className="rounded-full object-cover border-4" alt="Profile" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{session.user.name}</h1>
              <p className="text-muted-foreground">{session.user.email}</p>
            </div>
          </div>
          {!isEditing && <button onClick={() => setIsEditing(true)} className="p-2 bg-accent rounded-full"><Edit2 size={18} /></button>}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <label className="flex items-center gap-2 cursor-pointer text-primary text-sm font-medium">
              <Upload size={16} /> {uploading ? "Uploading..." : "Change Profile Image"}
              <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>
            <input className="w-full p-3 border rounded-xl" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Full Name" />
            <input className="w-full p-3 border rounded-xl" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email" />
            <input type="password" className="w-full p-3 border rounded-xl" placeholder="New Password (optional)" onChange={(e) => setFormData({...formData, newPassword: e.target.value})} />
            <textarea className="w-full p-3 border rounded-xl" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} placeholder="Bio" />
            <input className="w-full p-3 border rounded-xl" value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} placeholder="Skills (React, Node...)" />
            
            <div className="flex gap-2">
              <button onClick={handleSave} className="flex-1 bg-primary text-white p-3 rounded-xl font-bold flex justify-center gap-2">
                <Save size={18} /> Save Changes
              </button>
              <button onClick={() => setIsEditing(false)} className="p-3 bg-muted rounded-xl"><X size={18} /></button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">{session.user.bio || "No bio added."}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {formData.skills.split(",").map((s, i) => s.trim() && <span key={i} className="bg-accent px-3 py-1 rounded-full text-xs">{s}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;