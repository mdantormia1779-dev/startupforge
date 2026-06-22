import React from "react";
const benchmarks = [
  {
    date: "OCT 12",
    title: "Demo Day Pitch",
    time: "Accelerator Hall A • 2:00 PM",
  },
  { date: "OCT 15", title: "Investor Q&A", time: "Virtual Room • 11:00 AM" },
];

const UpcomingBenchmarks = () => {
  return (
    <div>
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm mt-6">
        <h3 className="font-bold text-muted-foreground uppercase text-xs tracking-wider mb-4">
          UPCOMING BENCHMARKS
        </h3>
        <div className="space-y-4">
          {benchmarks.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="bg-accent p-2 rounded-lg text-center min-w-12.5">
                <p className="text-[10px] font-bold">
                  {item.date.split(" ")[0]}
                </p>
                <p className="font-bold">{item.date.split(" ")[1]}</p>
              </div>
              <div>
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingBenchmarks;
