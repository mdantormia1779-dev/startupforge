import { Button } from "@/components/ui/button";
import StartupHealthScore from "../StartupHealthScore/StartupHealthScore";
import UpcomingBenchmarks from "../UpcomingBenchmarks/UpcomingBenchmarks";
import { RecentApplications } from "../RecentApplications/RecentApplications";

export const StatsOverview = () => (
  <div className="space-y-8">
    {/* Header Section */}
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">Welcome back, Founder</h2>
        <p className="text-muted-foreground">
          Heres whats happening with your startup portfolio today.
        </p>
      </div>
    </div>

    {/* Stats Cards Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: "TOTAL OPPORTUNITIES", value: 24 },
        { title: "TOTAL APPLICATIONS", value: 142 },
        { title: "ACCEPTED MEMBERS", value: 18 },
      ].map((stat, i) => (
        <div
          key={i}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm"
        >
          <p className="text-[10px] font-bold text-muted-foreground tracking-wider">
            {stat.title}
          </p>
          <h3 className="text-4xl font-bold mt-2">{stat.value}</h3>
        </div>
      ))}
    </div>

    {/* Main Grid: Left (Applications) & Right (Sidebar Widgets) */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* বাম পাশের কলাম (Recent Applications Table) */}
      <div className="lg:col-span-8">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="font-bold mb-6">Recent Applications</h3>
          <RecentApplications></RecentApplications>
        </div>
      </div>

      {/* ডান পাশের কলাম (Startup Health & Benchmarks) */}
      <div className="lg:col-span-4 space-y-6">
        <StartupHealthScore />
        <UpcomingBenchmarks />
      </div>
    </div>
  </div>
);
