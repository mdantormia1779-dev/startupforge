"use client";
import React, { useState, useEffect } from "react";
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

const API = process.env.NEXT_PUBLIC_API_URL;

const Startups = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");

  // ✅ Fetch API Data
  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const res = await fetch(`${API}/startups`);
        const data = await res.json();
        setStartups(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStartup();
  }, []);

  // ✅ Filter logic (API data)
  const filteredStartups = startups.filter((startup) => {
    const name = startup.name?.toLowerCase() || "";
    const industry = startup.industry?.toLowerCase() || "";
    const stage = startup.fundingStage || "";

    const matchesSearch =
      name.includes(search.toLowerCase()) ||
      industry.includes(search.toLowerCase());

    const matchesIndustry =
      industryFilter === "all" || startup.industry === industryFilter;

    const matchesStage =
      stageFilter === "all" || startup.fundingStage === stageFilter;

    return matchesSearch && matchesIndustry && matchesStage;
  });

  return (
    <div className="bg-white dark:bg-[#0d0f17]">
      <section className="text-foreground px-6 md:px-10 py-20 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold mb-2">Browse Startups</h1>
          <p className="text-muted-foreground">
            Explore innovative startups and join the right team.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-16 bg-card p-4 rounded-2xl border">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-3.5 text-muted-foreground"
              size={18}
            />
            <Input
              placeholder="Search startups..."
              className="pl-10 h-12"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Select onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-full md:w-52 h-12">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              <SelectItem value="FinTech">FinTech</SelectItem>
              <SelectItem value="EdTech">EdTech</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setStageFilter}>
            <SelectTrigger className="w-full md:w-52 h-12">
              <SelectValue placeholder="All Stages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="Pre-Seed">Pre-Seed</SelectItem>
              <SelectItem value="Seed">Seed</SelectItem>
              <SelectItem value="Series A">Series A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p>Loading...</p>
          ) : filteredStartups.length > 0 ? (
            filteredStartups.map((startup) => (
              <motion.div
                key={startup._id}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <FeatureCard startup={startup} />
              </motion.div>
            ))
          ) : (
            <p className="text-muted-foreground col-span-full text-center">
              No startups found.
            </p>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default Startups;
