import React from "react";
import { BarChart3, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const stats = [
  { label: "Active Applications", value: "12", icon: <BarChart3 className="text-indigo-600" /> },
  { label: "Accepted Offers", value: "5", icon: <CheckCircle2 className="text-teal-600" /> },
  { label: "Pending Reviews", value: "3", icon: <Clock className="text-amber-600" /> },
  { label: "Rejected", value: "2", icon: <AlertCircle className="text-red-600" /> },
];

const CollaboratorOverview = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome Back, Collaborator!</h2>
        <p className="text-sm text-muted-foreground">Here is a quick summary of your recent activities.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-100 dark:border-border shadow-sm flex items-center gap-4">
            <div className="p-3 bg-gray-50 dark:bg-background rounded-xl">{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-500 dark:text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-100 dark:border-border shadow-sm">
        <h3 className="font-bold text-lg mb-4 text-foreground">Recent Updates</h3>
        <div className="space-y-4">
          <div className="p-4 border-l-4 border-indigo-500 bg-gray-50 dark:bg-background rounded-r-lg">
            <p className="text-sm font-medium">Nexus Pay reviewed your application.</p>
            <p className="text-xs text-gray-400">2 hours ago</p>
          </div>
          <div className="p-4 border-l-4 border-teal-500 bg-gray-50 dark:bg-background rounded-r-lg">
            <p className="text-sm font-medium">You were accepted to the FinTech cohort.</p>
            <p className="text-xs text-gray-400">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorOverview;