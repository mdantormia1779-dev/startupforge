"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar } from "lucide-react";

const ApplyCard = ({ job }) => {
  // ✅ safe skills parsing (string or array both support)
  const skills = Array.isArray(job.requiredSkills)
    ? job.requiredSkills
    : job.requiredSkills
    ? job.requiredSkills.split(",").map((s) => s.trim())
    : [];

  return (
    <Card className="bg-[#161922] border-gray-800 rounded-2xl p-6 h-full flex flex-col justify-between hover:border-indigo-500/50 transition-all">

      {/* HEADER */}
      <CardHeader className="p-0 mb-4">
        <h3 className="text-xl font-bold text-white">
          {job.roleTitle}
        </h3>

        {/* startup / role label */}
        <p className="text-indigo-400 text-sm font-medium">
          {job.startup_name || "Startup Role"}
        </p>

        {/* skills */}
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill) => (
            <Badge
              key={skill}
              className="bg-indigo-500/10 text-indigo-300 border-none"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="p-0 space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Briefcase size={16} className="text-emerald-400" />
          <span>
            {job.workType} • {job.commitment}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar size={16} className="text-amber-400" />
          <span>Deadline: {job.deadline}</span>
        </div>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="p-0">
        <Link href={`/oprtunities/${job._id}`} className="w-full">
          <Button className="w-full bg-white text-black font-bold hover:bg-indigo-500 hover:text-white transition-colors rounded-xl">
            Apply Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ApplyCard;