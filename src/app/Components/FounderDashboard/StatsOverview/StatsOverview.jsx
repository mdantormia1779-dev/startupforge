"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client"; // ✅ FIX
import StartupHealthScore from "../StartupHealthScore/StartupHealthScore";
import UpcomingBenchmarks from "../UpcomingBenchmarks/UpcomingBenchmarks";
import { RecentApplications } from "../RecentApplications/RecentApplications";

const API = process.env.NEXT_PUBLIC_API_URL;

export const StatsOverview = () => {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ user না থাকলে loading বন্ধ
    if (!userId) return;

    const fetchOpportunities = async () => {
      try {
        const res = await fetch(
          `${API}/startups/by-owner/${userId}`
        );

        const data = await res.json();

        setOpportunities(data.opportunities || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [userId]);

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
        <div className="bg-card p-6 rounded-2xl border shadow-sm">
          <p className="text-[10px] font-bold text-muted-foreground">
            TOTAL OPPORTUNITIES
          </p>
          <h3 className="text-4xl font-bold mt-2">
            {loading ? "..." : opportunities.length}
          </h3>
        </div>

        <div className="bg-card p-6 rounded-2xl border shadow-sm">
          <p className="text-[10px] font-bold text-muted-foreground">
            TOTAL APPLICATIONS
          </p>
          <h3 className="text-4xl font-bold mt-2">142</h3>
        </div>

        <div className="bg-card p-6 rounded-2xl border shadow-sm">
          <p className="text-[10px] font-bold text-muted-foreground">
            ACCEPTED MEMBERS
          </p>
          <h3 className="text-4xl font-bold mt-2">18</h3>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="bg-card p-6 rounded-2xl border shadow-sm">
            <h3 className="font-bold mb-6">
              Recent Applications
            </h3>
            <RecentApplications />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <StartupHealthScore />
          <UpcomingBenchmarks />
        </div>
      </div>
    </div>
  );
};