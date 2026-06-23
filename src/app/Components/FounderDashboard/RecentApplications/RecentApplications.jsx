"use client";
import { MoreVertical } from "lucide-react";

export const RecentApplications = ({ applications = [] }) => {
  // ✅ status color map
  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-600";
      case "Rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-yellow-100 text-yellow-600";
    }
  };

  return (
    <div className="bg-card p-4 md:p-6 rounded-2xl border border-border shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">Recent Applications</h3>
        {/* <button className="text-sm font-medium hover:text-primary">
          View All
        </button> */}
      </div>

      {/* Header */}
      <div className="hidden md:grid grid-cols-4 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 px-2">
        <p>Candidate</p>
        <p>Role</p>
        <p>Status</p>
        <p className="text-right">Date</p>
      </div>

      {/* List */}
      <div className="space-y-4">
        {applications.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">
            No applications found
          </p>
        )}

        {applications.slice(0, 5).map((app) => (
          <div
            key={app._id}
            className="grid grid-cols-1 md:grid-cols-4 items-center p-3 hover:bg-accent/50 rounded-xl transition-colors border-b md:border-b-0 border-border/50"
          >
            {/* Candidate */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-sm shrink-0">
                {app.applicantName
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">
                  {app.applicantName}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {app.applicantEmail}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="mt-2 md:mt-0 flex md:block items-center justify-between">
              <span className="md:hidden text-xs font-bold text-muted-foreground">
                Role:
              </span>
              <p className="text-sm text-foreground">
                {app.jobTitle}
              </p>
            </div>

            {/* Status */}
            <div className="mt-2 md:mt-0 flex md:block items-center justify-between">
              <span className="md:hidden text-xs font-bold text-muted-foreground">
                Status:
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-1 rounded-full ${getStatusColor(
                  app.status
                )}`}
              >
                {app.status}
              </span>
            </div>

            {/* Date */}
            <div className="mt-3 md:mt-0 flex items-center justify-between md:justify-end gap-3">
              <span className="md:hidden text-xs font-bold text-muted-foreground">
                Applied:
              </span>

              <div className="flex items-center gap-3">
                <p className="text-sm text-muted-foreground">
                  {new Date(app.appliedAt).toLocaleDateString()}
                </p>

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
};