"use client";

import React, { useEffect, useState } from "react";
import { Building2, Calendar } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;

const MyApplications = () => {
  const { data: session } = authClient.useSession();
  const email = session?.user?.email;

  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    const fetchApps = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API}/applications/by-user/${email}`);
        const data = await res.json();

        setApps(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, [email]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading applications...
      </div>
    );
  }

  if (!apps.length) {
    return (
      <div className="text-center py-20 text-gray-400">
        No applications found
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>

      <div className="space-y-4">
        {apps.map((app) => (
          <div
            key={app._id}
            className="p-5 border rounded-xl flex justify-between items-center"
          >
            {/* LEFT */}
            <div>
              <h3 className="font-bold text-lg">
                {app.job?.roleTitle}
              </h3>

              <p className="text-sm text-gray-500">
                {app.job?.workType} • {app.job?.commitment}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Applied for: {app.job?.requiredSkills}
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-end gap-2">
              <span className="text-sm flex items-center gap-1 text-gray-500">
                <Calendar size={14} />
                {new Date(app.appliedAt).toDateString()}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  app.status === "Accepted"
                    ? "bg-green-200 text-green-700"
                    : app.status === "Rejected"
                    ? "bg-red-200 text-red-700"
                    : "bg-yellow-200 text-yellow-700"
                }`}
              >
                {app.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;