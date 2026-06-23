"use client";
import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

export const AdminOverview = () => {
  const [stats, setStats] = useState({
    users: 0,
    startups: 0,
    opportunities: 0,
    revenue: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // আপনার সার্ভারের নতুন API এন্ডপয়েন্ট কল করা
        const [statsRes, chartRes] = await Promise.all([
          fetch(`${API}/admin/stats`),
          fetch(`${API}/admin/revenue-analytics`)
        ]);

        const statsData = await statsRes.json();
        const chartData = await chartRes.json();

        setStats(statsData);
        setChartData(chartData);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-100">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* স্ট্যাটাস কার্ডস */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Users", val: stats.users.toLocaleString() },
          { title: "Total Startups", val: stats.startups.toLocaleString() },
          { title: "Opportunities", val: stats.opportunities.toLocaleString() },
          { title: "Total Revenue", val: `$${stats.revenue.toLocaleString()}` },
        ].map((stat, i) => (
          <div key={i} className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-muted-foreground">{stat.title}</p>
            <h3 className="text-3xl font-bold mt-2">{stat.val}</h3>
          </div>
        ))}
      </div>

      {/* রেভিনিউ চার্ট */}
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
        <h3 className="font-bold text-lg mb-6">Revenue Analytics</h3>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "10px", color: "#fff" }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};