import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Users, Mail } from "lucide-react";
import Link from "next/link";

const FeatureCard = ({ startup }) => {
  console.log(startup)
  return (
    <Card className="bg-[#111522] border-gray-800 rounded-3xl overflow-hidden shadow-2xl group transition-all hover:border-indigo-500/50">
      {/* Card Image */}
      <div className="relative h-56 w-full overflow-hidden">
        {startup.image && (
          <Image
            src={startup.image}
            alt={`Cover image for ${startup.startup_name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        {/* Status Badge */}
        {startup.status && (
          <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
            {startup.status}
          </div>
        )}
        
        <div className="absolute inset-0 bg-linear-to-t from-[#111522] to-transparent opacity-80" />
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-2xl text-white font-bold">
          {startup.startup_name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 p-3 rounded-xl border border-white/5">
          <Briefcase size={18} className="text-indigo-400" />
          <span>{startup.industry}</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 p-3 rounded-xl border border-white/5">
          <Users size={18} className="text-emerald-400" />
          <span>{startup.teamSize}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Link
          href={`/startup/${startup.id}`}
          className="w-full py-3 block text-center bg-white text-black font-bold rounded-xl hover:bg-indigo-500 hover:text-white transition-all duration-300"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;