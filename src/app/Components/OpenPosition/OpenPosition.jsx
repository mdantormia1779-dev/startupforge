"use client";

import React, { useEffect, useState } from "react";
import ApplyCard from "@/app/Components/ApplyCard/ApplyCard";

const API = process.env.NEXT_PUBLIC_API_URL;

const OpenPosition = ({ ownerId }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ownerId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API}/startups/by-owner/${ownerId}`
        );
        const data = await res.json();

        setOpportunities(data.opportunities || []);
      } catch (err) {
        console.log(err);
        setOpportunities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ownerId]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Open Positions</h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : opportunities.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {opportunities.map((job) => (
            <ApplyCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No open positions available</p>
      )}
    </div>
  );
};

export default OpenPosition;