"use client";
import React, { useState } from "react";
import ColleboratorSidebar from "../Components/ColleboratorDashboard/ColleboratorSidebar/ColleboratorSidebar";
import CollaboratorOverview from "../Components/ColleboratorDashboard/CollaboratorOverview/CollaboratorOverview";
import MyApplications from "../Components/ColleboratorDashboard/MyApplications/MyApplications";
import ProfileEdit from "../Components/ColleboratorDashboard/ProfileEdit/ProfileEdit";

const ColleboratorDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    // 'lg:flex' ডেস্কটপে সাইডবার এবং কন্টেন্ট পাশাপাশি রাখবে।
    <div className="min-h-screen bg-background lg:flex text-foreground">
      
      {/* Sidebar (মোবাইলে টপ-নেভিগেশন এবং ডেস্কটপে সাইডবার হিসেবে কাজ করবে) */}
      <ColleboratorSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* কম্পোনেন্টগুলো এখন সরাসরি এখানে কন্টেন্ট হিসেবে লোড হবে */}
          {activeTab === "My Applications" && (
            <div className="p-4 md:p-8 border-2 border-dashed border-border rounded-2xl">
              <MyApplications />
            </div>
          )}
          {activeTab === "Overview" && (
            <div className="p-4 md:p-8 border-2 border-dashed border-border rounded-2xl">
              <CollaboratorOverview />
            </div>
          )}
          {activeTab === "Profile" && (
            <div className="p-4 md:p-8 border-2 border-dashed border-border rounded-2xl">
              <ProfileEdit />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ColleboratorDashboard;