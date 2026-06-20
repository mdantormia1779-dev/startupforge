"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const GoogleLoginButton = () => (
  <button
    type="button"
    className="w-full mb-6 flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-700 bg-[#0d0f17] hover:bg-gray-800 transition-all text-sm font-semibold text-gray-200 hover:border-gray-500 shadow-lg"
  >
    <div className="bg-white p-1 rounded-full">
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
        <path
          fill="#EA4335"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
      </svg>
    </div>
    Continue with Google
  </button>
);

const RegistrationPage = () => {
  const [role, setRole] = useState("Founder");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=852d1dae776be32b40e694f48fea8d19`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();
      if (data.success) {
        setImageUrl(data.data.display_url);
      } else {
        setError("Image upload failed. Try again.");
      }
    } catch (error) {
      setError("Network error. Could not upload image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError(""); // Reset error

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const password = data.password;

    // ১. ফিল্ড চেক
    if (!data.fullName || !data.email || !password || !imageUrl) {
      setError("All fields are required, including your profile picture.");
      return;
    }

    // ২. পাসওয়ার্ড ভ্যালিডেশন
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 6+ chars, with 1 uppercase & 1 lowercase letter.",
      );
      return;
    }

    // সব ঠিক থাকলে ডাটা প্রসেস করুন
    console.log("Registration Successful:", { ...data, role, imageUrl });
    alert("Registration Successful!");
  };

  return (
    <div className="min-h-screen bg-[#0d0f17] text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#161922] border border-gray-800 p-8 rounded-3xl shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Join StartupForge
        </h2>
        <GoogleLoginButton />

        {/* Error Message Display */}
        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/20 p-3 rounded-xl mb-4 text-sm">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              name="fullName"
              className="bg-[#0d0f17] border-gray-700"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              className="bg-[#0d0f17] border-gray-700"
              placeholder="name@example.com"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            <Input
              type="file"
              onChange={handleImageUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className={`flex items-center gap-2 cursor-pointer border border-dashed p-3 rounded-xl w-full text-sm transition-all ${imageUrl ? "border-green-500 text-green-400" : "border-gray-700 text-gray-400 hover:bg-gray-800"}`}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : imageUrl ? (
                <CheckCircle2 size={18} />
              ) : (
                <Upload size={18} />
              )}
              {isLoading
                ? "Uploading..."
                : imageUrl
                  ? "Image Uploaded"
                  : "Upload Image"}
            </label>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              className="bg-[#0d0f17] border-gray-700"
              placeholder="••••••••"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label>Select Role</Label>
            <div className="grid grid-cols-2 gap-4">
              {["Founder", "Collaborator"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`p-3 rounded-xl border transition-all ${role === r ? "border-[#8b5cf6] bg-[#8b5cf6]/20" : "border-gray-700 hover:border-gray-500"}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white py-6 mt-2"
          >
            Create Account
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegistrationPage;
