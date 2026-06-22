"use client";
import React from "react";
import { CreditCard, CheckCircle, Clock, XCircle } from "lucide-react";

const transactions = [
  { id: 1, user: "Sarah Jenkins", amount: "$150.00", date: "22 Jun 2026", status: "Paid" },
  { id: 2, user: "David Chen", amount: "$85.00", date: "21 Jun 2026", status: "Pending" },
  { id: 3, user: "Elena Rodriguez", amount: "$200.00", date: "20 Jun 2026", status: "Failed" },
  { id: 4, user: "Marcus Thorne", amount: "$45.00", date: "19 Jun 2026", status: "Paid" },
];

const Transactions = () => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Paid": return "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900";
      case "Pending": return "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900";
      case "Failed": return "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-100 dark:border-red-900";
      default: return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="bg-card p-4 md:p-8 rounded-3xl border border-border shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Transactions</h2>
        <p className="text-xs md:text-sm text-muted-foreground">Recent payment activity on the platform</p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-muted-foreground text-sm border-b border-border">
              <th className="pb-4 font-medium">User</th>
              <th className="pb-4 font-medium">Amount</th>
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-accent/50 transition-colors">
                <td className="py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                    <CreditCard size={14} />
                  </div>
                  <span className="font-semibold text-foreground">{t.user}</span>
                </td>
                <td className="py-4 font-medium text-foreground">{t.amount}</td>
                <td className="py-4 text-sm text-muted-foreground">{t.date}</td>
                <td className="py-4">
                  <StatusBadge status={t.status} style={getStatusStyle(t.status)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {transactions.map((t) => (
          <div key={t.id} className="p-4 bg-background border border-border rounded-2xl flex justify-between items-center">
            <div>
              <p className="font-semibold text-sm">{t.user}</p>
              <p className="text-[10px] text-muted-foreground">{t.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm mb-1">{t.amount}</p>
              <StatusBadge status={t.status} style={getStatusStyle(t.status)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Sub-component for badge to keep code clean
const StatusBadge = ({ status, style }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${style}`}>
    {status === "Paid" && <CheckCircle size={10} />}
    {status === "Pending" && <Clock size={10} />}
    {status === "Failed" && <XCircle size={10} />}
    {status}
  </span>
);

export default Transactions;