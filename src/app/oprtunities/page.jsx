"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ApplyCard from "../Components/ApplyCard/ApplyCard";

const opportunitiesData = [
  {
    id: "opp1",
    startup_name: "TechNova", // ফিল্টার করার জন্য নাম যোগ করলাম
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

  // ফিল্টারিং লজিক
  const filteredJobs = opportunitiesData.filter((job) => {
    const matchesSearch =
      job.role_title.toLowerCase().includes(search.toLowerCase()) ||
      job.startup_name.toLowerCase().includes(search.toLowerCase());
    
    const matchesWorkType =
      workTypeFilter === "all" || job.work_type.toLowerCase() === workTypeFilter.toLowerCase();

    return matchesSearch && matchesWorkType;
  });

  return (
    <div className="min-h-screen bg-[#0b0e16] text-white px-6 md:px-10 py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Browse Opportunities</h1>
        <p className="text-gray-400 text-lg">Find your dream role and join innovative startup teams.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12 bg-[#161922] p-4 rounded-2xl border border-gray-800">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
          <Input
            placeholder="Search by role or startup name..."
            className="pl-10 h-12 bg-[#0d0f17] border-gray-700"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <Select onValueChange={(value) => setWorkTypeFilter(value)}>
          <SelectTrigger className="w-full md:w-48 h-12 bg-[#0d0f17] border-gray-700">
            <SelectValue placeholder="Work Type" />
          </SelectTrigger>
          <SelectContent className="bg-[#161922] border-gray-700 text-white">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
          <p className="text-gray-500 text-center col-span-full">No opportunities found matching your criteria.</p>
        )}
      </motion.div>
    </div>
  );
};

export default OpportunitiesPage;