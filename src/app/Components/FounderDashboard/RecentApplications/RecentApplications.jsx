"use client";
import { MoreVertical } from "lucide-react";

const applications = [
  { name: "Jordan Dale", school: "Stanford University", role: "Full Stack Dev", status: "INTERVIEWING", time: "2h ago", color: "bg-emerald-100 text-emerald-700" },
  { name: "Sarah Kim", school: "MIT Media Lab", role: "UX Design Lead", status: "PENDING", time: "5h ago", color: "bg-gray-200 text-gray-700" },
  { name: "Marcus Low", school: "Former Google PM", role: "Growth Lead", status: "REJECTED", time: "1d ago", color: "bg-red-100 text-red-700" },
];

export const RecentApplications = () => (
  <div className="bg-card p-4 md:p-6 rounded-2xl border border-border shadow-sm">
    <div className="flex justify-between items-center mb-6">
      <h3 className="font-bold text-lg">Recent Applications</h3>
      <button className="text-sm font-medium hover:text-primary">View All</button>
    </div>

    {/* Table Header (Hidden on Mobile) */}
    <div className="hidden md:grid grid-cols-4 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 px-2">
      <p>Candidate</p>
      <p>Role</p>
      <p>Status</p>
      <p className="text-right">Date</p>
    </div>

    {/* List Items */}
    <div className="space-y-4">
      {applications.map((app, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-4 items-center p-3 hover:bg-accent/50 rounded-xl transition-colors border-b md:border-b-0 border-border/50">
          
          {/* Candidate Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-sm shrink-0">
              {app.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{app.name}</p>
              <p className="text-[10px] text-muted-foreground truncate">{app.school}</p>
            </div>
          </div>

          {/* Role (Visible on Mobile with label) */}
          <div className="mt-2 md:mt-0 flex md:block items-center justify-between">
            <span className="md:hidden text-xs font-bold text-muted-foreground">Role:</span>
            <p className="text-sm text-foreground">{app.role}</p>
          </div>

          {/* Status Badge */}
          <div className="mt-2 md:mt-0 flex md:block items-center justify-between">
            <span className="md:hidden text-xs font-bold text-muted-foreground">Status:</span>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${app.color}`}>
              {app.status}
            </span>
          </div>

          {/* Date & Action */}
          <div className="mt-3 md:mt-0 flex items-center justify-between md:justify-end gap-3">
            <span className="md:hidden text-xs font-bold text-muted-foreground">Applied:</span>
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground">{app.time}</p>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);