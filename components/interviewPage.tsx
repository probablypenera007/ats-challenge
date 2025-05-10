"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ChatBox from "@/components/ChatBox";
import ScoreBreakdown from "@/components/ScoreBreakdown";
import CountdownTimer from "@/components/CountdownTimer";
import LoadingState from "@/components/LoadingState";
import { useInterviewSession } from "@/lib/hooks/useInterviewSession";

export default function InterviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id");

  const {
    sessionData,
    messages,
    score,
    error,
    showChat,
    interviewDone,
    countdown,
    setCountdown,
    generateInitialQuestion,
    handleSend,
  } = useInterviewSession(sessionId);

  return (
    <main className="min-h-screen px-6 py-12 flex flex-col items-center justify-center text-center">
      <div className="mb-6">
        <h1 className="text-5xl font-extrabold text-purple-700">AI Interview Assistant</h1>
        <p className="text-lg text-gray-50 mt-2 max-w-xl">
          Your personalized mock interview powered by AI — tailored to your job application and CV.
        </p>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {!error && !sessionData && <LoadingState />}

      {sessionData && (
        <>
          {!showChat && !interviewDone && countdown !== null && (
            <CountdownTimer countdown={countdown} setCountdown={setCountdown} onFinish={generateInitialQuestion} />
          )}
          {showChat && !score && <ChatBox messages={messages} onSend={handleSend} />}
          {interviewDone && !score && (
            <div className="text-xl text-gray-600 font-semibold mt-6">⏳ Calculating score...</div>
          )}
          {score && (
            <ScoreBreakdown score={score} onRestart={() => router.push("/")} />
          )}
        </>
      )}
    </main>
  );
}