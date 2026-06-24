"use client";
import React, { useState, useEffect } from "react";
import { PlusCircle, Crown, Lock, Briefcase, Calendar } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const AddOpportunity = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  // ইউজার অনুযায়ী পোস্ট সংখ্যা চেক করার ফাংশন
  const fetchCount = async () => {
    if (!userId) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/opportunities?ownerId=${userId}`,
      );
      const data = await res.json();
      setOpportunities(data);
    } catch (err) {
      console.error("Error fetching count:", err);
    } finally {
      setLoading(false);
    }
  };

  // ইউজার অনুযায়ী পোস্ট সংখ্যা চেক করার জন্য useEffect
  // useEffect এর ভেতরে এই অংশটি আপডেট করুন
  // AddOpportunity.jsx এর useEffect এ এই অংশটি নিশ্চিত করুন
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        // ১. পোস্ট সংখ্যা চেক
        const oppRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/opportunities?ownerId=${userId}`,
        );
        const oppData = await oppRes.json();
        setOpportunities(oppData);

        // ২. পেমেন্ট চেক (প্রিমিয়াম স্ট্যাটাস)
        const payRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payments/check-premium/${userId}`,
        );
        const payData = await payRes.json();

        // payData.isPremium যদি true হয়, তবে সে আনলিমিটেড পোস্ট করতে পারবে
        setIsPremium(payData.isPremium);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const canPost = isPremium || opportunities.length < 3;

  const [formData, setFormData] = useState({
    roleTitle: "",
    requiredSkills: "",
    workType: "Remote",
    commitment: "Part-time",
    deadline: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canPost) return;

    if (!userId) {
      toast.error("Please login to post an opportunity!");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/opportunities`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, ownerId: userId }),
        },
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Opportunity Added Successfully!");
        setFormData({
          roleTitle: "",
          requiredSkills: "",
          workType: "Remote",
          commitment: "Part-time",
          deadline: "",
          description: "",
        });
        // পোস্ট করার পর আবার নতুন কাউন্ট চেক করা
        fetchCount();
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (err) {
      console.log("Submission error:", err);
    }
  };

  const inputStyle =
    "w-full p-3 bg-white dark:bg-background border border-gray-300 dark:border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-colors text-sm";

  return (
    <div className="max-w-xl mx-auto space-y-6 p-4">
      {/* Premium Feature Card */}
      {!canPost && !loading && (
        <div className="bg-linear-to-r from-indigo-600 to-purple-700 p-6 rounded-2xl text-white shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <Crown className="text-yellow-400" size={28} />
            <h3 className="font-bold text-lg">Premium Founder Feature</h3>
          </div>
          <p className="text-indigo-100 text-sm mb-4">
            Founders must purchase a premium package before posting more than 3
            opportunities. Upgrade now to unlock unlimited postings.
          </p>
          <Link
            href="/checkout"
            className="inline-block bg-white text-indigo-700 px-5 py-2 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-colors"
          >
            Upgrade to Premium
          </Link>
        </div>
      )}

      {/* Main Form */}
      <div
        className={`bg-white dark:bg-card p-8 rounded-2xl border border-gray-200 dark:border-border shadow-sm transition-opacity ${!canPost ? "opacity-60 pointer-events-none" : ""}`}
      >
        <h2 className="text-2xl font-bold mb-2 text-foreground flex items-center gap-2">
          <Briefcase className="text-primary" /> Add Opportunity
        </h2>
        <p className="text-gray-500 dark:text-muted-foreground mb-6 text-sm">
          Post a new role to find the right talent for your startup.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="text"
            value={formData.roleTitle}
            placeholder="Role Title (e.g. Senior Frontend Developer)"
            className={inputStyle}
            onChange={(e) =>
              setFormData({ ...formData, roleTitle: e.target.value })
            }
          />
          <textarea
            required
            rows="3"
            value={formData.description}
            placeholder="Briefly describe the role..."
            className={inputStyle}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <input
            required
            type="text"
            value={formData.requiredSkills}
            placeholder="Required Skills (e.g. React, Node.js)"
            className={inputStyle}
            onChange={(e) =>
              setFormData({ ...formData, requiredSkills: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              className={inputStyle}
              value={formData.workType}
              onChange={(e) =>
                setFormData({ ...formData, workType: e.target.value })
              }
            >
              <option>Remote</option>
              <option>On-site</option>
              <option>Hybrid</option>
            </select>
            <select
              className={inputStyle}
              value={formData.commitment}
              onChange={(e) =>
                setFormData({ ...formData, commitment: e.target.value })
              }
            >
              <option>Part-time</option>
              <option>Full-time</option>
              <option>Contract</option>
            </select>
          </div>

          <input
            required
            type="date"
            value={formData.deadline}
            className={inputStyle}
            onChange={(e) =>
              setFormData({ ...formData, deadline: e.target.value })
            }
          />

          <button
            disabled={!canPost}
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all mt-4"
          >
            {canPost ? (
              <>
                <PlusCircle size={18} /> Post Opportunity
              </>
            ) : (
              <>
                <Lock size={18} /> Locked
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOpportunity;
