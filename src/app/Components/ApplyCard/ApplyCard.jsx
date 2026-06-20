import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase } from "lucide-react";

const ApplyCard = ({ job }) => {
  return (
    <Card className="bg-[#141826] border-gray-800 p-6 rounded-2xl flex flex-col justify-between h-full hover:border-indigo-500/50 transition-colors duration-300">
      <div>
        <h3 className="text-xl text-gray-300 font-bold">{job.role}</h3>
        <p className="text-gray-400 mb-4">{job.startup}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {job.skills.map((skill) => (
            <Badge
              key={skill}
              className="bg-[#1e2335] text-gray-300 hover:bg-[#252b42] border-none px-3 py-1"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <CardContent className="p-0 space-y-4">
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Briefcase size={16} /> {job.type}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={16} /> {job.location}
          </span>
        </div>
        <p className="text-xs text-gray-500 italic">{job.deadline}</p>
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300">
          Apply Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApplyCard;
