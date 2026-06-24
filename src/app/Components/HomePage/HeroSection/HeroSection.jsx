"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="bg-white dark:bg-[#0d0f17]">
      <section className="max-w-7xl mx-auto text-gray-900 dark:text-white py-16 md:py-24 lg:py-32 px-6 lg:px-16 w-full min-h-[60vh] lg:min-h-[80vh] flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-24 transition-colors duration-300">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 space-y-8 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-full px-5 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/50 mx-auto lg:mx-0"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            Next Gen Founder Ecosystem
          </motion.div>

          <h1 className="text-4xl md:text-6xl 2xl:text-7xl font-bold leading-[1.1] tracking-tight">
            Forge Your <span className="text-[#8b5cf6]">Startup</span> <br />{" "}
            Narrative
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl 2xl:text-2xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Accelerate your vision with an elite network of founders,
            developers, and investors. The most sophisticated workspace for
            high-velocity builders.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-10 py-7 text-lg md:text-xl rounded-lg w-full sm:w-auto transition-transform hover:scale-105">
              Launch Project
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white px-10 py-7 text-lg md:text-xl rounded-lg gap-2 w-full sm:w-auto"
            >
              <Play size={20} /> Explore
            </Button>
          </div>
        </motion.div>

        {/* Right Custom Dashboard Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full lg:w-1/2 max-w-lg lg:max-w-xl 2xl:max-w-2xl"
        >
          <div className="w-full aspect-4/3 bg-gray-100 dark:bg-linear-to-br dark:from-[#1e1336] dark:to-[#0d0f17] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col p-6 gap-4">
            <div className="flex gap-2">
              <div className="h-3 w-16 bg-purple-500/50 rounded-full" />
              <div className="h-3 w-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
            </div>
            <div className="flex-1 w-full bg-white dark:bg-[#161922] rounded-xl border border-gray-200 dark:border-gray-700/50 flex items-center justify-center">
              <span className="text-gray-400 dark:text-gray-500 font-mono text-base">
                Dashboard Analytics UI
              </span>
            </div>
          </div>

          {/* Floating Card */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-2 md:-bottom-12 md:-left-12 bg-white dark:bg-[#1a1c25]/95 backdrop-blur border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-2xl"
          >
            <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
              12,400+ Active Collaborators
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default HeroSection;
