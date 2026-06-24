"use client";
import React, { useState, useEffect } from "react";
import { CreditCard, CheckCircle, Clock, XCircle } from "lucide-react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

// database theke data fetch kora
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`);
        const data = await response.json();
        setTransactions(data); // ডাটাবেস থেকে পাওয়া অ্যারে সেট করা
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const getStatusStyle = (status) => {
    // ডাটাবেসের স্ট্যাটাস অনুযায়ী স্টাইল (Lowercase handling)
    const s = status?.toLowerCase();
    switch (s) {
      case "paid": return "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900";
      case "pending": return "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900";
      case "failed": return "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-100 dark:border-red-900";
      default: return "bg-gray-50 text-gray-700";
    }
  };

  if (loading) return <div className="p-8 text-center">Loading transactions...</div>;

  return (
    <div className="bg-card p-4 md:p-8 rounded-3xl border border-border shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Transactions</h2>
        <p className="text-xs md:text-sm text-muted-foreground">Recent payment activity</p>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-muted-foreground text-sm border-b border-border">
              <th className="pb-4 font-medium">User Email</th>
              <th className="pb-4 font-medium">Amount</th>
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((t) => (
              <tr key={t._id} className="hover:bg-accent/50 transition-colors">
                <td className="py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                    <CreditCard size={14} />
                  </div>
                  <span className="font-semibold text-foreground">{t.user_email}</span>
                </td>
                <td className="py-4 font-medium text-foreground">${t.amount}</td>
                <td className="py-4 text-sm text-muted-foreground">{new Date(t.paid_at).toLocaleDateString()}</td>
                <td className="py-4">
                  <StatusBadge status={t.payment_status} style={getStatusStyle(t.payment_status)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatusBadge = ({ status, style }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${style}`}>
    {status?.toLowerCase() === "paid" && <CheckCircle size={10} />}
    {status?.toLowerCase() === "pending" && <Clock size={10} />}
    {status?.toLowerCase() === "failed" && <XCircle size={10} />}
    {status}
  </span>
);

export default Transactions;