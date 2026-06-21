"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react"; // useEffect রাখা হলো শুধুমাত্র মাউন্ট চেক করার জন্য
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  // মাউন্ট হয়েছে কি না চেক করার জন্য
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // useEffect এর ভেতরে সরাসরি setState না করে অন্যভাবে হ্যান্ডেল করছি
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);
  // যদি মাউন্ট না হয়, তবে একটি খালি বা লোডিং এলিমেন্ট রিটার্ন করুন
  if (!mounted) {
    return <div className="p-2 w-9 h-9" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-accent transition-colors"
      aria-label="Toggle Theme"
    >
      {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
