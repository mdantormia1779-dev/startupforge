"use client";
import React, { useState } from "react";
import { Edit2, Trash2, UploadCloud } from "lucide-react";

const StartupDetails = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ফর্ম ডাটা স্টেট
  const [formData, setFormData] = useState({
    name: "Nexus Pay",
    industry: "FinTech",
    description:
      "Nexus Pay is building the next generation of cross-border payment infrastructure for emerging markets.",
    fundingStage: "Seed Round",
    email: "sarah.j@nexuspay.io",
  });

  // ImgBB ইমেজ আপলোড ফাংশন
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const data = new FormData();
    data.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=852d1dae776be32b40e694f48fea8d19`,
        {
          method: "POST",
          body: data,
        },
      );
      const result = await response.json();
      console.log("Image URL:", result.data.url);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this startup?")) {
      console.log("Startup deleted!");
    }
  };

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-card p-8 rounded-2xl border border-border flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-accent rounded-xl mb-4 flex items-center justify-center font-bold text-2xl text-primary">
            N
          </div>
          <h2 className="text-xl font-bold">{formData.name}</h2>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full mt-2">
            {formData.industry}
          </span>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card p-8 rounded-2xl border border-border">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold uppercase text-xs text-muted-foreground">
                Description
              </h3>
              <div className="flex gap-4 text-sm font-semibold">
                <button
                  onClick={() => setIsUpdateModalOpen(true)}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  <Edit2 size={14} /> Update
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
            <p className="text-muted-foreground">{formData.description}</p>
          </div>
        </div>
      </div>

      {/* আপডেট মোডাল */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card p-8 rounded-2xl w-full max-w-lg border border-border max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">Update Startup</h2>
            <div className="space-y-4">
              <input
                className="w-full p-3 bg-background border border-border rounded-xl"
                placeholder="Startup Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase">
                  Upload Logo
                </label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full p-2 mt-1 bg-background border border-border rounded-xl"
                />
                {loading && (
                  <p className="text-xs text-primary mt-1">Uploading...</p>
                )}
              </div>

              <input
                className="w-full p-3 bg-background border border-border rounded-xl"
                placeholder="Industry"
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
              />
              <textarea
                className="w-full p-3 bg-background border border-border rounded-xl"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <select
                className="w-full p-3 bg-background border border-border rounded-xl"
                value={formData.fundingStage}
                onChange={(e) =>
                  setFormData({ ...formData, fundingStage: e.target.value })
                }
              >
                <option>Pre-Seed</option>
                <option>Seed Round</option>
                <option>Series A</option>
              </select>

              <input
                type="email"
                className="w-full p-3 bg-background border border-border rounded-xl"
                placeholder="Founder Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="px-5 py-2 rounded-xl hover:bg-accent"
              >
                Cancel
              </button>
              <button className="bg-blue-200 text-foreground px-5 py-2 rounded-xl">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupDetails;
