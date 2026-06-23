"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
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
import { authClient } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;

const JobDetailsPage = () => {
  const { id } = useParams();

  const { data: session } = authClient.useSession();
  const userEmail = session?.user?.email;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  // ================= FETCH JOB =================
  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const res = await fetch(`${API}/opportunities/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // ================= CHECK APPLICATION =================
  useEffect(() => {
    if (!id || !userEmail) return;

    const checkApplied = async () => {
      try {
        const res = await fetch(
          `${API}/applications/check?jobId=${id}&email=${userEmail}`,
        );

        const data = await res.json();
        setApplied(!!data.applied);
      } catch (err) {
        console.log(err);
      }
    };

    checkApplied();
  }, [id, userEmail]);

  // ================= LOADING =================
  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading...</div>;
  }

  if (!job) {
    return <div className="text-center py-20 text-red-400">Job not found</div>;
  }

  const skills =
    typeof job.requiredSkills === "string"
      ? job.requiredSkills.split(",")
      : job.requiredSkills || [];

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* HEADER */}
        <div className="p-8 border rounded-3xl mb-8">
          <h1 className="text-4xl font-bold">{job.roleTitle}</h1>

          <div className="flex items-center gap-2 text-indigo-500 mt-2">
            <Building2 size={18} /> Startup Role
          </div>

          <div className="flex gap-4 mt-4">
            <Badge>{job.workType}</Badge>
            <Badge>{job.commitment}</Badge>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Calendar size={14} /> {job.deadline}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-bold">Description</h2>
              <p className="text-gray-400">{job.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold">Skills</h2>

              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((s, i) => (
                  <div
                    key={i}
                    className="px-3 py-1 border rounded-lg flex items-center gap-1"
                  >
                    <CheckCircle2 size={14} />
                    {s.trim()}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Dialog>
            <DialogTrigger>
              {/* এখানে 'button' এর বদলে 'div' ব্যবহার করুন */}
              <div
                role="button"
                className={`w-full h-12 flex items-center justify-center rounded-xl font-bold transition cursor-pointer select-none
      ${
        applied
          ? "bg-gray-500 cursor-not-allowed text-white"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
              >
                {applied ? "Already Applied" : "Apply Now"}
              </div>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Apply for {job.roleTitle}</DialogTitle>
                <DialogDescription>
                  Your application will be sent as Pending
                </DialogDescription>
              </DialogHeader>

              <ApplicationForm
                jobId={job._id}
                startupName={job.roleTitle}
                onSubmitSuccess={() => setApplied(true)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDetailsPage;
