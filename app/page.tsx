"use client";

import JobDescriptionInput from "@/components/JobDescriptionInput";
import CVUploader from "@/components/CVUploader";
import SubmitButton from "@/components/SubmitButton";
import { useInterviewForm } from "@/lib/hooks/useInterviewForm";

export default function Home() {
  const {
    jobDescription,
    setJobDescription,
    cvFile,
    setCvFile,
    handleSubmit,
  } = useInterviewForm();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Welcome!</h1>
      <p className="text-lg text-gray-600 text-center">AI-Powered Interview Assistant</p>
      <p className="text-center text-gray-500 max-w-xl">
        Paste the job description and upload your CV to generate personalized interview questions.
        This helps the AI interviewer position you better and tailor the interview to your background.
      </p>

      <JobDescriptionInput jobDescription={jobDescription} setJobDescription={setJobDescription} />
      <CVUploader cvFile={cvFile} setCvFile={setCvFile} />
      <SubmitButton onClick={handleSubmit} />
    </main>
  );
}