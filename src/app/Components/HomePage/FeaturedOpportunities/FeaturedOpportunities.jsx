"use client";
import React from "react";
import { motion } from "framer-motion"; // Framer Motion import
import ApplyCard from "../../ApplyCard/ApplyCard";

const opportunities = [
  {
    role: "Frontend Developer",
    startup: "TechNova",
    skills: ["React", "TypeScript", "Tailwind"],
    type: "Full Time",
    location: "Remote",
    deadline: "Apply by 25th June",
  },
  {
    role: "UI/UX Designer",
    startup: "GreenFuture",
    skills: ["Figma", "UI Design", "Prototyping"],
    type: "Part Time",
    location: "Remote",
    deadline: "Apply by 30th June",
  },
  {
    role: "Marketing Specialist",
    startup: "EduSpark",
    skills: ["Marketing", "SEO", "Content"],
    type: "Full Time",
    location: "Hybrid",
    deadline: "Apply by 28th June",
  },
];

const FeaturedOpportunities = () => {
  return (
    <section className="bg-[#0b0e16] py-16 px-6 md:px-12 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Featured Opportunities</h2>
          <a
            href="#"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
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
              <ApplyCard job={job}></ApplyCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOpportunities;
