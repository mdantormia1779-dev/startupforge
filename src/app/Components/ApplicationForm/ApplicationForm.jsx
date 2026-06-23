"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client"; // সেশন থেকে ডাটা নিতে

const API = process.env.NEXT_PUBLIC_API_URL;

const ApplicationForm = ({ jobId, onSubmitSuccess }) => {
  const [loading, setLoading] = React.useState(false);
  const { data: session } = authClient.useSession(); // ইউজারের তথ্য নেওয়ার জন্য

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    const applicationData = {
      opportunityId: jobId,
      applicantEmail: formData.get("email"),
      portfolio: formData.get("portfolio"),
      motivation: formData.get("motivation"),
      applicantName: session?.user?.name || "Anonymous", // নাম যোগ করা ভালো
      status: "Pending",
    };

    try {
      const res = await fetch(`${API}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Application sent for approval ⏳");
        form.reset();
        if (onSubmitSuccess) onSubmitSuccess();
      } else {
        toast.error(data.message || "Failed to submit application");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 py-4" onSubmit={handleSubmit}>
      <div>
        <Label>Email Address</Label>
        <Input 
          name="email" 
          type="email" 
          defaultValue={session?.user?.email || ""} 
          required 
        />
      </div>

      <div>
        <Label>Portfolio Link</Label>
        <Input name="portfolio" type="url" placeholder="https://yourportfolio.com" required />
      </div>

      <div>
        <Label>Why are you a good fit?</Label>
        <Textarea name="motivation" placeholder="Tell us about your experience..." required />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
};

export default ApplicationForm;