"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutDashboard, Users, Building2, CreditCard, Menu, X } from 'lucide-react';
import ThemeToggle from "../../ThemeToggle/ThemeToggle";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Overview", icon: <LayoutDashboard size={20} /> },
    { name: "Manage Users", icon: <Users size={20} /> },
    { name: "Manage Startups", icon: <Building2 size={20} /> },
    { name: "Transactions", icon: <CreditCard size={20} /> }
  ];

  return (
    <>
      {/* মোবাইল নেভিগেশন (LG এর নিচে দেখা যাবে) */}
      <nav className="lg:hidden w-full bg-white dark:bg-card border-b border-gray-200 dark:border-border z-50 sticky top-0">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-xl font-bold text-foreground">Admin Panel</Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-foreground">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ড্রপডাউন মেনু */}
        {isOpen && (
          <div className="p-4 border-t border-border bg-white dark:bg-card animate-in slide-in-from-top-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => { setActiveTab(item.name); setIsOpen(false); }}
                className={`flex w-full items-center gap-3 p-3 rounded-xl mb-2 ${
                  activeTab === item.name ? "bg-gray-100 dark:bg-background text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {item.icon} {item.name}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ডেস্কটপ সাইডবার (LG বা তার চেয়ে বড় স্ক্রিনে) */}
      <aside className="hidden lg:flex w-64 h-screen bg-white dark:bg-card border-r border-gray-200 dark:border-border flex-col p-6 sticky top-0">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-2xl font-bold text-foreground">Admin</Link>
          <ThemeToggle />
        </div>

        {/* অ্যাডমিন প্রোফাইল সেকশন */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-border bg-primary/10 flex items-center justify-center">
             <span className="font-bold text-primary">AD</span>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Admin Portal</p>
            <p className="text-xs text-gray-500 dark:text-muted-foreground">Super User</p>
          </div>
        </div>

        {/* নেভিগেশন */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex w-full items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.name
                  ? "bg-gray-100 dark:bg-background text-indigo-600 dark:text-indigo-400 border-r-4 border-indigo-600"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-background"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;