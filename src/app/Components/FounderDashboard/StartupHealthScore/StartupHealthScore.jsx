import React from "react";

const StartupHealthScore = () => {
  return (
    <div>
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
        <h3 className="font-bold text-muted-foreground uppercase text-xs tracking-wider mb-6">
          STARTUP HEALTH SCORE
        </h3>
        <div className="flex flex-col items-center">
          {/* সার্কুলার প্রগ্রেস বার */}
          <div className="relative w-32 h-32 flex items-center justify-center border-8 border-border rounded-full border-t-primary">
            <span className="text-2xl font-bold">75%</span>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-6">
            Your profile completeness and application response rate are above
            average.
          </p>
          <button className="w-full mt-6 bg-secondary py-2 rounded-lg text-sm font-semibold hover:bg-secondary/80">
            Boost Score
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartupHealthScore;
