"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import FeatureCard from "../../FeatureCard/FeatureCard";

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

// অ্যানিমেশন ভেরিয়েন্ট
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const FeaturedStartups = () => {
  return (
    <section className="bg-[#0b0e16] text-white px-6 md:px-10 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight">
            Featured Startups
          </h2>
          <p className="text-gray-400 mt-2 text-lg">
            Explore the most promising ventures of the year
          </p>
        </div>
        <button className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 font-semibold transition-all">
          View All <ArrowRight size={18} />
        </button>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {featuredStartups.map((startup, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -10 }}
          >
            <FeatureCard startup={startup}></FeatureCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedStartups;
