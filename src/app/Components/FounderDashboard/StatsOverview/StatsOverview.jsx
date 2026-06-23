"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import StartupHealthScore from "../StartupHealthScore/StartupHealthScore";
import { RecentApplications } from "../RecentApplications/RecentApplications";

const API = process.env.NEXT_PUBLIC_API_URL;

export const StatsOverview = () => {
  const { data: session } = authClient.useSession();

  const email = session?.user?.id;
  const userId = session?.user?.id;

  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email || !userId) return;

    const fetchAllData = async () => {
      try {
        // 🔹 parallel fetch
        const [oppRes, appRes] = await Promise.all([
          fetch(`${API}/startups/by-owner/${userId}`),
          fetch(`${API}/applications/by-founder/${email}`),
        ]);

        const oppData = await oppRes.json();
        const appData = await appRes.json();

        setOpportunities(oppData.opportunities || []);
        setApplications(appData || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [email, userId]);

  // ✅ dynamic stats
  const totalApplications = applications.length;
  const acceptedMembers = applications.filter(
    (a) => a.status === "Accepted"
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">
          Welcome back, Founder 👋
        </h2>
        <p className="text-muted-foreground">
          Heres whats happening with your startup today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="TOTAL OPPORTUNITIES"
          value={loading ? "..." : opportunities.length}
        />

        <StatCard
          title="TOTAL APPLICATIONS"
          value={loading ? "..." : totalApplications}
        />

        <StatCard
          title="ACCEPTED MEMBERS"
          value={loading ? "..." : acceptedMembers}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="bg-card p-6 rounded-2xl border shadow-sm">
            <h3 className="font-bold mb-6">
              Recent Applications
            </h3>

            {/* ✅ Pass real data */}
            <RecentApplications applications={applications} />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <StartupHealthScore />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-card p-6 rounded-2xl border shadow-sm">
    <p className="text-[10px] font-bold text-muted-foreground">
      {title}
    </p>
    <h3 className="text-4xl font-bold mt-2">{value}</h3>
  </div>
);