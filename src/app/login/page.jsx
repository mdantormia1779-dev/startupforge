"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    // Better Auth sign-in logic
    const { data, error: authError } = await authClient.signIn.email({
      email,
      password,
    }, {
      onRequest: () => setIsLoading(true),
      onSuccess: () => {
        router.push("/"); 
        router.refresh();
      },
      onError: (ctx) => {
        setError(ctx.error.message || "Invalid email or password");
        setIsLoading(false);
      },
    });
  };

  // Google Login functionality
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card border border-border p-8 rounded-3xl shadow-xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
          <p className="text-muted-foreground mt-2">Sign in to your StartupForge account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/50 text-destructive rounded-xl text-sm flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <Button
          variant="outline"
          className="w-full py-6 rounded-xl"
          onClick={handleGoogleLogin}
        >
          {/* Google Icon... */}
          Continue with Google
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or continue with</span></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input name="email" type="email" required className="h-12" placeholder="name@example.com" />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="h-12 pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 mt-2" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Dont have an account?{" "}
          <a href="/register" className="text-primary font-medium hover:underline">Register</a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;