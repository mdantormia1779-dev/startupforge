import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Users } from "lucide-react";
import Link from "next/link";

const FeatureCard = ({ startup }) => {
  return (
    <Card className="bg-[#111522] border-gray-800 rounded-3xl overflow-hidden shadow-2xl group hover:border-indigo-500/50 transition-all">
      
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        {startup.logoUrl && (
          <Image
            src={startup.logoUrl}
            alt={startup.name}
            fill
            className="object-cover group-hover:scale-110 transition duration-700"
          />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-[#111522] to-transparent opacity-80" />
      </div>

      {/* Title */}
      <CardHeader>
        <CardTitle className="text-white text-2xl font-bold">
          {startup.name}
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 p-3 rounded-xl">
          <Briefcase size={18} className="text-indigo-400" />
          <span>{startup.industry}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 p-3 rounded-xl">
          <Users size={18} className="text-emerald-400" />
          <span>{startup.fundingStage}</span>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter>
        <Link
          href={`/startup/${startup._id}`}
          className="w-full py-3 text-center bg-white text-black font-bold rounded-xl hover:bg-indigo-500 hover:text-white transition"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;