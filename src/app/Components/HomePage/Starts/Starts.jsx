"use client";
import React from "react";
import { motion } from "framer-motion";

const Starts = () => {
  const stats = [
    { val: "1,240", label: "TOTAL STARTUPS" },
    { val: "842", label: "SUCCESSFUL HIRES", color: "text-green-400" },
    { val: "$12.4M", label: "CAPITAL RAISED" },
  ];

  // অ্যানিমেশন ভেরিয়েন্টস
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-linear-to-b from-[#0b0e16] to-[#0d0f17] text-white px-6 md:px-10 py-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={item}
              className="text-center p-6 rounded-2xl bg-[#141826] hover:bg-[#1a1f2e] border border-gray-800 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer"
            >
              <div className={`text-3xl md:text-4xl font-bold ${stat.color || ""}`}>
                {stat.val}
              </div>
              <div className="text-gray-500 text-[10px] md:text-xs tracking-widest mt-2 uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Starts;