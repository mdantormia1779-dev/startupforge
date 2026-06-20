"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // নতুন লগইন চেষ্টার সময় আগের এরর ক্লিয়ার করা

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // ফিল্ড রিকোয়ারমেন্ট চেক
    if (!data.email || !data.password) {
      setError("Both email and password are required.");
      setIsLoading(false);
      return;
    }

    // কনসোলে সব ডাটা দেখানো
    console.log("Login Attempt Data:", data);

    // সিমুলেটেড অথেন্টিকেশন লজিক
    try {
      // এখানে আপনার লগইন API কল করুন
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const callbackUrl = searchParams.get("callbackUrl") || "/";
      router.push(callbackUrl);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f17] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#161922] border border-gray-800 p-8 rounded-3xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400 mt-2">
            Sign in to your StartupForge account
          </p>
        </div>

        {/* এরর মেসেজ বক্স */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl text-sm flex items-center gap-2"
          >
            <AlertCircle size={16} /> {error}
          </motion.div>
        )}

        {/* Google Login */}
        <Button
          variant="outline"
          className="w-full py-6 rounded-xl border-gray-700 bg-[#0d0f17] hover:bg-gray-800 text-white font-medium"
          onClick={() => console.log("Google Login Clicked")}
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
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
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#161922] px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Email Address</Label>
            <Input
              name="email"
              type="email"
              className="bg-[#0d0f17] border-gray-700 h-12"
              placeholder="name@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Password</Label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                className="bg-[#0d0f17] text-gray-300 border-gray-700 h-12 pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold rounded-xl mt-2"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Dont have an account?{" "}
          <a href="/register" className="text-[#8b5cf6] hover:underline">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
