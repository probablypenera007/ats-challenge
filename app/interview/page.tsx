"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import ChatBox from "@/components/ChatBox";

interface InterviewSessionData {
  jobDescription: string;
  cvText: string;
}

interface ScoreData {
  technical: number;
  communication: number;
  responsiveness: number;
  problemSolving: number;
  culturalFit: number;
  averageScore: number;
  summary: string;
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [interviewDone, setInterviewDone] = useState(false);
  const [score, setScore] = useState<ScoreData | null>(null);

  // ✅ Fetch session data from backend
  useEffect(() => {
    const fetchSessionData = async () => {
      if (!sessionId) return;
      try {
        const res = await fetch(`/api/get-session?id=${sessionId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch session");
        setSessionData(data);
        setCountdown(3);
      } catch (err) {
        console.error("❌ Failed to fetch session:", err);
        setError("Failed to load session data.");
      }
    };
    fetchSessionData();
  }, [sessionId]);

  // ✅ Generate the first AI question
  const generateInitialQuestion = useCallback(async () => {
    if (!sessionId || !sessionData) return;
    try {
      const res = await fetch("/api/interview/generate-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionData),
      });
      const result = await res.json();
      const first =
        result.questions?.[0] || "Let's get started. Tell me about yourself.";
      setCurrentQuestion(first);
      setMessages([{ sender: "ai", text: first }]);
      setStartTime(Date.now());
    } catch (err) {
      console.error("❌ Question generation failed:", err);
      setError("Failed to generate questions.");
    }
  }, [sessionId, sessionData]);

  // ✅ Countdown
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setShowChat(true);
      generateInitialQuestion();
      return;
    }
    const timer = setTimeout(
      () => setCountdown((prev) => (prev !== null ? prev - 1 : null)),
      1000
    );
    return () => clearTimeout(timer);
  }, [countdown, generateInitialQuestion]);

  // ✅ Handle user response and follow-up
  const handleSend = async (userMsg: string) => {
    if (!sessionId || !currentQuestion || startTime === null) return;

    const responseTime = Date.now() - startTime;
    const updatedMessages: Message[] = [
      ...messages,
      { sender: "user" as const, text: userMsg },
    ];
    setMessages(updatedMessages);

    const userResponsesCount = updatedMessages.filter(
      (m) => m.sender === "user"
    ).length;

    // 🎯 Auto-end interview after 3 responses
    if (userResponsesCount >= 14) {
      try {
        // Final answer + trigger backend scoring
        await fetch("/api/interview/ask-question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            question: currentQuestion,
            answer: userMsg,
            responseTime,
          }),
        });

        setInterviewDone(true); // show "calculating score..."
        setShowChat(false);

        // Wait + fetch final score
        const scoreRes = await fetch("/api/interview/score-interview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const result = await scoreRes.json();
        setScore(result.score || null);
      } catch (err) {
        console.error("❌ Scoring failed:", err);
        setError("Failed to complete interview.");
      }
      return;
    }

    try {
      const res = await fetch("/api/interview/ask-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          question: currentQuestion,
          answer: userMsg,
          responseTime,
        }),
      });
      const result = await res.json();
      const followUp = result.followUp || "Thank you for your answer.";

      setCurrentQuestion(followUp);
      setMessages((prev) => [...prev, { sender: "ai", text: followUp }]);
      setStartTime(Date.now());
    } catch (err) {
      console.error("❌ AI follow-up failed:", err);
      setError("AI follow-up failed.");
    }
  };

  return (
    <main className="min-h-screen p-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-4">AI Interview Session</h1>

      {error && <p className="text-red-500">{error}</p>}
      {!error && !sessionData && <p>⏳ Loading session...</p>}

      {sessionData && (
        <>
          {/* Countdown */}
          {!showChat && !interviewDone && countdown !== null && (
            <div className="text-6xl font-bold text-purple-600 animate-pulse my-8">
              {countdown}
            </div>
          )}

          {/* Chat */}
          {/* {showChat && <ChatBox messages={messages} onSend={handleSend} />} */}
          {showChat && !score && <ChatBox messages={messages} onSend={handleSend} />}

          {/* Calculating Score */}
          {interviewDone && !score && (
            <div className="text-xl text-gray-600 font-semibold mt-6">
              ⏳ Calculating score...
            </div>
          )}

          {/* Final Score Breakdown */}
          {score && (
            <div className="w-full max-w-xl mt-8 bg-white border rounded-lg p-6 text-left shadow">
              <h2 className="text-xl font-bold mb-4 text-purple-700">
                Interview Score Breakdown
              </h2>
              <ul className="space-y-2">
                <li>
                  <span className="font-semibold text-gray-800">
                    Technical:
                  </span>
                  <span className="text-purple-900">{score.technical}/10</span>
                </li>
                <li>
                  <span className="font-semibold text-gray-800">
                   Communication:
                  </span>
                  <span className="text-purple-900">
                    {score.communication}/10
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-gray-800">
                    Responsiveness:
                  </span>{" "}
                  <span className="text-purple-900">
                    {score.responsiveness}/10
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-gray-800">
                   Problem Solving:
                  </span>{" "}
                  <span className="text-purple-900">
                    {score.problemSolving}/10
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-gray-800">
                    Cultural Fit:
                  </span>
                  <span className="text-purple-900">
                    {score.culturalFit}/10
                  </span>
                </li>
                <li className="font-bold text-purple-700 border-t pt-2 mt-2">
                  Average Score: {score.averageScore.toFixed(2)}/10
                </li>
              </ul>
              <p className="mt-4 italic text-gray-700">📝 {score.summary}</p>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default InterviewPage;