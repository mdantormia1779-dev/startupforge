"use client";
import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Building2, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ApplicationForm from "@/app/Components/ApplicationForm/ApplicationForm";

const opportunities = [
  {
    id: "opp1",
    startup_name: "TechNova",
    role_title: "Frontend Developer",
    required_skills: ["React", "TypeScript", "Tailwind"],
    work_type: "Remote",
    commitment_level: "Full Time",
    deadline: "2026-06-25",
    description: "We are looking for an experienced Frontend Developer to lead our UI efforts. You will be working on cutting-edge financial dashboards using React and Tailwind CSS.",
  },
  {
    id: "opp2",
    startup_name: "GreenFuture",
    role_title: "UI/UX Designer",
    required_skills: ["Figma", "UI Design", "Prototyping"],
    work_type: "Remote",
    commitment_level: "Part Time",
    deadline: "2026-06-30",
    description: "GreenFuture is looking for a creative UI/UX designer to craft sustainable digital solutions for urban green spaces.",
  },
  {
    id: "opp3",
    startup_name: "EduSpark",
    role_title: "Marketing Specialist",
    required_skills: ["Marketing", "SEO", "Content"],
    work_type: "Hybrid",
    commitment_level: "Full Time",
    deadline: "2026-06-28",
    description: "Join EduSpark to scale our educational platform through innovative content marketing and SEO strategies.",
  },
];

const JobDetailsPage = () => {
  const { id } = useParams();
  const job = opportunities.find((j) => j.id === id);

  if (!job) {
    return <div className="text-foreground text-center py-20">Job opportunity not found!</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        
        {/* Job Header */}
        <div className="bg-background p-8 rounded-3xl border border-border mb-8">
          <h1 className="text-4xl font-extrabold mb-2">{job.role_title}</h1>
          <div className="flex items-center gap-2 text-indigo-400 font-medium mb-6">
            <Building2 size={20} /> {job.startup_name}
          </div>
          <div className="flex flex-wrap gap-4">
            <Badge className="bg-background text-indigo-300 py-1 px-4">{job.work_type}</Badge>
            <Badge className="bg-background text-emerald-400 py-1 px-4">{job.commitment_level}</Badge>
            <span className="flex items-center gap-1 text-gray-400 text-sm">
              <Calendar size={16} /> Deadline: {job.deadline}
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Role Description</h2>
              <p className="text-gray-400 leading-relaxed">{job.description}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.required_skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 bg-background px-4 py-2 rounded-xl border border-border">
                    <CheckCircle2 size={16} className="text-indigo-500" /> {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-background p-6 rounded-3xl border border-border h-fit space-y-4">
            <h3 className="font-bold text-lg">Interested in this role?</h3>
            <p className="text-gray-400 text-sm">Click below to submit your application directly to the startup team.</p>
            
            {/* ফিক্সড ডায়ালগ সেকশন */}
            <Dialog>
              {/* asChild সরিয়ে দেওয়া হয়েছে কারণ এটি Base UI বাটন কম্পোনেন্টের সাথে কনফ্লিক্ট করছিল */}
              <DialogTrigger>
                <div className="w-full px-6 bg-background text-foreground font-bold hover:bg-indigo-500 hover:text-white transition-colors rounded-xl h-12 flex items-center justify-center cursor-pointer">
                  Apply Now
                </div>
              </DialogTrigger>
              <DialogContent className="bg-background border-border text-foreground sm:max-w-125">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Apply for {job.role_title}</DialogTitle>
                  <DialogDescription className="text-foreground">
                    Submit your application to {job.startup_name}
                  </DialogDescription>
                </DialogHeader>
                <ApplicationForm
                  jobId={job.id}
                  startupName={job.startup_name}
                  onSubmitSuccess={() => alert("Application Submitted Successfully!")}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDetailsPage;