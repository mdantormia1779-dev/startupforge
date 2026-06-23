"use client";

import React, { useEffect, useState } from "react";
import { BarChart3, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;

const CollaboratorOverview = () => {
  const { data: session } = authClient.useSession();
  const email = session?.user?.email;

  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    pending: 0,
    rejected: 0,
  });

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    if (!email) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/applications/by-user/${email}`);
        const data = await res.json();

        const total = data.length;
        const accepted = data.filter((a) => a.status === "Accepted").length;
        const pending = data.filter((a) => a.status === "Pending").length;
        const rejected = data.filter((a) => a.status === "Rejected").length;

        setStats({ total, accepted, pending, rejected });

        const sorted = [...data].sort(
          (a, b) => new Date(b.appliedAt) - new Date(a.appliedAt)
        );

        setRecent(sorted.slice(0, 5));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email]);

  const statCards = [
    { label: "Active Applications", value: stats.total, icon: <BarChart3 className="text-indigo-500" /> },
    { label: "Accepted Offers", value: stats.accepted, icon: <CheckCircle2 className="text-emerald-500" /> },
    { label: "Pending Reviews", value: stats.pending, icon: <Clock className="text-amber-500" /> },
    { label: "Rejected", value: stats.rejected, icon: <AlertCircle className="text-rose-500" /> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Welcome Back, {session?.user?.name || "Collaborator"}!
        </h2>
        <p className="text-sm text-muted-foreground">
          Here is your real-time activity summary.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4"
          >
            <div className="p-3 bg-secondary rounded-xl">{stat.icon}</div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
        <h3 className="font-bold text-lg mb-4 text-card-foreground">Recent Updates</h3>

        <div className="space-y-4">
          {recent.length === 0 && (
            <p className="text-sm text-muted-foreground">No recent activity</p>
          )}

          {recent.map((app) => (
            <div
              key={app._id}
              className={`p-4 border-l-4 rounded-r-lg border-border bg-muted/50 ${
                app.status === "Accepted"
                  ? "border-l-emerald-500"
                  : app.status === "Rejected"
                  ? "border-l-rose-500"
                  : "border-l-indigo-500"
              }`}
            >
              <p className="text-sm font-medium text-foreground">
                {app.job?.roleTitle || "A job"} — {app.status}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(app.appliedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollaboratorOverview;