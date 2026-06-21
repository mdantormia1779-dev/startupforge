"use client";
import React from "react";
import { motion } from "framer-motion";
import ApplyCard from "../../ApplyCard/ApplyCard";

const opportunities = [
  {
    id: "opp1",
    startup_id: "1",
    role_title: "Frontend Developer",
    required_skills: ["React", "TypeScript", "Tailwind"],
    work_type: "Remote",
    commitment_level: "Full Time",
    deadline: "2026-06-25",
  },
  {
    id: "opp2",
    startup_id: "2",
    role_title: "UI/UX Designer",
    required_skills: ["Figma", "UI Design", "Prototyping"],
    work_type: "Remote",
    commitment_level: "Part Time",
    deadline: "2026-06-30",
  },
  {
    id: "opp3",
    startup_id: "3",
    role_title: "Marketing Specialist",
    required_skills: ["Marketing", "SEO", "Content"],
    work_type: "Hybrid",
    commitment_level: "Full Time",
    deadline: "2026-06-28",
  },
];

const FeaturedOpportunities = () => {
  return (
    <section className="bg-white dark:bg-[#0b0e16] py-16 px-6 md:px-12 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Featured Opportunities</h2>
          <a
            href="#"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            View All &gt;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <ApplyCard job={job} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOpportunities;