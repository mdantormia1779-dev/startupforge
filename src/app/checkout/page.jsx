"use client";
import React, { useState } from "react";
import { CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    // এখানে আপনার Stripe Checkout API কল করবেন
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // পেমেন্ট সফল হলে ডাটাবেসে ট্রানজেকশন সেভ করুন
    }, 2000);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <CheckCircle2 size={64} className="text-teal-500 mb-4" />
        <h2 className="text-2xl font-bold text-foreground">Payment Successful!</h2>
        <p className="text-muted-foreground mt-2">Thank you for upgrading to Premium.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md my-10 mx-auto p-8 bg-card border border-border rounded-3xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Upgrade to Premium</h2>
      
      {/* Pricing Card */}
      <div className="bg-background p-6 rounded-2xl border border-border mb-6">
        <p className="text-sm text-muted-foreground mb-1">Premium Package</p>
        <h3 className="text-4xl font-extrabold text-foreground mb-4">$50<span className="text-lg font-medium text-muted-foreground">/once</span></h3>
        <ul className="space-y-2 text-sm text-foreground">
          <li>✅ Unlimited opportunity posts</li>
          <li>✅ Priority support</li>
          <li>✅ Advanced analytics dashboard</li>
        </ul>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:opacity-90 flex items-center justify-center gap-2 transition-all"
      >
        {loading ? (
          "Processing..."
        ) : (
          <>
            <CreditCard size={20} /> Pay with Stripe
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
        <ShieldCheck size={14} /> 100% Secure Payment Powered by Stripe
      </div>
    </div>
  );
};

export default CheckoutPage;