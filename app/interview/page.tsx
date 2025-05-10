"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface InterviewSessionData {
  jobDescription: string;
  cvText: string;
}

const InterviewPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id");

  const [sessionData, setSessionData] = useState<InterviewSessionData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSessionData = async () => {
      if (!sessionId) return;

      console.log("📥 InterviewPage loaded with sessionId:", sessionId);

      try {
        const res = await fetch(`/api/get-session?id=${sessionId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch session");

        console.log("📄 Retrieved Job Description:", data.jobDescription?.slice(0, 100));
        console.log("📄 Retrieved CV Text Preview:", data.cvText?.slice(0, 100));

        setSessionData(data);
      } catch (err) {
        console.error("❌ Fetch session error:", err);
        setError("Failed to load session data.");
      }
    };

    fetchSessionData();
  }, [sessionId]);

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">AI Interview Session</h1>

      {error && <p className="text-red-500">{error}</p>}

      {!error && !sessionData && <p>⏳ Loading session...</p>}

      {sessionData && (
        <div className="space-y-4">
          <p>
            <strong>📝 Job Description Preview:</strong><br />
            {sessionData.jobDescription.slice(0, 200)}...
          </p>
          <p>
            <strong>📄 CV Preview:</strong><br />
            {sessionData.cvText.slice(0, 200)}...
          </p>
        </div>
      )}
    </main>
  );
};

export default InterviewPage;