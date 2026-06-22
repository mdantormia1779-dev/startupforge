"use client";
import React from "react";

const applicants = [
  { id: 1, name: "Sarah Jenkins", role: "Senior Product Designer", date: "Oct 24, 2023", status: "Pending" },
  { id: 2, name: "David Chen", role: "Lead Frontend Engineer", date: "Oct 23, 2023", status: "Pending" },
  { id: 3, name: "Elena Rodriguez", role: "Marketing Specialist", date: "Oct 22, 2023", status: "Accepted" },
  { id: 4, name: "Marcus Thorne", role: "Growth Consultant", date: "Oct 20, 2023", status: "Rejected" },
];

const Application = () => {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto transition-colors duration-300">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8">
        <div className="w-full md:w-64">
          <label className="text-xs font-semibold text-gray-500 dark:text-muted-foreground uppercase">Filter By Opportunity</label>
          <select className="w-full mt-1 p-2 border border-gray-200 dark:border-border rounded-lg text-sm bg-white dark:bg-card text-foreground focus:outline-none transition-colors">
            <option>All Active Opportunities</option>
          </select>
        </div>

        <div className="flex gap-4">
          <div className="text-center border border-gray-200 dark:border-border p-2 rounded-xl w-20 bg-white dark:bg-card">
            <p className="text-[10px] text-gray-400 dark:text-muted-foreground uppercase">Pending</p>
            <p className="text-xl font-bold text-foreground">12</p>
          </div>
          <div className="text-center border border-gray-200 dark:border-border p-2 rounded-xl w-20 bg-white dark:bg-card">
            <p className="text-[10px] text-gray-400 dark:text-muted-foreground uppercase">Accepted</p>
            <p className="text-xl font-bold text-foreground">24</p>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {applicants.map((app) => (
          <div key={app.id} className="bg-white dark:bg-card p-4 rounded-2xl border border-gray-100 dark:border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm transition-colors">
            
            {/* Applicant Info */}
            <div className="flex items-center gap-4 w-full">
              <div className="w-12 h-12 bg-gray-200 dark:bg-background rounded-full overflow-hidden shrink-0" />
              <div className="min-w-0">
                <h3 className="font-bold text-foreground truncate">{app.name}</h3>
                <p className="text-xs bg-gray-100 dark:bg-background px-2 py-0.5 rounded inline-block text-gray-600 dark:text-gray-300 truncate max-w-45">
                  {app.role}
                </p>
                <span className="text-[10px] block text-gray-400 dark:text-muted-foreground mt-1">Applied {app.date}</span>
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
              <p className={`text-xs font-medium flex items-center gap-1 ${app.status === 'Accepted' ? 'text-teal-600 dark:text-teal-400' : app.status === 'Rejected' ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                <span className={`w-2 h-2 rounded-full ${app.status === 'Accepted' ? 'bg-teal-500' : app.status === 'Rejected' ? 'bg-red-500' : 'bg-gray-400'}`}></span>
                {app.status}
              </p>

              {app.status === "Pending" ? (
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-xs border border-red-200 dark:border-red-900 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 transition-colors">Reject</button>
                  <button className="px-3 py-1.5 text-xs bg-teal-700 dark:bg-teal-600 text-white rounded-lg hover:bg-teal-800 transition-colors">Accept</button>
                </div>
              ) : (
                <button disabled className="px-4 py-1.5 text-xs bg-gray-100 dark:bg-background text-gray-400 dark:text-gray-600 rounded-lg cursor-not-allowed">
                  Processed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Application;