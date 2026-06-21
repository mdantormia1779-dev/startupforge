"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // shadcn/ui থেকে আসা টেক্সট এরিয়া
import { Label } from "@/components/ui/label";

const ApplicationForm = ({ jobId, startupName, onSubmitSuccess }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const applicationData = {
      Opportunity_id: jobId,
      Applicant_email: formData.get("email"),
      Portfolio_link: formData.get("portfolio"),
      Motivation: formData.get("motivation"),
      Status: "Pending",
      applied_at: new Date().toISOString(),
    };

    console.log("Submitting Application:", applicationData);
    // এখানে আপনার API কল হবে
    if (onSubmitSuccess) onSubmitSuccess();
  };

  return (
    <form className="space-y-4 py-4" onSubmit={handleSubmit}>
      <div>
        <Label className="text-sm font-medium mb-1 block">Email Address</Label>
        <Input name="email" type="email" required className="bg-[#0d0f17] border-gray-700" placeholder="your@email.com" />
      </div>
      <div>
        <Label className="text-sm font-medium mb-1 block">Portfolio Link</Label>
        <Input name="portfolio" type="url" required className="bg-[#0d0f17] border-gray-700" placeholder="https://yourportfolio.com" />
      </div>
      <div>
        <Label className="text-sm font-medium mb-1 block">Motivation</Label>
        <Textarea name="motivation" required className="bg-[#0d0f17] border-gray-700 min-h-25" placeholder="Why do you want to join us?" />
      </div>
      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12">
        Submit Application
      </Button>
    </form>
  );
};

export default ApplicationForm;