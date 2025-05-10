"use client";

import JobDescriptionInput from "@/components/JobDescriptionInput";
import CVUploader from "@/components/CVUploader";
import SubmitButton from "@/components/SubmitButton";
import { useInterviewForm } from "@/lib/hooks/useInterviewForm";

export default function Home() {
  const { jobDescription, setJobDescription, cvFile, setCvFile, handleSubmit, isJobDescriptionValid } =
    useInterviewForm();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 space-y-8 bg-black">
      <h1 className="text-5xl font-extrabold text-purple-700 text-center">
        Welcome to Your AI Interview Coach
      </h1>
      <p className="text-xl text-gray-600 text-center font-medium">
        Get personalized questions based on your background
      </p>

      <p className="text-center text-gray-600 max-w-2xl text-lg leading-relaxed font-semibold">
        Paste the job description and upload your CV to generate tailored
        interview questions. Our AI will guide you through a realistic and
        dynamic mock interview.
      </p>

      <JobDescriptionInput
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
      />

      <CVUploader cvFile={cvFile} setCvFile={setCvFile} />

      <SubmitButton
        onClick={handleSubmit}
        isDisabled={!isJobDescriptionValid || !cvFile}
      />
    </main>
  );
}
