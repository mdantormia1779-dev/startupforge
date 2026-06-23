"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import FeatureCard from "../../FeatureCard/FeatureCard";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const FeaturedStartups = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
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

    fetchStartups();
  }, []);

  return (
    <section className="bg-white dark:bg-[#0b0e16] text-gray-900 dark:text-white px-6 md:px-10 py-20 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight">
            Featured Startups
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            Explore the most promising ventures of the year
          </p>
        </div>

        <Link
          href="/startup"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-2 font-semibold transition-all"
        >
          View All <ArrowRight size={18} />
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-center text-gray-400">Loading startups...</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {startups.slice(0, 3).map((startup) => (
            <motion.div
              key={startup._id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              <FeatureCard startup={startup} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default FeaturedStartups;
