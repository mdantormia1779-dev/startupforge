"use client";
import { useState } from "react";
import AdminSidebar from "../Components/AdminDashboard/AdminSidebar/AdminSidebar";
import { AdminOverview } from "../Components/AdminDashboard/AdminOverview/AdminOverview";
import ManageUsers from "../Components/AdminDashboard/ManageUsers/ManageUsers";
import ManageStartups from "../Components/AdminDashboard/ManageStartups/ManageStartups";
import Transactions from "../Components/AdminDashboard/Transactions/Transactions";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-background lg:flex">
      {/* Sidebar - এটি এখন লার্জ স্ক্রিনে পাশে এবং মোবাইলে উপরে থাকবে */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* মূল কন্টেন্ট এরিয়া */}
      <main className="flex-1 p-4 lg:p-8 w-full overflow-hidden">
        <h1 className="text-2xl font-bold mb-6">{activeTab}</h1>

        {/* ওভারভিউ কার্ডস - রেসপন্সিভ গ্রিড */}
        <div className="space-y-6">
          {activeTab === "Overview" && <AdminOverview />}
          {activeTab === "Manage Users" && <ManageUsers />}
          {activeTab === "Manage Startups" && <ManageStartups />}
          {activeTab === "Transactions" && <Transactions />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
