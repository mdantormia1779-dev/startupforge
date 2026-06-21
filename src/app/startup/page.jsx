"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FeatureCard from "../Components/FeatureCard/FeatureCard";

const featuredStartups = [
  {
    id: "1",
    startup_name: "TechNova",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop",
    industry: "Fintech",
    description: "Revolutionizing digital banking with AI-powered personalized financial planning tools for everyone.",
    funding_stage: "Series A",
    founder_email: "sarah.jenkins@technova.io",
    status: "Hiring",
    teamSize: "5 - 8 Members",
  },
  {
    id: "2",
    startup_name: "GreenFuture",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop",
    industry: "CleanTech",
    description: "Developing smart, modular solar storage systems specifically designed for urban apartment dwellers.",
    funding_stage: "Seed",
    founder_email: "mark.stofer@greenfuture.eco",
    status: "Stealth",
    teamSize: "3 - 5 Members",
  },
  {
    id: "3",
    startup_name: "EduSpark",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
    industry: "EdTech",
    description: "A gamified project-based learning platform that bridges the gap between students and industry experts.",
    funding_stage: "Series A",
    founder_email: "elena.rossi@eduspark.com",
    status: "Hiring",
    teamSize: "4 - 6 Members",
  },
];

const Startups = () => {
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");

  const filteredStartups = featuredStartups.filter((startup) => {
    const matchesSearch =
      startup.startup_name.toLowerCase().includes(search.toLowerCase()) ||
      startup.industry.toLowerCase().includes(search.toLowerCase());

    const matchesIndustry = industryFilter === "all" || startup.industry === industryFilter;
    const matchesStage = stageFilter === "all" || startup.funding_stage === stageFilter;

    return matchesSearch && matchesIndustry && matchesStage;
  });

  return (
    <section className="bg-[#0b0e16] text-white px-6 md:px-10 py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Browse Startups</h1>
        <p className="text-gray-400 text-lg">Explore innovative startups and join the right team.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-16 bg-[#161922] p-4 rounded-2xl border border-gray-800">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
          <Input
            placeholder="Search startups by name or industry..."
            className="pl-10 h-12 bg-[#0d0f17] border-gray-700"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select onValueChange={setIndustryFilter}>
          <SelectTrigger className="w-full md:w-52 h-12 bg-[#0d0f17] border-gray-700">
            <SelectValue placeholder="All Industries" />
          </SelectTrigger>
          <SelectContent className="bg-[#161922] border-gray-700 text-white">
            <SelectItem value="all">All Industries</SelectItem>
            <SelectItem value="Fintech">Fintech</SelectItem>
            <SelectItem value="CleanTech">CleanTech</SelectItem>
            <SelectItem value="EdTech">EdTech</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setStageFilter}>
          <SelectTrigger className="w-full md:w-52 h-12 bg-[#0d0f17] border-gray-700">
            <SelectValue placeholder="All Stages" />
          </SelectTrigger>
          <SelectContent className="bg-[#161922] border-gray-700 text-white">
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="Seed">Seed</SelectItem>
            <SelectItem value="Series A">Series A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStartups.length > 0 ? (
          filteredStartups.map((startup) => (
            <motion.div key={startup.id} whileHover={{ y: -10 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <FeatureCard startup={startup} />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No startups found matching your criteria.</p>
        )}
      </motion.div>
    </section>
  );
};

export default Startups;