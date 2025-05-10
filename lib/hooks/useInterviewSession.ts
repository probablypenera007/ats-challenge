import { useCallback, useEffect, useState } from "react";

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
  avgResponseTime: number; 
  summary: string;
}
type Message = { sender: "ai" | "user"; text: string };

export const useInterviewSession = (sessionId: string | null) => {
  const [sessionData, setSessionData] = useState<InterviewSessionData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [score, setScore] = useState<ScoreData | null>(null);
  const [error, setError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [interviewDone, setInterviewDone] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!sessionId) return;
      try {
        const res = await fetch(`/api/get-session?id=${sessionId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch session");
        setSessionData(data);
        setCountdown(3);
      } catch {
        setError("Failed to load session data.");
      }
    };
    fetchData();
  }, [sessionId]);

  const generateInitialQuestion = useCallback(async () => {
    if (!sessionId || !sessionData) return;
    const res = await fetch("/api/interview/generate-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sessionData),
    });
    const result = await res.json();
    const first = result.questions?.[0] || "Let's get started. Tell me about yourself.";
    setMessages([{ sender: "ai", text: first }]);
    setCurrentQuestion(first);
    setStartTime(Date.now());
    setShowChat(true);
  }, [sessionId, sessionData]);

  const handleSend = async (userMsg: string) => {
    if (!sessionId || !currentQuestion || startTime === null) return;
    const responseTime = Date.now() - startTime;
    // const newMessages = [...messages, { sender: "user", text: userMsg }];
    const newMessages = [...messages, { sender: "user" as const, text: userMsg }];
    setMessages(newMessages);

    const userCount = newMessages.filter((m) => m.sender === "user").length;

    const postPayload = {
      sessionId,
      question: currentQuestion,
      answer: userMsg,
      responseTime,
    };

    if (userCount >= 14) {
      await fetch("/api/interview/ask-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postPayload),
      });

      setInterviewDone(true);
      setShowChat(false);

      const scoreRes = await fetch("/api/interview/score-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const result = await scoreRes.json();
      setScore(result.score || null);
      return;
    }

    const res = await fetch("/api/interview/ask-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postPayload),
    });
    const result = await res.json();
    setCurrentQuestion(result.followUp || "Thank you for your answer.");
    setMessages((prev) => [...prev, { sender: "ai", text: result.followUp }]);
    setStartTime(Date.now());
  };

  return {
    sessionData,
    messages,
    score,
    error,
    showChat,
    interviewDone,
    countdown,
    setShowChat,
    setCountdown,
    generateInitialQuestion,
    handleSend,
  };
};