"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApplyCard from "../Components/ApplyCard/ApplyCard";

const API = process.env.NEXT_PUBLIC_API_URL;

const OpportunitiesPage = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [workTypeFilter, setWorkTypeFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // ✅ FETCH FROM API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API}/opportunities`);
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // ✅ FILTER LOGIC (FIXED FIELD NAMES)
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.roleTitle?.toLowerCase().includes(search.toLowerCase()) ||
      job.requiredSkills?.toLowerCase().includes(search.toLowerCase());

    const matchesWorkType =
      workTypeFilter === "all" ||
      job.workType?.toLowerCase() === workTypeFilter.toLowerCase();

    return matchesSearch && matchesWorkType;
  });

  return (
    <div className="bg-white dark:bg-[#0d0f17]">
      <div className="max-w-7xl mx-auto min-h-screen text-gray-900 dark:text-white px-6 md:px-10 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold mb-2">Browse Opportunities</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find your dream role and join startups.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 bg-gray-100 dark:bg-[#161922] p-4 rounded-2xl border">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-3.5 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search by role or skills..."
              className="pl-10 h-12"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Select onValueChange={setWorkTypeFilter}>
            <SelectTrigger className="w-full md:w-48 h-12">
              <SelectValue placeholder="Work Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="onsite">On-site</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <ApplyCard key={job._id} job={job} />)
            ) : (
              <p className="text-center col-span-full">
                No opportunities found.
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OpportunitiesPage;
