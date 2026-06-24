"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Home, Save, AlertCircle } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { data: session } = authClient.useSession();
  
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const savePaymentToDB = async () => {
    if (!session?.user?.id) {
      setError("User not logged in. Please refresh the page.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          email: session.user.email,
          amount: 50,
          sessionId: sessionId, // এটি ব্যাকএন্ডে transaction_id হিসেবে সেভ হবে
          status: "paid",
        }),
      });

      if (response.ok) {
        setIsSaved(true);
      } else {
        throw new Error("Failed to save payment to database.");
      }
    } catch (err) {
      setError(err.message);
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="bg-teal-50 p-4 rounded-full mb-6">
        <CheckCircle2 size={64} className="text-teal-600" />
      </div>

      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Payment Successful!</h1>
      
      {error && (
        <div className="flex items-center gap-2 text-red-600 mb-4 bg-red-50 p-3 rounded-lg">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {!isSaved ? (
        <div className="mb-8">
          <p className="text-gray-600 mb-4 max-w-sm">
            Click the button below to confirm your payment and activate your premium features.
          </p>
          <button 
            onClick={savePaymentToDB}
            disabled={saving || !session?.user?.id}
            className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition disabled:opacity-50"
          >
            <Save size={20} />
            {saving ? "Confirming..." : "Confirm Payment"}
          </button>
        </div>
      ) : (
        <div className="mb-8 p-4 bg-green-50 rounded-xl">
          <p className="text-green-700 font-bold">Payment confirmed and saved!</p>
          <p className="text-sm text-green-600">Your account is now upgraded to Premium.</p>
        </div>
      )}

      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:opacity-90 transition"
      >
        <Home size={20} />
        Go to Dashboard
      </Link>
    </div>
  );
};

export default SuccessPage;