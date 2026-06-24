"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${API_URL}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 50 }),
      });

      const data = await res.json();

      if (!data.url) throw new Error("No checkout URL received");

      // 🔥 SIMPLE REDIRECT (NEW WAY)
      window.location.href = data.url;
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <CheckCircle2 className="text-green-500 w-16 h-16" />
        <h2 className="text-2xl font-bold">Payment Successful</h2>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8 border rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">Upgrade to Premium</h2>

      <div className="mb-6">
        <p className="text-gray-500">Premium Plan</p>
        <h3 className="text-4xl font-bold">$50</h3>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-black text-white p-4 rounded-xl flex justify-center gap-2"
      >
        {loading ? (
          "Redirecting..."
        ) : (
          <>
            <CreditCard size={18} /> Pay with Stripe
          </>
        )}
      </button>

      <p className="text-xs text-center mt-4 flex items-center justify-center gap-1">
        <ShieldCheck size={14} /> Secure Payment
      </p>
    </div>
  );
};

export default CheckoutPage;
