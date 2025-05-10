import { Suspense } from "react";
import InterviewPage from "@/components/interviewPage";

export default function InterviewPageWrapper() {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-gray-400">Loading Interview Session...</div>}>
      <InterviewPage />
    </Suspense>
  );
}