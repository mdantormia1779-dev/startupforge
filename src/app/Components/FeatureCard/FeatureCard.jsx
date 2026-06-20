import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserCircle, Briefcase, Users } from "lucide-react";

const FeatureCard = ({ startup }) => {
  return (
    <div>
      <Card className="bg-[#111522] border-gray-800 rounded-3xl overflow-hidden shadow-2xl group transition-all hover:border-indigo-500/50">
        {/* Card Image */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={startup.image}
            alt={startup.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#111522] to-transparent opacity-80" />
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-2xl text-gray-300 font-bold">
            {startup.name}
          </CardTitle>
          <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
            <UserCircle size={16} />
            <span>{startup.founder}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 p-3 rounded-xl border border-white/5">
            <Briefcase size={18} className="text-indigo-400" />
            <span>{startup.industry} Industry</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 p-3 rounded-xl border border-white/5">
            <Users size={18} className="text-emerald-400" />
            <span>{startup.teamSize} Members</span>
          </div>
        </CardContent>

        <CardFooter className="pt-2">
          <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-indigo-500 hover:text-white transition-all duration-300">
            View Details
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FeatureCard;
