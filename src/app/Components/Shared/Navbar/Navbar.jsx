"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Startups", href: "/startup" },
    { name: "Browse Opportunities", href: "/oprtunities" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0d0f17]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-xl font-bold bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          StartupForge
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-600 dark:text-gray-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-[#8b5cf6] dark:hover:text-[#8b5cf6] transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8b5cf6] transition-all group-hover:w-full" />
            </Link>
          ))}

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            {/* resolvedTheme ব্যবহার করা হয়েছে যাতে সার্ভার এবং ক্লায়েন্টের মিসম্যাচ না হয় */}
            {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md hover:opacity-90"
          >
            Register
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-900 dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#0d0f17]/95 border-b border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 dark:text-gray-300 py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-left py-2 text-gray-600 dark:text-gray-300"
          >
            Toggle Theme
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;