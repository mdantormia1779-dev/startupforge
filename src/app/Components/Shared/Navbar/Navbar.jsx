"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Startups", href: "/startup" },
    { name: "Browse Opportunities", href: "oprtunities" }
  ];

  return (
    // 'border-b' এবং 'border-gray-800/50' ব্যবহার করা হয়েছে,
    // সাথে 'backdrop-blur-md' যোগ করা হয়েছে যাতে স্টিকি হলে গ্লাস ইফেক্ট দেয়।
    <nav className="sticky top-0 z-50 bg-[#0d0f17]/80 backdrop-blur-md border-b border-gray-800 shadow-[0_4px_20px_-5px_rgba(139,92,246,0.1)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
          StartupForge
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-[#8b5cf6] transition-colors relative group"
            >
              {link.name}
              {/* ছোট হোভার লাইন */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8b5cf6] transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="register"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Register
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0d0f17]/95 border-b border-gray-800 p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-[#8b5cf6] py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-800 flex flex-col gap-3">
            <Link
              href="/login"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="register"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
