"use client";
import { useState } from "react";
import { LayoutDashboard, Building2, Briefcase, FileText, Menu, X } from "lucide-react";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";
import Link from "next/link";

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "My Startup", icon: Building2 },
    { name: "Manage Startup", icon: Building2 },
    { name: "Opportunities", icon: Briefcase },
    { name: "Manage Opportunities", icon: Briefcase },
    { name: "Applications", icon: FileText },
  ];

  return (
    <>
      {/* 
        ==============================
        MOBILE NAV (Only on small screens)
        ==============================
      */}
      <nav className="lg:hidden w-full bg-card border-b border-border z-50 sticky top-0">
        <div className="px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-primary">
            StartupForge
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="bg-card border-b border-border p-4 space-y-2 animate-in slide-in-from-top-2 absolute w-full">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.name
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent text-muted-foreground"
                }`}
              >
                <item.icon size={20} /> {item.name}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* 
        ==============================
        DESKTOP SIDEBAR (Only on LG screens & above)
        ==============================
      */}
      <aside className="hidden lg:flex w-64 h-screen border-r border-border bg-card flex-col sticky top-0">
        <div className="p-6 font-bold text-xl text-primary flex justify-between items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            StartupForge
          </Link>
          <ThemeToggle />
        </div>
        
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.name
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-muted-foreground"
              }`}
            >
              <item.icon size={20} /> {item.name}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-500" />
            <div>
              <p className="text-sm font-bold">Alex Rivera</p>
              <p className="text-[10px] text-muted-foreground">Lead Founder</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};