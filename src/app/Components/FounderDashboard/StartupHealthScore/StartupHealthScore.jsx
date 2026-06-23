"use client";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { TrendingUp, Users, Clock, CheckCircle2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

const StartupActivityInsights = () => {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const [data, setData] = useState({
    opportunities: 0,
    applications: 0,
    pending: 0,
    accepted: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        // startups + opportunities
        const res1 = await fetch(`${API}/startups/by-owner/${userId}`);
        const d1 = await res1.json();

        const opportunities = d1.opportunities || [];

        // applications (founder side)
        const res2 = await fetch(`${API}/applications/by-founder/${userId}`);
        const apps = await res2.json();

        const pending = apps.filter((a) => a.status === "Pending").length;
        const accepted = apps.filter((a) => a.status === "Accepted").length;

        setData({
          opportunities: opportunities.length,
          applications: apps.length,
          pending,
          accepted,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const acceptanceRate =
    data.applications > 0
      ? Math.round((data.accepted / data.applications) * 100)
      : 0;

  return (
    <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-6">

      <h3 className="font-bold text-xs uppercase text-muted-foreground">
        Startup Activity Insights
      </h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">

        <div className="p-4 border rounded-xl">
          <Users size={18} />
          <p className="text-sm mt-2 text-muted-foreground">Opportunities</p>
          <h2 className="text-xl font-bold">
            {loading ? "..." : data.opportunities}
          </h2>
        </div>

        <div className="p-4 border rounded-xl">
          <TrendingUp size={18} />
          <p className="text-sm mt-2 text-muted-foreground">Applications</p>
          <h2 className="text-xl font-bold">
            {loading ? "..." : data.applications}
          </h2>
        </div>

        <div className="p-4 border rounded-xl">
          <Clock size={18} />
          <p className="text-sm mt-2 text-muted-foreground">Pending</p>
          <h2 className="text-xl font-bold">
            {loading ? "..." : data.pending}
          </h2>
        </div>

        <div className="p-4 border rounded-xl">
          <CheckCircle2 size={18} />
          <p className="text-sm mt-2 text-muted-foreground">Accepted</p>
          <h2 className="text-xl font-bold">
            {loading ? "..." : data.accepted}
          </h2>
        </div>
      </div>

      {/* Insight Message */}
      <div className="p-4 rounded-xl bg-muted/30 border">
        <p className="text-sm font-medium">
          {acceptanceRate > 50
            ? "🔥 Great job! Your startup is attracting strong talent."
            : acceptanceRate > 20
            ? "⚡ Good progress, but improve screening process."
            : "📈 You need more applications or better visibility."}
        </p>
      </div>
    </div>
  );
};

export default StartupActivityInsights;