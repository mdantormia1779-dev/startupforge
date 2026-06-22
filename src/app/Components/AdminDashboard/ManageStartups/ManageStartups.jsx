"use client";
import React, { useState } from "react";
import { Check, X, Building2, ShieldCheck, ShieldAlert } from "lucide-react";

const initialStartups = [
  { id: 1, name: "EcoTech Solutions", founder: "Sarah Jenkins", status: "Pending" },
  { id: 2, name: "FinFlow", founder: "David Chen", status: "Approved" },
  { id: 3, name: "HealthAI", founder: "Elena Rodriguez", status: "Pending" },
];

const ManageStartups = () => {
  const [startups, setStartups] = useState(initialStartups);

  // Approve / Reject Handler
  const handleAction = (id, newStatus) => {
    setStartups(startups.map(s => 
      s.id === id ? { ...s, status: newStatus } : s
    ));
  };

  return (
    <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
      <h2 className="text-2xl font-bold mb-8">Startup Approval Center</h2>

      <div className="space-y-4">
        {startups.map((s) => (
          <div key={s.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-background rounded-2xl border border-border gap-4 hover:border-indigo-500/50 transition-all">
            
            {/* Info */}
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                s.status === "Approved" ? "bg-emerald-500/10 text-emerald-600" : 
                s.status === "Rejected" ? "bg-red-500/10 text-red-600" : "bg-amber-500/10 text-amber-600"
              }`}>
                <Building2 size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg">{s.name}</h3>
                <p className="text-xs text-muted-foreground">{s.founder}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {s.status === "Pending" ? (
                <>
                  <button 
                    onClick={() => handleAction(s.id, "Approved")}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    <Check size={14} /> Approve
                  </button>
                  <button 
                    onClick={() => handleAction(s.id, "Rejected")}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    <X size={14} /> Reject
                  </button>
                </>
              ) : (
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${
                  s.status === "Approved" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                }`}>
                  {s.status === "Approved" ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                  {s.status}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStartups;