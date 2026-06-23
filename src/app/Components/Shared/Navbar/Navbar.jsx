"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";
import { authClient } from "@/lib/auth-client"; // আপনার authClient
import Image from "next/image";

// ইউজার লগইন থাকলে তার রোল অনুযায়ী ড্যাশবোর্ড লিংক তৈরি করুন
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = authClient.useSession();

  const dashboardLink =
    session?.user?.role === "Admin"
      ? { name: "Admin Dashboard", href: "/admin" }
      : session?.user?.role === "Founder"
        ? { name: "Founder Dashboard", href: "/founder" }
        : session?.user?.role === "Collaborator"
          ? { name: "Collaborator Dashboard", href: "/collaborator" }
          : null;

  // লগআউট ফাংশন
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login"; // লগআউটের পর লগইন পেজে পাঠিয়ে দিন
        },
      },
    });
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Startups", href: "/startup" },
    { name: "Browse Opportunities", href: "/oprtunities" },
    ...(dashboardLink ? [dashboardLink] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold">StartupForge</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Desktop Auth / Profile */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <Link href="/profile">
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full border border-primary"
                />
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium hover:text-red-500 transition-colors"
              >
                LogOut
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium hover:text-primary"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm bg-foreground text-background px-4 py-2 rounded-lg font-medium hover:opacity-90"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border p-6 shadow-xl">
          <div className="flex flex-col gap-4 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2 text-foreground font-medium"
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-border" />
            <div className="flex flex-col gap-4">
              {session ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="text-foreground font-bold"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-red-500 font-bold"
                  >
                    LogOut
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-foreground"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="bg-foreground text-background py-3 rounded-lg font-bold"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
