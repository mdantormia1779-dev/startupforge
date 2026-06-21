"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ApplyCard from "../Components/ApplyCard/ApplyCard";

const opportunitiesData = [
  {
    id: "opp1",
    startup_name: "TechNova",
    role_title: "Frontend Developer",
    required_skills: ["React", "TypeScript", "Tailwind"],
    work_type: "Remote",
    commitment_level: "Full Time",
    deadline: "2026-06-25",
  },
  {
    id: "opp2",
    startup_name: "GreenFuture",
    role_title: "UI/UX Designer",
    required_skills: ["Figma", "UI Design", "Prototyping"],
    work_type: "Remote",
    commitment_level: "Part Time",
    deadline: "2026-06-30",
  },
  {
    id: "opp3",
    startup_name: "EduSpark",
    role_title: "Marketing Specialist",
    required_skills: ["Marketing", "SEO", "Content"],
    work_type: "Hybrid",
    commitment_level: "Full Time",
    deadline: "2026-06-28",
  },
];

const OpportunitiesPage = () => {
  const [search, setSearch] = useState("");
  const [workTypeFilter, setWorkTypeFilter] = useState("all");

  const filteredJobs = opportunitiesData.filter((job) => {
    const matchesSearch =
      job.role_title.toLowerCase().includes(search.toLowerCase()) ||
      job.startup_name.toLowerCase().includes(search.toLowerCase());
    
    const matchesWorkType =
      workTypeFilter === "all" || job.work_type.toLowerCase() === workTypeFilter.toLowerCase();

    return matchesSearch && matchesWorkType;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0e16] text-gray-900 dark:text-white px-6 md:px-10 py-20 transition-colors duration-300">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Browse Opportunities</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Find your dream role and join innovative startup teams.</p>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 bg-gray-100 dark:bg-[#161922] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
          <Input
            placeholder="Search by role or startup name..."
            className="pl-10 h-12 bg-white dark:bg-[#0d0f17] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <Select onValueChange={(value) => setWorkTypeFilter(value)}>
          <SelectTrigger className="w-full md:w-48 h-12 bg-white dark:bg-[#0d0f17] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
            <SelectValue placeholder="Work Type" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-[#161922] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <ApplyCard key={job.id} job={job} />
          ))
        ) : (
          <div className="text-center col-span-full py-20">
            <p className="text-gray-500 dark:text-gray-400">No opportunities found matching your criteria.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default OpportunitiesPage;