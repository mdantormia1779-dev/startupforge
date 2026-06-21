"use client";
import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";
import ApplyCard from "@/app/Components/ApplyCard/ApplyCard";

const startupsData = [
  {
    id: "1",
    name: "TechNova",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=200",
    industry: "Fintech",
    fundingStage: "Series A",
    teamSize: "5 - 8 Members",
    description: "TechNova is revolutionizing the way small businesses handle their finances with AI-driven analytics.",
    founderEmail: "founder@technova.com",
    opportunities: [
      {
        id: "opp1",
        startup_id: "1",
        startup_name: "TechNova", // ApplyCard এর জন্য এটি যোগ করা হয়েছে
        role_title: "Senior Frontend Developer",
        required_skills: ["React", "TypeScript", "Tailwind"],
        work_type: "Remote",
        commitment_level: "Full Time",
        deadline: "2026-06-25",
      },
    ],
  },
];

const StartupDetailsPage = () => {
  const params = useParams();
  const id = params?.id;
  const startup = startupsData.find((s) => s.id === id);

  if (!startup) return <div className="text-foreground p-12 text-center">Startup not found!</div>;

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 transition-colors duration-300">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-card p-8 rounded-3xl border border-border flex flex-col md:flex-row gap-6 shadow-sm">
          <div className="relative w-32 h-32 shrink-0">
            <Image src={startup.logo} alt={startup.name} fill className="rounded-2xl object-cover" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">{startup.name}</h1>
            <p className="text-muted-foreground mt-2">Leading the {startup.industry} space.</p>
            <div className="flex gap-4 mt-4 text-sm">
              <span className="bg-secondary px-3 py-1 rounded-full text-secondary-foreground">{startup.fundingStage}</span>
              <span className="bg-secondary px-3 py-1 rounded-full text-secondary-foreground">{startup.teamSize}</span>
            </div>
          </div>
        </div>

        {/* Details & Contact */}
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">About the Company</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{startup.description}</p>
          </div>

          <div className="bg-card p-6 rounded-3xl border border-border h-fit shadow-sm">
            <h3 className="font-bold mb-4">Founder Reach</h3>
            <a href={`mailto:${startup.founderEmail}`} className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
              <Mail size={18} /> {startup.founderEmail}
            </a>
          </div>
        </div>

        {/* Opportunities Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
          {startup.opportunities.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {startup.opportunities.map((opp) => (
                <motion.div key={opp.id} whileHover={{ y: -5 }}>
                  <ApplyCard job={opp} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-card p-8 rounded-2xl border border-dashed border-border text-center">
              <p className="text-muted-foreground">No open positions currently available at {startup.name}.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default StartupDetailsPage;