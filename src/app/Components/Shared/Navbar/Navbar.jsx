"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Startups", href: "/startup" },
    { name: "Browse Opportunities", href: "/oprtunities" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        <div className="text-xl font-bold">StartupForge</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-primary transition-colors">
              {link.name}
            </Link>
          ))}
          <ThemeToggle /> {/* এখানে আলাদা কম্পোনেন্ট বসানো হলো */}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm">Login</Link>
          <Link href="/register" className="text-sm bg-foreground text-background px-4 py-2 rounded-md">Register</Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;