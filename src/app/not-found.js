"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Rocket } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-linear-to-b from-background to-card overflow-hidden">
      
      {/* Animated Background Decoration */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-700"></div>

      {/* Main Content Card */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Floating Rocket Icon */}
        <div className="relative mb-10 group">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <Rocket size={48} className="text-primary rotate-45 animate-bounce" />
          </div>
        </div>

        {/* Text Area */}
        <h1 className="text-[120px] md:text-[160px] font-black text-foreground/10 leading-none select-none">
          404
        </h1>
        <div className="-mt-15 md:-mt-20">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Oops! Page Lost
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10">
            The page you are trying to visit has drifted into the deep void. Lets get you back to safety.
          </p>
        </div>

        {/* Action Button */}
        <Link 
          href="/"
          className="group flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10 dark:shadow-white/5"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Return to Launchpad
        </Link>
      </div>
    </div>
  );
};

export default NotFound;