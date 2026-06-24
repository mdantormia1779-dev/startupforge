"use client";
import React, { useState } from "react";
import { Sidebar } from "../Components/FounderDashboard/Sidebar/Sidebar";
import { StatsOverview } from "../Components/FounderDashboard/StatsOverview/StatsOverview";
import MyStartup from "../Components/FounderDashboard/MyStartup/MyStartup";
import ManageStartup from "../Components/FounderDashboard/ManageStartup/ManageStartup";
import AddOpportunity from "../Components/FounderDashboard/AddOpportunity/AddOpportunity";
import ManageOpportunities from "../Components/FounderDashboard/ManageOpportunities/ManageOpportunities";
import Application from "../Components/FounderDashboard/Application/Application";

const FounderDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    
    <div className="min-h-screen bg-background lg:flex">
      
      {/* Sidebar Component (Handles both Mobile Nav and Desktop Sidebar internally) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          {activeTab === "Overview" && <StatsOverview />}
          {activeTab === "My Startup" && <MyStartup />}
          {activeTab === "Manage Startup" && <ManageStartup />}
          {activeTab === "Opportunities" && <AddOpportunity />}
          {activeTab === "Manage Opportunities" && <ManageOpportunities />}
          {activeTab === "Applications" && <Application />}
        </div>
      </main>
    </div>
  );
};

export default FounderDashboard;