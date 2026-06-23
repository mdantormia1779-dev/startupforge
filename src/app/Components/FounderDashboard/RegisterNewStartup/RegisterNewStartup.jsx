"use client";
import React, { useState } from "react";
import { UploadCloud, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const RegisterNewStartup = () => {
  const { data } = authClient.useSession();
  const user = data?.user;

  const initialData = {
    name: "",
    industry: "FinTech",
    description: "",
    fundingStage: "Pre-Seed",
    email: user?.email || "",
    logoUrl: "",
    ownerId: user?.id || user?._id || "",
  };

  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // IMAGE UPLOAD (imgbb)
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError("");

    const data = new FormData();
    data.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=852d1dae776be32b40e694f48fea8d19`,
        { method: "POST", body: data }
      );

      const result = await res.json();

      if (result.success) {
        setFormData((prev) => ({
          ...prev,
          logoUrl: result.data.display_url,
        }));
      } else {
        setError("Image upload failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        name: formData.name,
        industry: formData.industry,
        description: formData.description,
        fundingStage: formData.fundingStage,
        email: formData.email,
        logoUrl: formData.logoUrl,
        ownerId: user.id || user._id,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/startups`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (result.success) {
        toast.success("Startup created successfully!");

        setFormData({
          ...initialData,
          email: user.email,
          ownerId: user.id || user._id,
        });
      } else {
        toast.error(result.message || "Failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-card border border-gray-200 dark:border-border rounded-2xl shadow-sm">

      <h1 className="text-xl font-bold mb-1">Register Startup</h1>
      <p className="text-sm text-gray-500 mb-4">
        Fill out the details to add to pipeline.
      </p>

      {error && (
        <div className="flex items-center gap-2 text-red-500 mb-3 text-xs">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Startup Name */}
        <div className="space-y-1">
          <label className="text-xs font-semibold">Startup Name</label>
          <input
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full p-2 border rounded-lg text-sm"
          />
        </div>

        {/* Industry */}
        <div className="space-y-1">
          <label className="text-xs bg-background font-semibold">Industry</label>
          <select
            value={formData.industry}
            onChange={(e) =>
              setFormData({ ...formData, industry: e.target.value })
            }
            className="w-full bg-background p-2 border rounded-lg text-sm"
          >
            <option>FinTech</option>
            <option>EdTech</option>
            <option>HealthTech</option>
          </select>
        </div>

        {/* Logo Upload */}
        <div className="space-y-1">
          <label className="text-xs font-semibold">Logo</label>

          <input
            type="file"
            onChange={handleImageUpload}
            className="hidden"
            id="logo-upload"
          />

          <label
            htmlFor="logo-upload"
            className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer text-sm"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : formData.logoUrl ? (
              <CheckCircle2 className="text-green-500" size={16} />
            ) : (
              <UploadCloud size={16} />
            )}

            {isLoading
              ? "Uploading..."
              : formData.logoUrl
              ? "Uploaded"
              : "Upload Logo"}
          </label>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs font-semibold">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 border rounded-lg text-sm"
          />
        </div>

        {/* Funding Stage */}
        <div className="space-y-1">
          <label className="text-xs bg-background font-semibold">Funding Stage</label>
          <select
            value={formData.fundingStage}
            onChange={(e) =>
              setFormData({ ...formData, fundingStage: e.target.value })
            }
            className="w-full p-2 bg-background border rounded-lg text-sm"
          >
            <option>Pre-Seed</option>
            <option>Seed</option>
            <option>Series A</option>
          </select>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-semibold">Founder Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-2 border rounded-lg text-sm"
          />
        </div>

        {/* Submit */}
        <button
          disabled={isSubmitting}
          className="w-full bg-black text-white p-2 rounded-lg text-sm font-semibold"
        >
          {isSubmitting ? "Launching..." : "Launch Startup"}
        </button>
      </form>
    </div>
  );
};

export default RegisterNewStartup;