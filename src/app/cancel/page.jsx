"use client";
import React from "react";
import { XCircle, RefreshCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";

const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="bg-red-50 p-4 rounded-full mb-6">
        <XCircle size={64} className="text-red-500" />
      </div>
      
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Payment Cancelled</h1>
      <p className="text-gray-600 max-w-sm mb-8">
        Your payment was not completed. If this was a mistake, you can try again 
        or return to your dashboard.
      </p>

      <div className="flex gap-4">
        <Link 
          href="/checkout" 
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:opacity-90 transition"
        >
          <RefreshCcw size={20} />
          Try Again
        </Link>
        
        <Link 
          href="/" 
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
        >
          <ArrowLeft size={20} />
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;