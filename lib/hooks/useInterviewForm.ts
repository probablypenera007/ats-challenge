"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const minJobDescriptionLength = 100;

export function useInterviewForm() {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!jobDescription || !cvFile) {
      alert("Please enter a job description and upload your CV.");
      return;
    }

    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("cvFile", cvFile);

    try {
      const res = await fetch("/api/save-session", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to save session");

      console.log("✅ Saved session:", result.sessionId);
      // router.push("/interview");
      router.push(`/interview?id=${result.sessionId}`);
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("Something went wrong while saving.");
    }
  };

  const isJobDescriptionValid = jobDescription.trim().length >= minJobDescriptionLength;


  return {
    jobDescription,
    setJobDescription,
    cvFile,
    setCvFile,
    handleSubmit,
    isJobDescriptionValid,
  };
}