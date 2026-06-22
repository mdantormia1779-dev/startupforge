"use client";
import React from "react";
import { Building2, Calendar, MapPin } from "lucide-react";

const applications = [
  {
    id: 1,
    startup: "Nexus Pay",
    role: "Senior Frontend Developer",
    status: "Pending",
    date: "2026-06-20",
    location: "Remote",
  },
  {
    id: 2,
    startup: "GreenTech Solutions",
    role: "UI/UX Designer",
    status: "Accepted",
    date: "2026-06-15",
    location: "On-site",
  },
];

const MyApplications = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6">My Applications</h2>
      
      <div className="space-y-4">
        {applications.map((app) => (
          <div 
            key={app.id} 
            className="bg-white dark:bg-card p-5 rounded-2xl border border-gray-100 dark:border-border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-background rounded-xl flex items-center justify-center">
                <Building2 className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{app.startup}</h3>
                <p className="text-sm text-muted-foreground">{app.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin size={16} /> {app.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} /> {app.date}
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                app.status === "Accepted" 
                ? "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300" 
                : "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300"
              }`}>
                {app.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;