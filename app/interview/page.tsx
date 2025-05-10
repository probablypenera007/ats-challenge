"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChatBox from "@/components/ChatBox";
interface InterviewSessionData {
  jobDescription: string;
  cvText: string;
}

type Message = {
  sender: "ai" | "user";
  text: string;
};


const InterviewPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id");

  const [sessionData, setSessionData] = useState<InterviewSessionData | null>(
    null
  );
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "ai", text: "Welcome! Let's begin the interview." },
  ]);
  useEffect(() => {
    const fetchSessionData = async () => {
      if (!sessionId) return;

      console.log("📥 InterviewPage loaded with sessionId:", sessionId);

      try {
        const res = await fetch(`/api/get-session?id=${sessionId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch session");

        console.log(
          "📄 Retrieved Job Description:",
          data.jobDescription?.slice(0, 100)
        );
        console.log(
          "📄 Retrieved CV Text Preview:",
          data.cvText?.slice(0, 100)
        );

        setSessionData(data);
        setCountdown(3); // Start countdown when session is loaded
      } catch (err) {
        console.error("❌ Fetch session error:", err);
        setError("Failed to load session data.");
      }
    };

    fetchSessionData();
  }, [sessionId]);

  // Countdown effect
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setShowChat(true);
      return;
    }

    const timer = setTimeout(
      () => setCountdown((prev) => (prev !== null ? prev - 1 : null)),
      1000
    );
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <main className="min-h-screen p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">AI Interview Session</h1>

      {error && <p className="text-red-500">{error}</p>}

      {!error && !sessionData && <p>⏳ Loading session...</p>}

      {sessionData && (
        <>
          {/* Count Down */}
          {!showChat && countdown !== null && (
            <div className="text-6xl font-bold text-purple-600 animate-pulse my-8">
              {countdown}
            </div>
          )}

          {/* Chat Interface Placeholder */}
          {showChat && (
            <ChatBox
              messages={messages}
              onSend={(msg) => {
                setMessages((prev) => [...prev, { sender: "user", text: msg }]);
                // Optionally send msg to your AI backend here and push AI response
              }}
            />
          )}

          {/* Still show previews */}
          <div className="space-y-4 text-left w-full max-w-2xl">
            <p>
              <strong>📝 Job Description Preview:</strong>
              <br />
              {sessionData.jobDescription.slice(0, 200)}...
            </p>
            <p>
              <strong>📄 CV Preview:</strong>
              <br />
              {sessionData.cvText.slice(0, 200)}...
            </p>
          </div>
        </>
      )}
    </main>
  );
};

export default InterviewPage;
