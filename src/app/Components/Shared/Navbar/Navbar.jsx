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
        {/* Logo */}
        <div className="text-xl font-bold">StartupForge</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-primary transition-colors">
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary">Login</Link>
          <Link href="/register" className="text-sm bg-foreground text-background px-4 py-2 rounded-lg font-medium hover:opacity-90">Register</Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu (Slide-down) */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border p-6 shadow-xl animate-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col gap-4 text-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="py-2 text-foreground hover:text-primary font-medium"
              >
                {link.name}
              </Link>
            ))}
            
            <hr className="border-border" />
            
            <div className="flex flex-col gap-4">
              <Link href="/login" onClick={() => setIsOpen(false)} className="text-foreground">Login</Link>
              <Link href="/register" onClick={() => setIsOpen(false)} className="bg-foreground text-background py-3 rounded-lg font-bold">Register</Link>
            </div>

            <div className="flex justify-center mt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;