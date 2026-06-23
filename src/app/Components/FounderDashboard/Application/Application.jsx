"use client";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;

const Application = () => {
  const { data: session } = authClient.useSession();
  console.log(session)
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch applications by founder email
  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchApplications = async () => {
      try {
        const res = await fetch(
          `${API}/applications/by-founder/${session.user.id}`
        );
        const data = await res.json();

        setApplications(data);
      } catch (err) {
        console.error("Failed to fetch applications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [session]);

  // ✅ Status update handler
  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`${API}/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (data.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status } : app
          )
        );
      }
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  // ✅ Stats
  const pending = applications.filter((a) => a.status === "Pending").length;
  const accepted = applications.filter((a) => a.status === "Accepted").length;

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">Applications</h2>

        <div className="flex gap-4">
          <div className="text-center border p-2 rounded-xl w-20">
            <p className="text-xs text-gray-400">Pending</p>
            <p className="text-lg font-bold">{pending}</p>
          </div>

          <div className="text-center border p-2 rounded-xl w-20">
            <p className="text-xs text-gray-400">Accepted</p>
            <p className="text-lg font-bold">{accepted}</p>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="p-4 border rounded-xl flex justify-between items-center"
          >
            {/* Info */}
            <div>
              <h3 className="font-bold">{app.applicantName}</h3>
              <p className="text-sm text-gray-500">{app.jobTitle}</p>
              <p className="text-xs text-gray-400">
                {new Date(app.appliedAt).toLocaleDateString()}
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-4">
              <span
                className={`text-xs ${
                  app.status === "Accepted"
                    ? "text-green-500"
                    : app.status === "Rejected"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {app.status}
              </span>

              {app.status === "Pending" ? (
                <>
                  <button
                    onClick={() =>
                      handleStatusChange(app._id, "Rejected")
                    }
                    className="px-3 py-1 text-xs border text-red-500 rounded"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() =>
                      handleStatusChange(app._id, "Accepted")
                    }
                    className="px-3 py-1 text-xs bg-green-600 text-white rounded"
                  >
                    Accept
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="px-3 py-1 text-xs bg-gray-200 rounded"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Application;