"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

const GoogleLoginButton = () => (
  <button
    type="button"
    onClick={() => authClient.signIn.social({ provider: "google" })}
    className="w-full mb-6 flex items-center justify-center gap-3 py-3 rounded-xl border border-input bg-background hover:bg-accent transition-all text-sm font-semibold text-foreground shadow-sm"
  >
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
    Continue with Google
  </button>
);

const RegistrationPage = () => {
  const router = useRouter(); // ২. হুকটি ইনিশিয়ালাইজ করুন
  const [role, setRole] = useState("Founder");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  console.log(role);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);

    // টাইম-আউট কন্ট্রোলার (১০ সেকেন্ডের বেশি সময় নিলে বন্ধ হয়ে যাবে)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=852d1dae776be32b40e694f48fea8d19`,
        {
          method: "POST",
          body: formData,
          signal: controller.signal, // এখানে সিগন্যাল যোগ করা হলো
        },
      );

      clearTimeout(timeoutId); // সফল হলে টাইম-আউট বন্ধ করুন
      const data = await response.json();

      if (data.success) {
        setImageUrl(data.data.display_url);
      } else {
        setError("Image upload failed.");
      }
    } catch (err) {
      if (err.name === "AbortError") {
        setError("Upload timed out. Check your internet connection.");
      } else {
        setError("Network error. Could not upload image.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsRegistering(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.fullName || !data.email || !data.password || !imageUrl) {
      setError("All fields are required, including your profile picture.");
      setIsRegistering(false);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(data.password)) {
      setError(
        "Password must be 6+ chars, with 1 uppercase & 1 lowercase letter.",
      );
      setIsRegistering(false);
      return;
    }

    try {
      const result = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.fullName,
        image: imageUrl,
        role: role,
        isBlocked: false,
      });

      if (result.error) {
        setError(result.error.message || "Registration failed");
      } else {
        router.push("/");
        router.refresh();
        toast.success("Registration Successful!");
        console.log(result);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border border-border p-8 rounded-3xl shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Join StartupForge
        </h2>
        <GoogleLoginButton />

        {error && (
          <div className="flex items-center gap-2 text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-xl mb-4 text-sm">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input name="fullName" className="h-12" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              className="h-12"
              placeholder="name@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="hidden"
              id="file-upload"
            />

            <div className="flex items-center gap-4">
              {/* Next.js Image Component */}
              <div
                className={`w-16 h-16 relative rounded-2xl border-2 flex items-center justify-center overflow-hidden bg-accent ${imageUrl ? "border-primary" : "border-dashed border-input"}`}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Profile Preview"
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <Upload className="text-muted-foreground" size={20} />
                )}
              </div>

              {/* Upload Button */}
              <label
                htmlFor="file-upload"
                className={`flex-1 flex items-center justify-center gap-2 cursor-pointer border border-dashed p-3 rounded-xl text-sm transition-all hover:bg-accent/50 ${
                  imageUrl
                    ? "border-green-500 text-green-600 bg-green-50"
                    : "border-input text-muted-foreground"
                }`}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    {imageUrl ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <Upload size={18} />
                    )}
                    {imageUrl ? "Image Uploaded" : "Upload Image"}
                  </>
                )}
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              className="h-12"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <Label>Select Role</Label>
            <div className="grid grid-cols-2 gap-4">
              {["Founder", "Collaborator"].map((r) => (
                <button
                  key={r}
                  type="button" // এটি অবশ্যই 'button' হতে হবে যেন ফর্ম সাবমিট না হয়
                  onClick={() => setRole(r)} // এখানে সরাসরি স্টেট আপডেট হচ্ছে
                  className={`p-3 rounded-xl border-2 transition-all font-semibold text-sm ${
                    role === r
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input hover:bg-accent"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 mt-2"
            disabled={isRegistering}
          >
            {isRegistering ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegistrationPage;
