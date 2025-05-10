"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ChatBox from "@/components/ChatBox";
import ScoreBreakdown from "@/components/ScoreBreakdown";
import CountdownTimer from "@/components/CountdownTimer";
import LoadingState from "@/components/LoadingState";
import { useInterviewSession } from "@/lib/hooks/useInterviewSession";

const InterviewPage = () => {
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
    <main className="min-h-screen p-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-4">AI Interview Session</h1>

      {error && <p className="text-red-500">{error}</p>}
      {!error && !sessionData && <LoadingState />}

      {sessionData && (
        <>
          {/* Countdown */}
          {!showChat && !interviewDone && countdown !== null && (
            <CountdownTimer countdown={countdown} setCountdown={setCountdown} onFinish={generateInitialQuestion} />
          )}

          {/* Chat */}
          {showChat && !score && <ChatBox messages={messages} onSend={handleSend} />}

          {/* Calculating Score */}
          {interviewDone && !score && (
            <div className="text-xl text-gray-600 font-semibold mt-6">⏳ Calculating score...</div>
          )}

          {/* Final Score Breakdown */}
          {score && (
            <ScoreBreakdown score={score} onRestart={() => router.push("/")} />
          )}
        </>
      )}
    </main>
  );
};

export default InterviewPage;